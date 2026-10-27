#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TikZ Flow Studio 2.0 — Server Bridge
-----------------------------------
Zero external pip dependencies (Pure Python 3 standard library).
Easily deployable on any VPS, Mac, Linux, or Windows machine.
Binds to 0.0.0.0 by default for instant sharing across mobile and desktop.

Endpoints:
  GET  /                  -> index.html
  GET  /ping              -> status JSON
  GET  /api/status        -> server & compiler info
  GET  /api/documents     -> list of available flowchart .tex files
  GET  /api/document      -> load a specific .tex file (?file=name)
  POST /api/save          -> save a .tex file
  POST /compile           -> compile TeX to PDF via XeLaTeX
  GET  /<file>            -> static files with CORS & proper MIME types
"""

import http.server
import json
import os
import re
import shutil
import socket
import socketserver
import subprocess
import sys
import time
from urllib.parse import parse_qs, unquote, urlparse

HERE = os.path.dirname(os.path.abspath(__file__)) or os.getcwd()
FLOWCHARTS_DIR = os.path.join(HERE, "flowcharts")

# Ensure flowcharts directory exists
if not os.path.exists(FLOWCHARTS_DIR):
    os.makedirs(FLOWCHARTS_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# Environment & PATH setup
# --------------------------------------------------------------------------
EXTRA_PATHS = [
    "/Library/TeX/texbin",
    "/usr/local/bin",
    "/opt/homebrew/bin",
    "/usr/bin",
    "/bin",
    "/usr/sbin",
    "/sbin",
    "/usr/local/texlive/2025basic/bin/universal-darwin",
    "/usr/local/texlive/2025/bin/universal-darwin",
    "/usr/local/texlive/2024/bin/universal-darwin",
    "/usr/local/texlive/2023/bin/universal-darwin",
    "/Library/TeX/Distributions/Programs/texbin",
    "/usr/local/texlive/2025/bin/x86_64-linux",
    "/usr/local/texlive/2024/bin/x86_64-linux",
    "/usr/local/texlive/2023/bin/x86_64-linux",
]

_old_path = os.environ.get("PATH", "")
os.environ["PATH"] = os.pathsep.join(
    [p for p in EXTRA_PATHS if os.path.isdir(p)] + ([_old_path] if _old_path else [])
)
os.environ.setdefault("LANG", "en_US.UTF-8")
os.environ.setdefault("LC_ALL", "en_US.UTF-8")

TIMEOUT = 120  # seconds per compile pass

C_RESET = "\033[0m"
C_DIM = "\033[2m"
C_RED = "\033[31m"
C_GRN = "\033[32m"
C_YEL = "\033[33m"
C_CYN = "\033[36m"
C_BLD = "\033[1m"


def find_xelatex():
    """Finds xelatex binary on macOS, Linux, or Windows."""
    w = shutil.which("xelatex")
    if w and os.path.isfile(w) and os.access(w, os.X_OK):
        return w
    candidate_paths = [
        "/Library/TeX/texbin/xelatex",
        "/usr/bin/xelatex",
        "/usr/local/bin/xelatex",
        "/opt/homebrew/bin/xelatex",
    ]
    for c in candidate_paths:
        if os.path.isfile(c) and os.access(c, os.X_OK):
            return c
    return None


XELATEX = find_xelatex()


def get_local_ip():
    """Best-effort local LAN IP for display."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.1)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def tail(text, n=30):
    lines = [l.rstrip() for l in text.splitlines()]
    return "\n".join(lines[-n:])


def extract_errors(log_text):
    """Pulls TeX errors and context lines out of a log string."""
    out = []
    lines = log_text.splitlines()
    for i, l in enumerate(lines):
        if l.startswith("!") or re.match(r"^! ?(LaTeX|Package|Class|Undefined|Emergency)", l):
            block = [l]
            for j in range(i + 1, min(i + 6, len(lines))):
                block.append(lines[j])
                if lines[j].startswith("l."):
                    break
            out.append("\n".join(block).rstrip())
        elif l.startswith("l.") and not out:
            out.append(l)
    seen, uniq = set(), []
    for b in out:
        if b not in seen:
            seen.add(b)
            uniq.append(b)
    return uniq[:12]


def extract_chart_title(tex_source):
    """Pulls human-readable title from flowchart TeX source."""
    m = re.search(r"\{\\Large\\bfseries\s*([^}]+)\}", tex_source)
    if m:
        t = m.group(1).replace("\\lr{", "").replace("\\rl{", "").replace("}", "").strip()
        return t
    return "فلوچارت بالینی"


class Handler(http.server.SimpleHTTPRequestHandler):
    server_version = "TikZFlowStudio/2.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=HERE, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write(
            "%s[%s]%s %s\n" % (C_DIM, time.strftime("%H:%M:%S"), C_RESET, fmt % args)
        )

    # ---------------- GET ----------------
    def do_GET(self):
        u = urlparse(self.path)
        path = u.path

        if path in ("/ping", "/api/status"):
            return self._json(
                200,
                {
                    "ok": True,
                    "xelatex": XELATEX or "",
                    "has_compiler": bool(XELATEX),
                    "cwd": HERE,
                    "platform": sys.platform,
                    "local_ip": get_local_ip(),
                    "time": time.time(),
                },
            )

        if path == "/api/documents":
            return self.handle_list_documents()

        if path == "/api/document":
            return self.handle_get_document(u.query)

        if path == "/api/hierarchy":
            return self.handle_get_hierarchy()

        if path == "/taxonomy" or path == "/taxonomy.html":
            self.path = "/taxonomy.html"
            return super().do_GET()

        if path == "/api/taxonomy":
            return self.handle_get_taxonomy()

        if path == "/api/taxonomy/versions":
            return self.handle_get_taxonomy_versions()

        # Serve index.html by default
        if path == "/" or not path:
            self.path = "/index.html"
            return super().do_GET()

        return super().do_GET()

    # ---------------- POST ----------------
    def do_POST(self):
        u = urlparse(self.path)
        path = u.path.rstrip("/")

        if path == "/compile":
            return self.handle_compile()

        if path == "/api/save":
            return self.handle_save_document()

        if path == "/api/hierarchy":
            return self.handle_save_hierarchy()

        if path == "/api/taxonomy":
            return self.handle_save_taxonomy()

        if path == "/api/taxonomy/versions":
            return self.handle_save_taxonomy_version()

        if path == "/api/taxonomy/rollback":
            return self.handle_rollback_taxonomy_version()

        self._json(404, {"success": False, "log": "Unknown endpoint: " + path})

    # ---------------- JSON Helper ----------------
    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def _read_json_body(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
            raw = self.rfile.read(n) if n else b"{}"
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return {}

    # ---------------- Document Listing & Fetching ----------------
    def handle_list_documents(self):
        docs = []

        # 1. Check flowcharts folder
        if os.path.isdir(FLOWCHARTS_DIR):
            for fname in sorted(os.listdir(FLOWCHARTS_DIR)):
                if fname.endswith(".tex"):
                    full_p = os.path.join(FLOWCHARTS_DIR, fname)
                    rel_p = os.path.relpath(full_p, HERE)
                    try:
                        with open(full_p, "r", encoding="utf-8", errors="replace") as f:
                            content = f.read(2048)
                        title = extract_chart_title(content)
                    except Exception:
                        title = fname
                    docs.append({
                        "id": os.path.splitext(fname)[0],
                        "name": fname,
                        "rel_path": rel_p,
                        "title": title,
                        "mtime": os.path.getmtime(full_p),
                        "is_flowchart": True,
                    })

        # 2. Check root document.tex
        root_doc = os.path.join(HERE, "document.tex")
        if os.path.isfile(root_doc):
            try:
                with open(root_doc, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read(2048)
                title = extract_chart_title(content)
            except Exception:
                title = "document.tex"
            docs.append({
                "id": "document",
                "name": "document.tex",
                "rel_path": "document.tex",
                "title": title,
                "mtime": os.path.getmtime(root_doc),
                "is_flowchart": False,
            })

        self._json(200, {"success": True, "documents": docs})

    def handle_get_document(self, query_str):
        params = parse_qs(query_str)
        file_arg = params.get("file", [""])[0] or params.get("name", [""])[0]
        if not file_arg:
            return self._json(400, {"success": False, "log": "Missing file parameter."})

        # Sanitize path to prevent directory traversal
        file_arg = os.path.normpath(unquote(file_arg)).lstrip("/")
        if not file_arg.endswith(".tex"):
            file_arg += ".tex"

        # Check candidate locations
        cands = [
            os.path.join(FLOWCHARTS_DIR, os.path.basename(file_arg)),
            os.path.join(HERE, file_arg),
            os.path.join(HERE, os.path.basename(file_arg)),
        ]

        target_path = None
        for c in cands:
            if os.path.isfile(c):
                target_path = c
                break

        if not target_path:
            return self._json(404, {"success": False, "log": "File not found: " + file_arg})

        try:
            with open(target_path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
            self._json(200, {
                "success": True,
                "file": os.path.relpath(target_path, HERE),
                "name": os.path.basename(target_path),
                "tex": content,
                "title": extract_chart_title(content),
            })
        except Exception as e:
            self._json(500, {"success": False, "log": str(e)})

    # ---------------- Save Document ----------------
    def handle_save_document(self):
        data = self._read_json_body()
        tex = data.get("tex", "")
        file_arg = data.get("file") or data.get("name") or "document.tex"

        if not tex.strip():
            return self._json(400, {"success": False, "log": "Cannot save empty LaTeX content."})

        file_arg = os.path.normpath(unquote(file_arg)).lstrip("/")
        if not file_arg.endswith(".tex"):
            file_arg += ".tex"

        target_path = os.path.join(HERE, file_arg)
        # Ensure parent dir exists
        os.makedirs(os.path.dirname(target_path), exist_ok=True)

        try:
            with open(target_path, "w", encoding="utf-8") as f:
                f.write(tex)

            # Also update document.tex as current active document if saving elsewhere
            if file_arg != "document.tex":
                root_doc = os.path.join(HERE, "document.tex")
                try:
                    with open(root_doc, "w", encoding="utf-8") as f:
                        f.write(tex)
                except Exception:
                    pass

            self._json(200, {
                "success": True,
                "file": file_arg,
                "bytes": len(tex.encode("utf-8")),
                "mtime": os.path.getmtime(target_path),
            })
        except Exception as e:
            self._json(500, {"success": False, "log": "Failed to save file: " + str(e)})

    # ---------------- Hierarchy API ----------------
    def handle_get_hierarchy(self):
        h_file = os.path.join(HERE, "hierarchy.json")
        if os.path.isfile(h_file):
            try:
                with open(h_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return self._json(200, {"success": True, "categories": data})
            except Exception:
                pass
        return self._json(200, {"success": True, "categories": None})

    def handle_save_hierarchy(self):
        data = self._read_json_body()
        cats = data.get("categories")
        if cats is None:
            return self._json(400, {"success": False, "log": "Missing categories in body."})
        h_file = os.path.join(HERE, "hierarchy.json")
        try:
            with open(h_file, "w", encoding="utf-8") as f:
                json.dump(cats, f, ensure_ascii=False, indent=2)
            self._json(200, {"success": True, "log": "Hierarchy saved successfully."})
        except Exception as e:
            self._json(500, {"success": False, "log": str(e)})

    # ---------------- Taxonomy & Version Management API ----------------
    def handle_get_taxonomy(self):
        t_file = os.path.join(HERE, "taxonomy.json")
        if os.path.isfile(t_file):
            try:
                with open(t_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return self._json(200, {"success": True, "tree": data})
            except Exception:
                pass
        return self._json(200, {"success": True, "tree": None})

    def handle_save_taxonomy(self):
        data = self._read_json_body()
        tree = data.get("tree")
        if tree is None:
            return self._json(400, {"success": False, "log": "Missing tree in body."})
        t_file = os.path.join(HERE, "taxonomy.json")
        try:
            with open(t_file, "w", encoding="utf-8") as f:
                json.dump(tree, f, ensure_ascii=False, indent=2)
            self._json(200, {"success": True, "log": "Taxonomy saved successfully."})
        except Exception as e:
            self._json(500, {"success": False, "log": str(e)})

    def handle_get_taxonomy_versions(self):
        v_file = os.path.join(HERE, "taxonomy_versions.json")
        if os.path.isfile(v_file):
            try:
                with open(v_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return self._json(200, {"success": True, "versions": data})
            except Exception:
                pass
        return self._json(200, {"success": True, "versions": []})

    def handle_save_taxonomy_version(self):
        data = self._read_json_body()
        name = data.get("name", "نسخه بدون نام")
        tree_data = data.get("data")
        if tree_data is None:
            return self._json(400, {"success": False, "log": "Missing data for taxonomy version."})

        v_file = os.path.join(HERE, "taxonomy_versions.json")
        versions = []
        if os.path.isfile(v_file):
            try:
                with open(v_file, "r", encoding="utf-8") as f:
                    versions = json.load(f)
            except Exception:
                versions = []

        now_str = time.strftime("%Y/%m/%d - %H:%M:%S")
        snap_id = f"snap_{int(time.time() * 1000)}"
        new_snap = {
            "id": snap_id,
            "name": name,
            "timestamp": now_str,
            "data": tree_data
        }
        versions.insert(0, new_snap)

        try:
            with open(v_file, "w", encoding="utf-8") as f:
                json.dump(versions, f, ensure_ascii=False, indent=2)

            t_file = os.path.join(HERE, "taxonomy.json")
            with open(t_file, "w", encoding="utf-8") as f:
                json.dump(tree_data, f, ensure_ascii=False, indent=2)

            self._json(200, {"success": True, "snapshot": new_snap, "versions": versions})
        except Exception as e:
            self._json(500, {"success": False, "log": str(e)})

    def handle_rollback_taxonomy_version(self):
        data = self._read_json_body()
        target_id = data.get("id")
        if not target_id:
            return self._json(400, {"success": False, "log": "Missing version ID for rollback."})

        v_file = os.path.join(HERE, "taxonomy_versions.json")
        if not os.path.isfile(v_file):
            return self._json(404, {"success": False, "log": "No saved versions found."})

        try:
            with open(v_file, "r", encoding="utf-8") as f:
                versions = json.load(f)

            target = next((v for v in versions if v.get("id") == target_id), None)
            if not target:
                return self._json(404, {"success": False, "log": f"Version '{target_id}' not found."})

            t_file = os.path.join(HERE, "taxonomy.json")
            with open(t_file, "w", encoding="utf-8") as f:
                json.dump(target["data"], f, ensure_ascii=False, indent=2)

            self._json(200, {
                "success": True,
                "log": f"Restored version: {target.get('name')}",
                "data": target["data"],
                "name": target.get("name")
            })
        except Exception as e:
            self._json(500, {"success": False, "log": str(e)})

    # ---------------- Compile ----------------
    def handle_compile(self):
        t0 = time.time()
        data = self._read_json_body()
        tex = data.get("tex", "")
        job_arg = data.get("job") or data.get("file") or "document"
        if isinstance(job_arg, str) and job_arg.endswith(".tex"):
            job_arg = os.path.splitext(os.path.basename(job_arg))[0]
        job = re.sub(r"[^A-Za-z0-9_\-]", "", str(job_arg)) or "document"
        passes = max(1, min(2, int(data.get("passes", 1))))

        if not tex.strip():
            return self._json(400, {"success": False, "log": "Empty LaTeX source."})

        if not XELATEX:
            msg = (
                "xelatex binary not found on the server.\n"
                "To compile native PDFs on the server, install TeX Live (XeTeX and XePersian).\n"
                "You can still use in-browser 1-click PNG, SVG, and browser print export without server XeLaTeX!"
            )
            return self._json(200, {
                "success": False,
                "has_compiler": False,
                "log": msg,
                "errors": ["XeLaTeX not installed on server."],
                "pdf_url": "",
            })

        tex_path = os.path.join(HERE, job + ".tex")
        pdf_path = os.path.join(HERE, job + ".pdf")
        log_path = os.path.join(HERE, job + ".log")

        # If on macOS and Liberation Serif is referenced but might be missing,
        # ensure graceful fallback so XeLaTeX never fails due to missing Latin font
        if sys.platform == "darwin" and "\\setlatintextfont{Liberation Serif}" in tex:
            tex_to_write = tex.replace("\\setlatintextfont{Liberation Serif}", "\\setlatintextfont{Times New Roman}")
        elif sys.platform != "darwin" and "\\setlatintextfont{Times New Roman}" in tex:
            tex_to_write = tex.replace("\\setlatintextfont{Times New Roman}", "\\setlatintextfont{Liberation Serif}")
        else:
            tex_to_write = tex

        try:
            with open(tex_path, "w", encoding="utf-8") as f:
                f.write(tex_to_write)
        except Exception as e:
            return self._json(500, {"success": False, "log": "Error writing .tex file: " + str(e)})

        before_mtime = os.path.getmtime(pdf_path) if os.path.exists(pdf_path) else 0

        print("\n" + C_CYN + "=" * 70 + C_RESET)
        print("%s▶ COMPILE%s  %s.tex  (%d bytes)  %s" %
              (C_BLD, C_RESET, job, len(tex.encode("utf-8")), time.strftime("%H:%M:%S")))

        combined, rc = "", -1
        try:
            for p in range(passes):
                proc = subprocess.run(
                    [
                        XELATEX,
                        "-interaction=nonstopmode",
                        "-synctex=1",
                        "-file-line-error",
                        job + ".tex",
                    ],
                    cwd=HERE,
                    capture_output=True,
                    timeout=TIMEOUT,
                    env=os.environ.copy(),
                )
                rc = proc.returncode
                out = proc.stdout.decode("utf-8", "replace")
                err = proc.stderr.decode("utf-8", "replace")
                combined += "\n===== PASS %d (rc=%d) =====\n" % (p + 1, rc) + out
                if err.strip():
                    combined += "\n----- stderr -----\n" + err
                if rc != 0 and passes > 1:
                    break
        except subprocess.TimeoutExpired:
            combined += "\n!!! TIMEOUT after %ds — compilation aborted.\n" % TIMEOUT
            rc = -9
        except Exception as e:
            combined += "\n!!! Runner exception: %r\n" % (e,)
            rc = -1

        # Prefer reading the generated .log file directly
        file_log = ""
        if os.path.exists(log_path):
            try:
                with open(log_path, "r", encoding="utf-8", errors="replace") as f:
                    file_log = f.read()
            except Exception:
                pass

        errors = extract_errors(file_log or combined)
        pdf_ok = os.path.exists(pdf_path) and os.path.getmtime(pdf_path) > before_mtime - 0.5
        success = (rc == 0) and pdf_ok
        dt = time.time() - t0

        if success:
            print("%s✔ SUCCESS%s  rc=%d  %.2fs  ->  %s.pdf" % (C_GRN, C_RESET, rc, dt, job))
        else:
            print("%s✖ COMPILE NOTICE%s  rc=%d  %.2fs  (pdf_ok=%s)" % (C_YEL, C_RESET, rc, dt, pdf_ok))
            for e in errors[:5]:
                print(C_YEL + "   " + e.replace("\n", "\n   ") + C_RESET)

        print(C_CYN + "=" * 70 + C_RESET)

        ts = int(time.time())
        payload = {
            "success": bool(success),
            "has_compiler": True,
            "returncode": rc,
            "duration": round(dt, 2),
            "errors": errors,
            "log": (("\n".join(errors) + "\n\n") if errors else "") + tail(file_log or combined, 25),
            "full_log_url": "/%s.log?t=%d" % (job, ts),
            "pdf_url": ("/%s.pdf?t=%d" % (job, ts)) if pdf_ok else "",
            "tex_url": "/%s.tex?t=%d" % (job, ts),
        }
        self._json(200, payload)


class ThreadingServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")

    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    if len(sys.argv) > 2:
        host = sys.argv[2]

    local_ip = get_local_ip()

    print(C_BLD + "\n========================================================" + C_RESET)
    print(C_BLD + "  🌿 TikZ Flow Studio 2.0 — Server Bridge" + C_RESET)
    print("========================================================")
    print("  Directory  : %s" % HERE)
    print("  XeLaTeX    : %s" % (C_GRN + XELATEX + C_RESET if XELATEX else C_YEL + "Not Installed (Browser Export Active)" + C_RESET))
    print("  Host / Port: %s:%d" % (host, port))
    print("--------------------------------------------------------")
    print("  Local URL  : %shttp://localhost:%d/%s" % (C_GRN, port, C_RESET))
    if local_ip and local_ip != "127.0.0.1":
        print("  Network URL: %shttp://%s:%d/%s (Share with Mobile/Anis)" % (C_CYN, local_ip, port, C_RESET))
    print("========================================================\n")

    try:
        with ThreadingServer((host, port), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopping server.")
    except OSError as e:
        print(C_RED + "  Cannot bind to %s:%d : %s" % (host, port, e) + C_RESET)
        sys.exit(1)


if __name__ == "__main__":
    main()
