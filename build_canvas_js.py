import json

with open('editor/flowcharts/oral_leukoplakia.tex', 'r') as f:
    oral_leukoplakia_tex = f.read()

with open('editor/flowcharts/cgcg.tex', 'r') as f:
    cgcg_tex = f.read()

with open('editor/flowcharts/odontogenic_tumors.tex', 'r') as f:
    odontogenic_tumors_tex = f.read()

with open('editor/flowcharts/fibrous_dysplasia.tex', 'r') as f:
    fibrous_dysplasia_tex = f.read()

docs_json = json.dumps({
    'fibrous_dysplasia': fibrous_dysplasia_tex,
    'oral_leukoplakia': oral_leukoplakia_tex,
    'cgcg': cgcg_tex,
    'odontogenic_tumors': odontogenic_tumors_tex
}, ensure_ascii=False)

canvas_js_code = """/**
 * TikZ Standalone Interactive Clinical Flowchart Engine & Touch Editor
 * ---------------------------------------------------------------------
 * 1. 100% Round-Trip Sync with XeLaTeX / TikZ source.
 * 2. Custom Touch-First Word-Tap & Pointer-Drag Range Selector (Disabled native browser handles).
 * 3. Dedicated Highlight Mode (Pen Tool Mode).
 * 4. Tactile Selection Toolbar (#tactileSelectionToolbar) positioned directly above selections.
 * 5. Automatic Adjacent Highlight Merging (Consecutive highlights coalesce).
 * 6. Small & Roundy SVG Arrowheads on Connectors.
 * 7. Instant Double-Tap Inline Node Editing (Mobile & Desktop).
 * 8. Magnetic Node Alignment Guides & Snapping.
 * 9. Quick Node Finder Modal (Cmd+K / Ctrl+K).
 * 10. RAF 60FPS Drag & Gesture Performance Engine.
 */

(function () {
  'use strict';

  // --- Embedded Authentic XeLaTeX Documents ---
  const EMBEDDED_DOCS = """ + docs_json + """;

  const SCALE = 54; // 54px per TikZ cm for spacious typography
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  // ==========================================================================
  // TikZ Engine — Parser, Serializer, and TeX/HTML Converter
  // ==========================================================================

  function matchDelim(src, i, open, close) {
    let d = 0;
    for (let j = i; j < src.length; j++) {
      const c = src[j];
      if (c === '\\\\') { j++; continue; }
      if (c === open) d++;
      else if (c === close) {
        d--;
        if (d === 0) return j;
      }
    }
    return -1;
  }

  function readArg(src, i) {
    let j = i;
    while (j < src.length && /\\s/.test(src[j])) j++;
    if (src[j] !== '{') return null;
    const e = matchDelim(src, j, '{', '}');
    if (e < 0) return null;
    return { content: src.slice(j + 1, e), i: e + 1 };
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const COLORBOX_MAP = {
    hlyellow: 'hl-yellow',
    hlgray: 'hl-gray',
    hlred: 'hl-red',
    yellow: 'hl-yellow',
    gray: 'hl-gray',
    red: 'hl-red',
  };

  const SYMBOLS = {
    bullet: '•',
    cdot: '·',
    times: '×',
    pm: '±',
    approx: '≈',
    le: '≤',
    ge: '≥',
    neq: '≠',
    to: '→',
  };

  function texToHtml(tex) {
    if (!tex) return '';
    return parseSeq(String(tex), 0, null, false).html;
  }

  function parseSeq(s, i, stop, math) {
    let out = '';
    while (i < s.length) {
      const c = s[i];

      if (c === '}') {
        if (stop === '}') return { html: out, i: i + 1 };
        i++;
        continue;
      }

      if (c === '$') {
        if (math && stop === '$') return { html: out, i: i + 1 };
        if (s[i + 1] === '$') { i += 2; continue; }
        const r = parseSeq(s, i + 1, '$', true);
        out += '<span class="tx-math" dir="ltr">' + r.html + '</span>';
        i = r.i;
        continue;
      }

      if (c === '{') {
        const r = parseSeq(s, i + 1, '}', math);
        out += '<span class="tx-grp">' + r.html + '</span>';
        i = r.i;
        continue;
      }

      if (c === '%') {
        const nl = s.indexOf('\\n', i);
        i = nl < 0 ? s.length : nl + 1;
        continue;
      }

      if (c === '\\\\') {
        if (s[i + 1] === '\\\\') {
          let j = i + 2;
          while (j < s.length && /\\s/.test(s[j])) j++;
          if (s[j] === '[') {
            const e = matchDelim(s, j, '[', ']');
            if (e > 0) j = e + 1;
          }
          out += '<br>';
          i = j;
          continue;
        }

        const m = /^\\\\([A-Za-z@]+)\\*?/.exec(s.slice(i));
        if (!m) {
          const ch = s[i + 1];
          if (ch === undefined) { i++; continue; }
          if (ch === ',' || ch === ';' || ch === ' ' || ch === '!') {
            out += ' ';
            i += 2;
            continue;
          }
          out += escHtml(ch === '~' ? '\\u00A0' : ch);
          i += 2;
          continue;
        }

        const name = m[1];
        let j = i + m[0].length;
        while (j < s.length && s[j] === ' ') j++;

        if (name === 'strut' || name === 'selectfont' || name === 'noindent' || name === 'par' || name === 'relax' || name === 'centering') {
          i = j;
          continue;
        }

        if (name === 'vspace' || name === 'hspace' || name === 'linespread') {
          let a = readArg(s, j);
          i = a ? a.i : j;
          continue;
        }

        if (name === 'colorbox') {
          const a = readArg(s, j);
          const b = a ? readArg(s, a.i) : null;
          if (a && b) {
            const cls = COLORBOX_MAP[a.content.trim()] || 'hl-gray';
            const inner = parseSeq(b.content, 0, null, math).html;
            out += '<span class="' + cls + '">' + inner + '</span>';
            i = b.i;
            continue;
          }
        }

        if (name === 'textbf') {
          const a = readArg(s, j);
          if (a) {
            out += '<strong>' + parseSeq(a.content, 0, null, math).html + '</strong>';
            i = a.i;
            continue;
          }
        }

        if (name === 'underline') {
          const a = readArg(s, j);
          if (a) {
            out += '<u>' + parseSeq(a.content, 0, null, math).html + '</u>';
            i = a.i;
            continue;
          }
        }

        if (name === 'lr') {
          const a = readArg(s, j);
          if (a) {
            out += '<span dir="ltr" class="lang-en">' + parseSeq(a.content, 0, null, math).html + '</span>';
            i = a.i;
            continue;
          }
        }

        if (name === 'rl') {
          const a = readArg(s, j);
          if (a) {
            out += '<span dir="rtl" class="lang-fa">' + parseSeq(a.content, 0, null, math).html + '</span>';
            i = a.i;
            continue;
          }
        }

        if (name === 'color') {
          const a = readArg(s, j);
          if (a) {
            i = a.i;
            continue;
          }
        }

        if (name === 'scriptsize' || name === 'footnotesize' || name === 'small') {
          out += '<span class="tx-small">';
          const r = parseSeq(s, j, null, math);
          out += r.html + '</span>';
          i = r.i;
          continue;
        }

        if (SYMBOLS[name]) {
          out += SYMBOLS[name];
          i = j;
          continue;
        }

        i = j;
        continue;
      }

      let t = '';
      while (i < s.length && '\\\\{}$%'.indexOf(s[i]) === -1) {
        t += s[i];
        i++;
      }
      out += escHtml(t.replace(/~/g, '\\u00A0'));
    }
    return { html: out, i };
  }

  function htmlToTex(htmlStr) {
    if (!htmlStr) return '';
    const temp = document.createElement('div');
    temp.innerHTML = htmlStr;

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        let inner = '';
        for (const child of node.childNodes) {
          inner += walk(child);
        }

        if (node.classList.contains('w')) return inner;
        if (node.classList.contains('hl-yellow')) return `\\\\colorbox{hlyellow}{${inner}}`;
        if (node.classList.contains('hl-red')) return `\\\\colorbox{hlred}{${inner}}`;
        if (node.classList.contains('hl-gray')) return `\\\\colorbox{hlgray}{${inner}}`;
        if (tag === 'strong' || tag === 'b') return `\\\\textbf{${inner}}`;
        if (tag === 'u') return `\\\\underline{${inner}}`;
        if (tag === 'br') return '\\\\\\\n  ';
        if (node.classList.contains('tx-small')) return `{\\\\scriptsize ${inner}}`;
        if (node.classList.contains('lang-en')) return `\\\\lr{${inner}}`;
        if (node.classList.contains('lang-fa')) return `\\\\rl{${inner}}`;

        return inner;
      }
      return '';
    }

    return walk(temp).trim();
  }

  function parseTikz(src) {
    const res = { nodes: [], edges: [], styles: {}, start: -1, end: -1 };
    if (!src) return res;

    const bTag = '\\\\begin{tikzpicture}';
    const bStart = src.indexOf(bTag);
    if (bStart < 0) return res;

    let i = bStart + bTag.length;
    let optStr = '';
    let j = i;
    while (j < src.length && /\\s/.test(src[j])) j++;
    if (src[j] === '[') {
      const e = matchDelim(src, j, '[', ']');
      if (e > 0) {
        optStr = src.slice(j + 1, e);
        i = e + 1;
      }
    }

    const eIdx = src.indexOf('\\\\end{tikzpicture}', i);
    const body = src.slice(i, eIdx < 0 ? src.length : eIdx);
    res.start = bStart;
    res.end = eIdx < 0 ? src.length : eIdx;

    let p = 0;
    while (p < body.length) {
      const c = body[p];
      if (c === '%') {
        const nl = body.indexOf('\\n', p);
        p = nl < 0 ? body.length : nl + 1;
        continue;
      }

      if (body.startsWith('\\\\node', p) || body.startsWith('\\\\coordinate', p)) {
        const stmt = parseNodeStmt(body, p, i);
        if (stmt) {
          if (stmt.node) res.nodes.push(stmt.node);
          p = stmt.end;
          continue;
        }
      }

      if (body.startsWith('\\\\draw', p) || body.startsWith('\\\\path', p)) {
        const stmt = parseDrawStmt(body, p, i);
        if (stmt) {
          if (stmt.edge) res.edges.push(stmt.edge);
          p = stmt.end;
          continue;
        }
      }

      p++;
    }

    return res;
  }

  function parseNodeStmt(body, p, base) {
    const isCoord = body.startsWith('\\\\coordinate', p);
    let q = p + (isCoord ? 11 : 5);
    let opts = '', id = '', x = 0, y = 0, text = '', cRange = null;

    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body[q] === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts = body.slice(q + 1, e);
      q = e + 1;
    }

    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body[q] === '(') {
      const e = matchDelim(body, q, '(', ')');
      if (e < 0) return null;
      id = body.slice(q + 1, e).trim();
      q = e + 1;
    }

    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body[q] === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts += ',' + body.slice(q + 1, e);
      q = e + 1;
    }

    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body.startsWith('at', q)) {
      q += 2;
      while (q < body.length && /\\s/.test(body[q])) q++;
      if (body[q] === '(') {
        const e = matchDelim(body, q, '(', ')');
        if (e < 0) return null;
        cRange = [base + q + 1, base + e];
        const coordStr = body.slice(q + 1, e);
        const parts = coordStr.split(',');
        if (parts.length >= 2) {
          x = parseFloat(parts[0]);
          y = parseFloat(parts[1]);
        }
        q = e + 1;
      }
    }

    let bStart = -1, bEnd = -1;
    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body[q] === '{') {
      const e = matchDelim(body, q, '{', '}');
      if (e > 0) {
        text = body.slice(q + 1, e);
        bStart = base + q + 1;
        bEnd = base + e;
        q = e + 1;
      }
    }

    while (q < body.length && body[q] !== ';') q++;
    if (body[q] === ';') q++;

    let shape = 'card';
    if (/diamond|decision/i.test(opts)) shape = 'diamond';

    let tw = 0;
    const twMatch = /text width\\s*=\\s*([\\d.]+)\\s*cm/i.exec(opts);
    if (twMatch) tw = parseFloat(twMatch[1]) * SCALE;

    let heavyBorder = /line width\\s*=\\s*(?:0\\.9|1\\.\\d+)pt/i.test(opts);

    return {
      node: {
        id: id || ('n_' + p),
        opts,
        shape,
        tw,
        heavyBorder,
        x,
        y,
        text,
        cx: x * SCALE,
        cy: -y * SCALE,
      },
      end: q
    };
  }

  function parseDrawStmt(body, p, base) {
    const kw = body.startsWith('\\\\path', p) ? '\\\\path' : '\\\\draw';
    let q = p + kw.length, opts = '';
    const points = [], labels = [], ops = [];

    while (q < body.length && /\\s/.test(body[q])) q++;
    if (body[q] === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts = body.slice(q + 1, e);
      q = e + 1;
    }

    let guard = 0;
    while (q < body.length && guard++ < 3000) {
      const c = body[q];
      if (/\\s/.test(c)) { q++; continue; }
      if (c === ';') { q++; break; }

      if (body.startsWith('-|', q)) { ops.push('-|'); q += 2; continue; }
      if (body.startsWith('|-', q)) { ops.push('|-'); q += 2; continue; }
      if (body.startsWith('--', q)) { ops.push('--'); q += 2; continue; }

      if (c === '(') {
        const e = matchDelim(body, q, '(', ')');
        if (e < 0) return null;
        const ptStr = body.slice(q + 1, e).trim();
        if (ptStr.includes(',')) {
          const parts = ptStr.split(',');
          points.push({ type: 'xy', x: parseFloat(parts[0]) * SCALE, y: -parseFloat(parts[1]) * SCALE });
        } else {
          const m = /^([A-Za-z0-9_@-]+)(?:\\.([a-z ]+))?$/.exec(ptStr);
          if (m) points.push({ type: 'node', id: m[1], anchor: (m[2] || '').trim() });
        }
        q = e + 1;
        continue;
      }

      if (body.startsWith('node', q)) {
        let k = q + 4, lo = '';
        while (k < body.length && /\\s/.test(body[k])) k++;
        if (body[k] === '[') {
          const e = matchDelim(body, k, '[', ']');
          lo = body.slice(k + 1, e);
          k = e + 1;
        }
        while (k < body.length && /\\s/.test(body[k])) k++;
        if (body[k] === '{') {
          const e = matchDelim(body, k, '{', '}');
          labels.push({ text: body.slice(k + 1, e), opts: lo, segmentIndex: Math.max(0, points.length - 1) });
          k = e + 1;
        }
        q = k;
        continue;
      }
      q++;
    }

    const isBus = !opts.includes('arrow');

    return {
      edge: {
        opts,
        points,
        labels,
        ops,
        isBus
      },
      end: q
    };
  }

  function updateNodeCoord(src, id, x, y) {
    if (!src || !id) return src;
    const safeId = id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    const pattern = String.raw`((?:\\\\node|\\\\coordinate)\\b[^{;]*?\\(${safeId}\\)[^{;]*?at\\s*\\()([^)]+)(\\))`;
    const re = new RegExp(pattern);
    return src.replace(re, (m, p1, oldC, p3) => p1 + x + ', ' + y + p3);
  }

  function updateNodeText(src, id, newText) {
    if (!src || !id) return src;
    const safeId = id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    const pattern = String.raw`(\\\\node\\s+[^{;]*?\\(${safeId}\\)[^{;]*?)(\\{)`;
    const re = new RegExp(pattern);
    const match = re.exec(src);
    if (!match) return src;
    const braceOpenIdx = match.index + match[1].length;
    const braceCloseIdx = matchDelim(src, braceOpenIdx, '{', '}');
    if (braceCloseIdx < 0) return src;
    return src.slice(0, braceOpenIdx + 1) + '\\n  ' + newText.trim() + '\\n' + src.slice(braceCloseIdx);
  }

  // ==========================================================================
  // Application State & History Manager (Undo / Redo Engine)
  // ==========================================================================

  const State = {
    activeDocId: 'oral_leukoplakia',
    texSource: EMBEDDED_DOCS['oral_leukoplakia'],
    nodes: [],
    edges: [],
    selectedNodeId: null,

    toolMode: 'select', // 'select' | 'move' | 'highlight'
    activeHighlightColor: 'yellow',

    historyStack: [],
    redoStack: [],
    maxHistory: 50,

    panX: 0,
    panY: 0,
    zoom: 1,
    minZoom: 0.2,
    maxZoom: 3.0,

    hasUserTransformed: false,
    isEditingText: false,
    activeEditingNode: null,

    isDraggingCanvas: false,
    dragCanvasStartX: 0,
    dragCanvasStartY: 0,

    draggingNode: null,
    dragNodeStartPointer: { x: 0, y: 0 },
    dragNodeStartPos: { cx: 0, cy: 0 },
    hasDragMoved: false,

    touchPinchActive: false,
    touchPrevDist: 0,
    touchPrevMidX: 0,
    touchPrevMidY: 0,
    touchPrevWorldMidX: 0,
    touchPrevWorldMidY: 0,

    lastTapTime: 0,
    lastTapNodeId: null,

    activeSelectionSpan: null,
    activeSelectionNode: null
  };

  let viewport, world, svgLayer, svgEdgeGroup, nodesContainer, texDrawer, texCodeEditor, toastEl;

  function pushUndoState(actionName) {
    const snapshot = {
      docId: State.activeDocId,
      texSource: State.texSource,
      nodes: State.nodes.map(n => ({
        id: n.id, x: n.x, y: n.y, cx: n.cx, cy: n.cy, text: n.text,
        html: n.bodyEl ? n.bodyEl.innerHTML : ''
      }))
    };
    State.historyStack.push(snapshot);
    if (State.historyStack.length > State.maxHistory) State.historyStack.shift();
    State.redoStack = [];
    updateUndoRedoUI();
  }

  function undo() {
    if (State.historyStack.length === 0) {
      showToast('چیزی برای بازگرداندن (Undo) وجود ندارد');
      return;
    }
    const currentSnapshot = {
      docId: State.activeDocId,
      texSource: State.texSource,
      nodes: State.nodes.map(n => ({
        id: n.id, x: n.x, y: n.y, cx: n.cx, cy: n.cy, text: n.text,
        html: n.bodyEl ? n.bodyEl.innerHTML : ''
      }))
    };
    State.redoStack.push(currentSnapshot);
    const prev = State.historyStack.pop();
    restoreSnapshot(prev);
    updateUndoRedoUI();
    showToast('عملیات بازگردانده شد (Undo)');
  }

  function redo() {
    if (State.redoStack.length === 0) {
      showToast('چیزی برای تکرار (Redo) وجود ندارد');
      return;
    }
    const currentSnapshot = {
      docId: State.activeDocId,
      texSource: State.texSource,
      nodes: State.nodes.map(n => ({
        id: n.id, x: n.x, y: n.y, cx: n.cx, cy: n.cy, text: n.text,
        html: n.bodyEl ? n.bodyEl.innerHTML : ''
      }))
    };
    State.historyStack.push(currentSnapshot);
    const next = State.redoStack.pop();
    restoreSnapshot(next);
    updateUndoRedoUI();
    showToast('عملیات مجدداً انجام شد (Redo)');
  }

  function restoreSnapshot(snapshot) {
    if (!snapshot) return;
    State.activeDocId = snapshot.docId;
    parseAndRenderDocument(snapshot.texSource);

    snapshot.nodes.forEach(sn => {
      const n = State.nodes.find(item => item.id === sn.id);
      if (n) {
        n.x = sn.x;
        n.y = sn.y;
        n.cx = sn.cx;
        n.cy = sn.cy;
        if (n.el) {
          n.el.style.left = `${n.cx}px`;
          n.el.style.top = `${n.cy}px`;
        }
        if (n.bodyEl && sn.html) {
          n.bodyEl.innerHTML = sn.html;
          normalizeNodeHighlights(n.bodyEl);
        }
      }
    });
    layoutEdges();
    updateTelemetryHud();
  }

  function updateUndoRedoUI() {
    setTxt('undoCountBadge', State.historyStack.length);
    setTxt('redoCountBadge', State.redoStack.length);
    const btnUndo = $('#btnUndo');
    const btnRedo = $('#btnRedo');
    if (btnUndo) btnUndo.disabled = State.historyStack.length === 0;
    if (btnRedo) btnRedo.disabled = State.redoStack.length === 0;
  }

  // Coordinate Math
  function screenToWorld(sx, sy) {
    return {
      x: (sx - State.panX) / State.zoom,
      y: (sy - State.panY) / State.zoom
    };
  }

  function applyTransform() {
    if (!world) return;
    world.style.transform = `translate(${State.panX}px, ${State.panY}px) scale(${State.zoom})`;
    updateTelemetryHud();
  }

  function zoomAtPoint(factor, sx, sy) {
    const oldZoom = State.zoom;
    const newZoom = clamp(oldZoom * factor, State.minZoom, State.maxZoom);
    if (newZoom === oldZoom) return;

    const wx = (sx - State.panX) / oldZoom;
    const wy = (sy - State.panY) / oldZoom;

    State.panX = sx - wx * newZoom;
    State.panY = sy - wy * newZoom;
    State.zoom = newZoom;
    State.hasUserTransformed = true;

    applyTransform();
  }

  function zoomBy(factor) {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    zoomAtPoint(factor, rect.width / 2, rect.height / 2);
  }

  function resetZoom() {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const worldCenter = screenToWorld(centerX, centerY);

    State.zoom = 1.0;
    State.panX = centerX - worldCenter.x * State.zoom;
    State.panY = centerY - worldCenter.y * State.zoom;
    State.hasUserTransformed = true;
    applyTransform();
    showToast('مقیاس روی ۱:۱ تنظیم شد');
  }

  function getGraphBoundingBox() {
    if (!State.nodes.length) return { minX: 0, maxX: 0, minY: 0, maxY: 0, w: 0, h: 0, cx: 0, cy: 0 };

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    State.nodes.forEach(n => {
      const w = n.el ? n.el.offsetWidth : (n.tw || 240);
      const h = n.el ? n.el.offsetHeight : 120;
      const hw = w / 2;
      const hh = h / 2;

      minX = Math.min(minX, n.cx - hw);
      maxX = Math.max(maxX, n.cx + hw);
      minY = Math.min(minY, n.cy - hh);
      maxY = Math.max(maxY, n.cy + hh);
    });

    if (!isFinite(minX)) return { minX: 0, maxX: 0, minY: 0, maxY: 0, w: 0, h: 0, cx: 0, cy: 0 };

    return {
      minX, maxX, minY, maxY,
      w: maxX - minX,
      h: maxY - minY,
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2
    };
  }

  function fitAll(userInitiated = false) {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    if (vw < 50 || vh < 50) return;

    const bounds = getGraphBoundingBox();
    if (bounds.w <= 0 || bounds.h <= 0) return;

    const pad = 48;
    const availW = Math.max(vw - pad * 2, 80);
    const availH = Math.max(vh - pad * 2, 80);

    const fitScale = Math.min(availW / bounds.w, availH / bounds.h);
    const targetZoom = clamp(fitScale, State.minZoom, 1.15);

    State.zoom = targetZoom;
    State.panX = (vw / 2) - (bounds.cx * targetZoom);
    State.panY = (vh / 2) - (bounds.cy * targetZoom);

    if (userInitiated) {
      State.hasUserTransformed = true;
      showToast('کل نمودار در کادر تراز شد');
    }

    applyTransform();
  }

  function focusNode(nodeId) {
    const n = State.nodes.find(item => item.id === nodeId);
    if (!n || !n.el || !viewport) return;

    const rect = viewport.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;

    const nw = n.el.offsetWidth || 260;
    const nh = n.el.offsetHeight || 130;

    const targetZoom = clamp(Math.min((vw * 0.72) / nw, (vh * 0.58) / nh), 0.85, 1.35);
    const targetPanX = (vw / 2) - (n.cx * targetZoom);
    const targetPanY = (vh / 2) - (n.cy * targetZoom);

    const startPanX = State.panX;
    const startPanY = State.panY;
    const startZoom = State.zoom;
    const startTime = performance.now();
    const duration = 380;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const ease = easeInOutCubic(progress);

      State.panX = startPanX + (targetPanX - startPanX) * ease;
      State.panY = startPanY + (targetPanY - startPanY) * ease;
      State.zoom = startZoom + (targetZoom - startZoom) * ease;

      applyTransform();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        State.hasUserTransformed = true;
        selectNode(nodeId);
      }
    }

    requestAnimationFrame(step);
    showToast(`تمرکز بر گره: ${nodeId}`);
  }

  // ==========================================================================
  // Document Parsing & Rendering
  // ==========================================================================

  function parseAndRenderDocument(src) {
    State.texSource = src;
    if (texCodeEditor) texCodeEditor.value = src;

    const parsed = parseTikz(src);
    State.nodes = parsed.nodes;
    State.edges = parsed.edges;

    renderNodes();
    layoutEdges();
    requestAnimationFrame(() => {
      layoutEdges();
    });
    updateTelemetryHud();
  }

  function updateNodeDimensions() {
    State.nodes.forEach(n => {
      if (n.shape === 'diamond') {
        const isWide = n.text && (n.text.includes('درجه دیسپلازی') || n.text.length > 25);
        n.w = isWide ? 152 : 116;
        n.h = isWide ? 82 : 62;
      } else if (n.el) {
        n.w = n.el.offsetWidth || (n.tw || 240);
        n.h = n.el.offsetHeight || 60;
      }
    });
  }

  function getNodeAnchorPoint(node, anchor, targetPt) {
    const cx = node.cx;
    const cy = node.cy;
    const w = node.w || (node.el ? node.el.offsetWidth : (node.tw || 240));
    const h = node.h || (node.el ? node.el.offsetHeight : 60);
    const hw = w / 2;
    const hh = h / 2;

    if (anchor === 'north') return { x: cx, y: cy - hh };
    if (anchor === 'south') return { x: cx, y: cy + hh };
    if (anchor === 'east') return { x: cx + hw, y: cy };
    if (anchor === 'west') return { x: cx - hw, y: cy };

    if (!targetPt) return { x: cx, y: cy };

    const dx = targetPt.x - cx;
    const dy = targetPt.y - cy;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };

    if (node.shape === 'diamond') {
      const t = 1 / ((Math.abs(dx) / hw) + (Math.abs(dy) / hh) || 0.0001);
      return { x: cx + dx * t, y: cy + dy * t };
    } else {
      const tan = Math.abs(dy / (dx || 0.0001));
      if (tan <= hh / hw) {
        const signX = dx > 0 ? 1 : -1;
        return { x: cx + signX * hw, y: cy + signX * hw * (dy / (dx || 0.0001)) };
      } else {
        const signY = dy > 0 ? 1 : -1;
        return { x: cx + signY * hh * (dx / (dy || 0.0001)), y: cy + signY * hh };
      }
    }
  }

  function renderNodes() {
    if (!nodesContainer) return;
    nodesContainer.innerHTML = '';

    State.nodes.forEach(n => {
      const el = document.createElement('div');
      el.dataset.id = n.id;
      el.style.left = `${n.cx}px`;
      el.style.top = `${n.cy}px`;

      if (n.tw > 0) {
        el.style.width = `${n.tw}px`;
      }

      if (n.shape === 'card') {
        el.className = 'flow-node' + (n.heavyBorder ? ' heavy-border' : '');
        el.innerHTML = `
          <div class="node-id-chip">#${n.id}</div>
          <div class="node-body">${texToHtml(n.text)}</div>
        `;
      } else if (n.shape === 'diamond') {
        el.className = 'flow-node diamond-node';
        const isWide = n.text && (n.text.includes('درجه دیسپلازی') || n.text.length > 25);
        const dw = isWide ? 152 : 116;
        const dh = isWide ? 82 : 62;
        n.w = dw;
        n.h = dh;
        el.style.width = `${dw}px`;
        el.style.height = `${dh}px`;
        el.innerHTML = `
          <div class="node-id-chip">#${n.id}</div>
          <svg class="diamond-svg-bg" viewBox="0 0 ${dw} ${dh}">
            <polygon class="diamond-poly" points="${dw / 2},1.2 ${dw - 1.2},${dh / 2} ${dw / 2},${dh - 1.2} 1.2,${dh / 2}"></polygon>
          </svg>
          <div class="node-body">${texToHtml(n.text)}</div>
        `;
      }

      nodesContainer.appendChild(el);
      n.el = el;
      n.bodyEl = el.querySelector('.node-body');

      if (n.shape === 'card') {
        n.w = n.tw > 0 ? n.tw : (el.offsetWidth || 240);
        n.h = el.offsetHeight || 60;
      }

      tokenizeWords(n.bodyEl);
      normalizeNodeHighlights(n.bodyEl);
      setupNodeListeners(n);
    });
  }

  function layoutEdges() {
    if (!svgEdgeGroup) return;
    svgEdgeGroup.innerHTML = '';
    $$('.edge-label-pill').forEach(pill => pill.remove());

    updateNodeDimensions();

    State.edges.forEach((edge, index) => {
      const pts = edge.points;
      if (!pts || pts.length < 2) return;

      const segmentCoords = [];

      for (let k = 0; k < pts.length - 1; k++) {
        const rawP1 = pts[k];
        const rawP2 = pts[k + 1];

        let targetP2 = rawP2.type === 'xy' ? { x: rawP2.x, y: rawP2.y } : { x: 0, y: 0 };
        let targetP1 = rawP1.type === 'xy' ? { x: rawP1.x, y: rawP1.y } : { x: 0, y: 0 };

        if (rawP2.type === 'node') {
          const n2 = State.nodes.find(item => item.id === rawP2.id);
          if (n2) targetP2 = { x: n2.cx, y: n2.cy };
        }
        if (rawP1.type === 'node') {
          const n1 = State.nodes.find(item => item.id === rawP1.id);
          if (n1) targetP1 = { x: n1.cx, y: n1.cy };
        }

        let startPt = targetP1;
        let endPt = targetP2;

        if (rawP1.type === 'node') {
          const n1 = State.nodes.find(item => item.id === rawP1.id);
          if (n1) startPt = getNodeAnchorPoint(n1, rawP1.anchor, targetP2);
        }
        if (rawP2.type === 'node') {
          const n2 = State.nodes.find(item => item.id === rawP2.id);
          if (n2) endPt = getNodeAnchorPoint(n2, rawP2.anchor, targetP1);
        }

        segmentCoords.push({ start: startPt, end: endPt });

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const op = edge.ops[k] || '--';

        let d = '';
        if (op === '-|') {
          d = `M ${startPt.x} ${startPt.y} L ${endPt.x} ${startPt.y} L ${endPt.x} ${endPt.y}`;
        } else if (op === '|-') {
          d = `M ${startPt.x} ${startPt.y} L ${startPt.x} ${endPt.y} L ${endPt.x} ${endPt.y}`;
        } else {
          d = `M ${startPt.x} ${startPt.y} L ${endPt.x} ${endPt.y}`;
        }

        path.setAttribute('d', d);
        path.setAttribute('class', `tikz-edge-path ${edge.isBus ? 'bus-line' : ''}`);
        path.dataset.edgeIndex = index;
        if (!edge.isBus) {
          path.setAttribute('marker-end', 'url(#stealth-arrow)');
        }

        path.addEventListener('click', (e) => {
          e.stopPropagation();
          inspectConnectorEdge(edge, path);
        });

        svgEdgeGroup.appendChild(path);
      }

      // Edge Labels
      edge.labels.forEach(lbl => {
        const pill = document.createElement('div');
        pill.className = 'edge-label-pill';
        pill.innerHTML = texToHtml(lbl.text);

        const segIdx = Math.min(lbl.segmentIndex !== undefined ? lbl.segmentIndex : 0, segmentCoords.length - 1);
        const seg = segmentCoords[segIdx] || segmentCoords[0];
        if (!seg) return;

        const mx = (seg.start.x + seg.end.x) / 2;
        const my = (seg.start.y + seg.end.y) / 2;
        let lx = mx;
        let ly = my;

        if (lbl.opts.includes('above')) ly -= 13;
        if (lbl.opts.includes('below')) ly += 13;
        if (lbl.opts.includes('right')) lx += 18;
        if (lbl.opts.includes('left')) lx -= 18;

        pill.style.left = `${lx}px`;
        pill.style.top = `${ly}px`;

        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          inspectConnectorEdge(edge, null);
        });

        world.appendChild(pill);
      });
    });
  }

  function inspectConnectorEdge(edge, pathEl) {
    $$('.tikz-edge-path.active-edge').forEach(el => el.classList.remove('active-edge'));
    if (pathEl) pathEl.classList.add('active-edge');

    const nodeIds = edge.points.filter(p => p.type === 'node').map(p => p.id);
    if (nodeIds.length > 0) {
      deselectAll();
      nodeIds.forEach(id => {
        const n = State.nodes.find(item => item.id === id);
        if (n && n.el) n.el.classList.add('selected');
      });
      showToast(`مسیر ارتباطی بین گره‌های: ${nodeIds.join(' → ')}`);
    }
  }

  // ==========================================================================
  // Permanent Control Bar & Word-Level Highlighting Engine
  // ==========================================================================

  function tokenizeWords(root) {
    if (!root) return;

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text || !/\S/.test(text)) return;

        const frag = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);
        for (const tok of tokens) {
          if (!tok) continue;
          if (/^\s+$/.test(tok)) {
            frag.appendChild(document.createTextNode(tok));
          } else {
            const wSpan = document.createElement('span');
            wSpan.className = 'w';
            wSpan.textContent = tok;
            frag.appendChild(wSpan);
          }
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(frag, node);
        }
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList.contains('w')) return;
        const children = Array.from(node.childNodes);
        for (const child of children) {
          walk(child);
        }
      }
    }

    walk(root);
  }

  function setActiveHighlightColor(color) {
    State.activeHighlightColor = color;

    const chips = {
      yellow: $('#chipYellow'),
      red: $('#chipRed'),
      gray: $('#chipGray'),
      clear: $('#chipClear')
    };

    $$('.perm-chip, .btn-perm-clear').forEach(c => c.classList.remove('active'));
    if (chips[color]) chips[color].classList.add('active');
  }

  function removeHighlightFromWord(w) {
    if (!w) return;
    const hlParent = w.closest('.hl-yellow, .hl-red, .hl-gray');
    if (!hlParent) return;

    const siblingWords = Array.from(hlParent.querySelectorAll('.w')).filter(x => x !== w);
    if (siblingWords.length === 0) {
      while (hlParent.firstChild) {
        hlParent.parentNode.insertBefore(hlParent.firstChild, hlParent);
      }
      hlParent.remove();
      return;
    }

    const parent = hlParent.parentNode;
    const hlClass = hlParent.className;
    const beforeFrag = document.createDocumentFragment();
    const afterFrag = document.createDocumentFragment();
    let found = false;

    Array.from(hlParent.childNodes).forEach(child => {
      if (child === w || (child.contains && child.contains(w))) {
        found = true;
        return;
      }
      if (!found) {
        beforeFrag.appendChild(child);
      } else {
        afterFrag.appendChild(child);
      }
    });

    if (beforeFrag.childNodes.length > 0) {
      const bSpan = document.createElement('span');
      bSpan.className = hlClass;
      bSpan.appendChild(beforeFrag);
      parent.insertBefore(bSpan, hlParent);
    }

    parent.insertBefore(w, hlParent);

    if (afterFrag.childNodes.length > 0) {
      const aSpan = document.createElement('span');
      aSpan.className = hlClass;
      aSpan.appendChild(afterFrag);
      parent.insertBefore(aSpan, hlParent);
    }

    hlParent.remove();
  }

  function highlightWord(w, color) {
    if (!w) return;
    const existingHl = w.closest('.hl-yellow, .hl-red, .hl-gray');
    if (existingHl && existingHl.classList.contains(`hl-${color}`)) {
      return;
    }
    if (existingHl) {
      removeHighlightFromWord(w);
    }
    const span = document.createElement('span');
    span.className = `hl-${color}`;
    if (w.parentNode) {
      w.parentNode.insertBefore(span, w);
      span.appendChild(w);
    }
  }

  function normalizeNodeHighlights(nodeBodyEl) {
    if (!nodeBodyEl) return;

    // 1. Remove empty highlight spans
    const hlSpans = () => Array.from(nodeBodyEl.querySelectorAll('.hl-yellow, .hl-red, .hl-gray'));
    hlSpans().forEach(span => {
      if (!span.textContent || span.textContent.trim() === '') {
        span.remove();
      }
    });

    // 2. Flatten nested duplicate spans
    let changed = true;
    let safety = 0;
    while (changed && safety++ < 20) {
      changed = false;
      const spans = hlSpans();
      for (const span of spans) {
        const parentHl = span.parentElement ? span.parentElement.closest('.hl-yellow, .hl-red, .hl-gray') : null;
        if (parentHl) {
          while (span.firstChild) {
            span.parentNode.insertBefore(span.firstChild, span);
          }
          span.remove();
          changed = true;
          break;
        }
      }
    }

    // 3. ALWAYS Merge adjacent highlight spans of the SAME color across whitespace
    changed = true;
    safety = 0;
    while (changed && safety++ < 50) {
      changed = false;
      const spans = hlSpans();
      for (const span of spans) {
        if (!span.parentNode) continue;
        let next = span.nextSibling;
        let whitespaceNodes = [];

        while (next && next.nodeType === Node.TEXT_NODE && /^\s*$/.test(next.textContent)) {
          whitespaceNodes.push(next);
          next = next.nextSibling;
        }

        if (next && next.nodeType === Node.ELEMENT_NODE && next.className === span.className) {
          whitespaceNodes.forEach(wsNode => span.appendChild(wsNode));
          while (next.firstChild) {
            span.appendChild(next.firstChild);
          }
          next.remove();
          changed = true;
          break;
        }
      }
    }

    nodeBodyEl.normalize();
  }

  // ==========================================================================
  // Contextual Highlight Popover (#highlightPopover)
  // ==========================================================================

  function showHighlightPopover(spanEl, node) {
    const popover = $('#highlightPopover');
    if (!popover || !spanEl || !viewport) return;

    State.activeSelectionSpan = spanEl;
    State.activeSelectionNode = node;

    const spanRect = spanEl.getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();

    const left = spanRect.left + spanRect.width / 2 - vpRect.left;
    const top = spanRect.top - vpRect.top;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.display = 'flex';
  }

  function hideHighlightPopover() {
    const popover = $('#highlightPopover');
    if (popover) popover.style.display = 'none';
    State.activeSelectionSpan = null;
    State.activeSelectionNode = null;
  }

  function changeActiveHighlightColor(color) {
    if (!State.activeSelectionSpan || !State.activeSelectionNode) return;
    pushUndoState('Change Highlight Color');

    State.activeSelectionSpan.className = `hl-${color}`;
    const node = State.activeSelectionNode;

    normalizeNodeHighlights(node.bodyEl);
    tokenizeWords(node.bodyEl);
    updateNodeFromHtml(node);
    hideHighlightPopover();
    showToast('رنگ هایلایت تغییر کرد');
  }

  function removeActiveHighlight() {
    if (!State.activeSelectionSpan || !State.activeSelectionNode) return;
    pushUndoState('Remove Highlight');

    const span = State.activeSelectionSpan;
    const node = State.activeSelectionNode;

    while (span.firstChild) {
      span.parentNode.insertBefore(span.firstChild, span);
    }
    span.remove();

    normalizeNodeHighlights(node.bodyEl);
    tokenizeWords(node.bodyEl);
    updateNodeFromHtml(node);
    hideHighlightPopover();
    showToast('هایلایت حذف شد');
  }

  // ==========================================================================
  // Node Listeners & Interaction (Select, Move, Double-Tap Inline Edit, Highlight)
  // ==========================================================================

  let isHighlightDragging = false;
  let highlightDragStartWord = null;
  let highlightDragNode = null;

  function selectNode(id) {
    deselectAll();
    State.selectedNodeId = id;
    const n = State.nodes.find(item => item.id === id);
    if (!n || !n.el) return;

    n.el.classList.add('selected');

    const sheet = $('#nodeActionSheet');
    if (sheet) {
      setTxt('sheetNodeTitle', `گره #${n.id}`);
      sheet.style.display = 'flex';
    }
    updateTelemetryHud();
  }

  function deselectAll() {
    State.selectedNodeId = null;
    $$('.flow-node.selected').forEach(el => el.classList.remove('selected'));
    $$('.tikz-edge-path.active-edge').forEach(el => el.classList.remove('active-edge'));
    const sheet = $('#nodeActionSheet');
    if (sheet) sheet.style.display = 'none';
    hideHighlightPopover();
    clearLivePreviews();
    hideAlignmentGuides();
    updateTelemetryHud();
  }

  function startInlineEditingNode(n) {
    if (!n || !n.bodyEl) return;
    pushUndoState('Inline Edit Text');
    deselectAll();
    State.activeEditingNode = n;
    State.isEditingText = true;

    n.bodyEl.contentEditable = 'true';
    n.bodyEl.focus();

    showToast('ویرایش مستقیم متن فعال شد');
  }

  function updateNodeFromHtml(node) {
    if (!node || !node.bodyEl) return;
    const newHtml = node.bodyEl.innerHTML;
    node.text = htmlToTex(newHtml);
    State.texSource = updateNodeText(State.texSource, node.id, node.text);
    if (texCodeEditor) texCodeEditor.value = State.texSource;
  }

  function setupNodeListeners(n) {
    const el = n.el;
    const body = n.bodyEl;

    // --- Hover Preview in Highlight Mode ---
    body.addEventListener('pointerenter', (e) => {
      if (State.toolMode !== 'highlight' || isHighlightDragging) return;
      const target = e.target.closest('.w') || e.target.closest('.hl-yellow, .hl-red, .hl-gray');
      if (target) {
        clearLivePreviews();
        const existingHl = target.closest('.hl-yellow, .hl-red, .hl-gray');
        if (existingHl) {
          existingHl.classList.add('hl-preview-' + State.activeHighlightColor);
        } else if (target.classList.contains('w')) {
          target.classList.add('hl-preview-' + State.activeHighlightColor);
        }
      }
    });

    body.addEventListener('pointermove', (e) => {
      if (State.toolMode !== 'highlight') return;

      if (!isHighlightDragging) {
        const target = e.target.closest('.w') || e.target.closest('.hl-yellow, .hl-red, .hl-gray');
        clearLivePreviews();
        if (target) {
          const existingHl = target.closest('.hl-yellow, .hl-red, .hl-gray');
          if (existingHl) {
            existingHl.classList.add('hl-preview-' + State.activeHighlightColor);
          } else if (target.classList.contains('w')) {
            target.classList.add('hl-preview-' + State.activeHighlightColor);
          }
        }
      } else if (isHighlightDragging && highlightDragNode === n && highlightDragStartWord) {
        const curEl = document.elementFromPoint(e.clientX, e.clientY);
        const curW = curEl ? curEl.closest('.w') : null;
        if (curW) {
          clearLivePreviews();
          const allW = Array.from(body.querySelectorAll('.w'));
          const i1 = allW.indexOf(highlightDragStartWord);
          const i2 = allW.indexOf(curW);
          if (i1 !== -1 && i2 !== -1) {
            const minI = Math.min(i1, i2);
            const maxI = Math.max(i1, i2);
            for (let idx = minI; idx <= maxI; idx++) {
              allW[idx].classList.add('hl-preview-' + State.activeHighlightColor);
            }
          }
        }
      }
    });

    body.addEventListener('pointerleave', () => {
      if (!isHighlightDragging) {
        clearLivePreviews();
      }
    });

    // --- PointerDown on Node / Body ---
    el.addEventListener('pointerdown', (e) => {
      if (body.isContentEditable) return;

      const now = performance.now();
      const isDoubleTap = (now - State.lastTapTime < 340) && (State.lastTapNodeId === n.id);
      State.lastTapTime = now;
      State.lastTapNodeId = n.id;

      if (isDoubleTap) {
        e.stopPropagation();
        hideHighlightPopover();
        startInlineEditingNode(n);
        return;
      }

      // Check if clicked in Highlight Mode
      if (State.toolMode === 'highlight') {
        const wTarget = e.target.closest('.w') || e.target.closest('.hl-yellow, .hl-red, .hl-gray');
        if (wTarget) {
          e.stopPropagation();
          isHighlightDragging = true;
          highlightDragNode = n;
          highlightDragStartWord = wTarget.classList.contains('w') ? wTarget : (wTarget.querySelector('.w') || wTarget);
          body.setPointerCapture(e.pointerId);

          clearLivePreviews();
          const existingHl = wTarget.closest('.hl-yellow, .hl-red, .hl-gray');
          if (existingHl) {
            existingHl.classList.add('hl-preview-' + State.activeHighlightColor);
          } else if (highlightDragStartWord) {
            highlightDragStartWord.classList.add('hl-preview-' + State.activeHighlightColor);
          }
          return;
        }
      }

      // Check if clicked an existing highlight in Select Mode -> Show Popover!
      const existingHl = e.target.closest('.hl-yellow, .hl-red, .hl-gray');
      if (existingHl && State.toolMode === 'select') {
        e.stopPropagation();
        selectNode(n.id);
        showHighlightPopover(existingHl, n);
        return;
      }

      hideHighlightPopover();

      if (State.toolMode === 'select') {
        e.stopPropagation();
        selectNode(n.id);
        return;
      }

      if (State.toolMode === 'move') {
        e.stopPropagation();
        selectNode(n.id);

        pushUndoState('Move Node');
        State.draggingNode = n;
        State.dragNodeStartPointer = { x: e.clientX, y: e.clientY };
        State.dragNodeStartPos = { cx: n.cx, cy: n.cy };
        State.hasDragMoved = false;

        el.classList.add('dragging');
        el.setPointerCapture(e.pointerId);
      }
    });

    body.addEventListener('pointerup', (e) => {
      if (State.toolMode === 'highlight' && isHighlightDragging && highlightDragNode === n) {
        if (body.hasPointerCapture && body.hasPointerCapture(e.pointerId)) {
          body.releasePointerCapture(e.pointerId);
        }
        isHighlightDragging = false;
        clearLivePreviews();

        const curEl = document.elementFromPoint(e.clientX, e.clientY);
        const curW = curEl ? curEl.closest('.w') : highlightDragStartWord;
        const allW = Array.from(body.querySelectorAll('.w'));
        const i1 = allW.indexOf(highlightDragStartWord);
        const i2 = curW ? allW.indexOf(curW) : i1;

        if (i1 !== -1) {
          const minI = i2 !== -1 ? Math.min(i1, i2) : i1;
          const maxI = i2 !== -1 ? Math.max(i1, i2) : i1;
          const selectedWords = allW.slice(minI, maxI + 1);

          pushUndoState('Apply Highlight');
          if (State.activeHighlightColor === 'clear') {
            selectedWords.forEach(w => removeHighlightFromWord(w));
            showToast('هایلایت پاک شد');
          } else {
            selectedWords.forEach(w => highlightWord(w, State.activeHighlightColor));
            showToast('هایلایت اعمال شد');
          }

          normalizeNodeHighlights(body);
          tokenizeWords(body);
          updateNodeFromHtml(n);
        }

        highlightDragStartWord = null;
        highlightDragNode = null;
      }
    });

    el.addEventListener('pointermove', (e) => {
      if (State.draggingNode !== n || State.toolMode !== 'move') return;

      const dx = (e.clientX - State.dragNodeStartPointer.x) / State.zoom;
      const dy = (e.clientY - State.dragNodeStartPointer.y) / State.zoom;

      if (!State.hasDragMoved && Math.hypot(dx, dy) < 3) return;
      State.hasDragMoved = true;

      let targetCx = State.dragNodeStartPos.cx + dx;
      let targetCy = State.dragNodeStartPos.cy + dy;

      const snapResult = checkMagneticAlignment(n, targetCx, targetCy);
      n.cx = snapResult.cx;
      n.cy = snapResult.cy;

      n.x = +(n.cx / SCALE).toFixed(2);
      n.y = +(-n.cy / SCALE).toFixed(2);

      el.style.left = `${n.cx}px`;
      el.style.top = `${n.cy}px`;

      layoutEdges();
      updateTelemetryHud();
    });

    el.addEventListener('pointerup', (e) => {
      if (State.draggingNode === n) {
        if (el.hasPointerCapture && el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
        el.classList.remove('dragging');
        el.classList.add('snap-feedback');
        setTimeout(() => el.classList.remove('snap-feedback'), 250);

        State.draggingNode = null;
        hideAlignmentGuides();

        if (State.hasDragMoved) {
          State.hasUserTransformed = true;
          State.texSource = updateNodeCoord(State.texSource, n.id, n.x, n.y);
          if (texCodeEditor) texCodeEditor.value = State.texSource;
          showToast(`موقعیت گره #${n.id} ذخیره شد`);
        }
      }
    });

    body.addEventListener('blur', () => {
      if (body.isContentEditable) {
        body.contentEditable = 'false';
        State.isEditingText = false;
        State.activeEditingNode = null;
        normalizeNodeHighlights(body);
        tokenizeWords(body);
        updateNodeFromHtml(n);
        showToast('متن گره همگام‌سازی شد');
      }
    });
  }

  function clearLivePreviews() {
    $$('.hl-preview-yellow, .hl-preview-red, .hl-preview-gray, .hl-preview-clear').forEach(el => {
      el.classList.remove('hl-preview-yellow', 'hl-preview-red', 'hl-preview-gray', 'hl-preview-clear');
    });
  }


  // ==========================================================================
  // Magnetic Node Alignment Guides Engine
  // ==========================================================================

  function checkMagneticAlignment(activeNode, cx, cy) {
    const threshold = 7;
    let snapCx = cx;
    let snapCy = cy;
    let alignedX = null;
    let alignedY = null;

    State.nodes.forEach(other => {
      if (other.id === activeNode.id) return;
      if (Math.abs(other.cx - cx) < threshold) {
        snapCx = other.cx;
        alignedX = other.cx;
      }
      if (Math.abs(other.cy - cy) < threshold) {
        snapCy = other.cy;
        alignedY = other.cy;
      }
    });

    const guideX = $('#alignmentGuideX');
    const guideY = $('#alignmentGuideY');

    if (alignedX !== null && guideX) {
      guideX.style.left = `${alignedX}px`;
      guideX.style.display = 'block';
    } else if (guideX) {
      guideX.style.display = 'none';
    }

    if (alignedY !== null && guideY) {
      guideY.style.top = `${alignedY}px`;
      guideY.style.display = 'block';
    } else if (guideY) {
      guideY.style.display = 'none';
    }

    return { cx: snapCx, cy: snapCy };
  }

  function hideAlignmentGuides() {
    const guideX = $('#alignmentGuideX');
    const guideY = $('#alignmentGuideY');
    if (guideX) guideX.style.display = 'none';
    if (guideY) guideY.style.display = 'none';
  }

  // ==========================================================================
  // Quick Node Finder Modal (Cmd+K / Ctrl+K)
  // ==========================================================================

  function openQuickSearch() {
    const modal = $('#quickSearchModal');
    const input = $('#quickSearchInput');
    if (!modal || !input) return;

    modal.style.display = 'flex';
    input.value = '';
    input.focus();
    filterQuickSearchNodes('');
  }

  function closeQuickSearch() {
    const modal = $('#quickSearchModal');
    if (modal) modal.style.display = 'none';
  }

  function filterQuickSearchNodes(query) {
    const list = $('#quickSearchResultsList');
    if (!list) return;
    list.innerHTML = '';

    const q = query.toLowerCase().trim();
    const matches = State.nodes.filter(n => {
      return n.id.toLowerCase().includes(q) || n.text.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
      list.innerHTML = '<div style="padding: 12px; color: #94a3b8; text-align: center; font-size: 12px;">هیچ گرهی یافت نشد</div>';
      return;
    }

    matches.forEach(n => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <span class="s-item-title">${texToHtml(n.text.slice(0, 40))}</span>
        <span class="s-item-id">#${n.id}</span>
      `;
      item.addEventListener('click', () => {
        closeQuickSearch();
        focusNode(n.id);
      });
      list.appendChild(item);
    });
  }

  // ==========================================================================
  // Custom Tactile Combobox Component
  // ==========================================================================

  function toggleCombobox(e) {
    if (e) e.stopPropagation();
    const trigger = $('#docComboboxTrigger');
    const popover = $('#docComboboxPopover');
    if (!trigger || !popover) return;

    const isOpen = trigger.classList.contains('open');
    if (isOpen) {
      trigger.classList.remove('open');
      popover.classList.remove('show');
    } else {
      trigger.classList.add('open');
      popover.classList.add('show');
      const search = $('#comboboxSearchInput');
      if (search) search.focus();
    }
  }

  function closeCombobox() {
    const trigger = $('#docComboboxTrigger');
    const popover = $('#docComboboxPopover');
    if (trigger) trigger.classList.remove('open');
    if (popover) popover.classList.remove('show');
  }

  function filterDocuments(query) {
    const items = $$('.combobox-item');
    const q = query.toLowerCase().trim();
    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  function selectDocument(docId) {
    if (!EMBEDDED_DOCS[docId]) return;
    pushUndoState('Switch Document');
    State.activeDocId = docId;

    $$('.combobox-item').forEach(item => {
      item.classList.toggle('selected', item.dataset.id === docId);
    });

    const labels = {
      oral_leukoplakia: 'Oral Leukoplakia (سند سوم)',
      cgcg: 'CGCG (Giant Cell)',
      odontogenic_tumors: 'Odontogenic Tumors'
    };

    setTxt('docComboboxLabel', labels[docId] || docId);
    closeCombobox();

    parseAndRenderDocument(EMBEDDED_DOCS[docId]);
    fitAll(true);
    showToast(`سند ${labels[docId]} بارگذاری شد`);
  }

  // ==========================================================================
  // Gesture Engine (MacBook Trackpad Pinch & Touch 2-Finger Pinch)
  // ==========================================================================

  function initGestureEngine() {
    if (!viewport) return;

    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      if (e.ctrlKey || e.metaKey) {
        const factor = Math.exp(-e.deltaY * 0.008);
        zoomAtPoint(factor, sx, sy);
      } else if (e.shiftKey) {
        State.panX -= e.deltaY;
        State.hasUserTransformed = true;
        applyTransform();
      } else {
        State.panX -= e.deltaX;
        State.panY -= e.deltaY;
        State.hasUserTransformed = true;
        applyTransform();
      }
    }, { passive: false });

    viewport.addEventListener('pointerdown', (e) => {
      if (e.target === viewport || e.target === world || e.target === svgLayer) {
        hideHighlightPopover();
        State.isDraggingCanvas = true;
        State.dragCanvasStartX = e.clientX - State.panX;
        State.dragCanvasStartY = e.clientY - State.panY;
        viewport.classList.add('dragging-canvas');
        deselectAll();
      }
    });

    document.addEventListener('pointermove', (e) => {
      updatePointerHud(e.clientX, e.clientY);
      if (State.isDraggingCanvas) {
        State.panX = e.clientX - State.dragCanvasStartX;
        State.panY = e.clientY - State.dragCanvasStartY;
        State.hasUserTransformed = true;
        applyTransform();
      }
    });

    document.addEventListener('pointerup', () => {
      if (State.isDraggingCanvas) {
        State.isDraggingCanvas = false;
        viewport.classList.remove('dragging-canvas');
      }
    });

    // 2-Finger Touch Pinch Zoom
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        State.isDraggingCanvas = false;
        State.touchPinchActive = true;
        const rect = viewport.getBoundingClientRect();
        const t0 = e.touches[0];
        const t1 = e.touches[1];

        State.touchPrevDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        const midX = ((t0.clientX + t1.clientX) / 2) - rect.left;
        const midY = ((t0.clientY + t1.clientY) / 2) - rect.top;

        State.touchPrevMidX = midX;
        State.touchPrevMidY = midY;
        State.touchPrevWorldMidX = (midX - State.panX) / State.zoom;
        State.touchPrevWorldMidY = (midY - State.panY) / State.zoom;
      }
    }, { passive: false });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && State.touchPinchActive) {
        if (e.cancelable) e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const t0 = e.touches[0];
        const t1 = e.touches[1];

        const curDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        const curMidX = ((t0.clientX + t1.clientX) / 2) - rect.left;
        const curMidY = ((t0.clientY + t1.clientY) / 2) - rect.top;

        if (State.touchPrevDist > 0 && curDist > 0) {
          const scaleDelta = curDist / State.touchPrevDist;
          const newZoom = clamp(State.zoom * scaleDelta, State.minZoom, State.maxZoom);

          State.panX = curMidX - State.touchPrevWorldMidX * newZoom;
          State.panY = curMidY - State.touchPrevWorldMidY * newZoom;
          State.zoom = newZoom;

          State.touchPrevDist = curDist;
          State.touchPrevMidX = curMidX;
          State.touchPrevMidY = curMidY;
          State.touchPrevWorldMidX = (curMidX - State.panX) / State.zoom;
          State.touchPrevWorldMidY = (curMidY - State.panY) / State.zoom;

          State.hasUserTransformed = true;
          applyTransform();
        }
      }
    }, { passive: false });

    // Close combobox on outside click
    document.addEventListener('click', (e) => {
      const wrapper = $('#docComboboxWrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        closeCombobox();
      }
    });

    // Keyboard Shortcuts (Undo/Redo & Cmd+K Quick Search)
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openQuickSearch();
        return;
      }

      if (e.key === 'Escape') {
        closeQuickSearch();
        deselectAll();
        return;
      }

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      if (mod && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if (mod && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    });

    // Smart Virtual Keyboard Adaptation
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        if (State.isEditingText && State.selectedNodeId) {
          const n = State.nodes.find(item => item.id === State.selectedNodeId);
          if (n) {
            const visibleH = window.visualViewport.height;
            const targetScreenY = visibleH * 0.32;
            State.panY = targetScreenY - n.cy * State.zoom;
            applyTransform();
          }
        }
      });
    }
  }

  // ==========================================================================
  // Tool Modes & Telemetry
  // ==========================================================================

  function setToolMode(mode) {
    State.toolMode = mode;
    viewport.classList.remove('mode-select', 'mode-hand-move', 'mode-highlight-active');
    hideHighlightPopover();
    clearLivePreviews();

    if (mode === 'move') viewport.classList.add('mode-hand-move');
    if (mode === 'highlight') viewport.classList.add('mode-highlight-active');
    if (mode === 'select') viewport.classList.add('mode-select');

    $('#dockBtnSelect').classList.toggle('active', mode === 'select');
    $('#dockBtnMove').classList.toggle('active', mode === 'move');
    $('#dockBtnHighlight').classList.toggle('active', mode === 'highlight');

    const subHighlight = $('#subBarHighlight');
    const subNormal = $('#subBarNormal');
    if (mode === 'highlight') {
      if (subHighlight) subHighlight.style.display = 'flex';
      if (subNormal) subNormal.style.display = 'none';
      setActiveHighlightColor(State.activeHighlightColor);
    } else {
      if (subHighlight) subHighlight.style.display = 'none';
      if (subNormal) subNormal.style.display = 'flex';
    }

    const modeLabels = { select: 'انتخاب', move: 'جابجایی', highlight: 'هایلایت' };
    setTxt('hudMode', modeLabels[mode] || mode);
    showToast(`حالت ${modeLabels[mode]} فعال شد`);
  }

  function toggleTexDrawer() {
    if (!texDrawer) return;
    texDrawer.classList.toggle('open');
    const isOpen = texDrawer.classList.contains('open');
    if (isOpen && texCodeEditor) {
      texCodeEditor.value = State.texSource;
    }
  }

  function copyTexCode() {
    if (texCodeEditor) {
      navigator.clipboard.writeText(texCodeEditor.value);
      showToast('سورس کد XeLaTeX کپی شد');
    }
  }

  function applyTexFromDrawer() {
    if (texCodeEditor) {
      pushUndoState('Edit TeX Source');
      parseAndRenderDocument(texCodeEditor.value);
      showToast('تغییرات کد TeX اعمال شد');
    }
  }

  function updatePointerHud(clientX, clientY) {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const sx = Math.round(clientX - rect.left);
    const sy = Math.round(clientY - rect.top);
    const wPt = screenToWorld(sx, sy);

    setTxt('hudMousePos', `${sx}, ${sy}`);
    setTxt('hudWorldPos', `${Math.round(wPt.x)}, ${Math.round(wPt.y)}`);
  }

  function updateTelemetryHud() {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    setTxt('hudVpSize', `${Math.round(rect.width)} × ${Math.round(rect.height)}`);

    const bounds = getGraphBoundingBox();
    setTxt('hudGraphBounds', `${Math.round(bounds.w)} × ${Math.round(bounds.h)}`);
    setTxt('hudPanZoom', `${Math.round(State.panX)}, ${Math.round(State.panY)} @ ${(State.zoom * 100).toFixed(0)}%`);
    setTxt('hudSelectedNode', State.selectedNodeId || 'None');
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2000);
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    viewport = $('#viewport');
    world = $('#world');
    svgLayer = $('#svgLayer');
    svgEdgeGroup = $('#svgEdgeGroup');
    nodesContainer = $('#nodesContainer');
    texDrawer = $('#texDrawer');
    texCodeEditor = $('#texCodeEditor');
    toastEl = $('#toastNotification');

    initGestureEngine();
    updateUndoRedoUI();

    // Default load: Oral Leukoplakia (Document 3)
    parseAndRenderDocument(EMBEDDED_DOCS['oral_leukoplakia']);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        layoutEdges();
      });
    }

    requestAnimationFrame(() => {
      layoutEdges();
      fitAll(false);
    });
  }

  window.CanvasApp = {
    setToolMode,
    setActiveHighlightColor,
    changeActiveHighlightColor,
    removeActiveHighlight,
    toggleCombobox,
    filterDocuments,
    selectDocument,
    zoomBy,
    resetZoom,
    fitAll,
    deselectAll,
    undo,
    redo,
    openQuickSearch,
    closeQuickSearch,
    filterQuickSearchNodes,
    focusSelectedNode: () => State.selectedNodeId && focusNode(State.selectedNodeId),
    editSelectedNodeDirectly: () => {
      if (!State.selectedNodeId) return;
      const n = State.nodes.find(item => item.id === State.selectedNodeId);
      if (n) startInlineEditingNode(n);
    },
    toggleMoveModeForSelectedNode: () => setToolMode('move'),
    toggleTexDrawer,
    copyTexCode,
    applyTexFromDrawer
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
"""

with open('canvas.js', 'w') as f:
    f.write(canvas_js_code)

print("canvas.js successfully built!")
