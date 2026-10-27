/**
 * TikZ Flow Studio 2.0 — Interactive Application Controller
 * Handles visual flowchart canvas, custom combobox, dynamic & editable hierarchy drawer,
 * zero-jump magnetic splitters, touch gestures, high-res PNG export, and server bridge.
 */

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const State = {
  src: '',
  nodes: [],
  edges: [],
  styles: {},
  zoom: 1,
  panX: 0,
  panY: 0,
  selNodeId: null,
  selEdgeIdx: null,
  history: [],
  historyIdx: -1,
  activeDoc: 'cgcg',
  isDraggingCanvas: false,
  dragStartX: 0,
  dragStartY: 0,
  dragNode: null,
  dragNodeStartPos: null,
  dragThresholdExceeded: false,
  hasCanvasPanned: false,
  categories: [],
  isAdmin: false,
  canvasMode: 'select',
  activeHighlightTool: null, // 'hlyellow', 'hlred', 'hlgray', 'clear'
  hasUserTransformed: false,
};

const DOCS_CATALOG = [
  {
    id: 'cgcg',
    title: 'گرانولوم سلول غول‌آسا (CGCG)',
    desc: 'تریاژ اندوکرین، طبقه‌بندی بیولوژیک، مداخلات درمانی و زمان‌بندی فالوآپ',
    badge: 'Clinical Flowchart',
  },
  {
    id: 'odontogenic_tumors',
    title: 'تومورهای ادنتوژنیک فکین',
    desc: 'تریاژ رادیوگرافیک، استراتژی بیوپسی، پروتکل‌های رزکسیون',
    badge: 'WHO Clinical',
  },
  {
    id: 'oral_leukoplakia',
    title: 'لوکوپلاکی دهان (Oral Leukoplakia)',
    desc: 'طبقه‌بندی بالینی، درجه‌بندی دیسپلازی، مدیریت و پیگیری',
    badge: 'Pre-malignant',
  },
  {
    id: 'document',
    title: 'سند اصلی لاتک (document.tex)',
    desc: 'سند فعال پیش‌فرض سیستم',
    badge: 'Active File',
  }
];

// ==========================================================================
// 1. Custom Tactile Combobox
// ==========================================================================
function initCustomCombobox() {
  const trigger = $('#docComboboxTrigger');
  const popover = $('#docComboboxPopover');
  const searchInput = $('#comboboxSearch');
  const listContainer = $('#comboboxList');

  function renderList(filter = '') {
    listContainer.innerHTML = '';
    const q = filter.trim().toLowerCase();
    const filtered = DOCS_CATALOG.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.desc.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="padding:12px; text-align:center; color:#94a3b8; font-size:11px;">موردی یافت نشد</div>';
      return;
    }

    filtered.forEach(doc => {
      const item = document.createElement('div');
      item.className = 'combobox-item' + (doc.id === State.activeDoc ? ' selected' : '');
      item.dataset.id = doc.id;
      item.innerHTML = `
        <div class="cb-item-text">
          <span class="cb-item-title">${doc.title}</span>
          <span class="cb-item-desc">${doc.desc}</span>
        </div>
        <span class="cb-item-badge">${doc.badge}</span>
      `;
      item.addEventListener('click', () => {
        selectDocument(doc.id);
        closeCombobox();
      });
      listContainer.appendChild(item);
    });
  }

  function openCombobox() {
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    popover.classList.add('show');
    searchInput.value = '';
    renderList();
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeCombobox() {
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    popover.classList.remove('show');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (popover.classList.contains('show')) closeCombobox();
    else openCombobox();
  });

  searchInput.addEventListener('input', (e) => {
    renderList(e.target.value);
  });

  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !trigger.contains(e.target)) {
      closeCombobox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover.classList.contains('show')) {
      closeCombobox();
    }
  });

  renderList();
}

function selectDocument(docId) {
  const doc = DOCS_CATALOG.find(d => d.id === docId);
  if (doc) {
    $('#docComboboxLabel').textContent = doc.title;
  }
  loadDocument(docId);
}

// ==========================================================================
// 2. Full-Page Clinical Taxonomy Studio & Hierarchy Engine
// ==========================================================================
const HierarchyHistory = {
  stack: [],
  index: -1,
  maxSize: 40,
};

function pushHierarchyHistory(actionName) {
  const snapshot = JSON.stringify(State.categories);
  if (HierarchyHistory.index < HierarchyHistory.stack.length - 1) {
    HierarchyHistory.stack = HierarchyHistory.stack.slice(0, HierarchyHistory.index + 1);
  }
  HierarchyHistory.stack.push({
    action: actionName || 'تغییر در ساختار',
    data: snapshot,
    time: Date.now()
  });
  if (HierarchyHistory.stack.length > HierarchyHistory.maxSize) {
    HierarchyHistory.stack.shift();
  }
  HierarchyHistory.index = HierarchyHistory.stack.length - 1;
  updateHierarchyUndoRedoButtons();
}

function undoHierarchy() {
  if (HierarchyHistory.index > 0) {
    HierarchyHistory.index--;
    const st = HierarchyHistory.stack[HierarchyHistory.index];
    State.categories = JSON.parse(st.data);
    renderHierarchy();
    debouncedAutoSaveHierarchy();
    updateHierarchyUndoRedoButtons();
    setStatus('ok', `بازگشت: ${st.action} ↶`);
  }
}

function redoHierarchy() {
  if (HierarchyHistory.index < HierarchyHistory.stack.length - 1) {
    HierarchyHistory.index++;
    const st = HierarchyHistory.stack[HierarchyHistory.index];
    State.categories = JSON.parse(st.data);
    renderHierarchy();
    debouncedAutoSaveHierarchy();
    updateHierarchyUndoRedoButtons();
    setStatus('ok', `انجام مجدد: ${st.action} ↷`);
  }
}

function updateHierarchyUndoRedoButtons() {
  const btnUndo = $('#btnHierarchyUndo');
  const btnRedo = $('#btnHierarchyRedo');
  if (btnUndo) btnUndo.disabled = HierarchyHistory.index <= 0;
  if (btnRedo) btnRedo.disabled = HierarchyHistory.index >= HierarchyHistory.stack.length - 1;
}

async function loadHierarchy() {
  const params = new URLSearchParams(window.location.search);
  State.isAdmin = params.has('admin') || params.has('secret') || window.location.hash.includes('admin');

  try {
    const res = await fetch('/api/hierarchy');
    const data = await res.json();
    if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
      State.categories = data.categories;
      pushHierarchyHistory('بارگذاری اولیه درخت');
      renderHierarchy();
      return;
    }
  } catch (e) {
    console.warn('Hierarchy fetch fallback:', e);
  }

  // Fallback Hierarchy
  State.categories = [
    {
      id: 'odontogenic_tumors',
      title: 'تومورهای ادنتوژنیک فکین (WHO)',
      badge: '۳ شاخه بافت‌شناسی',
      items: [
        { id: 'amelo', title: 'آملوبلاستوما (Ameloblastoma)', desc: 'اپی‌تلیال تهاجمی موضعی، رزکسیون با مارجین ۱-۱.۵ cm', doc: 'odontogenic_tumors', node: 'h3' },
        { id: 'ceot', title: 'تومور پین‌بورگ (CEOT)', desc: 'حلقه‌های لایزگانگ و رسوب آمیلوئید، کورتاژ با مارجین یا رزکسیون محدود', doc: 'odontogenic_tumors', node: 'r_mixed' },
        { id: 'aot', title: 'تومور آدنوماتوئید (AOT)', desc: 'ساختارهای شبه‌داکت در قدام ماگزیلا، انوکلئاسیون محافظه‌کارانه', doc: 'odontogenic_tumors', node: 'h1' },
        { id: 'odonto', title: 'ادنتوما (کمپلکس و کامپوند)', desc: 'هامارتومای ادنتوژنیک، انوکلئاسیون بدون عود', doc: 'odontogenic_tumors', node: 'n1' },
        { id: 'myxoma', title: 'میکسـومای ادنتوژنیک (Myxoma)', desc: 'مزانشیمی ژلاتینی، نمای حباب صابون، رزکسیون وسیع ۱۰ میلی‌متر', doc: 'odontogenic_tumors', node: 'h4' },
      ]
    },
    {
      id: 'oral_leukoplakia',
      title: 'ضایعات پیش‌سرطانی و لوکوپلاکی دهان',
      badge: 'تریاژ و دیسپلازی',
      items: [
        { id: 'homo', title: 'لوکوپلاکی هموژن (Homogeneous)', desc: 'پلاک‌های سفید یکنواخت و سطحی، ریسک بدخیمی پایین‌تر', doc: 'oral_leukoplakia', node: 'homo' },
        { id: 'nonhomo', title: 'لوکوپلاکی غیرهموژن (اریترولوکوپلاکی)', desc: 'پلاک‌های قرمز و نودولار، ریسک تبدیل بدخیمی بالا', doc: 'oral_leukoplakia', node: 'nonhomo' },
        { id: 'dysp', title: 'درجه‌بندی دیسپلازی (Dysplasia Grading)', desc: 'بدون دیسپلازی، خفیف، متوسط، شدید تا CIS', doc: 'oral_leukoplakia', node: 'dysp' },
        { id: 'mgmt', title: 'پروتکل مدیریت بالینی و بیوپسی', desc: 'حذف عوامل محرک، فالوآپ ۲-۴ هفته، بیوپسی و پیگیری', doc: 'oral_leukoplakia', node: 'mgmt' },
      ]
    },
    {
      id: 'cgcg',
      title: 'گرانولوم سلول غول‌آسا (CGCG)',
      badge: 'طرح درمان',
      items: [
        { id: 'nonagg', title: 'فرم غیرتهاجمی (Non-aggressive)', desc: 'رشد تدریجی، بدون درد یا تحلیل ریشه، کورتاژ محافظه‌کارانه', doc: 'cgcg', node: 'nonagg' },
        { id: 'agg', title: 'فرم تهاجمی (Aggressive)', desc: 'درد، رشد سریع، لقی دندان، تحلیل ریشه و پرفوراسیون کورتکس', doc: 'cgcg', node: 'agg' },
        { id: 'med', title: 'درمان‌های دارویی سیستمیک و موضعی', desc: 'تزریق داخل ضایعه تریامسینولون، کلسی‌تونین، دنوزوماب', doc: 'cgcg', node: 'med' },
        { id: 'surg', title: 'درمان‌های جراحی و رزکسیون', desc: 'کورتاژ با استئکتومی محیطی کمکی یا رزکسیون فک', doc: 'cgcg', node: 'surg' },
      ]
    }
  ];

  pushHierarchyHistory('بارگذاری ساختار پیش‌فرض');
  renderHierarchy();
}

function normalizeHierarchyNode(node) {
  if (!node.id) node.id = 'h_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  if (!node.title) node.title = 'شاخه جدید';
  if (!node.desc) node.desc = '';
  if (node.items && !node.children) {
    node.children = node.items;
  }
  if (!Array.isArray(node.children)) {
    node.children = [];
  }
  node.children.forEach(c => normalizeHierarchyNode(c));
  return node;
}

function findNodeAndParentInTree(treeArray, id, parent = null) {
  for (let i = 0; i < treeArray.length; i++) {
    const item = treeArray[i];
    if (item.id === id) {
      return { node: item, index: i, parentArray: treeArray, parentNode: parent };
    }
    if (item.children && item.children.length) {
      const res = findNodeAndParentInTree(item.children, id, item);
      if (res) return res;
    }
  }
  return null;
}

function isDescendant(parent, possibleChild) {
  if (!parent.children || !parent.children.length) return false;
  for (const c of parent.children) {
    if (c === possibleChild || isDescendant(c, possibleChild)) return true;
  }
  return false;
}

// Single-Tap Instant Movement Engine (Difficulty 100 to 0)
function moveHierarchyNode(id, direction) {
  const info = findNodeAndParentInTree(State.categories, id);
  if (!info) return;

  const { node, index, parentArray, parentNode } = info;

  if (direction === 'up') {
    if (index === 0) {
      setStatus('warn', 'این شاخه در بالاترین موقعیت سطح خود قرار دارد.');
      return;
    }
    pushHierarchyHistory(`انتقال به بالای «${node.title}»`);
    parentArray.splice(index, 1);
    parentArray.splice(index - 1, 0, node);
  } else if (direction === 'down') {
    if (index === parentArray.length - 1) {
      setStatus('warn', 'این شاخه در پایین‌ترین موقعیت سطح خود قرار دارد.');
      return;
    }
    pushHierarchyHistory(`انتقال به پایین «${node.title}»`);
    parentArray.splice(index, 1);
    parentArray.splice(index + 1, 0, node);
  } else if (direction === 'indent') {
    if (index === 0) {
      setStatus('warn', 'برای تبدیل به زیرشاخه، باید شاخه‌ای قبل از آن در همین سطح باشد.');
      return;
    }
    const siblingBefore = parentArray[index - 1];
    pushHierarchyHistory(`تبدیل «${node.title}» به زیرشاخه «${siblingBefore.title}»`);
    parentArray.splice(index, 1);
    if (!Array.isArray(siblingBefore.children)) siblingBefore.children = [];
    siblingBefore.children.push(node);
  } else if (direction === 'outdent') {
    if (!parentNode) {
      setStatus('warn', 'این شاخه در بالاترین سطح اصلی قرار دارد و امکان ارتقای بیشتر ندارد.');
      return;
    }
    const grandParentInfo = findNodeAndParentInTree(State.categories, parentNode.id);
    if (!grandParentInfo) return;
    pushHierarchyHistory(`ارتقای «${node.title}» به سطح بالاتر`);
    parentArray.splice(index, 1);
    grandParentInfo.parentArray.splice(grandParentInfo.index + 1, 0, node);
  }

  renderHierarchy();
  debouncedAutoSaveHierarchy();
  setStatus('ok', `تغییر چینش شاخه «${node.title}» اعمال شد ✓`);
}

// Global Drag State
let hDragNode = null;
let hDragPath = null;
let hDragSourceArray = null;
let touchDragData = null;

function renderHierarchy() {
  const treeContainer = $('#hierarchyTree');
  if (!treeContainer) return;
  treeContainer.innerHTML = '';

  if (!Array.isArray(State.categories)) {
    State.categories = [];
  }

  // Ensure normalized structure
  State.categories.forEach(cat => normalizeHierarchyNode(cat));

  // Update Stats Chips
  const statsChips = $('#hierarchyStatsChips');
  if (statsChips) {
    let totalCategories = State.categories.length;
    let totalProtocols = 0;
    let totalLinked = 0;

    function countNodes(nodes) {
      nodes.forEach(n => {
        totalProtocols++;
        if (n.doc || n.node) totalLinked++;
        if (n.children && n.children.length) countNodes(n.children);
      });
    }
    State.categories.forEach(c => {
      if (c.children && c.children.length) countNodes(c.children);
    });

    statsChips.innerHTML = `
      <span class="h-stat-pill">🌳 ${totalCategories} شاخه اصلی</span>
      <span class="h-stat-pill">📋 ${totalProtocols} زیرمجموعه بالینی</span>
      <span class="h-stat-pill">🔗 ${totalLinked} متصل به بوم</span>
    `;
  }

  if (State.categories.length === 0) {
    const emptyEl = document.createElement('div');
    emptyEl.style.padding = '40px 16px';
    emptyEl.style.textAlign = 'center';
    emptyEl.style.color = '#94a3b8';
    emptyEl.style.fontSize = '13px';
    emptyEl.innerHTML = `
      <p style="margin-bottom:14px; font-weight:700;">درخت طبقه‌بندی بالینی در حال حاضر خالی است.</p>
      <button class="btn-hierarchy-action btn-add-cat" onclick="App.addRootCategory()">+ ایجاد اولین شاخه بالینی</button>
    `;
    treeContainer.appendChild(emptyEl);
    return;
  }

  State.categories.forEach((rootNode, idx) => {
    const el = buildHierarchyElement(rootNode, [idx], State.categories, 1);
    treeContainer.appendChild(el);
  });
}

function buildHierarchyElement(node, path, parentArray, level = 1) {
  const nodeEl = document.createElement('div');
  nodeEl.className = `h-node level-${Math.min(level, 4)}`;
  nodeEl.dataset.path = JSON.stringify(path);
  nodeEl.dataset.id = node.id;

  const hasChildren = node.children && node.children.length > 0;

  // Header row
  const row = document.createElement('div');
  row.className = 'h-node-row';

  // 1. Touch & Mouse Drag Handle
  const handle = document.createElement('div');
  handle.className = 'h-drag-handle';
  handle.title = 'برای جابجایی دستگیره را با لمس یا ماوس بکشید';
  handle.innerHTML = '⋮⋮';
  handle.draggable = true;

  // 2. Single-Tap Instant Movement Tools (Difficulty 100 to 0)
  const orderTools = document.createElement('div');
  orderTools.className = 'h-order-tools';

  const btnUp = document.createElement('button');
  btnUp.className = 'h-btn-order';
  btnUp.type = 'button';
  btnUp.innerHTML = '⬆';
  btnUp.title = 'انتقال یک پله به بالا در همین سطح';
  btnUp.addEventListener('click', (e) => {
    e.stopPropagation();
    moveHierarchyNode(node.id, 'up');
  });

  const btnDown = document.createElement('button');
  btnDown.className = 'h-btn-order';
  btnDown.type = 'button';
  btnDown.innerHTML = '⬇';
  btnDown.title = 'انتقال یک پله به پایین در همین سطح';
  btnDown.addEventListener('click', (e) => {
    e.stopPropagation();
    moveHierarchyNode(node.id, 'down');
  });

  const btnIndent = document.createElement('button');
  btnIndent.className = 'h-btn-order';
  btnIndent.type = 'button';
  btnIndent.innerHTML = '⮞';
  btnIndent.title = 'تبدیل به زیرشاخه مورد قبلی (یک سطح عمیق‌تر)';
  btnIndent.addEventListener('click', (e) => {
    e.stopPropagation();
    moveHierarchyNode(node.id, 'indent');
  });

  const btnOutdent = document.createElement('button');
  btnOutdent.className = 'h-btn-order';
  btnOutdent.type = 'button';
  btnOutdent.innerHTML = '⮜';
  btnOutdent.title = 'ارتقا به یک سطح بالاتر (شاخه والد)';
  btnOutdent.addEventListener('click', (e) => {
    e.stopPropagation();
    moveHierarchyNode(node.id, 'outdent');
  });

  orderTools.appendChild(btnUp);
  orderTools.appendChild(btnDown);
  orderTools.appendChild(btnIndent);
  orderTools.appendChild(btnOutdent);

  // 3. Expand / collapse chevron
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'h-toggle-btn' + (!hasChildren ? ' is-leaf' : '');
  toggleBtn.type = 'button';
  toggleBtn.innerHTML = '▾';
  toggleBtn.title = 'باز / بسته کردن زیرشاخه‌ها';
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nodeEl.classList.toggle('collapsed');
  });

  // 4. Content Area
  const content = document.createElement('div');
  content.className = 'h-node-content';

  const topLine = document.createElement('div');
  topLine.className = 'h-node-topline';

  const levelTag = document.createElement('span');
  levelTag.className = 'h-level-tag';
  levelTag.textContent = level === 1 ? 'سطح ۱ (اصلی)' : `سطح ${level}`;
  topLine.appendChild(levelTag);

  const titleEl = document.createElement('div');
  titleEl.className = 'h-editable-title';
  titleEl.contentEditable = 'true';
  titleEl.spellcheck = false;
  titleEl.textContent = node.title || '';
  titleEl.title = 'برای ویرایش مستقیم نام کلیک فرمایید';

  titleEl.addEventListener('click', (e) => e.stopPropagation());
  titleEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      titleEl.blur();
    }
  });
  titleEl.addEventListener('blur', () => {
    const val = titleEl.textContent.trim();
    if (val !== node.title) {
      pushHierarchyHistory(`ویرایش عنوان «${val || 'شاخه'}»`);
      node.title = val || 'بدون عنوان';
      debouncedAutoSaveHierarchy();
    }
  });
  topLine.appendChild(titleEl);

  // Badge
  const badgeEl = document.createElement('span');
  badgeEl.className = 'h-node-badge';
  badgeEl.textContent = node.badge || '+ برچسب';
  badgeEl.title = 'برای ویرایش برچسب یا تگ بالینی کلیک کنید';
  badgeEl.addEventListener('click', (e) => {
    e.stopPropagation();
    editHierarchyBadge(node.id);
  });
  topLine.appendChild(badgeEl);

  content.appendChild(topLine);

  // Editable Description
  const descEl = document.createElement('div');
  descEl.className = 'h-editable-desc';
  descEl.contentEditable = 'true';
  descEl.spellcheck = false;
  descEl.textContent = node.desc || '';
  descEl.title = 'برای ویرایش توضیحات یا پروتکل درمانی کلیک فرمایید';

  descEl.addEventListener('click', (e) => e.stopPropagation());
  descEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      descEl.blur();
    }
  });
  descEl.addEventListener('blur', () => {
    const val = descEl.textContent.trim();
    if (val !== node.desc) {
      pushHierarchyHistory(`ویرایش توضیحات «${node.title}»`);
      node.desc = val;
      debouncedAutoSaveHierarchy();
    }
  });
  content.appendChild(descEl);

  // Meta Row (Flowchart link pill)
  const metaRow = document.createElement('div');
  metaRow.className = 'h-node-meta-row';

  if (node.doc || node.node) {
    const linkPill = document.createElement('span');
    linkPill.className = 'h-node-link-pill';
    linkPill.innerHTML = `🔗 متصل به فلوچارت: <b>${node.node || node.doc}</b>`;
    linkPill.title = 'کلیک برای رفتن مستقیم به این گره در بوم و بزرگنمایی آن';
    linkPill.addEventListener('click', (e) => {
      e.stopPropagation();
      focusDocOrNode(node.doc || State.activeDoc, node.node || node.id);
    });
    metaRow.appendChild(linkPill);
  }
  content.appendChild(metaRow);

  // 5. Actions Toolbar (+ زیرشاخه, 🔗 اتصال, 🗑 حذف)
  const actions = document.createElement('div');
  actions.className = 'h-actions';

  const addSubBtn = document.createElement('button');
  addSubBtn.className = 'h-action-btn btn-add';
  addSubBtn.type = 'button';
  addSubBtn.title = 'افزودن زیرشاخه جدید به این مورد';
  addSubBtn.innerHTML = '+ زیرشاخه';
  addSubBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addChildNode(node.id);
  });

  const linkBtn = document.createElement('button');
  linkBtn.className = 'h-action-btn btn-link';
  linkBtn.type = 'button';
  linkBtn.title = 'اتصال این شاخه به گره در فلوچارت فعال';
  linkBtn.innerHTML = '🔗';
  linkBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    promptLinkNode(node.id);
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'h-action-btn btn-del';
  delBtn.type = 'button';
  delBtn.title = 'حذف این شاخه';
  delBtn.innerHTML = '🗑';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteHierarchyNode(node.id);
  });

  actions.appendChild(addSubBtn);
  actions.appendChild(linkBtn);
  actions.appendChild(delBtn);

  row.appendChild(handle);
  row.appendChild(orderTools);
  row.appendChild(toggleBtn);
  row.appendChild(content);
  row.appendChild(actions);

  // Click on row to link to canvas node
  row.addEventListener('click', (e) => {
    if (e.target === titleEl || e.target === descEl || e.target.closest('.h-actions') || e.target.closest('.h-order-tools') || e.target === toggleBtn || e.target === handle || e.target === badgeEl) return;
    if (node.doc || node.node) {
      focusDocOrNode(node.doc || State.activeDoc, node.node || node.id);
    }
  });

  nodeEl.appendChild(row);

  // 6. Children Container
  const childrenContainer = document.createElement('div');
  childrenContainer.className = 'h-children';

  if (hasChildren) {
    node.children.forEach((child, childIdx) => {
      const childEl = buildHierarchyElement(child, [...path, childIdx], node.children, level + 1);
      childrenContainer.appendChild(childEl);
    });
  }
  nodeEl.appendChild(childrenContainer);

  // Setup Touch and Desktop Drag & Drop
  setupDragEventsForNode(handle, node, path, parentArray, nodeEl);

  return nodeEl;
}

// =========================================================================
// Native Touch & Pointer Drag and Drop Engine
// =========================================================================
function setupDragEventsForNode(handle, node, path, parentArray, nodeEl) {
  // 1. Touch Dragging for Mobile
  handle.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];

    const ghost = nodeEl.cloneNode(true);
    ghost.className = 'h-drag-ghost';
    ghost.style.width = Math.min(nodeEl.offsetWidth || 320, window.innerWidth - 30) + 'px';
    document.body.appendChild(ghost);

    touchDragData = {
      node,
      path,
      parentArray,
      nodeEl,
      ghost,
      currentOverEl: null,
      currentPosition: null,
    };

    nodeEl.classList.add('is-dragging');
    updateGhostPos(touch.clientX, touch.clientY);
  }, { passive: true });

  // 2. HTML5 Desktop Dragging
  handle.addEventListener('dragstart', (e) => {
    e.stopPropagation();
    hDragNode = node;
    hDragPath = path;
    hDragSourceArray = parentArray;
    nodeEl.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', node.id);
  });

  handle.addEventListener('dragend', () => {
    nodeEl.classList.remove('is-dragging');
    $$('.h-node').forEach(el => {
      el.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
    });
    hDragNode = null;
    hDragPath = null;
    hDragSourceArray = null;
  });

  // Target drop zones for desktop
  nodeEl.addEventListener('dragover', (e) => {
    if (!hDragNode || hDragNode === node || isDescendant(hDragNode, node)) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = nodeEl.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const h = rect.height;

    nodeEl.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
    if (relY < h * 0.28) {
      nodeEl.classList.add('drag-over-top');
    } else if (relY > h * 0.72) {
      nodeEl.classList.add('drag-over-bottom');
    } else {
      nodeEl.classList.add('drag-over-inside');
    }
  });

  nodeEl.addEventListener('dragleave', (e) => {
    if (!nodeEl.contains(e.relatedTarget)) {
      nodeEl.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
    }
  });

  nodeEl.addEventListener('drop', (e) => {
    if (!hDragNode || hDragNode === node || isDescendant(hDragNode, node)) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = nodeEl.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const h = rect.height;

    pushHierarchyHistory(`جابجایی شاخه «${hDragNode.title}»`);

    // Remove from old source
    const oldIdx = hDragSourceArray.indexOf(hDragNode);
    if (oldIdx !== -1) hDragSourceArray.splice(oldIdx, 1);

    // Insert into target
    const targetIdx = parentArray.indexOf(node);
    if (relY < h * 0.28) {
      parentArray.splice(Math.max(0, targetIdx), 0, hDragNode);
    } else if (relY > h * 0.72) {
      parentArray.splice(targetIdx + 1, 0, hDragNode);
    } else {
      if (!Array.isArray(node.children)) node.children = [];
      node.children.push(hDragNode);
    }

    nodeEl.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
    renderHierarchy();
    debouncedAutoSaveHierarchy();
    setStatus('ok', `شاخه «${hDragNode.title}» جابجا شد ✓`);
  });
}

function updateGhostPos(clientX, clientY) {
  if (!touchDragData || !touchDragData.ghost) return;
  touchDragData.ghost.style.left = clientX + 'px';
  touchDragData.ghost.style.top = clientY + 'px';
}

// Global Touch Handlers for Mobile Drag & Drop
document.addEventListener('touchmove', (e) => {
  if (!touchDragData) return;
  const touch = e.touches[0];
  updateGhostPos(touch.clientX, touch.clientY);

  touchDragData.ghost.style.display = 'none';
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  touchDragData.ghost.style.display = '';

  const targetNodeEl = elem ? elem.closest('.h-node') : null;
  $$('.h-node').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside'));

  if (targetNodeEl && targetNodeEl !== touchDragData.nodeEl && !touchDragData.nodeEl.contains(targetNodeEl)) {
    const targetId = targetNodeEl.dataset.id;
    const targetInfo = findNodeAndParentInTree(State.categories, targetId);
    if (targetInfo && !isDescendant(touchDragData.node, targetInfo.node)) {
      const rect = targetNodeEl.getBoundingClientRect();
      const relY = touch.clientY - rect.top;
      const h = rect.height;

      if (relY < h * 0.28) {
        targetNodeEl.classList.add('drag-over-top');
        touchDragData.currentOverEl = targetNodeEl;
        touchDragData.currentPosition = 'top';
      } else if (relY > h * 0.72) {
        targetNodeEl.classList.add('drag-over-bottom');
        touchDragData.currentOverEl = targetNodeEl;
        touchDragData.currentPosition = 'bottom';
      } else {
        targetNodeEl.classList.add('drag-over-inside');
        touchDragData.currentOverEl = targetNodeEl;
        touchDragData.currentPosition = 'inside';
      }
      return;
    }
  }
  touchDragData.currentOverEl = null;
  touchDragData.currentPosition = null;
}, { passive: false });

document.addEventListener('touchend', () => {
  if (!touchDragData) return;
  const { node, parentArray, nodeEl, ghost, currentOverEl, currentPosition } = touchDragData;
  if (ghost) ghost.remove();
  nodeEl.classList.remove('is-dragging');
  $$('.h-node').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside'));

  if (currentOverEl && currentPosition) {
    const targetId = currentOverEl.dataset.id;
    const targetInfo = findNodeAndParentInTree(State.categories, targetId);

    if (targetInfo && !isDescendant(node, targetInfo.node) && node !== targetInfo.node) {
      pushHierarchyHistory(`جابجایی لمسی شاخه «${node.title}»`);

      // 1. Remove from old parent
      const oldIdx = parentArray.indexOf(node);
      if (oldIdx !== -1) parentArray.splice(oldIdx, 1);

      // 2. Insert into target
      if (currentPosition === 'top') {
        const targetIdx = targetInfo.parentArray.indexOf(targetInfo.node);
        targetInfo.parentArray.splice(Math.max(0, targetIdx), 0, node);
      } else if (currentPosition === 'bottom') {
        const targetIdx = targetInfo.parentArray.indexOf(targetInfo.node);
        targetInfo.parentArray.splice(targetIdx + 1, 0, node);
      } else if (currentPosition === 'inside') {
        if (!Array.isArray(targetInfo.node.children)) targetInfo.node.children = [];
        targetInfo.node.children.push(node);
      }

      renderHierarchy();
      debouncedAutoSaveHierarchy();
      setStatus('ok', `شاخه «${node.title}» با لمس جابجا شد ✓`);
    }
  }
  touchDragData = null;
});

// =========================================================================
// Hierarchy Power Actions & Management
// =========================================================================
function addRootCategory() {
  const newCat = {
    id: 'cat_' + Date.now(),
    title: 'شاخه اصلی جدید',
    desc: 'توضیحات و پروتکل تشخیصی',
    children: []
  };
  pushHierarchyHistory('افزودن شاخه اصلی جدید');
  State.categories.push(newCat);
  renderHierarchy();
  debouncedAutoSaveHierarchy();
  setStatus('ok', 'شاخه اصلی جدید اضافه شد ✓');

  setTimeout(() => {
    const el = document.querySelector(`[data-id="${newCat.id}"] .h-editable-title`);
    if (el) {
      el.focus();
      const sel = window.getSelection();
      if (sel) sel.selectAllChildren(el);
    }
  }, 60);
}

function addChildNode(parentId) {
  const info = findNodeAndParentInTree(State.categories, parentId);
  if (!info) return;
  const parentNode = info.node;
  if (!Array.isArray(parentNode.children)) parentNode.children = [];

  const newChild = {
    id: 'sub_' + Date.now(),
    title: 'زیرشاخه جدید',
    desc: 'پروتکل بالینی / درمان',
    children: []
  };
  pushHierarchyHistory(`افزودن زیرشاخه به «${parentNode.title}»`);
  parentNode.children.push(newChild);

  const parentEl = document.querySelector(`[data-id="${parentId}"]`);
  if (parentEl) parentEl.classList.remove('collapsed');

  renderHierarchy();
  debouncedAutoSaveHierarchy();
  setStatus('ok', `زیرشاخه جدید اضافه شد ✓`);

  setTimeout(() => {
    const el = document.querySelector(`[data-id="${newChild.id}"] .h-editable-title`);
    if (el) {
      el.focus();
      const sel = window.getSelection();
      if (sel) sel.selectAllChildren(el);
    }
  }, 60);
}

function deleteHierarchyNode(id) {
  const info = findNodeAndParentInTree(State.categories, id);
  if (!info) return;
  if (confirm(`آیا از حذف شاخه «${info.node.title}» اطمینان دارید؟`)) {
    pushHierarchyHistory(`حذف شاخه «${info.node.title}»`);
    info.parentArray.splice(info.index, 1);
    renderHierarchy();
    debouncedAutoSaveHierarchy();
    setStatus('ok', `شاخه حذف شد ✓ (با آندو قابل بازگشت است)`);
  }
}

function editHierarchyBadge(id) {
  const info = findNodeAndParentInTree(State.categories, id);
  if (!info) return;
  const current = info.node.badge || '';
  const newBadge = prompt('عنوان برچسب بالینی را وارد فرمایید (مثال: WHO، جراحی، بیوپسی، High Risk):', current);
  if (newBadge !== null) {
    pushHierarchyHistory(`تغییر برچسب «${info.node.title}»`);
    info.node.badge = newBadge.trim();
    renderHierarchy();
    debouncedAutoSaveHierarchy();
  }
}

function promptLinkNode(id) {
  const info = findNodeAndParentInTree(State.categories, id);
  if (!info) return;
  const current = info.node.node || '';
  const val = prompt('شناسه گره فلوچارت فعال برای اتصال (مثال: h1، h3، start یا خالی جهت حذف):', current || State.selNodeId || '');
  if (val !== null) {
    pushHierarchyHistory(`اتصال شاخه «${info.node.title}» به گره ${val}`);
    info.node.node = val.trim();
    info.node.doc = State.activeDoc;
    renderHierarchy();
    debouncedAutoSaveHierarchy();
    setStatus('ok', `اتصال به گره «${val}» ثبت شد ✓`);
  }
}

function expandAllHierarchy() {
  $$('.h-node').forEach(n => n.classList.remove('collapsed'));
  setStatus('ok', 'تمام شاخه‌ها گسترش یافتند ✓');
}

function collapseAllHierarchy() {
  $$('.h-node').forEach(n => {
    if (n.querySelector('.h-children')?.children?.length) {
      n.classList.add('collapsed');
    }
  });
  setStatus('ok', 'تمام زیرشاخه‌ها جمع شدند ✓');
}

function toggleHierarchySize() {
  const drawer = $('#hierarchyDrawer');
  if (!drawer) return;
  const isFull = drawer.classList.toggle('is-fullpage');
  const lbl = $('#lblSizeToggle');
  if (lbl) lbl.textContent = isFull ? 'پنل کناری' : 'تمام‌صفحه';
}

function clearHierarchySearch() {
  const inp = $('#hierarchySearchInput');
  if (inp) {
    inp.value = '';
    filterHierarchy('');
    const btnClear = $('#btnHierarchyClearSearch');
    if (btnClear) btnClear.style.display = 'none';
  }
}

function exportHierarchyJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(State.categories, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `clinical_hierarchy_${Date.now()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  setStatus('ok', 'خروجی ساختار به فرمت JSON دانلود شد ✓');
}

function importHierarchyJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (Array.isArray(parsed)) {
        pushHierarchyHistory('بارگذاری ساختار از فایل JSON');
        State.categories = parsed;
        renderHierarchy();
        debouncedAutoSaveHierarchy();
        setStatus('ok', 'ساختار طبقه‌بندی از فایل بارگذاری شد ✓');
      } else {
        setStatus('err', 'فرمت فایل معتبر نیست (باید آرایه JSON باشد)');
      }
    } catch (err) {
      setStatus('err', 'خطا در بارگذاری فایل: ' + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

let autoSaveTimer = null;
function debouncedAutoSaveHierarchy() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    adminSaveHierarchy(true);
  }, 800);
}

function toggleHierarchy() {
  window.location.href = '/taxonomy.html';
}

function filterHierarchy(query) {
  const q = query.trim().toLowerCase();
  const btnClear = $('#btnHierarchyClearSearch');
  if (btnClear) btnClear.style.display = q ? 'block' : 'none';

  $$('.h-node').forEach(nodeEl => {
    const title = (nodeEl.querySelector('.h-editable-title')?.textContent || '').toLowerCase();
    const desc = (nodeEl.querySelector('.h-editable-desc')?.textContent || '').toLowerCase();
    if (!q || title.includes(q) || desc.includes(q)) {
      nodeEl.style.display = '';
      if (q) nodeEl.classList.remove('collapsed');
    } else {
      nodeEl.style.display = 'none';
    }
  });
}

function focusDocOrNode(docId, nodePrefix) {
  toggleHierarchy(false);
  if (window.innerWidth <= 900) {
    showMobileTab('paneCanvas');
  }
  if (State.activeDoc !== docId) {
    selectDocument(docId);
    setTimeout(() => {
      highlightMatchingNode(nodePrefix);
    }, 450);
  } else {
    highlightMatchingNode(nodePrefix);
  }
}

function highlightMatchingNode(nodePrefix) {
  const target = State.nodes.find(n => 
    n.id.toLowerCase() === nodePrefix.toLowerCase() ||
    n.id.toLowerCase().includes(nodePrefix.toLowerCase()) || 
    n.text.toLowerCase().includes(nodePrefix.toLowerCase())
  );
  if (target) {
    selectNode(target.id);
    focusNodeInView(target);
  }
}

async function adminSaveHierarchy(silent = false) {
  if (!silent) setStatus('busy', 'در حال ذخیره ساختار درخت بالینی...');
  try {
    const res = await fetch('/api/hierarchy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories: State.categories })
    });
    const data = await res.json();
    if (data.success) {
      if (!silent) setStatus('ok', 'ساختار درخت بالینی با موفقیت ذخیره شد ✓');
    } else {
      setStatus('err', 'خطا در ذخیره ساختار درخت');
    }
  } catch (e) {
    setStatus('err', 'خطای ارتباط در ذخیره ساختار درخت');
  }
}

// ==========================================================================
// 3. Workspace Panes & Zero-Jump Magnetic Splitters
// ==========================================================================
function toggleMaximizePane(paneId) {
  const ws = $('#workspace');
  const pane = document.getElementById(paneId);
  if (!pane) return;

  if (pane.classList.contains('is-maximized')) {
    pane.classList.remove('is-maximized');
    ws.classList.remove('pane-maximized');
  } else {
    $$('.pane').forEach(p => p.classList.remove('is-maximized'));
    pane.classList.add('is-maximized');
    ws.classList.add('pane-maximized');
  }
}

function toggleMinimizePane(paneId) {
  const pane = document.getElementById(paneId);
  if (!pane) return;
  pane.classList.toggle('minimized');
}

function initSplitters() {
  const ws = $('#workspace');
  const splitters = $$('.splitter');
  let activeSplitter = null;
  let startX = 0;
  let prevPane = null;
  let nextPane = null;
  let prevWidth = 0;
  let nextWidth = 0;

  splitters.forEach(sp => {
    const onStart = (clientX) => {
      activeSplitter = sp;
      sp.classList.add('dragging');
      startX = clientX;
      prevPane = sp.previousElementSibling;
      nextPane = sp.nextElementSibling;
      prevWidth = prevPane.getBoundingClientRect().width;
      nextWidth = nextPane.getBoundingClientRect().width;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    };

    sp.addEventListener('mousedown', (e) => {
      onStart(e.clientX);
      e.preventDefault();
    });

    sp.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX);
      }
    }, { passive: true });

    sp.addEventListener('dblclick', () => {
      if (sp.previousElementSibling) {
        sp.previousElementSibling.classList.toggle('minimized');
      }
    });
  });

  const onMove = (clientX) => {
    if (!activeSplitter || !prevPane || !nextPane) return;
    const dx = clientX - startX;
    const totalPairWidth = prevWidth + nextWidth;
    // In RTL, dragging right (positive dx) shrinks prevPane (which is on the right) and grows nextPane (on the left)
    let newPrevWidth = prevWidth - dx;
    let newNextWidth = nextWidth + dx;

    // Enforce 110px minimum width on both panes
    if (newPrevWidth < 110) {
      newPrevWidth = 110;
      newNextWidth = totalPairWidth - 110;
    } else if (newNextWidth < 110) {
      newNextWidth = 110;
      newPrevWidth = totalPairWidth - 110;
    }

    prevPane.style.flex = `0 0 ${newPrevWidth}px`;
    nextPane.style.flex = `0 0 ${newNextWidth}px`;
  };

  const onEnd = () => {
    if (activeSplitter) {
      activeSplitter.classList.remove('dragging');
      activeSplitter = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  };

  document.addEventListener('mousemove', (e) => {
    if (activeSplitter) onMove(e.clientX);
  });
  document.addEventListener('touchmove', (e) => {
    if (activeSplitter && e.touches.length === 1) {
      onMove(e.touches[0].clientX);
    }
  }, { passive: true });

  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

// ==========================================================================
// 4. Interactive Canvas, Gestures & Node Rendering
// ==========================================================================
const world = $('#world');
const svgLayer = $('#svgLayer');
const viewport = $('#viewport');

function updateTelemetryHud(mouseX = null, mouseY = null) {
  if (!viewport) return;
  const rect = viewport.getBoundingClientRect();
  const hudPaneSize = $('#hudPaneSize');
  const hudMousePos = $('#hudMousePos');
  const hudWorldPos = $('#hudWorldPos');
  const hudChartBounds = $('#hudChartBounds');
  const hudPanZoom = $('#hudPanZoom');

  if (hudPaneSize) {
    hudPaneSize.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`;
  }
  if (hudPanZoom) {
    hudPanZoom.textContent = `pan:(${Math.round(State.panX)}, ${Math.round(State.panY)}) z:${Math.round(State.zoom * 100)}%`;
  }

  if (mouseX !== null && mouseY !== null) {
    const localX = Math.round(mouseX - rect.left);
    const localY = Math.round(mouseY - rect.top);
    const worldX = Math.round((localX - State.panX) / State.zoom);
    const worldY = Math.round((localY - State.panY) / State.zoom);
    if (hudMousePos) hudMousePos.textContent = `V:(${localX}, ${localY})`;
    if (hudWorldPos) hudWorldPos.textContent = `W:(${worldX}, ${worldY})`;
  }

  if (hudChartBounds && State.nodes.length) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    State.nodes.forEach(n => {
      const hw = (n.w || 160) / 2;
      const hh = (n.h || 60) / 2;
      minX = Math.min(minX, n.cx - hw);
      maxX = Math.max(maxX, n.cx + hw);
      minY = Math.min(minY, n.cy - hh);
      maxY = Math.max(maxY, n.cy + hh);
    });
    hudChartBounds.textContent = `[X:${Math.round(minX)}..${Math.round(maxX)} Y:${Math.round(minY)}..${Math.round(maxY)}]`;
  }
}

function updateTransform() {
  world.style.transform = `translate(${State.panX}px, ${State.panY}px) scale(${State.zoom})`;
  const zLbl = $('#zoomLbl');
  if (zLbl) zLbl.textContent = Math.round(State.zoom * 100) + '%';
  updateTelemetryHud();
  if (State.selNodeId) {
    positionUnifiedToolbar(nodeById(State.selNodeId));
  }
}

function renderGraph() {
  $$('#world > .flow-node, #world > .edge-label-pill').forEach(el => el.remove());
  svgLayer.innerHTML = `
    <defs>
      <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 1 2 L 9 5 L 1 8 L 3.5 5 Z" fill="#0f172a" />
      </marker>
    </defs>
    <g id="egroup" transform="translate(4000, 4000)"></g>
  `;

  State.nodes.forEach(n => {
    const el = document.createElement('div');
    el.className = 'flow-node' + (n.shape === 'diamond' ? ' diamond-node' : '');
    el.dataset.id = n.id;
    el.style.left = n.cx + 'px';
    el.style.top = n.cy + 'px';

    if (n.shape !== 'diamond') {
      if (n.tw) el.style.width = (n.tw + 16) + 'px';
      else el.style.maxWidth = '360px';
    }

    const body = document.createElement('div');
    body.className = 'node-body';
    body.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(n.text)) || '<span style="color:#94a3b8">∅</span>';

    const idChip = document.createElement('div');
    idChip.className = 'node-id-chip';
    idChip.textContent = n.id;

    el.appendChild(body);
    el.appendChild(idChip);
    world.appendChild(el);

    n.el = el;
    n.bodyEl = body;

    // Node Interaction Listeners
    let lastHlTapSpan = null;
    let lastHlTapTime = 0;

    // Word-Tap Highlighter or Tap on highlighted span
    body.addEventListener('click', (e) => {
      if (body.contentEditable === 'true') return;

      const tkWord = e.target.closest('.tk-word');
      if (tkWord && State.activeHighlightTool) {
        e.stopPropagation();
        const wordText = tkWord.textContent.trim();
        if (wordText) {
          const newTex = TikzEngine.applyHighlightColorbox(n.text, wordText, State.activeHighlightTool === 'clear' ? null : State.activeHighlightTool);
          if (newTex !== n.text) {
            n.text = newTex;
            body.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(newTex));
            if ($('#nodeTextInput')) $('#nodeTextInput').value = newTex;
            if ($('#inspectorVisualCard')) $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(newTex);
            parseNodeTextToVisualFields(newTex);
            State.src = TikzEngine.updateNodeText(State.src, n.id, newTex);
            pushSourceToEditor();
            recordHistory('هایلایت کلمه');
            setStatus('ok', 'هایلایت کلمه در کد لاتک و بوم اعمال شد ✓');
          }
        }
        return;
      }

      const hlSpan = e.target.closest('.hl-yellow, .hl-red, .hl-gray');
      if (hlSpan) {
        e.stopPropagation();
        selectNode(n.id);
        const now = Date.now();
        if (lastHlTapSpan === hlSpan && now - lastHlTapTime < 850) {
          startDirectNodeEditing(n, hlSpan);
          lastHlTapSpan = null;
        } else {
          lastHlTapSpan = hlSpan;
          lastHlTapTime = now;
          const range = document.createRange();
          range.selectNodeContents(hlSpan);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          handleNodeTextSelection(n.id, e);
        }
      }
    });

    el.addEventListener('mousedown', (e) => {
      if (body.contentEditable === 'true') return;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      e.stopPropagation();
      selectNode(n.id);

      if (State.canvasMode === 'move') {
        State.dragNode = n;
        State.dragStartX = e.clientX;
        State.dragStartY = e.clientY;
        State.dragNodeStartPos = { cx: n.cx, cy: n.cy, x: n.x, y: n.y };
        State.dragThresholdExceeded = false;
      } else {
        // In select mode: dragging over node pans canvas!
        State.isDraggingCanvas = true;
        State.dragStartX = e.clientX - State.panX;
        State.dragStartY = e.clientY - State.panY;
        State.hasCanvasPanned = false;
      }
    });

    // In-Place Sub-text Selection
    body.addEventListener('mouseup', (e) => {
      handleNodeTextSelection(n.id, e);
    });
    body.addEventListener('touchend', (e) => {
      setTimeout(() => {
        handleNodeTextSelection(n.id, e);
      }, 80);
    });

    // Double click on desktop: Smooth quick focus glide in center
    el.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      State.isDraggingCanvas = false;
      State.dragNode = null;
      selectNode(n.id);
      focusNodeInView(n, true);
    });

    let lastTapTime = 0;
    el.addEventListener('touchstart', (e) => {
      if (body.contentEditable === 'true') return;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (e.touches.length === 1) {
        e.stopPropagation();
        const now = Date.now();
        if (now - lastTapTime < 350) {
          // Double-tap on mobile: Smooth quick focus glide in center
          State.isDraggingCanvas = false;
          State.dragNode = null;
          selectNode(n.id);
          focusNodeInView(n, true);
        } else {
          selectNode(n.id);
          if (State.canvasMode === 'move') {
            State.dragNode = n;
            State.dragStartX = e.touches[0].clientX;
            State.dragStartY = e.touches[0].clientY;
            State.dragNodeStartPos = { cx: n.cx, cy: n.cy, x: n.x, y: n.y };
            State.dragThresholdExceeded = false;
          } else {
            // In select mode: touching node allows panning canvas!
            State.isDraggingCanvas = true;
            State.dragStartX = e.touches[0].clientX - State.panX;
            State.dragStartY = e.touches[0].clientY - State.panY;
            State.hasCanvasPanned = false;
          }
        }
        lastTapTime = now;
      }
    }, { passive: false });
  });

  // Calculate Node Dimensions & Diamond Geometry
  State.nodes.forEach(n => {
    const el = n.el;
    if (n.shape === 'diamond') {
      const bw = Math.max(n.bodyEl.offsetWidth || 80, 80);
      const bh = Math.max(n.bodyEl.offsetHeight || 28, 28);
      const w = Math.max(bw * 1.5 + 24, 130);
      const h = Math.max(bh * 1.5 + 14, 48);
      el.style.width = w + 'px';
      el.style.height = h + 'px';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'diamond-svg');
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);

      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('class', 'diamond-poly');
      poly.setAttribute('points', `${w / 2},1 ${w - 1},${h / 2} ${w / 2},${h - 1} 1,${h / 2}`);
      poly.setAttribute('fill', '#ffffff');
      poly.setAttribute('stroke', '#0f172a');
      poly.setAttribute('stroke-width', '1.6');

      svg.appendChild(poly);
      el.insertBefore(svg, el.firstChild);
      n.w = w;
      n.h = h;
    } else {
      n.w = el.offsetWidth;
      n.h = el.offsetHeight;
    }
  });

  layoutEdges();
  if (State.selNodeId) selectNode(State.selNodeId);
}

function nodeById(id) {
  return State.nodes.find(n => n.id === id);
}

function anchorPoint(n, anchor, towards) {
  const hw = n.w / 2;
  const hh = n.h / 2;
  const cx = n.cx;
  const cy = n.cy;

  const anchors = {
    north: [0, -hh], south: [0, hh], east: [hw, 0], west: [-hw, 0],
    'north east': [hw, -hh], 'north west': [-hw, -hh], 'south east': [hw, hh], 'south west': [-hw, hh],
  };

  if (anchor && anchors[anchor]) {
    return { x: cx + anchors[anchor][0], y: cy + anchors[anchor][1] };
  }

  let dx = (towards ? towards.x : cx) - cx;
  let dy = (towards ? towards.y : cy + 1) - cy;
  if (dx === 0 && dy === 0) dy = 1;

  if (n.shape === 'diamond') {
    const t = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
    return { x: cx + dx * t, y: cy + dy * t };
  }

  const tx = dx !== 0 ? hw / Math.abs(dx) : Infinity;
  const ty = dy !== 0 ? hh / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  return { x: cx + dx * t, y: cy + dy * t };
}

function layoutEdges() {
  const egroup = $('#egroup');
  if (!egroup) return;
  egroup.innerHTML = '';
  $$('#world > .edge-label-pill').forEach(e => e.remove());

  State.edges.forEach((ed, idx) => {
    const refs = ed.points.map(p => {
      if (p.type === 'xy') return { x: p.x * TikzEngine.SCALE, y: -p.y * TikzEngine.SCALE };
      const n = nodeById(p.id);
      return n ? { x: n.cx, y: n.cy } : null;
    });
    if (refs.some(r => !r)) return;

    const pts = ed.points.map((p, k) => {
      if (p.type === 'xy') return { x: p.x * TikzEngine.SCALE, y: -p.y * TikzEngine.SCALE };
      const n = nodeById(p.id);
      const other = k === 0 ? refs[1] : refs[k - 1];
      return anchorPoint(n, p.anchor, other);
    });

    let pathD = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let k = 0; k < ed.ops.length; k++) {
      const op = ed.ops[k];
      const nextP = pts[k + 1];
      if (op === '--') {
        pathD += ` L ${nextP.x.toFixed(1)} ${nextP.y.toFixed(1)}`;
      } else if (op === '|-') {
        pathD += ` L ${pts[k].x.toFixed(1)} ${nextP.y.toFixed(1)} L ${nextP.x.toFixed(1)} ${nextP.y.toFixed(1)}`;
      } else if (op === '-|') {
        pathD += ` L ${nextP.x.toFixed(1)} ${pts[k].y.toFixed(1)} L ${nextP.x.toFixed(1)} ${nextP.y.toFixed(1)}`;
      }
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#0f172a');
    path.setAttribute('stroke-width', ed.opts.thick ? '1.8' : '1.3');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    if (ed.opts.arrow !== false) path.setAttribute('marker-end', 'url(#arrowHead)');
    egroup.appendChild(path);

    // Edge Label Pills
    if (ed.labels && ed.labels.length > 0) {
      ed.labels.forEach(lbl => {
        const p1 = pts[0];
        const p2 = pts[pts.length - 1];
        const pos = (lbl.opts && typeof lbl.opts === 'object' && lbl.opts.pos !== undefined) ? lbl.opts.pos : 0.5;
        let lx = p1.x + (p2.x - p1.x) * pos;
        let ly = p1.y + (p2.y - p1.y) * pos;

        const optStr = typeof lbl.opts === 'string' ? lbl.opts : (lbl.opts?.raw || '');
        if (/right/i.test(optStr)) lx += 48;
        else if (/left/i.test(optStr)) lx -= 48;
        if (/above/i.test(optStr)) ly -= 22;
        else if (/below/i.test(optStr)) ly += 22;

        const pill = document.createElement('div');
        pill.className = 'edge-label-pill' + (State.selEdgeIdx === idx ? ' selected' : '');
        pill.style.left = lx + 'px';
        pill.style.top = ly + 'px';
        pill.innerHTML = TikzEngine.texToHtml(lbl.text);

        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          selectEdge(idx);
        });

        world.appendChild(pill);
      });
    }
  });
}

function zoomBy(factor) {
  State.zoom = clamp(State.zoom * factor, 0.25, 3.0);
  updateTransform();
}

function fitAll() {
  if (!State.nodes || !State.nodes.length || !viewport) return;

  const rect = viewport.getBoundingClientRect();
  const vw = rect.width || viewport.clientWidth || 800;
  const vh = rect.height || viewport.clientHeight || 600;

  if (vw < 50 || vh < 50) return; // Pane not ready or hidden

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  State.nodes.forEach(n => {
    // Check DOM element dimensions if available, fallback to n.w/n.h or standard defaults
    const elW = n.el ? n.el.offsetWidth : (n.w || 180);
    const elH = n.el ? n.el.offsetHeight : (n.h || 65);
    const hw = Math.max(elW, 80) / 2;
    const hh = Math.max(elH, 30) / 2;

    minX = Math.min(minX, n.cx - hw);
    maxX = Math.max(maxX, n.cx + hw);
    minY = Math.min(minY, n.cy - hh);
    maxY = Math.max(maxY, n.cy + hh);
  });

  if (!isFinite(minX) || !isFinite(maxX) || !isFinite(minY) || !isFinite(maxY)) {
    return;
  }

  const chartWidth = Math.max(100, maxX - minX);
  const chartHeight = Math.max(100, maxY - minY);
  const centerX = (minX + maxX) / 2;
  const isMobile = vw < 640;

  if (isMobile) {
    // On mobile screens: fit horizontally with comfortable readable zoom, anchor top node in clear view!
    const z = clamp((vw - 32) / (chartWidth + 24), 0.38, 0.95);
    State.zoom = z;
    State.panX = (vw / 2) - (centerX * z);
    State.panY = 24 - (minY * z);
  } else {
    // Desktop screens: comfortable centering
    const z = clamp(Math.min((vw - 60) / (chartWidth + 40), (vh - 60) / (chartHeight + 40)), 0.35, 1.25);
    State.zoom = z;
    State.panX = (vw / 2) - (centerX * z);
    if (vh >= chartHeight * z + 80) {
      State.panY = (vh / 2) - (((minY + maxY) / 2) * z);
    } else {
      State.panY = 32 - (minY * z);
    }
  }

  updateTransform();
}

function setHighlightTool(toolName) {
  if (State.activeHighlightTool === toolName) {
    State.activeHighlightTool = null;
  } else {
    State.activeHighlightTool = toolName;
  }

  $$('.btn-hl-swatch').forEach(b => b.classList.remove('active'));
  $$('.dock-swatch').forEach(b => b.classList.remove('active'));
  const dockHlClear = $('#dockHlClear');
  if (dockHlClear) dockHlClear.classList.remove('active');

  if (State.activeHighlightTool) {
    const btnId = `#btnHl${State.activeHighlightTool === 'hlyellow' ? 'Yellow' : State.activeHighlightTool === 'hlred' ? 'Red' : State.activeHighlightTool === 'hlgray' ? 'Gray' : 'Clear'}`;
    const btn = $(btnId);
    if (btn) btn.classList.add('active');

    const dockBtnId = `#dockHl${State.activeHighlightTool === 'hlyellow' ? 'Yellow' : State.activeHighlightTool === 'hlred' ? 'Red' : State.activeHighlightTool === 'hlgray' ? 'Gray' : 'Clear'}`;
    const dockBtn = $(dockBtnId);
    if (dockBtn) dockBtn.classList.add('active');

    viewport.classList.add('mode-highlighter-active');
    const label = State.activeHighlightTool === 'clear' ? 'پاک‌کن هایلایت' : State.activeHighlightTool === 'hlyellow' ? 'زرد' : State.activeHighlightTool === 'hlred' ? 'قرمز' : 'طوسی';
    setStatus('ok', `قلم هایلایت ${label} فعال شد — روی هر کلمه در بوم ضربه بزنید.`);
  } else {
    viewport.classList.remove('mode-highlighter-active');
    setStatus('ok', 'حالت هایلایت لمسی غیرفعال شد.');
  }
}

let animFrameId = null;

function animateTransformTo(targetPanX, targetPanY, targetZoom, duration = 280) {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  const startPanX = State.panX;
  const startPanY = State.panY;
  const startZoom = State.zoom;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    State.panX = startPanX + (targetPanX - startPanX) * ease;
    State.panY = startPanY + (targetPanY - startPanY) * ease;
    State.zoom = startZoom + (targetZoom - startZoom) * ease;
    updateTransform();

    if (progress < 1) {
      animFrameId = requestAnimationFrame(step);
    } else {
      animFrameId = null;
      updateTransform();
    }
  }

  animFrameId = requestAnimationFrame(step);
}

function focusNodeInView(n, animate = true) {
  if (!n || !viewport) return;
  const rect = viewport.getBoundingClientRect();
  const vw = rect.width || viewport.clientWidth || 800;
  const vh = rect.height || viewport.clientHeight || 600;
  if (vw < 50 || vh < 50) return;

  const nw = n.el ? n.el.offsetWidth : (n.w || 180);
  const nh = n.el ? n.el.offsetHeight : (n.h || 65);

  const padX = Math.min(40, vw * 0.1);
  const padY = Math.min(40, vh * 0.1);
  const maxFitZoom = Math.min((vw - padX * 2) / Math.max(nw, 100), (vh - padY * 2) / Math.max(nh, 50));
  const targetZoom = clamp(Math.min(maxFitZoom, 1.3), 0.75, 1.35);

  const targetPanX = (vw / 2) - (n.cx * targetZoom);
  const targetPanY = (vh / 2) - (n.cy * targetZoom);
  State.hasUserTransformed = true;

  if (animate) {
    animateTransformTo(targetPanX, targetPanY, targetZoom, 280);
  } else {
    State.zoom = targetZoom;
    State.panX = targetPanX;
    State.panY = targetPanY;
    updateTransform();
  }
  setStatus('ok', `تمرکز روی گره «${n.id}» در مرکز دید ✓`);
}

function focusSelectedNodeInView() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (n) focusNodeInView(n, true);
}

function editSelectedNodeDirect() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (n) startDirectNodeEditing(n);
}

function setCanvasMode(mode) {
  State.canvasMode = mode;
  const btnSel = $('#btnModeSelect');
  const btnMov = $('#btnModeMove');
  if (btnSel) btnSel.classList.toggle('active', mode === 'select');
  if (btnMov) btnMov.classList.toggle('active', mode === 'move');

  const dockBtnSel = $('#dockBtnSelect');
  const dockBtnMov = $('#dockBtnMove');
  if (dockBtnSel) dockBtnSel.classList.toggle('active', mode === 'select');
  if (dockBtnMov) dockBtnMov.classList.toggle('active', mode === 'move');

  const dockBtnNodeMove = $('#dockBtnNodeMove');
  if (dockBtnNodeMove) dockBtnNodeMove.classList.toggle('active', mode === 'move');

  viewport.classList.toggle('mode-move-active', mode === 'move');
  if (mode === 'move') {
    setStatus('ok', 'حالت جابجایی دست آزاد فعال شد ✋ — می‌توانید با لمس گره‌ها را جابجا کنید');
  } else {
    setStatus('ok', 'حالت انتخاب و ویرایش فعال شد 🎯 — ضربه روی گره‌ها فقط آن‌ها را انتخاب می‌کند');
  }
}

function toggleCanvasMoveModeForNode() {
  setCanvasMode(State.canvasMode === 'move' ? 'select' : 'move');
}

// MacBook Trackpad Wheel (Silky 2-Finger Pan & Precise Focal Pinch-Zoom)
viewport.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  const rect = viewport.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (e.ctrlKey || e.metaKey) {
    // MacBook Trackpad Pinch-to-zoom (macOS sends wheel event with ctrlKey=true)
    const zoomFactor = Math.exp(-e.deltaY * 0.008);
    const newZoom = clamp(State.zoom * zoomFactor, 0.25, 3.0);
    const ratio = newZoom / State.zoom;

    // Zoom anchored precisely at cursor/pinch focal point
    State.panX = mouseX - (mouseX - State.panX) * ratio;
    State.panY = mouseY - (mouseY - State.panY) * ratio;
    State.zoom = newZoom;
    updateTransform();
  } else if (e.shiftKey) {
    // Shift + Wheel = horizontal pan
    State.panX -= e.deltaY;
    updateTransform();
  } else {
    // 2-finger scroll on trackpad = natural fluid pan
    State.panX -= e.deltaX;
    State.panY -= e.deltaY;
    updateTransform();
  }
}, { passive: false });

// Canvas Mouse Panning and Drag Handlers
viewport.addEventListener('mousedown', (e) => {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  if (e.target === viewport || e.target === world || e.target === svgLayer) {
    State.isDraggingCanvas = true;
    State.dragStartX = e.clientX - State.panX;
    State.dragStartY = e.clientY - State.panY;
    deselectAll();
  }
});

document.addEventListener('mousemove', (e) => {
  updateTelemetryHud(e.clientX, e.clientY);

  if (State.isDraggingCanvas) {
    State.panX = e.clientX - State.dragStartX;
    State.panY = e.clientY - State.dragStartY;
    updateTransform();
  } else if (State.dragNode) {
    const rawDx = e.clientX - State.dragStartX;
    const rawDy = e.clientY - State.dragStartY;
    if (!State.dragThresholdExceeded && Math.hypot(rawDx, rawDy) < 8) {
      return; // Ignore micro-jitters
    }
    State.dragThresholdExceeded = true;
    const dx = rawDx / State.zoom;
    const dy = rawDy / State.zoom;
    const n = State.dragNode;
    n.cx = State.dragNodeStartPos.cx + dx;
    n.cy = State.dragNodeStartPos.cy + dy;
    n.x = +(n.cx / TikzEngine.SCALE).toFixed(2);
    n.y = +(-n.cy / TikzEngine.SCALE).toFixed(2);
    n.el.style.left = n.cx + 'px';
    n.el.style.top = n.cy + 'px';
    layoutEdges();
    updateInspectorInputs();
  }
});

document.addEventListener('mouseup', () => {
  if (State.isDraggingCanvas) State.isDraggingCanvas = false;
  if (State.dragNode) {
    if (State.dragThresholdExceeded) {
      recordHistory('حرکت گره');
      syncGraphToEditor();
    }
    State.dragNode = null;
    State.dragThresholdExceeded = false;
  }
});

// Touch Gestures (Pinch to Zoom & Touch Pan)
let touchStartDist = 0;
let touchStartZoom = 1;
let touchMidX = 0;
let touchMidY = 0;
let touchStartWorldX = 0;
let touchStartWorldY = 0;

viewport.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1 && (e.target === viewport || e.target === world || e.target === svgLayer)) {
    State.isDraggingCanvas = true;
    State.dragStartX = e.touches[0].clientX - State.panX;
    State.dragStartY = e.touches[0].clientY - State.panY;
    deselectAll();
  } else if (e.touches.length === 2) {
    State.isDraggingCanvas = false;
    touchStartDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    touchStartZoom = State.zoom;
    const rect = viewport.getBoundingClientRect();
    touchMidX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
    touchMidY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
    touchStartWorldX = (touchMidX - State.panX) / State.zoom;
    touchStartWorldY = (touchMidY - State.panY) / State.zoom;
  }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (State.isDraggingCanvas && e.touches.length === 1) {
    if (e.cancelable) e.preventDefault();
    State.panX = e.touches[0].clientX - State.dragStartX;
    State.panY = e.touches[0].clientY - State.dragStartY;
    State.hasUserTransformed = true;
    updateTransform();
  } else if (State.dragNode && e.touches.length === 1) {
    if (e.cancelable) e.preventDefault();
    const rawDx = e.touches[0].clientX - State.dragStartX;
    const rawDy = e.touches[0].clientY - State.dragStartY;
    if (!State.dragThresholdExceeded && Math.hypot(rawDx, rawDy) < 8) {
      return;
    }
    State.dragThresholdExceeded = true;
    const dx = rawDx / State.zoom;
    const dy = rawDy / State.zoom;
    const n = State.dragNode;
    n.cx = State.dragNodeStartPos.cx + dx;
    n.cy = State.dragNodeStartPos.cy + dy;
    n.x = +(n.cx / TikzEngine.SCALE).toFixed(2);
    n.y = +(-n.cy / TikzEngine.SCALE).toFixed(2);
    n.el.style.left = n.cx + 'px';
    n.el.style.top = n.cy + 'px';
    layoutEdges();
    updateInspectorInputs();
  } else if (e.touches.length === 2 && touchStartDist > 0) {
    if (e.cancelable) e.preventDefault();
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const rect = viewport.getBoundingClientRect();
    const curMidX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
    const curMidY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;

    const newZoom = clamp(touchStartZoom * (dist / touchStartDist), 0.25, 3.0);
    State.zoom = newZoom;
    State.panX = curMidX - (touchStartWorldX * newZoom);
    State.panY = curMidY - (touchStartWorldY * newZoom);
    State.hasUserTransformed = true;
    updateTransform();
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  State.isDraggingCanvas = false;
  if (State.dragNode) {
    if (State.dragThresholdExceeded) {
      recordHistory('حرکت گره');
      syncGraphToEditor();
    }
    State.dragNode = null;
    State.dragThresholdExceeded = false;
  }
});

// ==========================================================================
// 5. Visual WYSIWYG Inspector & Formatting Operations
// ==========================================================================
let activeTitleFormat = {
  highlight: null, // 'hlyellow', 'hlred', 'hlgray' or null
  isBold: true,
  isUnderline: false,
};

function selectNode(id) {
  deselectAll();
  State.selNodeId = id;
  const n = nodeById(id);
  if (!n) return;

  n.el.classList.add('selected');
  $('#inspectorTitle').textContent = `گره: ${id}`;
  
  // Update Real-Time Visual Card Preview
  $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(n.text) || '<span style="color:#94a3b8">∅</span>';

  // Position and update single unified toolbar
  positionUnifiedToolbar(n);
  updateUnifiedToolbarActiveStates(n);
  showStudioNodeDeck(n);

  // Parse structured text (Title vs Subtitle)
  parseNodeTextToVisualFields(n.text);

  // Raw LaTeX input as backup
  $('#nodeTextInput').value = n.text;
  updateInspectorInputs();

  $$('.shape-choice').forEach(b => {
    b.classList.toggle('active', b.dataset.shape === n.shape);
  });
}

function positionUnifiedToolbar(n) {
  const bar = $('#nodeUnifiedToolbar');
  if (!bar) return;
  if (!n || !n.el) {
    bar.style.display = 'none';
    return;
  }
  const vp = $('#viewport');
  if (!vp) return;

  bar.style.display = 'flex';
  const vpRect = vp.getBoundingClientRect();
  const nRect = n.el.getBoundingClientRect();
  const barWidth = bar.offsetWidth || 440;
  const barHeight = bar.offsetHeight || 34;

  let left = (nRect.left + nRect.width / 2) - vpRect.left;
  let top = (nRect.top - vpRect.top) - barHeight - 8;

  const minLeft = barWidth / 2 + 10;
  const maxLeft = Math.max(minLeft, vpRect.width - barWidth / 2 - 10);
  left = clamp(left, minLeft, maxLeft);

  if (top < 10) {
    top = (nRect.bottom - vpRect.top) + 8;
  }
  top = clamp(top, 10, Math.max(10, vpRect.height - barHeight - 10));

  bar.style.left = `${left}px`;
  bar.style.top = `${top}px`;
  bar.style.transform = 'translateX(-50%)';
}

function updateUnifiedToolbarActiveStates(n) {
  if (!n) return;
  const bar = $('#nodeUnifiedToolbar');
  if (!bar) return;

  const text = n.text || '';
  const hlYellow = bar.querySelector('.nut-swatch-yellow');
  const hlRed = bar.querySelector('.nut-swatch-red');
  const hlGray = bar.querySelector('.nut-swatch-gray');
  const btnMove = $('#nutBtnMoveMode');

  if (hlYellow) hlYellow.classList.toggle('active', text.includes('hlyellow'));
  if (hlRed) hlRed.classList.toggle('active', text.includes('hlred'));
  if (hlGray) hlGray.classList.toggle('active', text.includes('hlgray'));
  if (btnMove) btnMove.classList.toggle('active', State.canvasMode === 'move');
}

function extractPlainTextFromTex(tex) {
  if (!tex) return '';
  const d = document.createElement('div');
  d.innerHTML = TikzEngine.texToHtml(tex);
  return (d.innerText || d.textContent || '').trim();
}

function parseNodeTextToVisualFields(rawTex) {
  // Extract highlight
  activeTitleFormat.highlight = null;
  if (rawTex.includes('hlyellow')) activeTitleFormat.highlight = 'hlyellow';
  else if (rawTex.includes('hlred')) activeTitleFormat.highlight = 'hlred';
  else if (rawTex.includes('hlgray')) activeTitleFormat.highlight = 'hlgray';

  activeTitleFormat.isBold = rawTex.includes('\\textbf');
  activeTitleFormat.isUnderline = rawTex.includes('\\underline');

  // Split by line break \\
  const lines = rawTex.split(/\\\\(?:\[[^\]]*\])?/);
  const firstLine = lines[0] || '';
  const restLines = lines.slice(1).join('\\\\\n') || '';

  // Clean title: convert rendered HTML to clean plain Persian/English text
  const cleanTitle = extractPlainTextFromTex(firstLine);

  // Subtitle: clean leading \scriptsize if present
  let cleanSubtitle = restLines.replace(/^[\s\n]*\\scriptsize\s*/, '').trim();

  $('#nodeTitleInput').value = cleanTitle;
  $('#nodeSubtitleInput').value = cleanSubtitle;

  updateFormatButtonActiveStates();
}

function updateFormatButtonActiveStates() {
  $$('.fmt-yellow').forEach(b => b.classList.toggle('active', activeTitleFormat.highlight === 'hlyellow'));
  $$('.fmt-red').forEach(b => b.classList.toggle('active', activeTitleFormat.highlight === 'hlred'));
  $$('.fmt-gray').forEach(b => b.classList.toggle('active', activeTitleFormat.highlight === 'hlgray'));
}

function onVisualFieldChange() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n) return;

  const titleText = $('#nodeTitleInput').value.trim();
  const subText = $('#nodeSubtitleInput').value.trim();

  // If title has English characters, ensure they are nicely wrapped in \lr or plain
  let formattedTitle = titleText;
  if (!formattedTitle.startsWith('\\')) {
    formattedTitle = `\\rl{${formattedTitle}}`;
  }

  // Reconstruct formatted LaTeX
  let builtTitle = formattedTitle;
  if (activeTitleFormat.highlight) {
    const hl = activeTitleFormat.highlight;
    const colorTag = hl === 'hlred' ? '\\color{darkred}' : '';
    builtTitle = `\\colorbox{${hl}}{\\strut ${colorTag}${builtTitle}}`;
  }
  if (activeTitleFormat.isUnderline) {
    builtTitle = `\\underline{${builtTitle}}`;
  }
  if (activeTitleFormat.isBold) {
    builtTitle = `\\textbf{${builtTitle}}`;
  }

  let finalTex = builtTitle;
  if (subText) {
    let formattedSub = subText;
    if (!formattedSub.includes('\\scriptsize')) {
      formattedSub = `\\scriptsize ${formattedSub}`;
    }
    finalTex += `\\\\\n    ${formattedSub}`;
  }

  n.text = finalTex;
  $('#nodeTextInput').value = finalTex;
  $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(finalTex);
  n.bodyEl.innerHTML = TikzEngine.texToHtml(finalTex);

  // Sync to source cleanly via TikzEngine
  State.src = TikzEngine.updateNodeText(State.src, n.id, finalTex);
  pushSourceToEditor();
}

function toggleTitleHighlight(colorName) {
  if (activeTitleFormat.highlight === colorName) {
    activeTitleFormat.highlight = null;
  } else {
    activeTitleFormat.highlight = colorName;
  }
  updateFormatButtonActiveStates();
  onVisualFieldChange();
}

function toggleTitleBold() {
  activeTitleFormat.isBold = !activeTitleFormat.isBold;
  onVisualFieldChange();
}

function toggleTitleUnderline() {
  activeTitleFormat.isUnderline = !activeTitleFormat.isUnderline;
  onVisualFieldChange();
}

function insertSubtitleTag(startTag, endTag) {
  const ta = $('#nodeSubtitleInput');
  const s = ta.selectionStart;
  const e = ta.selectionEnd;
  const val = ta.value;
  const selectedText = val.substring(s, e) || 'متن نمونه';
  const replacement = startTag + selectedText + endTag;
  ta.value = val.substring(0, s) + replacement + val.substring(e);
  ta.selectionStart = s + startTag.length;
  ta.selectionEnd = s + replacement.length - endTag.length;
  ta.focus();
  onVisualFieldChange();
}

function toggleRawCodeBox() {
  const box = $('#rawCodeContainer');
  const chev = $('#rawCodeChevron');
  if (box.style.display === 'none') {
    box.style.display = 'block';
    chev.textContent = '▴';
  } else {
    box.style.display = 'none';
    chev.textContent = '▾';
  }
}

function selectEdge(idx) {
  deselectAll();
  State.selEdgeIdx = idx;
  const ed = State.edges[idx];
  if (!ed || !ed.labels || !ed.labels[0]) return;

  $('#inspectorTitle').textContent = `پیام اتصال (${idx + 1})`;
  $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(ed.labels[0].text);
  $('#nodeTitleInput').value = ed.labels[0].text.replace(/[{}\\]/g, '');
  $('#nodeSubtitleInput').value = '';
  $('#nodeTextInput').value = ed.labels[0].text;
}

function deselectAll() {
  State.selNodeId = null;
  State.selEdgeIdx = null;
  $$('.flow-node.selected').forEach(el => el.classList.remove('selected'));
  $$('.edge-label-pill.selected').forEach(el => el.classList.remove('selected'));
  const unified = $('#nodeUnifiedToolbar');
  if (unified) unified.style.display = 'none';
  activeTextSelection = null;
  const inspTitle = $('#inspectorTitle');
  if (inspTitle) inspTitle.textContent = 'تنظیمات و ویرایش گره';
  const inspCard = $('#inspectorVisualCard');
  if (inspCard) inspCard.innerHTML = '<span style="color:#94a3b8">گره‌ای انتخاب نشده است.</span>';
  if ($('#nodeTitleInput')) $('#nodeTitleInput').value = '';
  if ($('#nodeSubtitleInput')) $('#nodeSubtitleInput').value = '';
  if ($('#nodeTextInput')) $('#nodeTextInput').value = '';
  if ($('#nodeXInput')) $('#nodeXInput').value = '';
  if ($('#nodeYInput')) $('#nodeYInput').value = '';
  showStudioCanvasDeck();
}

function updateInspectorInputs() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n) return;
  const xIn = $('#nodeXInput');
  const yIn = $('#nodeYInput');
  if (xIn) xIn.value = `${n.x} cm`;
  if (yIn) yIn.value = `${n.y} cm`;
}

// Live text editing in raw textarea as fallback
$('#nodeTextInput').addEventListener('input', (e) => {
  if (State.selNodeId) {
    const n = nodeById(State.selNodeId);
    if (n) {
      n.text = e.target.value;
      n.bodyEl.innerHTML = TikzEngine.texToHtml(n.text) || '<span style="color:#94a3b8">∅</span>';
      $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(n.text);
      State.src = TikzEngine.updateNodeText(State.src, n.id, n.text);
      pushSourceToEditor();
    }
  }
});

function nudgeSelected(dx, dy) {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n) return;
  n.x = +(n.x + dx).toFixed(2);
  n.y = +(n.y + dy).toFixed(2);
  n.cx = n.x * TikzEngine.SCALE;
  n.cy = -n.y * TikzEngine.SCALE;
  n.el.style.left = n.cx + 'px';
  n.el.style.top = n.cy + 'px';
  layoutEdges();
  updateInspectorInputs();
  recordHistory('جابجایی گره');
  State.src = TikzEngine.updateNodeCoord(State.src, n.id, n.x, n.y);
  pushSourceToEditor();
}

function adjustWidth(dw) {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n) return;
  n.tw = Math.max(60, (n.tw || 140) + dw * 20);
  n.el.style.width = (n.tw + 16) + 'px';
  n.w = n.el.offsetWidth;
  layoutEdges();
  recordHistory('تغییر عرض گره');
  syncGraphToEditor();
}

function autoFitNodeWidth() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n || !n.bodyEl) return;
  // Measure content natural width
  const scrollW = n.bodyEl.scrollWidth || 120;
  const naturalTw = Math.min(320, Math.max(70, scrollW + 18));
  n.tw = naturalTw;
  n.el.style.width = (n.tw + 16) + 'px';
  n.w = n.el.offsetWidth;
  layoutEdges();
  recordHistory('تنظیم خودکار عرض گره');
  syncGraphToEditor();
  setStatus('ok', 'عرض گره به‌صورت خودکار تنظیم شد ✓');
}

// ==========================================================================
// In-Place Contextual Text Selection & Unified Node Formatting
// ==========================================================================
let activeTextSelection = null;

function handleNodeTextSelection(nodeId, e) {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) {
    activeTextSelection = null;
    return;
  }
  const selectedText = sel.toString().trim();
  if (!selectedText) {
    activeTextSelection = null;
    return;
  }

  activeTextSelection = {
    nodeId,
    selectedText,
  };
}

function clearActiveTextSelection() {
  activeTextSelection = null;
}

function applyUnifiedHighlight(colorName) {
  if (activeTextSelection && activeTextSelection.selectedText) {
    applyHighlightToSelectedText(colorName);
  } else {
    toggleTitleHighlight(colorName);
  }
  if (State.selNodeId) {
    updateUnifiedToolbarActiveStates(nodeById(State.selNodeId));
  }
}

function applyUnifiedFormat(type) {
  if (activeTextSelection && activeTextSelection.selectedText) {
    applyFormatToSelectedText(type);
  } else {
    const n = State.selNodeId ? nodeById(State.selNodeId) : null;
    if (!n) return;

    if (type === 'bold') {
      toggleTitleBold();
    } else if (type === 'underline') {
      toggleTitleUnderline();
    } else if (type === 'fontsize') {
      cycleNodeFontSize(n);
    } else if (type === 'rl') {
      wrapNodeInDirection(n, 'rl');
    } else if (type === 'lr') {
      wrapNodeInDirection(n, 'lr');
    } else if (type === 'bullet') {
      appendBulletToNode(n);
    } else if (type === 'newline') {
      appendNewline(n);
    }
  }
  if (State.selNodeId) {
    updateUnifiedToolbarActiveStates(nodeById(State.selNodeId));
  }
}

function cycleNodeFontSize(n) {
  if (!n) return;
  let cur = n.text || '';
  if (cur.includes('\\scriptsize')) {
    cur = cur.replace(/\\scriptsize\s*/g, '\\large ');
  } else if (cur.includes('\\large')) {
    cur = cur.replace(/\\large\s*/g, '');
  } else {
    cur = '\\scriptsize ' + cur;
  }
  updateNodeAndSync(n, cur, 'تغییر سایز قلم');
}

function wrapNodeInDirection(n, dir) {
  if (!n) return;
  let cur = n.text || '';
  if (dir === 'lr') {
    if (!cur.includes('\\lr{')) {
      cur = `\\lr{${cur}}`;
    }
  } else {
    if (!cur.includes('\\rl{')) {
      cur = `\\rl{${cur}}`;
    }
  }
  updateNodeAndSync(n, cur, `جهت متن ${dir.toUpperCase()}`);
}

function appendBulletToNode(n) {
  if (!n) return;
  let cur = n.text || '';
  cur += '\\\\\n    \\textbullet~ ';
  updateNodeAndSync(n, cur, 'افزودن بالت');
}

function appendNewline(n) {
  if (!n) return;
  let cur = n.text || '';
  cur += '\\\\\n    ';
  updateNodeAndSync(n, cur, 'شکست خط');
}

function deleteSelectedNode() {
  if (!State.selNodeId) return;
  const id = State.selNodeId;
  if (!confirm(`آیا از حذف گره «${id}» اطمینان دارید؟`)) return;

  const nodePattern = new RegExp(`\\\\node\\s*\\[[^\\]]*\\]\\s*\\(${id}\\)[^;]*;\\s*\\n?`, 'g');
  let newSrc = State.src.replace(nodePattern, '');

  const pathPattern = new RegExp(`\\\\path\\s*\\[[^\\]]*\\]\\s*\\([^)]*\\)\\s*edge[^\n;]*\\([^)]*\\);\\s*\\n?`, 'g');
  newSrc = newSrc.replace(pathPattern, (match) => {
    if (match.includes(`(${id})`)) return '';
    return match;
  });

  if (newSrc !== State.src) {
    State.src = newSrc;
    pushSourceToEditor();
    parseFromEditor();
    recordHistory(`حذف گره ${id}`);
    setStatus('ok', `گره ${id} حذف شد`, true);
  }
  deselectAll();
}

function updateNodeAndSync(n, newTex, historyLabel) {
  n.text = newTex;
  n.bodyEl.innerHTML = TikzEngine.texToHtml(newTex);
  if ($('#nodeTextInput')) $('#nodeTextInput').value = newTex;
  if ($('#inspectorVisualCard')) $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(newTex);
  parseNodeTextToVisualFields(newTex);
  State.src = TikzEngine.updateNodeText(State.src, n.id, newTex);
  pushSourceToEditor();
  recordHistory(historyLabel);
  setStatus('ok', `${historyLabel} اعمال شد`);
}

function applyHighlightToSelectedText(colorName) {
  if (!activeTextSelection) return;
  const n = nodeById(activeTextSelection.nodeId);
  if (!n) return;
  const targetTxt = activeTextSelection.selectedText;
  if (!targetTxt) return;

  let currentTex = n.text;
  let newTex = currentTex;

  const escaped = targetTxt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  if (colorName) {
    const colorTag = colorName === 'hlred' ? '\\color{darkred}' : '';
    const replacement = `\\colorbox{${colorName}}{\\strut ${colorTag}\\rl{${targetTxt}}}`;

    const colorboxPattern = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{[^}]*${escaped}[^}]*\\}`, 'g');
    if (colorboxPattern.test(currentTex)) {
      newTex = currentTex.replace(colorboxPattern, replacement);
    } else {
      const rlPattern = new RegExp(`\\\\rl\\{${escaped}\\}`, 'g');
      if (rlPattern.test(currentTex)) {
        newTex = currentTex.replace(rlPattern, `\\colorbox{${colorName}}{\\strut ${colorTag}\\rl{${targetTxt}}}`);
      } else {
        newTex = currentTex.replace(targetTxt, replacement);
      }
    }
  } else {
    const colorboxWithStrut = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{\\\\strut\\s*(?:\\\\color\\{[^}]*\\})?\\s*\\\\rl\\{${escaped}\\}\\}`, 'g');
    const colorboxAny = new RegExp(`\\\\colorbox\\{[^}]*\\}\\{[^}]*${escaped}[^}]*\\}`, 'g');
    if (colorboxWithStrut.test(currentTex)) {
      newTex = currentTex.replace(colorboxWithStrut, `\\rl{${targetTxt}}`);
    } else if (colorboxAny.test(currentTex)) {
      newTex = currentTex.replace(colorboxAny, `\\rl{${targetTxt}}`);
    }
  }

  if (newTex !== currentTex) {
    updateNodeAndSync(n, newTex, 'هایلایت بخش انتخابی');
  }
  activeTextSelection = null;
  window.getSelection()?.removeAllRanges();
}

function applyFormatToSelectedText(formatType) {
  if (!activeTextSelection) return;
  const n = nodeById(activeTextSelection.nodeId);
  if (!n) return;
  const targetTxt = activeTextSelection.selectedText;
  if (!targetTxt) return;

  let currentTex = n.text;
  let newTex = currentTex;

  if (formatType === 'bold' || formatType === 'textbf') {
    if (currentTex.includes(`\\textbf{${targetTxt}}`)) {
      newTex = currentTex.replace(`\\textbf{${targetTxt}}`, targetTxt);
    } else {
      newTex = currentTex.replace(targetTxt, `\\textbf{${targetTxt}}`);
    }
  } else if (formatType === 'underline') {
    if (currentTex.includes(`\\underline{${targetTxt}}`)) {
      newTex = currentTex.replace(`\\underline{${targetTxt}}`, targetTxt);
    } else {
      newTex = currentTex.replace(targetTxt, `\\underline{${targetTxt}}`);
    }
  } else if (formatType === 'fontsize') {
    if (currentTex.includes(`{\\scriptsize ${targetTxt}}`)) {
      newTex = currentTex.replace(`{\\scriptsize ${targetTxt}}`, `{\\large ${targetTxt}}`);
    } else if (currentTex.includes(`{\\large ${targetTxt}}`)) {
      newTex = currentTex.replace(`{\\large ${targetTxt}}`, targetTxt);
    } else {
      newTex = currentTex.replace(targetTxt, `{\\scriptsize ${targetTxt}}`);
    }
  } else if (formatType === 'lr') {
    newTex = currentTex.replace(targetTxt, `\\lr{${targetTxt}}`);
  } else if (formatType === 'rl') {
    newTex = currentTex.replace(targetTxt, `\\rl{${targetTxt}}`);
  } else if (formatType === 'bullet') {
    newTex = currentTex.replace(targetTxt, `\\textbullet~${targetTxt}`);
  } else if (formatType === 'newline') {
    newTex = currentTex.replace(targetTxt, `\\\\\n    ${targetTxt}`);
  }

  if (newTex !== currentTex) {
    updateNodeAndSync(n, newTex, 'فرمت متن انتخابی');
  }
  activeTextSelection = null;
  window.getSelection()?.removeAllRanges();
}

// In-Place Inline Text Editor directly on the Flowchart Canvas Node
function startDirectNodeEditing(n, targetSpan) {
  if (!n || !n.bodyEl) return;
  const body = n.bodyEl;
  if (body.contentEditable === 'true') return;

  body.contentEditable = 'true';
  body.focus();

  // Move cursor to targetSpan or end of text
  const sel = window.getSelection();
  if (sel) {
    const range = document.createRange();
    if (targetSpan && body.contains(targetSpan)) {
      range.selectNodeContents(targetSpan);
      range.collapse(false);
    } else {
      range.selectNodeContents(body);
      range.collapse(false);
    }
    sel.removeAllRanges();
    sel.addRange(range);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      body.blur();
    } else if (e.key === 'Escape') {
      body.contentEditable = 'false';
      body.innerHTML = TikzEngine.texToHtml(n.text);
      body.removeEventListener('keydown', onKeyDown);
      body.removeEventListener('blur', onBlur);
    }
  };

  const onBlur = () => {
    body.contentEditable = 'false';
    body.removeEventListener('keydown', onKeyDown);
    body.removeEventListener('blur', onBlur);

    // Save updated text: convert clean inner text back to LaTeX
    const cleanText = (body.innerText || body.textContent || '').trim();
    if (!cleanText) return;

    // Check if the original node had a subtitle or highlights
    const lines = cleanText.split('\n').filter(l => l.trim().length > 0);
    const titleLine = lines[0] || cleanText;
    const subtitleLines = lines.slice(1).join('\\\\\n    ');

    let newTex = '';
    // Preserve existing highlight or formatting style if present
    if (n.text.includes('hlyellow')) {
      newTex = `\\textbf{\\colorbox{hlyellow}{\\strut \\rl{${titleLine}}}}`;
    } else if (n.text.includes('hlred')) {
      newTex = `\\textbf{\\colorbox{hlred}{\\strut \\color{darkred}\\rl{${titleLine}}}}`;
    } else if (n.text.includes('hlgray')) {
      newTex = `\\textbf{\\colorbox{hlgray}{\\strut \\rl{${titleLine}}}}`;
    } else if (n.text.includes('\\textbf')) {
      newTex = `\\textbf{\\rl{${titleLine}}}`;
    } else {
      newTex = `\\rl{${titleLine}}`;
    }

    if (subtitleLines) {
      newTex += `\\\\\n    \\scriptsize \\rl{${subtitleLines}}`;
    }

    if (newTex !== n.text) {
      n.text = newTex;
      body.innerHTML = TikzEngine.texToHtml(newTex);
      if ($('#nodeTextInput')) $('#nodeTextInput').value = newTex;
      if ($('#inspectorVisualCard')) $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(newTex);
      parseNodeTextToVisualFields(newTex);
      State.src = TikzEngine.updateNodeText(State.src, n.id, newTex);
      pushSourceToEditor();
      recordHistory('ویرایش مستقیم متن گره');
      setStatus('ok', 'متن گره در بوم ذخیره و به‌روز شد ✓');
    } else {
      body.innerHTML = TikzEngine.texToHtml(n.text);
    }
  };

  body.addEventListener('keydown', onKeyDown);
  body.addEventListener('blur', onBlur);
}

// ==========================================================================
// Unified Studio Dock Controllers
// ==========================================================================
function showStudioCanvasDeck() {
  const dock = $('#studioDock');
  if (!dock) return;
  dock.classList.remove('dock-mode-node');
  dock.classList.add('dock-mode-canvas');
  const cStrip = $('#dockCanvasStrip');
  const nDeck = $('#dockNodeDeck');
  if (cStrip) cStrip.style.display = 'flex';
  if (nDeck) nDeck.style.display = 'none';

  const btnSel = $('#dockBtnSelect');
  const btnMov = $('#dockBtnMove');
  if (btnSel) btnSel.classList.toggle('active', State.canvasMode === 'select');
  if (btnMov) btnMov.classList.toggle('active', State.canvasMode === 'move');
}

function showStudioNodeDeck(n) {
  const dock = $('#studioDock');
  if (!dock) return;
  dock.classList.remove('dock-mode-canvas');
  dock.classList.add('dock-mode-node');
  const cStrip = $('#dockCanvasStrip');
  const nDeck = $('#dockNodeDeck');
  if (cStrip) cStrip.style.display = 'none';
  if (nDeck) nDeck.style.display = 'flex';

  if (!n) return;
  const idEl = $('#dockNodeId');
  if (idEl) idEl.textContent = n.id;
  const titleEl = $('#dockNodeTitle');
  if (titleEl) {
    const cleanText = extractPlainTextFromTex(n.text) || n.id;
    titleEl.textContent = cleanText;
    titleEl.title = cleanText;
  }

  const text = n.text || '';
  const swYellow = nDeck.querySelector('.dock-swatch-yellow');
  const swRed = nDeck.querySelector('.dock-swatch-red');
  const swGray = nDeck.querySelector('.dock-swatch-gray');
  if (swYellow) swYellow.classList.toggle('active', text.includes('hlyellow'));
  if (swRed) swRed.classList.toggle('active', text.includes('hlred'));
  if (swGray) swGray.classList.toggle('active', text.includes('hlgray'));

  const btnNodeMove = $('#dockBtnNodeMove');
  if (btnNodeMove) btnNodeMove.classList.toggle('active', State.canvasMode === 'move');
}

function quickAddNewNode() {
  let idx = 1;
  while (State.nodes && State.nodes.some(n => n.id === `n_${idx}` || n.id === `node_${idx}`)) {
    idx++;
  }
  const newId = `n_${idx}`;

  let targetX = 0;
  let targetY = 0;
  let connectParentId = null;

  if (State.selNodeId) {
    const parentNode = nodeById(State.selNodeId);
    if (parentNode) {
      targetX = parentNode.x;
      targetY = +(parentNode.y - 2.2).toFixed(2);
      connectParentId = parentNode.id;
    }
  } else if (State.nodes && State.nodes.length > 0) {
    let minY = Infinity;
    let sumX = 0;
    State.nodes.forEach(n => {
      if (n.y < minY) minY = n.y;
      sumX += n.x;
    });
    targetX = +(sumX / State.nodes.length).toFixed(2);
    targetY = +(minY - 2.2).toFixed(2);
  }

  const nodeDef = `\\node [block, text width=4.5cm] (${newId}) at (${targetX.toFixed(2)},${targetY.toFixed(2)}) {\\rl{گره جدید ${idx}}};\n`;
  let edgeDef = '';
  if (connectParentId) {
    edgeDef = `\\path [line] (${connectParentId}) -- (${newId});\n`;
  }

  let src = State.src;
  const endIdx = src.lastIndexOf('\\end{tikzpicture}');
  if (endIdx !== -1) {
    src = src.slice(0, endIdx) + nodeDef + edgeDef + src.slice(endIdx);
  } else {
    src += '\n' + nodeDef + edgeDef;
  }

  State.src = src;
  pushSourceToEditor();
  parseFromEditor();
  recordHistory(`افزودن گره ${newId}`);
  selectNode(newId);
  focusSelectedNodeInView();
  setStatus('ok', `گره جدید (${newId}) اضافه شد ✓`);
}

// ==========================================================================
// Focused In-Place Node Text Editor Modal
// ==========================================================================
let modalActiveHl = null;
let modalActiveBold = false;
let modalActiveUnderline = false;

function openFocusedNodeEditor(n) {
  if (!n) {
    if (!State.selNodeId) return;
    n = nodeById(State.selNodeId);
  }
  if (!n) return;

  const badge = $('#nodeModalBadge');
  if (badge) badge.textContent = n.id;
  const title = $('#nodeEditModalTitle');
  if (title) title.textContent = `ویرایش محتوا و ظاهر گره (${n.id})`;

  const rawTex = n.text || '';
  const lines = rawTex.split(/\\\\(?:\[[^\]]*\])?/);
  const firstLine = lines[0] || '';
  const restLines = lines.slice(1).join('\\\\\n') || '';

  modalActiveHl = null;
  if (firstLine.includes('hlyellow')) modalActiveHl = 'hlyellow';
  else if (firstLine.includes('hlred')) modalActiveHl = 'hlred';
  else if (firstLine.includes('hlgray')) modalActiveHl = 'hlgray';

  modalActiveBold = firstLine.includes('\\textbf');
  modalActiveUnderline = firstLine.includes('\\underline');

  const cleanTitle = extractPlainTextFromTex(firstLine);
  let cleanSubtitle = restLines.replace(/^[\s\n]*\\scriptsize\s*/, '').trim();

  const titleIn = $('#nodeModalTitleInput');
  const subIn = $('#nodeModalSubInput');
  const rawIn = $('#nodeModalTextEditor');
  const prevBox = $('#nodeModalLivePreview');

  if (titleIn) titleIn.value = cleanTitle;
  if (subIn) subIn.value = cleanSubtitle;
  if (rawIn) rawIn.value = rawTex;
  if (prevBox) prevBox.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(rawTex));

  updateModalToolbarStates();
  $('#nodeEditModal').style.display = 'flex';
  if (titleIn) setTimeout(() => titleIn.focus(), 80);
}

function updateModalToolbarStates() {
  const yBtn = $('#modalBtnHlYellow');
  const rBtn = $('#modalBtnHlRed');
  const gBtn = $('#modalBtnHlGray');
  const bBtn = $('#modalBtnBold');
  const uBtn = $('#modalBtnUnderline');
  if (yBtn) yBtn.classList.toggle('active', modalActiveHl === 'hlyellow');
  if (rBtn) rBtn.classList.toggle('active', modalActiveHl === 'hlred');
  if (gBtn) gBtn.classList.toggle('active', modalActiveHl === 'hlgray');
  if (bBtn) bBtn.classList.toggle('active', modalActiveBold);
  if (uBtn) uBtn.classList.toggle('active', modalActiveUnderline);
}

function toggleModalTitleHighlight(colorName) {
  modalActiveHl = modalActiveHl === colorName ? null : colorName;
  updateModalToolbarStates();
  onModalFieldsChange();
}

function toggleModalTitleBold() {
  modalActiveBold = !modalActiveBold;
  updateModalToolbarStates();
  onModalFieldsChange();
}

function toggleModalTitleUnderline() {
  modalActiveUnderline = !modalActiveUnderline;
  updateModalToolbarStates();
  onModalFieldsChange();
}

function insertModalSubTag(startTag, endTag) {
  const ta = $('#nodeModalSubInput');
  if (!ta) return;
  const s = ta.selectionStart;
  const e = ta.selectionEnd;
  const val = ta.value;
  const selectedText = val.substring(s, e) || 'متن نمونه';
  const replacement = startTag + selectedText + endTag;
  ta.value = val.substring(0, s) + replacement + val.substring(e);
  ta.selectionStart = s + startTag.length;
  ta.selectionEnd = s + replacement.length - endTag.length;
  ta.focus();
  onModalFieldsChange();
}

function toggleModalRawCode() {
  const c = $('#modalRawContainer');
  const chev = $('#modalRawChevron');
  if (!c) return;
  const isHidden = c.style.display === 'none';
  c.style.display = isHidden ? 'block' : 'none';
  if (chev) chev.textContent = isHidden ? '▴' : '▾';
}

function onModalFieldsChange() {
  const titleIn = $('#nodeModalTitleInput');
  const subIn = $('#nodeModalSubInput');
  const rawIn = $('#nodeModalTextEditor');
  const prevBox = $('#nodeModalLivePreview');

  const titleText = (titleIn ? titleIn.value : '').trim();
  const subText = (subIn ? subIn.value : '').trim();

  let formattedTitle = titleText;
  if (!formattedTitle.startsWith('\\')) {
    formattedTitle = `\\rl{${formattedTitle}}`;
  }
  let builtTitle = formattedTitle;
  if (modalActiveHl) {
    const colorTag = modalActiveHl === 'hlred' ? '\\color{darkred}' : '';
    builtTitle = `\\colorbox{${modalActiveHl}}{\\strut ${colorTag}${builtTitle}}`;
  }
  if (modalActiveUnderline) {
    builtTitle = `\\underline{${builtTitle}}`;
  }
  if (modalActiveBold) {
    builtTitle = `\\textbf{${builtTitle}}`;
  }

  let finalTex = builtTitle;
  if (subText) {
    let formattedSub = subText;
    if (!formattedSub.includes('\\scriptsize')) {
      formattedSub = `\\scriptsize ${formattedSub}`;
    }
    finalTex += `\\\\\n    ${formattedSub}`;
  }

  if (rawIn) rawIn.value = finalTex;
  if (prevBox) prevBox.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(finalTex));
}

function onModalRawEditorInput() {
  const rawIn = $('#nodeModalTextEditor');
  const prevBox = $('#nodeModalLivePreview');
  const tex = rawIn ? rawIn.value : '';
  if (prevBox) prevBox.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(tex));
}

function closeNodeEditModal() {
  const m = $('#nodeEditModal');
  if (m) m.style.display = 'none';
}

function saveNodeEditModal() {
  if (!State.selNodeId) return;
  const n = nodeById(State.selNodeId);
  if (!n) return;

  const rawIn = $('#nodeModalTextEditor');
  const newTex = rawIn ? rawIn.value.trim() : '';
  if (newTex) {
    n.text = newTex;
    n.bodyEl.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(newTex));
    if ($('#nodeTextInput')) $('#nodeTextInput').value = newTex;
    if ($('#inspectorVisualCard')) $('#inspectorVisualCard').innerHTML = TikzEngine.texToHtml(newTex);
    parseNodeTextToVisualFields(newTex);

    State.src = TikzEngine.updateNodeText(State.src, n.id, newTex);
    pushSourceToEditor();
    recordHistory('ویرایش محتوای گره');
    showStudioNodeDeck(n);
    setStatus('ok', 'تغییرات گره ذخیره شد ✓');
  }
  closeNodeEditModal();
}

// Backward Compatibility Aliases for window.App & Legacy Callers
const editNodeInPlace = openFocusedNodeEditor;
const onModalEditorInput = onModalFieldsChange;
function applyHighlightToModalSelection(color) { toggleModalTitleHighlight(color); }
function applyFormatToModalSelection(fmt) {
  if (fmt === 'textbf') toggleModalTitleBold();
  else if (fmt === 'underline') toggleModalTitleUnderline();
  else if (fmt === 'lr') insertModalSubTag('\\lr{', '}');
  else if (fmt === 'rl') insertModalSubTag('\\rl{', '}');
}

// Vertical Spread Adjustment (Prevents any vertical overlap with 1 click)
function adjustVerticalSpread(factor) {
  if (!State.nodes || !State.nodes.length) return;
  State.nodes.forEach(n => {
    if (n.y < 0) {
      n.y = +(n.y * factor).toFixed(2);
      n.cy = -n.y * TikzEngine.SCALE;
      if (n.el) n.el.style.top = n.cy + 'px';
      State.src = TikzEngine.updateNodeCoord(State.src, n.id, n.x, n.y);
    }
  });
  layoutEdges();
  pushSourceToEditor();
  recordHistory('تنظیم فاصله عمودی');
  setTimeout(fitAll, 50);
  setStatus('ok', `فاصله عمودی ${factor > 1 ? 'افزایش' : 'کاهش'} یافت ✓`);
}

// Shape selection
$$('.shape-choice').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!State.selNodeId) return;
    const n = nodeById(State.selNodeId);
    if (!n) return;
    n.shape = btn.dataset.shape;
    recordHistory('تغییر شکل هندسی');
    syncGraphToEditor();
    renderGraph();
  });
});

// Inspector tabs
$$('.inspector-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.inspector-tab-btn').forEach(b => b.classList.remove('active'));
    $$('.inspector-page').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.target);
    if (target) target.style.display = 'block';
  });
});

// ==========================================================================
// 6. Source Sync, History & Shortcuts
// ==========================================================================
function pushSourceToEditor() {
  $('#codeEditor').value = State.src;
}

function parseFromEditor() {
  try {
    State.src = $('#codeEditor').value;
    const parsed = TikzEngine.parse(State.src);
    State.nodes = parsed.nodes;
    State.edges = parsed.edges;
    State.styles = parsed.styles;
    renderGraph();
  } catch (err) {
    console.error('Parse Error:', err);
    setStatus('err', 'خطا در تحلیل ساختار لاتک');
  }
}

function syncGraphToEditor() {
  State.src = TikzEngine.generate(State.src, State.nodes, State.edges);
  pushSourceToEditor();
}

$('#codeEditor').addEventListener('input', () => {
  parseFromEditor();
});

function recordHistory(actionName) {
  State.history = State.history.slice(0, State.historyIdx + 1);
  State.history.push({ src: State.src, action: actionName });
  State.historyIdx = State.history.length - 1;
}

function undo() {
  if (State.historyIdx > 0) {
    State.historyIdx--;
    State.src = State.history[State.historyIdx].src;
    pushSourceToEditor();
    parseFromEditor();
    setStatus('ok', `واگرد: ${State.history[State.historyIdx].action}`);
  }
}

function redo() {
  if (State.historyIdx < State.history.length - 1) {
    State.historyIdx++;
    State.src = State.history[State.historyIdx].src;
    pushSourceToEditor();
    parseFromEditor();
    setStatus('ok', `بازگرد: ${State.history[State.historyIdx].action}`);
  }
}

function isTypingActive() {
  const el = document.activeElement;
  if (!el) return false;
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable || (el.closest && !!el.closest('[contenteditable="true"]'));
}

document.addEventListener('keydown', (e) => {
  const isHierarchyOpen = $('#hierarchyDrawer')?.classList.contains('open');

  if (isHierarchyOpen && !isTypingActive()) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) redoHierarchy();
      else undoHierarchy();
      return;
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redoHierarchy();
      return;
    }
  }

  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
    e.preventDefault();
    redo();
  } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    if (isHierarchyOpen) {
      adminSaveHierarchy();
    } else {
      saveActiveDocument();
    }
  } else if (e.key === 'Escape') {
    if (isHierarchyOpen) {
      toggleHierarchy(false);
    }
    const chkModal = $('#checkpointsModal');
    if (chkModal && chkModal.style.display !== 'none') {
      closeCheckpointsModal();
    }
    const editModal = $('#nodeEditModal');
    if (editModal && editModal.style.display !== 'none') {
      closeNodeEditModal();
    }
  }
});

// ==========================================================================
// 7. High-Res PNG (300 DPI) Exporter for Word / PowerPoint
// ==========================================================================
async function exportHighResPng() {
  setStatus('busy', 'در حال تهیه خروجی ۳۰۰ DPI برای Word...');
  try {
    const canvas = document.createElement('canvas');
    const scale = 3.5;
    canvas.width = 3400;
    canvas.height = 2600;
    const ctx = canvas.getContext('2d');

    // Clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 120);
    ctx.scale(scale, scale);

    // Edges
    State.edges.forEach(ed => {
      const refs = ed.points.map(p => {
        if (p.type === 'xy') return { x: p.x * TikzEngine.SCALE, y: -p.y * TikzEngine.SCALE };
        const n = nodeById(p.id);
        return n ? { x: n.cx, y: n.cy } : null;
      });
      if (refs.some(r => !r)) return;

      const pts = ed.points.map((p, k) => {
        if (p.type === 'xy') return { x: p.x * TikzEngine.SCALE, y: -p.y * TikzEngine.SCALE };
        const n = nodeById(p.id);
        const other = k === 0 ? refs[1] : refs[k - 1];
        return anchorPoint(n, p.anchor, other);
      });

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let k = 0; k < ed.ops.length; k++) {
        const op = ed.ops[k];
        const nextP = pts[k + 1];
        if (op === '--') ctx.lineTo(nextP.x, nextP.y);
        else if (op === '|-') { ctx.lineTo(pts[k].x, nextP.y); ctx.lineTo(nextP.x, nextP.y); }
        else if (op === '-|') { ctx.lineTo(nextP.x, pts[k].y); ctx.lineTo(nextP.x, nextP.y); }
      }
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = ed.opts.thick ? 1.8 : 1.2;
      ctx.stroke();
    });

    // Nodes
    State.nodes.forEach(n => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.6;

      if (n.shape === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(n.cx, n.cy - n.h / 2);
        ctx.lineTo(n.cx + n.w / 2, n.cy);
        ctx.lineTo(n.cx, n.cy + n.h / 2);
        ctx.lineTo(n.cx - n.w / 2, n.cy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(n.cx - n.w / 2, n.cy - n.h / 2, n.w, n.h);
        ctx.strokeRect(n.cx - n.w / 2, n.cy - n.h / 2, n.w, n.h);
      }

      ctx.fillStyle = '#0f172a';
      ctx.font = "bold 11.5px 'Peyda', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const cleanText = n.text.replace(/\\(textbf|textit|colorbox|rl|lr|scriptsize|underline)\{[^}]*\}/g, '').replace(/[{}\\]/g, '');
      ctx.fillText(cleanText.substring(0, 42), n.cx, n.cy);
    });

    ctx.restore();

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `flowchart-${State.activeDoc}.png`;
    a.click();
    setStatus('ok', 'تصویر ۳۰۰ DPI دانلود شد ✓');
  } catch (err) {
    setStatus('err', 'خطا در خروجی تصویر: ' + err);
  }
}

// ==========================================================================
// 8. Server Bridge (XeLaTeX Compile & Save)
// ==========================================================================
async function compilePdf() {
  setStatus('busy', 'در حال کامپایل با موتور XeLaTeX...');
  try {
    const res = await fetch('/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tex: $('#codeEditor').value, job: State.activeDoc, passes: 1 })
    });
    const data = await res.json();
    if (data.success && data.pdf_url) {
      // Hide browser thumbnails and sidebar for pure clean page view
      $('#pdfFrame').src = data.pdf_url + '#toolbar=0&navpanes=0&scrollbar=1&view=FitH';
      setStatus('ok', `کامپایل موفق ✓ (${data.duration}s)`);
      if (window.innerWidth <= 900) showMobileTab('panePdf');
    } else {
      setStatus('err', 'خطای کامپایل XeLaTeX');
      alert(data.errors ? data.errors.join('\n') : data.log);
    }
  } catch (e) {
    setStatus('err', 'سرور در دسترس نیست');
  }
}

function openPdfNewTab() {
  const frame = $('#pdfFrame');
  if (frame.src) {
    window.open(frame.src.split('#')[0], '_blank');
  } else {
    alert('ابتدا فلوچارت را کامپایل کنید.');
  }
}

async function loadDocument(docName) {
  setStatus('busy', 'در حال بارگذاری فلوچارت...');
  State.activeDoc = docName;

  try {
    const res = await fetch(`/api/document?file=${docName}.tex`);
    const data = await res.json();
    if (data.success && data.tex) {
      State.src = data.tex;
      pushSourceToEditor();
      State.hasUserTransformed = false;
      parseFromEditor();
      requestAnimationFrame(() => {
        fitAll();
        setTimeout(fitAll, 80);
        setTimeout(fitAll, 240);
        setTimeout(fitAll, 500);
      });
      setStatus('ok', `فلوچارت ${data.title || docName} بارگذاری شد ✓`);
      return;
    }
  } catch (e) {
    console.warn('Backend fetch failed, using fallback:', e);
  }

  // Local fallback
  setStatus('ok', `بارگذاری محلی انجام شد ✓`);
}

async function saveActiveDocument() {
  setStatus('busy', 'در حال ذخیره روی سرور...');
  try {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: `flowcharts/${State.activeDoc}.tex`, tex: $('#codeEditor').value })
    });
    const data = await res.json();
    if (data.success) setStatus('ok', 'فایل با موفقیت در سرور ذخیره شد ✓');
    else setStatus('err', 'خطا در ذخیره: ' + (data.log || ''));
  } catch (e) {
    setStatus('err', 'خطا در ارتباط با سرور');
  }
}

function setStatus(type, msg, notify = false) {
  const dot = $('#statusDot');
  if (dot) {
    dot.className = 'status-dot ' + (type || 'ok');
    dot.title = 'وضعیت سیستم: ' + msg;
  }

  // Only show toast popup on explicit notify or errors/compiles
  if (notify || type === 'err' || type === 'busy') {
    showToast(type, msg);
  }
}

function showToast(type, msg) {
  const container = $('#toastContainer');
  if (!container || !msg) return;

  // Single compact toast without stacking
  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = `toast-msg toast-${type || 'ok'}`;
  
  // Clean emojis as requested
  const cleanMsg = msg.replace(/[✓✕⏳✋🎯↶↷]/g, '').trim();
  toast.textContent = cleanMsg;
  container.appendChild(toast);

  const duration = type === 'busy' ? 2000 : (type === 'err' ? 3500 : 1600);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 180);
  }, duration);
}

// Mobile Navigation
function showMobileTab(paneId) {
  if (paneId === 'hierarchy') {
    window.location.href = '/taxonomy.html';
    return;
  }
  
  toggleHierarchy(false);

  $$('.pane').forEach(p => p.classList.remove('mobile-active'));
  $$('.mobile-tab').forEach(b => b.classList.remove('active'));

  const target = document.getElementById(paneId);
  if (target) target.classList.add('mobile-active');

  const tabBtn = document.querySelector(`.mobile-tab[data-pane="${paneId}"]`);
  if (tabBtn) tabBtn.classList.add('active');

  if (paneId === 'paneCanvas') {
    setTimeout(() => {
      updateTransform();
      fitAll();
    }, 60);
  }
}

$$('.mobile-tab[data-pane]').forEach(btn => {
  btn.addEventListener('click', () => showMobileTab(btn.dataset.pane));
});

// Boot & Lifecycle
window.addEventListener('DOMContentLoaded', () => {
  initCustomCombobox();
  initSplitters();
  loadHierarchy();
  loadDocument('cgcg');
  $('#paneCanvas').classList.add('mobile-active');
  showStudioCanvasDeck();

  // Word-tap highlighter in focused modal preview
  const modalLivePrev = $('#nodeModalLivePreview');
  if (modalLivePrev) {
    modalLivePrev.addEventListener('click', (e) => {
      const tkWord = e.target.closest('.tk-word');
      if (tkWord) {
        const rawIn = $('#nodeModalTextEditor');
        const curTex = rawIn ? rawIn.value : '';
        const wordText = tkWord.textContent.trim();
        if (wordText) {
          const activeColor = modalActiveHl || 'hlyellow';
          const newTex = TikzEngine.applyHighlightColorbox(curTex, wordText, activeColor);
          if (newTex !== curTex && rawIn) {
            rawIn.value = newTex;
            modalLivePrev.innerHTML = TikzEngine.wrapWordsInTokens(TikzEngine.texToHtml(newTex));
          }
        }
      }
    });
  }

  // Smart Viewport Resize Observer: keeps flowchart centered whenever pane width changes
  if (window.ResizeObserver && viewport) {
    let lastWidth = 0;
    let lastHeight = 0;
    let resizeTimer = null;
    const ro = new ResizeObserver(entries => {
      // If typing or keyboard opened, never jump or fitAll!
      if (isTypingActive()) return;

      for (const entry of entries) {
        const cr = entry.contentRect;
        const widthChanged = Math.abs(cr.width - lastWidth) > 12;
        const heightChanged = Math.abs(cr.height - lastHeight) > 24;

        if (widthChanged || (!State.hasUserTransformed && heightChanged)) {
          lastWidth = cr.width;
          lastHeight = cr.height;
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            updateTelemetryHud();
            if (!isTypingActive() && !State.hasUserTransformed) {
              fitAll();
            }
          }, 40);
        }
      }
    });
    ro.observe(viewport);
  }

  window.addEventListener('resize', () => {
    if (isTypingActive()) return;
    updateTelemetryHud();
    if (!State.hasUserTransformed) {
      fitAll();
    }
  });
});

function downloadPdfFile() {
  const frame = $('#pdfFrame');
  const pdfUrl = (frame && frame.src) ? frame.src.split('#')[0] : `/${State.activeDoc}.pdf`;
  const a = document.createElement('a');
  a.href = pdfUrl;
  a.download = `${State.activeDoc}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setStatus('ok', 'فایل PDF دانلود شد ✓');
}

// ==========================================================================
// 9. Version Checkpoints & Code Diff Viewer
// ==========================================================================
State.checkpoints = [];

function openCheckpointsModal() {
  $('#checkpointsModal').style.display = 'flex';
  renderCheckpointSelect();
}

function closeCheckpointsModal() {
  $('#checkpointsModal').style.display = 'none';
}

function createCheckpoint() {
  const input = $('#newCheckpointName');
  const name = input.value.trim() || `نسخه ${State.checkpoints.length + 1} (${new Date().toLocaleTimeString('fa-IR')})`;
  const cp = {
    id: 'cp_' + Date.now(),
    name,
    time: new Date().toLocaleTimeString('fa-IR'),
    tex: $('#codeEditor').value,
  };
  State.checkpoints.push(cp);
  input.value = '';
  renderCheckpointSelect();
  compareWithCheckpoint(cp.id);
  setStatus('ok', `چک‌پوینت «${name}» ذخیره شد ✓`);
}

function renderCheckpointSelect() {
  const sel = $('#checkpointSelect');
  sel.innerHTML = '';
  if (State.checkpoints.length === 0) {
    sel.innerHTML = '<option value="">هیچ نسخه‌ای ثبت نشده است</option>';
    $('#diffViewer').textContent = 'ابتدا یک نسخه ثبت کنید تا مقایسه فعال شود.';
    return;
  }
  State.checkpoints.forEach(cp => {
    const opt = document.createElement('option');
    opt.value = cp.id;
    opt.textContent = `${cp.name} — ${cp.time}`;
    sel.appendChild(opt);
  });
  compareWithCheckpoint(State.checkpoints[State.checkpoints.length - 1].id);
}

function compareWithCheckpoint(cpId) {
  const cp = State.checkpoints.find(c => c.id === cpId);
  const diffPre = $('#diffViewer');
  if (!cp) {
    diffPre.textContent = 'نسخه‌ای انتخاب نشده است.';
    return;
  }

  const oldLines = cp.tex.split('\n');
  const curLines = $('#codeEditor').value.split('\n');
  diffPre.innerHTML = '';

  let diffCount = 0;
  const maxL = Math.max(oldLines.length, curLines.length);
  for (let i = 0; i < maxL; i++) {
    const o = oldLines[i];
    const c = curLines[i];
    if (o === c) {
      if (diffCount < 40 && Math.abs(i - maxL) < 5) {
        const span = document.createElement('div');
        span.textContent = '  ' + (c || '');
        span.style.color = '#64748b';
        diffPre.appendChild(span);
      }
    } else {
      diffCount++;
      if (o !== undefined) {
        const delSpan = document.createElement('div');
        delSpan.className = 'diff-line-del';
        delSpan.textContent = '- ' + o;
        diffPre.appendChild(delSpan);
      }
      if (c !== undefined) {
        const addSpan = document.createElement('div');
        addSpan.className = 'diff-line-add';
        addSpan.textContent = '+ ' + c;
        diffPre.appendChild(addSpan);
      }
    }
  }

  if (diffCount === 0) {
    diffPre.innerHTML = '<div style="color:#4ade80;">✓ هیچ تفاوتی با این نسخه وجود ندارد (یکسان هستند).</div>';
  }
}

function restoreSelectedCheckpoint() {
  const cpId = $('#checkpointSelect').value;
  const cp = State.checkpoints.find(c => c.id === cpId);
  if (!cp) return;
  if (confirm(`آیا مطمئن هستید که می‌خواهید به «${cp.name}» بازگردید؟`)) {
    State.src = cp.tex;
    pushSourceToEditor();
    parseFromEditor();
    closeCheckpointsModal();
    setStatus('ok', `بازگردانی به «${cp.name}» با موفقیت انجام شد ✓`);
  }
}

function insertTagAroundSelection(startTag, endTag) {
  const ta = $('#codeEditor');
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const sel = ta.value.substring(start, end);
  ta.value = ta.value.substring(0, start) + startTag + sel + endTag + ta.value.substring(end);
  ta.selectionStart = start + startTag.length;
  ta.selectionEnd = end + startTag.length;
  ta.focus();
  parseFromEditor();
}

window.App = {
  zoomBy,
  fitAll,
  undo,
  redo,
  exportHighResPng,
  compilePdf,
  openPdfNewTab,
  downloadPdfFile,
  saveActiveDocument,
  insertTagAroundSelection,
  nudgeSelected,
  adjustWidth,
  adjustVerticalSpread,
  toggleHierarchy,
  filterHierarchy,
  focusDocOrNode,
  toggleMaximizePane,
  toggleMinimizePane,
  adminSaveHierarchy,
  addRootCategory,
  addChildNode,
  deleteHierarchyNode,
  deleteNodeByPath: deleteHierarchyNode,
  moveHierarchyNode,
  editHierarchyBadge,
  promptLinkNode,
  expandAllHierarchy,
  collapseAllHierarchy,
  toggleHierarchySize,
  clearHierarchySearch,
  exportHierarchyJson,
  importHierarchyJson,
  undoHierarchy,
  redoHierarchy,
  focusSelectedNodeInView,
  focusNodeInView,
  editSelectedNodeDirect,
  setCanvasMode,
  toggleCanvasMoveModeForNode,
  setHighlightTool,
  onVisualFieldChange,
  toggleTitleHighlight,
  toggleTitleBold,
  toggleTitleUnderline,
  insertSubtitleTag,
  toggleRawCodeBox,
  openCheckpointsModal,
  closeCheckpointsModal,
  createCheckpoint,
  compareWithCheckpoint,
  restoreSelectedCheckpoint,
  showMobileTab,
  autoFitNodeWidth,
  editNodeInPlace,
  startDirectNodeEditing,
  closeNodeEditModal,
  onModalEditorInput,
  applyHighlightToModalSelection,
  applyFormatToModalSelection,
  saveNodeEditModal,
  applyHighlightToSelectedText,
  applyFormatToSelectedText,
  applyUnifiedHighlight,
  applyUnifiedFormat,
  deleteSelectedNode,
  positionUnifiedToolbar,
  quickAddNewNode,
  openFocusedNodeEditor,
  onModalFieldsChange,
  onModalRawEditorInput,
  toggleModalRawCode,
  toggleModalTitleHighlight,
  toggleModalTitleBold,
  toggleModalTitleUnderline,
  insertModalSubTag,
  showStudioCanvasDeck,
  showStudioNodeDeck,
};
