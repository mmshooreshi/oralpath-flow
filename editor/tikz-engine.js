/**
 * TikZ Engine — Parser, Serializer, and TeX/HTML Converter
 * Robust bidirectional synchronization between LaTeX/TikZ source and visual canvas.
 */

const SCALE = 54; // px per TikZ cm for balanced spacious typography without vertical overlap

// Match matching delimiter pair (e.g. { ... } or [ ... ] or ( ... ))
function matchDelim(src, i, open, close) {
  let d = 0;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (c === '\\') { j++; continue; }
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
  while (j < src.length && /\s/.test(src[j])) j++;
  if (src[j] !== '{') return null;
  const e = matchDelim(src, j, '{', '}');
  if (e < 0) return null;
  return { content: src.slice(j + 1, e), i: e + 1 };
}

function toUnits(num, unit) {
  switch ((unit || 'cm').toLowerCase()) {
    case 'cm': return num * SCALE;
    case 'mm': return (num * SCALE) / 10;
    case 'in': return num * SCALE * 2.54;
    case 'pt': return (num * SCALE) / 28.4527;
    case 'em': return num * 10;
    default: return num * SCALE;
  }
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const COLORBOX = {
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
  mp: '∓',
  approx: '≈',
  le: '≤',
  ge: '≥',
  neq: '≠',
  to: '→',
  rightarrow: '→',
  leftarrow: '←',
  infty: '∞',
  checkmark: '✓',
};

/**
 * Converts TeX formatting to semantic HTML for canvas display.
 */
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
      const nl = s.indexOf('\n', i);
      i = nl < 0 ? s.length : nl + 1;
      continue;
    }

    if (c === '\\') {
      // Line break \\
      if (s[i + 1] === '\\') {
        let j = i + 2;
        while (j < s.length && /\s/.test(s[j])) j++;
        if (s[j] === '[') {
          const e = matchDelim(s, j, '[', ']');
          if (e > 0) j = e + 1;
        }
        out += '<br>';
        i = j;
        continue;
      }

      const m = /^\\([A-Za-z@]+)\*?/.exec(s.slice(i));
      if (!m) {
        const ch = s[i + 1];
        if (ch === undefined) { i++; continue; }
        if (ch === ',' || ch === ';' || ch === ' ' || ch === '!') {
          out += ' ';
          i += 2;
          continue;
        }
        out += escHtml(ch === '~' ? '\u00A0' : ch);
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
          const cls = COLORBOX[a.content.trim()] || 'hl-gray';
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

      if (name === 'textit' || name === 'itshape') {
        const a = readArg(s, j);
        if (a) {
          out += '<em>' + parseSeq(a.content, 0, null, math).html + '</em>';
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
    while (i < s.length && '\\{}$%'.indexOf(s[i]) === -1) {
      t += s[i];
      i++;
    }
    out += escHtml(t.replace(/~/g, '\u00A0'));
  }
  return { html: out, i };
}

/**
 * Parses full TikZ environment from LaTeX source.
 */
function parseTikz(src) {
  const res = { nodes: [], edges: [], styles: {}, start: -1, end: -1 };
  if (!src) return res;

  const bTag = '\\begin{tikzpicture}';
  const bStart = src.indexOf(bTag);
  if (bStart < 0) return res;

  let i = bStart + bTag.length;
  let optStr = '';
  let j = i;
  while (j < src.length && /\s/.test(src[j])) j++;
  if (src[j] === '[') {
    const e = matchDelim(src, j, '[', ']');
    if (e > 0) {
      optStr = src.slice(j + 1, e);
      i = e + 1;
    }
  }

  const eIdx = src.indexOf('\\end{tikzpicture}', i);
  const base = i;
  const body = src.slice(i, eIdx < 0 ? src.length : eIdx);
  res.start = bStart;
  res.end = eIdx < 0 ? src.length : eIdx;

  // Parse styles
  const sre = /([A-Za-z][\w .@/-]*?)\/\.style\s*=\s*\{/g;
  let m;
  while ((m = sre.exec(optStr))) {
    const o = sre.lastIndex - 1;
    const e = matchDelim(optStr, o, '{', '}');
    if (e < 0) break;
    res.styles[m[1].trim()] = optStr.slice(o + 1, e);
    sre.lastIndex = e + 1;
  }

  // Parse statements
  let p = 0;
  while (p < body.length) {
    const c = body[p];
    if (c === '%') {
      const nl = body.indexOf('\n', p);
      p = nl < 0 ? body.length : nl + 1;
      continue;
    }
    if (body.startsWith('\\node', p) || body.startsWith('\\coordinate', p)) {
      const r = parseNodeStmt(body, p, base, res.styles);
      if (r) {
        res.nodes.push(r.node);
        p = r.end;
        continue;
      }
    }
    if (body.startsWith('\\draw', p) || body.startsWith('\\path', p)) {
      const r = parseDrawStmt(body, p, base);
      if (r) {
        if (r.edge) res.edges.push(r.edge);
        p = r.end;
        continue;
      }
    }
    p++;
  }
  return res;
}

function parseNodeStmt(body, p, base, styles) {
  const kw = body.startsWith('\\coordinate', p) ? '\\coordinate' : '\\node';
  let q = p + kw.length;
  let id = null, opts = '', coord = null, cRange = null, lastWord = '';

  while (q < body.length) {
    const c = body[q];
    if (/\s/.test(c)) { q++; continue; }
    if (c === '(') {
      const e = matchDelim(body, q, '(', ')');
      if (e < 0) return null;
      const inner = body.slice(q + 1, e);
      if (lastWord === 'at') { coord = inner; cRange = [q + 1, e]; }
      else if (id === null) { id = inner.trim(); }
      else { coord = inner; cRange = [q + 1, e]; }
      lastWord = '';
      q = e + 1;
      continue;
    }
    if (c === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts = body.slice(q + 1, e);
      q = e + 1;
      lastWord = '';
      continue;
    }
    if (c === '{') {
      const e = matchDelim(body, q, '{', '}');
      if (e < 0) return null;
      const text = body.slice(q + 1, e);
      let k = e + 1;
      while (k < body.length && body[k] !== ';') k++;
      return {
        node: buildNodeObject(
          id, opts, coord, text, styles,
          base + p, base + k + 1,
          cRange ? [base + cRange[0], base + cRange[1]] : null,
          base + q + 1, base + e
        ),
        end: k + 1,
      };
    }
    if (c === ';') {
      return {
        node: buildNodeObject(
          id, opts, coord, '', styles,
          base + p, base + q + 1,
          cRange ? [base + cRange[0], base + cRange[1]] : null,
          base + q, base + q
        ),
        end: q + 1,
      };
    }
    let w = '';
    while (q < body.length && /[A-Za-z]/.test(body[q])) { w += body[q]; q++; }
    if (w === '') q++;
    lastWord = w;
  }
  return null;
}

function buildNodeObject(id, opts, coord, text, styles, stmtStart, stmtEnd, cRange, bStart, bEnd) {
  let shape = 'rect', tw = 0, lw = 1.0;

  if (opts.includes('diamond') || (styles && styles['decision'] && opts.includes('decision'))) {
    shape = 'diamond';
  }

  const mm = /text\s+width\s*=\s*([-\d.]+)\s*(cm|mm|pt)?/.exec(opts);
  if (mm) tw = toUnits(parseFloat(mm[1]), mm[2]);

  let x = 0, y = 0;
  if (coord && coord.includes(',')) {
    const parts = coord.split(',');
    x = parseFloat(parts[0]) || 0;
    y = parseFloat(parts[1]) || 0;
  }

  return {
    id: id || ('n_' + stmtStart),
    opts,
    shape,
    tw,
    lw,
    x,
    y,
    tx: x,
    ty: y,
    text,
    stmtStart,
    stmtEnd,
    coordStart: cRange ? cRange[0] : -1,
    coordEnd: cRange ? cRange[1] : -1,
    bodyStart: bStart,
    bodyEnd: bEnd,
    cx: x * SCALE,
    cy: -y * SCALE,
    w: 0,
    h: 0,
  };
}

function parseDrawStmt(body, p, base) {
  const kw = body.startsWith('\\path', p) ? '\\path' : '\\draw';
  let q = p + kw.length, opts = '';
  const points = [], labels = [], ops = [];

  while (q < body.length && /\s/.test(body[q])) q++;
  if (body[q] === '[') {
    const e = matchDelim(body, q, '[', ']');
    if (e < 0) return null;
    opts = body.slice(q + 1, e);
    q = e + 1;
  }

  let guard = 0;
  while (q < body.length && guard++ < 3000) {
    const c = body[q];
    if (/\s/.test(c)) { q++; continue; }
    if (c === ';') { q++; break; }

    // Routing operators: -|, |-, --
    if (body.startsWith('-|', q)) {
      ops.push('-|');
      q += 2;
      continue;
    }
    if (body.startsWith('|-', q)) {
      ops.push('|-');
      q += 2;
      continue;
    }
    if (body.startsWith('--', q)) {
      ops.push('--');
      q += 2;
      continue;
    }

    if (c === '(') {
      const e = matchDelim(body, q, '(', ')');
      if (e < 0) return null;
      const ptStr = body.slice(q + 1, e).trim();
      if (ptStr.includes(',')) {
        const parts = ptStr.split(',');
        points.push({ type: 'xy', x: parseFloat(parts[0]), y: parseFloat(parts[1]) });
      } else {
        const m = /^([A-Za-z0-9_@-]+)(?:\.([a-z ]+))?$/.exec(ptStr);
        if (m) points.push({ type: 'node', id: m[1], anchor: (m[2] || '').trim() });
      }
      q = e + 1;
      continue;
    }

    if (body.startsWith('node', q)) {
      let k = q + 4, lo = '';
      while (k < body.length && /\s/.test(body[k])) k++;
      if (body[k] === '[') {
        const e = matchDelim(body, k, '[', ']');
        lo = body.slice(k + 1, e);
        k = e + 1;
      }
      while (k < body.length && /\s/.test(body[k])) k++;
      if (body[k] === '{') {
        const e = matchDelim(body, k, '{', '}');
        labels.push({ text: body.slice(k + 1, e), opts: lo, at: points.length });
        k = e + 1;
      }
      q = k;
      continue;
    }
    q++;
  }

  const arrow = /arrow|->|-{|Stealth|Latex/.test(opts);
  const dashed = /dashed|dotted/.test(opts);
  const thick = /thick|line width/.test(opts);

  const edge = points.length >= 2 ? {
    opts: { arrow, dashed, thick, raw: opts },
    points,
    labels,
    nodes: labels, // alias for consistency
    ops: ops.length >= points.length - 1 ? ops : Array(points.length - 1).fill('--'),
    stmtStart: base + p,
    stmtEnd: base + q
  } : null;

  return { edge, end: q };
}

/**
 * Robustly updates node coordinates and texts in LaTeX source without offset corruption.
 */
function updateNodeCoord(src, id, x, y) {
  if (!src || !id) return src;
  const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(\\\\(?:node|coordinate)\\b\\s*(?:\\[[^\\]]*\\]\\s*)?\\(' + safeId + '\\)\\s*(?:\\[[^\\]]*\\]\\s*)?at\\s*\\()([^)]+)(\\))');
  return src.replace(re, (m, p1, oldC, p3) => p1 + x + ', ' + y + p3);
}

function updateNodeText(src, id, newText) {
  if (!src || !id) return src;
  const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(\\\\node\\s+[^{;]*?\\(' + safeId + '\\)[^{;]*?)(\\{)');
  const match = re.exec(src);
  if (!match) return src;
  const braceOpenIdx = match.index + match[1].length;
  const braceCloseIdx = matchDelim(src, braceOpenIdx, '{', '}');
  if (braceCloseIdx < 0) return src;
  return src.slice(0, braceOpenIdx + 1) + '\n  ' + newText.trim() + '\n' + src.slice(braceCloseIdx);
}

function applyHighlightColorbox(currentTex, targetText, colorName) {
  if (!currentTex || !targetText) return currentTex;
  const cleanTarget = targetText.trim();
  if (!cleanTarget) return currentTex;
  const escaped = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  if (colorName) {
    const colorTag = colorName === 'hlred' ? '\\color{darkred}' : '';

    // If target is already inside a colorbox, swap the color
    const existingCb = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{([^}]*${escaped}[^}]*)\\}`, 'g');
    if (existingCb.test(currentTex)) {
      return currentTex.replace(existingCb, (m, inner) => {
        const cleanInner = inner.replace(/\\strut\s*/g, '').replace(/\\color\{[^}]*\}\s*/g, '').trim();
        return `\\colorbox{${colorName}}{\\strut ${colorTag}${cleanInner}}`;
      });
    }

    // If target is inside \rl{...}
    const rlRegex = new RegExp(`\\\\rl\\{([^}]*${escaped}[^}]*)\\}`, 'g');
    if (rlRegex.test(currentTex)) {
      return currentTex.replace(rlRegex, (m, inner) => {
        return `\\colorbox{${colorName}}{\\strut ${colorTag}\\rl{${inner}}}`;
      });
    }

    // If target is inside \lr{...}
    const lrRegex = new RegExp(`\\\\lr\\{([^}]*${escaped}[^}]*)\\}`, 'g');
    if (lrRegex.test(currentTex)) {
      return currentTex.replace(lrRegex, (m, inner) => {
        return `\\colorbox{${colorName}}{\\strut ${colorTag}\\lr{${inner}}}`;
      });
    }

    // Default replace
    return currentTex.replace(cleanTarget, `\\colorbox{${colorName}}{\\strut ${colorTag}\\rl{${cleanTarget}}}`);
  } else {
    // Remove colorbox around cleanTarget
    const cbWithTarget = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{\\\\strut\\s*(?:\\\\color\\{[^}]*\\})?\\s*([^}]*${escaped}[^}]*)\\}`, 'g');
    if (cbWithTarget.test(currentTex)) {
      return currentTex.replace(cbWithTarget, '$1');
    }
    const cbGeneral = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{([^}]*${escaped}[^}]*)\\}`, 'g');
    return currentTex.replace(cbGeneral, '$1');
  }
}

function wrapWordsInTokens(html) {
  if (!html) return '';
  return html.replace(/(<[^>]+>)|([^<>\s\n\r]+)/g, (match, tag, word) => {
    if (tag) return tag;
    return `<span class="tk-word" data-word="${escHtml(word)}">${word}</span>`;
  });
}

function generate(src, nodes, edges) {
  let res = src || '';
  if (!nodes || !nodes.length) return res;
  for (const n of nodes) {
    if (n && n.id && n.x !== undefined && n.y !== undefined) {
      const xVal = typeof n.x === 'number' ? Math.round(n.x * 100) / 100 : n.x;
      const yVal = typeof n.y === 'number' ? Math.round(n.y * 100) / 100 : n.y;
      res = updateNodeCoord(res, n.id, xVal, yVal);
    }
  }
  return res;
}

window.TikzEngine = {
  SCALE,
  texToHtml,
  parse: parseTikz,
  parseTikz,
  updateNodeCoord,
  updateNodeText,
  generate,
  toUnits,
  applyHighlightColorbox,
  wrapWordsInTokens,
};

