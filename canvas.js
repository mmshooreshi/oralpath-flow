/**
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

  const SCALE = 54; // 54px per TikZ cm for spacious typography
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  // --- Embedded Authentic XeLaTeX Documents ---
  const EMBEDDED_DOCS = {
    benign_epithelial: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: benign_epithelial\n% DOC_SLUG: benign_epithelial\n% DOC_CATEGORY: cat_benign_epithelial\n% DOC_TITLE: الگوریتم جامع: ضایعات اپی‌تلیال خوش‌خیم و لکوپلاکیا\n% DOC_ALIASES: benign epithelial, لکوپلاکیا, ضایعات اپی تلیال, پاپیلوما, کندیلوما, دیسپلازی اپی تلیال, leukoplakia, papilloma\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Oral Epithelial Dysplasia & HPV-related Lesions.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 42690553 - Khurram SA et al. (Head Neck Pathol 2026) Pattern-Anchored Diagnosis of Oral Epithelial Dysplasia: COST Action INTERCEPTOR.\n% 4. PMID: 42969171 - Grzech-Leśniak K et al. (Dent Med Probl 2026) Laser-Based Management of Oral Leukoplakia: WFLD Study Group Consensus.\n% 5. PMID: 42808717 - Zhao J et al. (Oral Health Prev Dent 2026) Clinical Efficacy of 5-Aminolevulinic Acid Photodynamic Therapy in Oral Leukoplakia.\n% 6. PMID: 41050292 - Goswami M et al. (Int J Clin Pediatr Dent 2025) Minimally Invasive Management of Oral Squamous Papilloma.\n% 7. PMID: 40597151 - Huang J et al. (BMC Oral Health 2025) Recurrent Verrucous Carcinoma and Proliferative Verrucous Leukoplakia Risk.\n% 8. PMID: 39290142 - Bhattarai BP et al. (J Dent Res 2024) Recurrence in Oral Leukoplakia: Systematic Review and Meta-analysis.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ضایعات اپی‌تلیال خوش‌خیم و لکوپلاکیا}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Benign Epithelial Lesions and Oral Leukoplakia (Differential Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ پاپیلوماهای ویروسی (\\lr{HPV})، لکوپلاکیای دیسپلاستیک (\\lr{WHO 5th Ed})، مارجین اکسیزیون لیزر و پایش بدخیمی}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=13.0cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: پلاک سفید بدون قابلیت برداشت، برجستگی پاپیلاری، اگزوفیتیک یا پدانکوله}}\\\\[2pt]\n    \\scriptsize \\rl{برجستگی گل‌کلمی مخاطی $\\bullet$ پلاک کراتوتیک کف دهان، زبان یا لثه $\\bullet$ لکوپلاکیای هموژن یا غیرهموژن $\\bullet$ رد تروما}\n};\n\n% 2. Mandatory Step 1\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: رد عوامل اتولوژی واکنشی (اصطکاک/دندان تیز) و ارزیابی فتوگرافی دیجیتال}}}\\\\[2pt]\n    \\scriptsize \\rl{برطرف کردن لبه تیز دندان یا دنچر به مدت ۲ هفته؛ در صورت پایدار ماندن پلاک کراتوتیک $\\rightarrow$ نیاز قطعی به ارزیابی بیوپسی}\n};\n\n% 3. Solitary Pedunculated Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{ضایعه منفرد، پدانکوله،}\\\\[-1pt]\\scriptsize \\lr{Pedunculated / Warty?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{پاپیلوما منفرد (\\lr{HPV 6/11}) \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه خوش‌خیم بدون دیسپلازی؛}\\\\\\rl{اکسیزیون ساده با شالوده پدانکول؛}\\\\\\colorbox{hlgray}{\\strut\\rl{\\textbf{پیش‌آگهی عالی؛ عود نادر}}}\n};\n\n% 4. Mandatory Biopsy & Dysplasia Grading\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی (\\lr{Incisional Biopsy}) در ضایعات وسیع یا نامنظم و گریدینگ دیسپلازی \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{نمونه‌برداری از بدنماترین ناحیه در اریترولکوپلاکیا $\\bullet$ گریدینگ دیسپلازی اپی‌تلیال بر اساس معیارهای \\lr{WHO 5th Ed 2024} \\lr{[\\textbf{PMID: 42690553}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{پاتولوژی و دیسپلازی}\\\\[-1pt]\\scriptsize \\lr{Dysplasia Grade?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{پاپیلوما اسکواموس}}\\\\[2pt]\n    \\scriptsize \\lr{Squamous Papilloma}\\\\\\rl{پدانکوله با زوائد انگشتی؛}\\\\\\rl{فاقد اتیپی یا دیسپلازی اپی‌تلیال؛}\\\\\\rl{عود با جراحی: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۱٪}}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{کوندیلوما / وروکا}}\\\\[2pt]\n    \\scriptsize \\lr{Condyloma / Verruca}\\\\\\rl{ضایعات سسیل پهن، مولتیپل؛}\\\\\\rl{انتقال جنسی یا خودتلقیحی (\\lr{HPV})؛}\\\\\\rl{عود موضعی: \\textbf{۱۰٪ تا ۲۰٪}}\n};\n\\node (h3) [stepbox, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{دیسپلازی خفیف}}\\\\[2pt]\n    \\scriptsize \\lr{Mild Dysplasia (WHO Low)}\\\\\\rl{دیسپلازی محدود به ۱/۳ قاعده اپی‌تلیوم؛}\\\\\\rl{پلاک هموژن با هایپرکراتوز پایدار؛}\\\\\\rl{ریسک بدخیمی: \\textbf{۳٪ تا ۵٪}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{دیسپلازی شدید / \\lr{CIS} \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{High-Grade Dysplasia / CIS}\\\\\\rl{درگیری بیش از ۲/۳ تا تمام ضخامت؛}\\\\\\rl{میتوز آتیپیک و پلئومورفیسم سلولی؛}\\\\\\rl{ریسک بدخیمی:} \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{۱۵٪ تا ۳۵٪}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون کانوکشنال}}\\\\[2pt]\n    \\scriptsize \\rl{برداشت جراحی با حاشیه سالم؛}\\\\\\rl{شامل قاعده ساقه فیبروواسکولار؛}\\\\\\rl{تایید پاتولوژی مارجین}\\\\\\rl{\\lr{[\\textbf{PMID: 41050292}]}}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{اکسیزیون کامل $\\pm$ کرایو}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون با بیستوری یا لیزر \\lr{CO2}؛}\\\\\\rl{بررسی همزمان پارتنر جنسی؛}\\\\\\rl{استفاده از مکش دود جراحی}\\\\\\rl{(پیشگیری از انتقال ویروس با دود)}\n};\n\\node (i3) [stepbox, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{تبخیر لیزر یا اکسیزیون}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون با مارجین ۳ میلی‌متر، یا}\\\\\\rl{تبخیر سطحی با لیزر \\lr{CO2}؛}\\\\\\rl{حذف کامل دخانیات و الکل}\\\\\\rl{\\lr{[\\textbf{PMID: 42969171}]}}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{رزکسیون با مارجین ۵mm}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{اکسیزیون وسیع با حاشیه پاک ۵mm؛}}\\\\\\rl{ارزیابی کامل مارجین بافتی؛}\\\\\\rl{فتودینامیک‌تراپی ادجوانت (\\lr{PDT})}\\\\\\rl{\\lr{[\\textbf{PMID: 39290142}]}}\n};\n\n% 8. Surveillance Regimens\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\colorbox{hlgray}{\\strut\\textbf{سالانه در معاینات روتین}}}\\\\[2pt]\n    \\scriptsize \\rl{پیش‌آگهی عالی؛}\\\\\\rl{عدم نیاز به تصویربرداری دوره‌ای}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه تا ۲ سال}}\\\\[2pt]\n    \\scriptsize \\rl{پایش دقیق پیدایش}\\\\\\rl{ضایعات اگزوفیتیک و پاپیلاری جدید}\n};\n\\node (s3) [stepbox, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه (مادام‌العمر)}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه کامل مخاط و عکاسی دیجیتال؛}\\\\\\rl{بیوپسی مجدد در صورت تغییر بالینی}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ ماه (۲ سال اول)}}}\\\\[2pt]\n    \\scriptsize \\rl{سپس هر ۶ ماه مادام‌العمر؛}\\\\\\rl{غربالگری دقیق تحول به \\lr{OSCC}}\n};\n\n% 9. Clinical Red Flags\n\\node (redflags) [stepbox, draw=darkred, line width=0.9pt, text width=15.8cm] at (0, -16.15) {\n    \\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا بیوپسی مجدد (\\lr{Clinical Red Flags}):}}\\\\[3pt]\n    \\scriptsize \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{مداخله فوری تشخیصی در:}}} \\rl{(۱) پیدایش پلاک قرمز (\\lr{Erythroplakia}) یا سفتی/زخم در بستر پلاک $\\bullet$ (۲) درگیری نواحی پرخطر کف دهان و سطح ونترال/لترال زبان $\\bullet$ (۳) لکوپلاکیای وروکوز پرولیفراتیو (\\lr{PVL}) چندکانونی مقاوم با ریسک بدخیمی بالای ۶۰٪ $\\bullet$ (۴) عدم پسرفت پلاک پس از ۳ تا ۴ هفته از حذف عامل مکانیکی $\\bullet$ (۵) لمس لنفادنوپاتی گردنی.}\n};\n\n% 10. Refractory / Malignancy Protocols\n\\node (refractory) [stepbox, line width=0.9pt, text width=15.8cm] at (0, -18.50) {\n    \\rl{\\textbf{پروتکل موارد راجعه، \\lr{PVL} و پایش بدخیمی دیسپلازی (\\lr{Malignancy Surveillance}):}}\\\\[3pt]\n    \\scriptsize \\rl{\\textbf{سطح ۱ (\\lr{PVL} و ضایعات چندکانونی):} نقشه‌برداری بالینی مکرر و بیوپسی‌های اینسیزیونال پیاپی جهت کشف زودرس \\lr{Microinvasive OSCC} یا وروکوز کارسینوما \\lr{[\\textbf{PMID: 40597151}]}.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۲ (بررسی حاشیه با فلوئورسنس):} پایش حواشی جراحی با اتوفلوئورسنس نوری (\\lr{VELscope}) یا رنگ‌آمیزی تولوییدین بلو جهت تشخیص دیسپلازی ساب‌کلینیکال.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۳ (کموتراپی موضعی و فتودینامیک):} کاربرد فتودینامیک‌تراپی (\\lr{5-ALA PDT}) \\lr{[\\textbf{PMID: 42808717}]} یا رتینوئیدهای موضعی؛ در صورت تایید کارسینوم تهاجمی، ارجاع فوری به انکولوژی سر و گردن.}\n};\n\n% Arrows & Routing\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1) -- node[above, font=\\sffamily\\scriptsize] {\\rl{بله}} (r_benign);\n\\draw [arrow] (d1) -- node[right, font=\\sffamily\\scriptsize] {\\rl{خیر / پلاک سفید مشکوک}} (n3);\n\\draw [arrow] (n3) -- (d2);\n\n\\draw [arrow] (d2.south) -- ++(0,-0.6) -| (h1.north);\n\\draw [arrow] (d2.south) -- ++(0,-0.6) -| (h2.north);\n\\draw [arrow] (d2.south) -- ++(0,-0.6) -| (h3.north);\n\\draw [arrow, darkred] (d2.south) -- ++(0,-0.6) -| (h4.north);\n\n\\draw [arrow] (h1) -- (i1);\n\\draw [arrow] (h2) -- (i2);\n\\draw [arrow] (h3) -- (i3);\n\\draw [arrow, darkred] (h4) -- (i4);\n\n\\draw [arrow] (i1) -- (s1);\n\\draw [arrow] (i2) -- (s2);\n\\draw [arrow] (i3) -- (s3);\n\\draw [arrow, darkred] (i4) -- (s4);\n\n\\draw [arrow] (s1.south) -- ++(0,-0.35) coordinate (b1);\n\\draw [arrow] (s2.south) -- ++(0,-0.35) coordinate (b2);\n\\draw [arrow] (s3.south) -- ++(0,-0.35) coordinate (b3);\n\\draw [arrow, darkred] (s4.south) -- ++(0,-0.35) coordinate (b4);\n\\draw [thick, black] (b1) -- (b4);\n\\draw [arrow] (0, -14.90) -- (redflags.north);\n\n\\draw [arrow] (redflags) -- (refractory);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    benign_mesenchymal: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: benign_mesenchymal\n% DOC_SLUG: benign_mesenchymal\n% DOC_CATEGORY: cat_benign_mesenchymal\n% DOC_TITLE: الگوریتم جامع: تومورهای خوش‌خیم مزانشیمی (تشخیص افتراقی)\n% DOC_ALIASES: benign mesenchymal, مزانشیمی, خوش‌خیم مزانشیمی, تومورهای مزانشیمی, لیپوما, همانژیوم, نوروفیبروما, فیبروماتوز\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Mesenchymal Soft Tissue Tumours.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41230293 - WHO 5th Ed Diagnostic Criteria for Head and Neck Mesenchymal Neoplasms.\n% 4. PMID: 40560304 - Immunohistochemical Algorithm for Oral Soft Tissue Tumours (S100, CD34, SMA, ALK).\n% 5. PMID: 43005372 - Peripheral Nerve Sheath Tumours of the Oral Cavity (Schwannoma vs Neurofibroma).\n% 6. PMID: 40661709 - Extra-abdominal and Head & Neck Desmoid Fibromatosis: Surgical Margins & Systemic Therapy.\n% 7. PMID: 42991206 - Inflammatory Myofibroblastic Tumours: Targeted Tyrosine Kinase Therapy (Crizotinib).\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: تومورهای خوش‌خیم مزانشیمی دهان}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Oral Benign Mesenchymal Tumors (Differential Diagnosis)}}\\\\[3pt]\n{\\small\\itshape تریاژ بالینی، بررسی عروقی، پنل ایمونوهیستوشیمی (\\lr{IHC})، تمایز بافت چربی، عصبی، عروقی و فیبروبلاستیک}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: توده زیرمخاطی بدون درد و با رشد آهسته بافت نرم (\\lr{Submucosal Mass})}}\\\\[2pt]\n    \\scriptsize \\rl{تورم بافت نرم گونه (\\lr{Buccal})، زبان، لب یا کف دهان $\\bullet$ قوام متغیر: نرم، اسفنجی، لاستیکی یا سفت $\\bullet$ رد تروما}\n};\n\n% 2. Non-invasive Workup & Vascular Screening\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: سونوگرافی کالر داپلر، ام‌آرآی (\\lr{MRI}) و آسپیراسیون سوزنی (\\lr{FNA})}}}\\\\[2pt]\n    \\scriptsize \\rl{سنجش فلوی عروقی (رد قطعی \\lr{AVM} پرخطر قبل از هر بیوپسی) $\\bullet$ بررسی کپسولاسیون و وسعت در فضاهای عمقی فاسیال}\n};\n\n% 3. Vascular / High-Flow Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{پرفلو / عروقی؟}\\\\[-1pt]\\scriptsize \\lr{High-Flow / AVM?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{مالفورماسیون عروقی پرفلو \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\rl{آنژیوگرافی مداخله‌ای الزامی؛}\\\\\\rl{اسکلروتراپی ترانس‌کاتتر/آمبولیزاسیون؛}\\\\\\rl{\\textbf{پرهیز از بیوپسی باز بدون آمبولیزاسیون}}\n};\n\n% 4. Mandatory Incisional Biopsy & IHC Panel\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی الزامی (\\lr{Incisional / Core}) + پنل افتراقی ایمونوهیستوشیمی (\\lr{IHC Panel}) \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی مارکرهای کلیدی: \\lr{S100, CD34, SMA, Desmin, ALK, Nuclear $\\beta$-catenin} $\\bullet$ رد کامل سارکوم بافت نرم دهان}\n};\n\n% 5. Histogenetic Lineage Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{رده منشأ بافتی}\\\\[-1pt]\\scriptsize \\lr{Histogenetic Lineage?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{تومورهای چربی (\\lr{Lipoma})}}\\\\[2pt]\n    \\scriptsize \\lr{Adipocytic Lineage}\\\\\\rl{مارکر: \\lr{S100(+), MDM2(-)}}\\\\\\rl{لوبول‌های چربی بالغ کپسول‌دار}\\\\\\rl{عود با اکسیزیون: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٪}}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{ضایعات عروقی / لنفاوی}}\\\\[2pt]\n    \\scriptsize \\lr{Hemangioma / Lymphangioma}\\\\\\rl{مارکر: \\lr{CD31(+), CD34(+), D2-40(+)}}\\\\\\rl{حفرات اندوتلیال با/بدون فلبولیت}\\\\\\rl{ریسک خونریزی موضعی؛ عود: \\textbf{۱۰٪ تا ۲۵٪}}\n};\n\\node (h3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{تومور غلاف عصبی (\\lr{PNST})}}\\\\[2pt]\n    \\scriptsize \\lr{Schwannoma / Neurofibroma}\\\\\\rl{مارکر: \\lr{S100(+)} شدید، \\lr{SOX10(+)}}\\\\\\rl{آنتونی \\lr{A/B} (شوآنوما)؛ غربالگری \\lr{NF1}}\\\\\\rl{عود شوآنوما: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۱٪}}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{فیبروماتوزیس / \\lr{IMT} \\emoji{⚠️}}}\\\\[2pt]\n    \\scriptsize \\lr{Aggressive / Myofibroblastic}\\\\\\rl{مارکر: \\lr{$\\beta$-catenin} هسته‌ای، \\lr{ALK(+)}}\\\\\\rl{نفوذ دسته‌جات سلول دوکی به عضله}\\\\\\rl{عود با حاشیه مثبت: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۴۰٪ تا ۶۵٪}}}\n};\n\n% 7. Primary Surgical Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون محافظه‌کارانه}}\\\\[2pt]\n    \\scriptsize \\rl{انوکلئیشن ساده با کپسول سالم}\\\\\\rl{جداسازی تمیز از بافت نرم اطراف}\\\\\\rl{حفظ رشته‌های عصبی محیطی}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{اسکلروتراپی $\\pm$ اکسیزیون}}\\\\[2pt]\n    \\scriptsize \\rl{تزریق بلئومایسین یا پلی‌دوکانول}\\\\\\rl{کاهش حجم نئوادجوانت}\\\\\\rl{اکسیزیون جراحی در صورت پایداری}\n};\n\\node (i3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{انوکلئیشن محافظ عصب}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون اینتراکپسولار در شوآنوما}\\\\\\textbf{\\rl{جداسازی از فاسیکل بدون قطع عصب}}\\\\\\rl{اکسیزیون کامل توده‌های نوروفیبروما}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{رزکسیون وسیع با مارجین}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{مارجین جراحی پاک حداقل ۱۰ میلی‌متر}}\\\\\\rl{حذف یک لایه فاشیای سالم پیرامونی}\\\\\\rl{تارگت‌تراپی کریزوتینیب در \\lr{ALK+ IMT}}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه بالینی ساده؛}\\\\\\rl{بررسی قوام بافت نرم}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{سونوگرافی بافت نرم؛}\\\\\\rl{پایش تحلیل تدریجی ضایعه}\n};\n\\node (s3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{تست هدایت عصبی در صورت علامت؛}\\\\\\rl{غربالگری ضایعات ثانویه در \\lr{NF1}}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۶ ماه (۵ سال)}}}\\\\[2pt]\n    \\scriptsize \\rl{ام‌آرآی دوره‌ای با کنتراست؛}\\\\\\rl{پایش در اوج پنجره عود تهاجمی}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا مداخله جراحی مجدد (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{اقدام فوری و بیوپسی عمیق مجدد در:}} (۱) رشد انفجاری سریع یا بروز درد فزاینده موضعی $\\bullet$ (۲) چسبندگی و تثبیت توده به استخوان، عضله یا پوست پوشاننده $\\bullet$ (۳) بروز اختلال حسی، پارستزی یا بی‌حسی در مسیر عصب منتال یا لینگوال $\\bullet$ (۴) اولسراسیون سطحی خودبه‌خودی یا لنفادنوپاتی گردنی پیشرونده $\\bullet$ (۵) ایجاد اختلال عملکردی در بلع، تنفس یا تکلم به علت اتساع در فضاهای عمقی فاسیال.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، تارگت‌تراپی‌های مولکولی و پایش دگرگونی بدخیم (\\lr{Malignancy Surveillance}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (رد لیپوسارکوم):} انجام تست \\lr{FISH} برای امپلیفیکاسیون ژن‌های \\lr{MDM2/CDK4} در توده‌های چربی با آتیپی سیتولوژیک یا سایز بزرگتر از ۵ سانتی‌متر.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار هدفمند آنزیمی):} مهارکننده تیروزین کیناز (\\lr{Crizotinib}) در موارد غیرقابل جراحی یا عودکننده تومور میوفیبروبلاستیک التهابی با بازآرایی ژن \\lr{ALK}؛ مهارکننده \\lr{MEK} (\\lr{Selumetinib}) در نوروفیبرومای پلکسی‌فرم.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} ارجاع فوری به تیم انکولوژی چندتخصصی (\\lr{Head \\& Neck Tumor Board}) در صورت اثبات سارکوم‌های بدخیم بافت نرم (\\lr{MPNST, Liposarcoma, Rhabdomyosarcoma})؛ پرهیز از رادیوتراپی در دسموئید به علت خطر ترانسفورماسیون سارکوماتوز ثانویه.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله (پرفلو)}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{خیر (توده سالید)}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n% Final link to Refractory Box\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    capillary_hemangioma: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.12}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: capillary_hemangioma\n% DOC_SLUG: capillary_hemangioma\n% DOC_CATEGORY: cat_benign_mesenchymal\n% DOC_TITLE: همانژیوم کاپیلاری (Capillary Hemangioma)\n% DOC_ALIASES: Capillary Hemangioma, Infantile Hemangioma, Vascular Anomalies, همانژیوم کاپیلاری, تومورهای خوش‌خیم عروقی\n% =========================================================================\n\n% =========================================================================\n% CLINICAL EVIDENCE LEDGER & PMIDS (WHO 5th Ed 2024 / Landmark Trials)\n% =========================================================================\n% 1. WHO Classification of Head and Neck Tumours, 5th Ed (2024): Vascular Anomalies & Tumours.\n% 2. Neville BW et al. Oral and Maxillofacial Pathology, 5th Ed (2024): Soft Tissue Neoplasms.\n% 3. PMID: 25693013 - Léauté-Labrèze C et al. (N Engl J Med 2015) A randomized, controlled trial of oral propranolol in infantile hemangioma.\n% 4. PMID: 30584062 - Krowchuk DP et al. (Pediatrics 2019) Clinical Practice Guideline for the Management of Infantile Hemangiomas.\n% 5. PMID: 41446713 - Werpachowski N et al. (J Clin Aesthet Dermatol 2025) Topical Timolol in Infantile Hemangiomas: Systematic Review.\n% 6. PMID: 42414159 - da Silva LOP et al. (Oral Surg Oral Med Oral Pathol Oral Radiol 2026) Ultrasonographic Parameters & Sclerotherapy of Oral Vascular Anomalies.\n% 7. PMID: 35468033 - De Ravin E et al. (Pediatr Hematol Oncol 2022) International Clinical Practice Guidelines on Hemangioma: Systematic Review.\n% =========================================================================\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: همانژیوم کاپیلاری دهان (\\lr{Capillary Hemangioma})}\\\\[2pt]\n{\\small\\itshape تریاژ دیاسکوپی و همودینامیک، ایمونوهیستوشیمی \\lr{GLUT-1}، پروتکل بتابلوکر سیستمیک/موضعی، اسکلروتراپی و کنترل خونریزی}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.0, draw=black, fill=white, line width=0.7pt, inner sep=2.5pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.88]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: ندول/ماکول عروقی قرمز تا ارغوانی مخاط دهان (\\lr{Oral Vascular Lesion})}}\\\\[2pt]\n    \\scriptsize \\rl{تست دیاسکوپی مثبت (رنگ‌پریدگی با فشار \\lr{Blanching}) $\\bullet$ زبان، لب، مخاط باکال یا لثه $\\bullet$ رد تپش یا سوفل (\\lr{Bruit/Thrill})}\n};\n\n% 2. Mandatory Hemodynamic Triage\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\colorbox{hlyellow}{\\strut\\textbf{\\rl{مرحله ۱ الزامی: تریاژ همودینامیک و داپلر (رد قطعی مالفورماسیون شریانی-وریدی پرجریان)}}}\\\\[2pt]\n    \\scriptsize \\rl{سونوگرافی کالر داپلر (\\lr{CDUS}) جهت ارزیابی سرعت جریان $\\bullet$ رادیوگرافی/\\lr{CBCT} جهت رد درگیری داخل استخوانی فکین}\n};\n\n% 3. High-Flow / Intrabony Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{جریان بالا / استخوان؟}\\\\[-1pt]\\scriptsize \\lr{High-Flow / Bone?}};\n\\node (r_exit) [stepbox, draw=darkred, line width=1.0pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{مالفورماسیون پرجریان (\\lr{AVM}) \\emoji{⚠}}}\\\\[2pt]\n    \\scriptsize \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{بیوپسی اکیداً ممنوع}}}\\\\[2pt]\n    \\scriptsize \\rl{ارجاع اورژانسی به آنژیوگرافی}\\\\\n    \\rl{و آمبولیزاسیون مداخله‌ای}\n};\n\n% 4. Mandatory Biologic Characterization\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\colorbox{hlyellow}{\\strut\\textbf{\\rl{ارزیابی بیولوژیک و ایمونوهیستوشیمی طبقه‌بندی \\lr{ISSVA / WHO 5th Ed 2024}}}}\\\\[2pt]\n    \\scriptsize \\rl{تمایز تومور حقیقی از مالفورماسیون عروقی: مارکر \\lr{GLUT-1} (در اینفانتایل مثبت، مالفورماسیون منفی) $\\bullet$ فاز پرولیفراتیو در برابر اینولوشن}\n};\n\n% 5. Clinical Phenotype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{فنوتیپ بالینی}\\\\[-1pt]\\scriptsize \\lr{Clinical Phenotype?}};\n\n% 6. 4 Main Clinical Presentation Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{سطحی / نوزادی کم‌خطر}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه مخاطی خفیف، کوچکتر از ۲ سانتی‌متر}\\\\\\rl{فاقد اولسر و اختلال بلع یا تنفس}\\\\\\rl{شانس پس‌رفت: }\\colorbox{hlgray}{\\strut\\textbf{\\rl{تا ۹۰٪ تا ۹ سالگی}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{لوبولار مخاطی (\\lr{LCH/PG})}}\\\\[2pt]\n    \\scriptsize \\rl{ندول لب یا مخاط باکال ناشی از تروما}\\\\\\rl{خونریزی‌های مکرر با غذا خوردن}\\\\\\rl{رشد سریع اگزوفیتیک در اطفال و جوانان}\n};\n\\node (h3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{پرولیفراتیو شدید / اولسره}}\\\\[2pt]\n    \\scriptsize \\rl{رشد سریع مخاطی، اختلال تغذیه}\\\\\\rl{زخم دردناک یا تهدید راه هوایی فک}\\\\\\rl{اندیکاسیون: }\\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{شروع فوری درمان دارویی}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{کونژنتال پایدار (\\lr{NICH}) / مالفورماسیون}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه عروقی غیرپس‌رونده در بدو تولد}\\\\\\rl{مارکر \\lr{GLUT-1 (-)}؛ مقاومت به بتابلوکر}\\\\\\rl{توده عروقی عمقی و آسیمتری بافت نرم}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{تیمولول موضعی / پایش فعال}}\\\\[2pt]\n    \\scriptsize \\lr{Timolol 0.5\\% GFS} \\rl{۲ قطره دوبار در روز}\\\\\\rl{یا پیگیری بدون مداخله تهاجمی}\\\\\\lr{[PMID: 41446713 - 2025]}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{اکسیزیون جراحی یا لیزر}}\\\\[2pt]\n    \\scriptsize \\rl{برداشت کامل تا لایه ساب‌موکوزا}\\\\\\rl{هموستاز با لیزر دیود یا کوتر}\\\\\\rl{میزان عود: }\\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۳٪}}}\n};\n\\node (i3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{پروپرانولول خوراکی خط اول \\emoji{🎯}}}\\\\[2pt]\n    \\scriptsize \\lr{Propranolol 2--3\\,mg/kg/day}\\\\\\rl{منقسم در دو دوز همراه با شیر/تغذیه}\\\\\\lr{[PMID: 25693013 - NEJM RCT]}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{اسکلروتراپی هدایت‌شده}}\\\\[2pt]\n    \\scriptsize \\rl{تزریق فوم پولیدوکانول ۱٪ تا ۲٪}\\\\\\rl{یا بلئومایسین تحت گاید سونوگرافی}\\\\\\lr{[PMID: 42414159 - da Silva 2026]}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه یکبار}}}\\\\[2pt]\n    \\scriptsize \\rl{فتوگرافی سریال و پایش پس‌رفت}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{ماه ۱ و ۳ پس از عمل}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی هیلینگ مخاط و پاتولوژی}\n};\n\\node (s3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{ماهانه در فاز رشد}}}\\\\[2pt]\n    \\scriptsize \\rl{تنظیم دوز پروپرانولول با وزن کودک}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۶ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{سونوگرافی داپلر و پایش ترومبوز}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{علائم خطر بالینی (\\lr{Red Flags}) و اندیکاسیون‌های بستری و مداخله اورژانسی:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری الزامی است در:}} (۱) استریدور یا انسداد حاد راه هوایی ناشی از گسترش ضایعه به زبان یا حلق $\\bullet$ (۲) خونریزی فعال شدید غیرقابل مهار ناشی از ترومای مخاطی $\\bullet$ (۳) اولسراسیون وسیع همراه با درد شدید و ناتوانی در تغذیه نوزاد $\\bullet$ (۴) عوارض بتابلوکر سیستمیک شامل برادیکاردی (کمتر از ۸۰ ضربان در دقیقه)، هیپوگلیسمی علامت‌دار یا اسپاسم برونش $\\bullet$ (۵) ضایعات پلاک‌مانند وسیع صورت با شک به سندرم \\lr{PHACE}.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل پله‌ای برای موارد مقاوم به درمان دارویی / ضایعات عروقی پیچیده:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (مقاوم به پروپرانولول):} پردنیزولون خوراکی (\\lr{2--3\\,mg/kg/day}) یا اضافه کردن لیزر رنگی پالسی (\\lr{PDL 595\\,nm}) جهت ترمیم اولسر و محو عروق سطحی.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۴ (مهارکننده تارگت بیولوژیک \\lr{mTOR}):} سیرولیموس خوراکی (\\lr{Sirolimus 0.8\\,mg/m$^2$ q12h} با هدف سطح خونی \\lr{5--10\\,ng/mL}) در ضایعات مالفورماسیون عروقی و لنفاتیک مقاوم.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۵ (سالواژ مداخله‌ای و جراحی):} آمبولیزاسیون ترانس‌آرتریال سوپرسلکتیو به همراه اکسیزیون جراحی کامل تحت بیهوشی با کوتر بای‌پولار یا تیغ اولتراسونیک هارمونیک.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله (خطرناک)}} (r_exit.west);\n\\draw [arrow] (d1.south) -- node[right=4pt, font=\\scriptsize\\bfseries] {\\rl{خیر (کم‌جریان/مخاطی)}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Histology columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    cgcg: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.12}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: گرانولوم سلول غول‌آسای مرکزی (\\lr{CGCG})}\\\\[2pt]\n{\\small\\itshape تریاژ اندوکرین، تفکیک تومور براون، طبقه‌بندی بیولوژیک بر اساس تهاجم، درمان‌های دارویی و بازسازی فک}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.0, draw=black, fill=white, line width=0.7pt, inner sep=2.5pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.88]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: رادیولوسنسی اکسپنسیل فکین (\\lr{Jaw Radiolucency})}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه استئولیتیک تک‌حفره‌ای یا چندحفره‌ای $\\bullet$ تورم مندیبل/ماگزیلا $\\bullet$ آسپیراسیون تشخیصی}\n};\n\n% 2. Mandatory Endocrine Screen\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تریاژ آزمایشگاهی اندوکرین (رد تومور براون هیپرپاراتیروئیدیسم)}}}\\\\[2pt]\n    \\scriptsize \\rl{کلسیم سرم $\\bullet$ فسفر غیرآلی $\\bullet$ آلکالین فسفاتاز $\\bullet$ هورمون پاراتیروئید دست‌نخورده (\\lr{iPTH})}\n};\n\n% 3. Hyperparathyroidism Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{افزایش}\\\\[-1pt]\\scriptsize \\lr{PTH / Ca?}};\n\\node (r_brown) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{تومور براون (\\lr{HPT}) \\emoji{⚖}}}\\\\[2pt]\n    \\scriptsize \\rl{ارجاع به جراحی اندوکرین؛}\\\\\n    \\rl{ترمیم خودبه‌خودی استخوان فک}\n};\n\n% 4. Mandatory Incisional Biopsy\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی الزامی (\\lr{Incisional / Core Biopsy}) و مپینگ سه‌بعدی با \\lr{CBCT}}}}\\\\[2pt]\n    \\scriptsize \\rl{پاتولوژی: سلول‌های غول‌آسا چند‌هسته‌ای در استرومای فیبروبلاستی $\\bullet$ بررسی پرفوراسیون کورتکس و تحلیل ریشه}\n};\n\n% 5. Biological Phenotype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{فنوتیپ ضایعه}\\\\[-1pt]\\scriptsize \\lr{Phenotype?}};\n\n% 6. 4 Main Clinical Presentation Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{غیرتهاجمی (\\lr{Non-Aggr})}}\\\\[2pt]\n    \\scriptsize \\rl{رشد آهسته، کوچکتر از ۲ سانتی‌متر}\\\\\\rl{کورتکس سالم؛ بدون پرفوراسیون}\\\\\\rl{عود سالیانه: \\colorbox{hlgray}{\\strut\\textbf{۲٫۴٪}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{اطفال / حفظ جوانه دندان}}\\\\[2pt]\n    \\scriptsize \\rl{دندان‌های مختلط، مجاور جوانه‌ها}\\\\\\rl{هدف: حفظ دندان و پیشگیری از نقص فک}\\\\\\rl{اولویت: \\textbf{درمان دارویی محافظه‌کارانه}}\n};\n\\node (h3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{تهاجمی / پرفوره (\\lr{Aggr})}}\\\\[2pt]\n    \\scriptsize \\rl{رشد سریع، بزرگتر از ۳ سانتی‌متر، درد}\\\\\\rl{تحلیل ریشه و پرفوراسیون کورتکس}\\\\\\rl{عود با کورتاژ: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۴۹٪ تا ۷۲٪}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{غیرقابل جراحی / راجعه}}\\\\[2pt]\n    \\scriptsize \\rl{قاعده جمجمه، عبور از خط وسط}\\\\\\rl{رزکسیون وسیع با دفورمیتی شدید همراه است}\\\\\\rl{اندیکاسیون: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{درمان بیولوژیک}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{کورتاژ + استکتومی محیطی}}\\\\[2pt]\n    \\scriptsize \\rl{کورتاژ کامل همراه با ۱ تا ۲ میلی‌متر}\\\\\\rl{استکتومی محیطی با فرز چرخشی}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{کورتیکواستروئید داخل ضایعه}}\\\\[2pt]\n    \\scriptsize \\lr{Triamcinolone 10\\,mg/mL + Lido 2\\%}\\\\\\rl{تزریق هفتگی به مدت ۶ هفته}\n};\n\\node (i3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{رزکسیون یا کلسیتونین}}\\\\[2pt]\n    \\scriptsize \\rl{رزکسیون با \\textbf{مارجین ۵ میلی‌متر}}\\\\\\rl{یا کلسیتونین زیرجلدی به مدت ۱۲ ماه}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{دنوزوماب نئوادجوانت \\emoji{🎯}}}\\\\[2pt]\n    \\scriptsize \\lr{Denosumab 120\\,mg q4w $\\times$ 6--12m}\\\\\\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{خطر: هیپرکلسمی ریباند}}}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه یکبار}}}\\\\[2pt]\n    \\scriptsize \\rl{رادیوگرافی پایه \\lr{CBCT} و پانورامیک}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۳ تا ۴ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش رمینرالیزاسیون و تکامل ریشه}\n};\n\\node (s3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۴ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش در بازه اوج خطر عود (سال ۱ و ۲)}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{پایش ماهانه آزمایشگاه}}}\\\\[2pt]\n    \\scriptsize \\rl{سنجش کلسیم و فسفر تا ۶ ماه پس از قطع}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{اندیکاسیون‌های الزامی برای تصویربرداری مجدد و مداخله درمانی فوری:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{انجام فوری \\lr{CBCT} و مداخله درمانی اجباری است در:}} (۱) تورم مجدد کورتکس یا لوسنسی جدید در محل جراحی $\\bullet$ (۲) درد یا حساسیت پایدار و فزاینده استخوان $\\bullet$ (۳) لقی ثانویه یا انحراف ریشه دندان‌های مجاور $\\bullet$ (۴) پرفوراسیون پیشرونده کورتکس استخوانی $\\bullet$ (۵) بحران هیپرکلسمی بازگشتی (\\lr{Rebound}) بعد از قطع دنوزوماب.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل افزایش گام‌به‌گام درمان برای موارد مقاوم / راجعه / غیرقابل جراحی:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (ضد استئوکلاست):} کلسیتونین سالمون زیرجلدی (\\lr{100 IU/day}) روزانه به مدت ۱۲ تا ۱۸ ماه (موجب پرشدن ماتریکس استخوانی می‌شود).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۴ (مهار \\lr{RANKL}):} دنوزوماب زیرجلدی (روزهای ۱، ۸، ۱۵، ۲۹، سپس هر ۴ هفته؛ \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{پایش دقیق کلسیم و تیپرینگ تدریجی}}).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۵ (هدفمند / سالواژ جراحی):} مهارکننده‌های \\lr{MEK} (ترامترینیب برای جهش‌های \\lr{TRPV4/KRAS}) یا رزکسیون سگمنتال جراحی همراه با بازسازی فلپ آزاد فیبولا.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله (افزایش)}} (r_brown.west);\n\\draw [arrow] (d1.south) -- node[right=4pt, font=\\scriptsize\\bfseries] {\\rl{خیر (نرمال)}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Histology columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    developmental_lesions: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: developmental_lesions\n% DOC_SLUG: developmental_lesions\n% DOC_CATEGORY: cat_developmental\n% DOC_TITLE: الگوریتم جامع: ضایعات تکاملی و سلول غول‌آسای فکین\n% DOC_ALIASES: developmental lesions, ضایعات تکاملی, جاینت سل, CGCG, کیست آنوریسمال, ABC, تومور براون, شروبیسم, SH3BP2\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Giant Cell Lesions and Bone Cysts.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 42361776 - Guimarães LM et al. (Semin Diagn Pathol 2026) Molecular Pathology of Distinctive Giant Cell Lesions.\n% 4. PMID: 41456990 - Leonardi N et al. (Oral Surg Oral Med 2026) Bone Regeneration in Expansile Jaw Lesions.\n% 5. PMID: 35476304 - Oginni FO et al. (Oral Maxillofac Surg 2023) Targeted Biological Therapies in Jaw Giant Cell Lesions.\n% 6. PMID: 38814761 - Denosumab vs Intralesional Triamcinolone in Aggressive CGCG Meta-Analysis.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ضایعات تکاملی و سلول غول‌آسای فکین}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Developmental and Giant Cell Lesions of the Jaws (Differential Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ اندوکرین (\\lr{PTH})، سنجش ژن‌های \\lr{SH3BP2} و \\lr{USP6}، تزریق استروئید داخل ضایعه و درمان‌های هدفمند بیولوژیک}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و رادیوگرافیک: اتساع استخوان فک با رادیولوسنسی اکسپنسیل تک یا چندحفره‌ای}}\\\\[2pt]\n    \\scriptsize \\rl{اتساع مندیبل یا ماگزیلا $\\bullet$ جابجایی یا تحلیل ریشه دندان‌ها $\\bullet$ توده با قوام الاستیک یا نمای حباب صابونی}\n};\n\n% 2. Mandatory Endocrine Screening\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تریاژ آزمایشگاهی اندوکرین (سنجش \\lr{iPTH} و کلسیم سرم) و آسپیراسیون سوزنی}}}\\\\[2pt]\n    \\scriptsize \\rl{رد قطعی تومور براون هیپرپاراتیروئیدیسم $\\bullet$ ارزیابی آسپیراسیون مایع خونی (مشکوک به کیست آنوریسمال یا مالفورماسیون عروقی)}\n};\n\n% 3. Hyperparathyroidism Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{افزایش}\\\\[-1pt]\\scriptsize \\lr{PTH / Ca?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{تومور براون (\\lr{HPT}) \\emoji{⚖}}}\\\\[2pt]\n    \\scriptsize \\rl{افزایش پاراتورمون و کلسیم سرم؛}\\\\\\rl{ارجاع فوری به جراحی اندوکرین؛}\\\\\\rl{ترمیم خودبه‌خودی استخوان فک}\n};\n\n% 4. Mandatory Biopsy & Molecular Assessment\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی الزامی (\\lr{Incisional Biopsy}) و سنجش ژنتیک \\lr{USP6} و \\lr{SH3BP2} و مپینگ سه‌بعدی \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{تفکیک سلول‌های غول‌آسا چند‌هسته‌ای در استرومای فیبروبلاستی $\\bullet$ بررسی بازآرایی \\lr{USP6} در \\lr{ABC} و موتاسیون \\lr{SH3BP2} در شروبیسم \\lr{[\\textbf{PMID: 42361776}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{فنوتیپ و پاتولوژی}\\\\[-1pt]\\scriptsize \\lr{Clinical Phenotype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{\\lr{CGCG} غیرتهاجمی}}\\\\[2pt]\n    \\scriptsize \\lr{Non-Aggressive CGCG}\\\\\\rl{رشد آهسته، کوچکتر از ۲ سانتی‌متر}\\\\\\rl{کورتکس سالم؛ بدون تحلیل ریشه}\\\\\\rl{عود با کورتاژ: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۱۰٪}}}}\n};\n\\node (h2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{\\lr{CGCG} تهاجمی \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Aggressive CGCG}\\\\\\rl{رشد سریع، درد و پرفوراسیون کورتکس}\\\\\\rl{تحلیل ریشه و جابجایی دندان‌ها}\\\\\\rl{عود با کورتاژ ساده: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۴۰٪ تا ۷۰٪}}}\n};\n\\node (h3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{کیست آنوریسمال (\\lr{ABC})}}\\\\[2pt]\n    \\scriptsize \\lr{Aneurysmal Bone Cyst}\\\\\\rl{فضاهای عروقی پر از خون فاقد اندوتلیوم}\\\\\\rl{بازآرایی ژن \\lr{USP6} نئوپلاستیک}\\\\\\rl{عود با کورتاژ ساده: \\textbf{۲۰٪ تا ۳۰٪}}\n};\n\\node (h4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{شروبیسم فامیلیال}}\\\\[2pt]\n    \\scriptsize \\lr{Cherubism (SH3BP2)}\\\\\\rl{اتساع دوطرفه قرینه زاویه فکین در اطفال}\\\\\\rl{چهره فرشته‌گونه و نمای چشم به آسمان}\\\\\\rl{پسرفت خودبه‌خودی: \\colorbox{hlgray}{\\strut\\textbf{\\rl{پس از بلوغ}}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{کورتاژ + استکتومی}}\\\\[2pt]\n    \\scriptsize \\rl{کورتاژ کامل بافت ضایعه}\\\\\\rl{استکتومی محیطی ۱ تا ۲ میلی‌متر}\\\\\\rl{حفظ دندان‌ها و استخوان فک}\n};\n\\node (i2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{تزریق استروئید یا دنوزوماب}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{تریامسینولون هفتگی داخل ضایعه}}\\\\\\rl{به مدت ۶ هفته، یا رزکسیون مارجینال}\\\\\\rl{دنوزوماب در موارد شدید \\lr{[\\textbf{PMID: 35476304}]}}\n};\n\\node (i3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{کورتاژ + کرایوتراپی}}\\\\[2pt]\n    \\scriptsize \\rl{تخلیه کامل حفرات عروقی}\\\\\\rl{کاربرد ادجوانت کرایوتراپی یا فنل}\\\\\\rl{اسکلروتراپی با داکسی‌سایکلین در موارد وسیع}\n};\n\\node (i4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{مشاهده و مدیریت انتظاری}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{پرهیز از جراحی در فاز فعال رشد}}\\\\\\rl{کانتورینگ صورت فقط در صورت اختلال شدید}\\\\\\rl{به تعویق انداختن مداخله تا پایان بلوغ}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{تصویربرداری پانورامیک دوره‌ای؛}\\\\\\rl{تایید استخوان‌سازی بستر}\n};\n\\node (s2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۴ ماه (۲ سال)}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش دقیق با \\lr{CBCT}؛}\\\\\\rl{بررسی پرفوراسیون و عود زودهنگام}\n};\n\\node (s3) [stepbox, line width=0.9pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۳ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش پرشدن لومن عروقی با استخوان؛}\\\\\\rl{تصویربرداری دوره‌ای فک}\n};\n\\node (s4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا پایان بلوغ}}}\\\\[2pt]\n    \\scriptsize \\rl{فتوگرافی سالانه کانتور صورت؛}\\\\\\rl{پایش مسیر رویش دندان‌ها و تنفس}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا مداخله جراحی مجدد (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری تشخیصی-درمانی در:}} (۱) رشد سریع غیرعادی یا پرفوراسیون کورتکس باکال/لینگوال $\\bullet$ (۲) خونریزی ضربان‌دار حاد حین بیوپسی یا آسپیراسیون سوزنی (خطر مالفورماسیون عروقی با فلوی بالا) $\\bullet$ (۳) اختلال تنفسی یا دیسفاژی ناشی از اتساع توده شروبیسم به راه هوایی یا کام $\\bullet$ (۴) بروز بحران هیپرکلسمی بازگشتی (\\lr{Rebound Hypercalcemia}) پس از قطع دنوزوماب $\\bullet$ (۵) شکستگی پاتولوژیک فک ناشی از استئولیز وسیع.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، درمان‌های نوین هدفمند و پایش تومور جاینت‌سل (\\lr{Malignancy Surveillance}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (مهار هدفمند \\lr{RANKL}):} کاربرد دنوزوماب زیرجلدی (\\lr{120\\,mg}) در روزهای ۱، ۸، ۱۵، ۲۹ و سپس هر ۴ هفته در ضایعات راجعه و وسیع با پایش دقیق کلسیم و تیپرینگ تدریجی جهت پیشگیری از هیپرکلسمی بازگشتی.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار آنزیمی مولکولی):} مهارکننده مسیر \\lr{MAPK} (\\lr{Trametinib}) در بیماران مبتلا به جهش‌های \\lr{TRPV4/KRAS} با ضایعات اگرسیو مقاوم به استروئید.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} بیوپسی برشی مجدد در صورت تغییر رفتار بیولوژیک جهت رد تومور ژانت سل بدخیم فک (\\lr{Malignant Giant Cell Tumor}) یا استئوسارکوم غنی از ژانت سل.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله (افزایش)}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{خیر (نرمال)}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n% Final link to Refractory Box\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    fibro_osseous: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: fibro_osseous\n% DOC_SLUG: fibro_osseous\n% DOC_CATEGORY: cat_fibro_osseous\n% DOC_TITLE: الگوریتم جامع: ضایعات فیبرو-استخوانی فکین (تشخیص افتراقی)\n% DOC_ALIASES: fibro osseous, فیبرو استخوانی, فیبروز دیسپلازی, اسیفایینگ فیبروم, JOF, استئوما, گاردنر, GNAS\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Fibro-osseous and Bone-forming Lesions.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 42361776 - Guimarães LM et al. (Semin Diagn Pathol 2026) Molecular Pathology of Fibro-osseous Lesions (GNAS, MDM2).\n% 4. PMID: 41733218 - Zhang AB et al. (J Dent Res 2026) Histologic Differentiation of FD vs COF vs COD.\n% 5. PMID: 42750839 - Spenrath B et al. (Case Rep Dent 2026) Aggressive Juvenile Trabecular Ossifying Fibroma Management.\n% 6. PMID: 41911949 - Moon JE et al. (J Craniofac Surg 2026) Diagnostic Protocols for Craniofacial Osteomas.\n% 7. PMID: 42867685 - Liu M, He S. (Skeletal Radiol 2026) Pediatric Gardner Syndrome & Osteoma Screening.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ضایعات فیبرو-استخوانی فکین}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Benign Fibro-Osseous Lesions of the Jaws (Differential Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ سی‌تی اسکن سه‌بعدی، سنجش موتاسیون \\lr{GNAS} و \\lr{MDM2}، تفکیک کپسولاسیون، کانتورینگ جراحی و پایش بدخیمی}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و رادیوگرافیک: اتساع استخوان فک با نمای میکسد یا شیشه مات (\\lr{Ground-Glass})}}\\\\[2pt]\n    \\scriptsize \\rl{اتساع بدون درد کورتکس باکال/لینگوال $\\bullet$ محو شدن لامینا دورا $\\bullet$ نمای پوست پرتقالی (\\lr{Peau d'orange}) در سی‌تی اسکن}\n};\n\n% 2. Mandatory 3D-CT & Endocrine Triage\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: سی‌تی اسکن سه‌بعدی کرانیوفاشیال، غربالگری اندوکرین و پایش کانال اپتیک}}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی حدود ضایعه (ادغام در استخوان سالم در برابر کپسولاسیون مشخص) $\\bullet$ سنجش کلسیم، فسفر و \\lr{ALP} $\\bullet$ رد سندرم مک‌کون-آلبرایت}\n};\n\n% 3. Growth Phase Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{فاز رشد / سن؟}\\\\[-1pt]\\scriptsize \\lr{Dormant / Age?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{فیبروز دیسپلازی خاموش \\emoji{⚓}}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه پایدار پس از بلوغ؛}\\\\\\rl{فاقد نقص فانکشنال یا دیداری؛}\\\\\\rl{پایش دوره‌ای سالانه بدون جراحی}\n};\n\n% 4. Mandatory Incisional Biopsy & Molecular Testing\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی الزامی (\\lr{Incisional Biopsy}) + سنجش مولکولی \\lr{GNAS (Arg201)} و مارکر \\lr{MDM2} \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{تایید جهش \\lr{GNAS} در فیبروز دیسپلازی $\\bullet$ رد قطعی استئوسارکوم درجه پایین با منفی بودن \\lr{MDM2} \\lr{[\\textbf{PMID: 42361776}]} $\\bullet$ ارزیابی ریمینگ استئوبلاستی}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{نوع هیستوپاتولوژی}\\\\[-1pt]\\scriptsize \\lr{Histopathologic Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{فیبروز دیسپلازی (\\lr{FD})}}\\\\[2pt]\n    \\scriptsize \\lr{Fibrous Dysplasia}\\\\\\rl{استخوان نابالغ شبه‌حروف چینی}\\\\\\rl{فاقد ریمینگ استئوبلاستی؛ جهش \\lr{GNAS+}}\\\\\\rl{عود پس از بلوغ: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۵٪}}}}\n};\n\\node (h2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{اسیفایینگ فیبروم (\\lr{OF})}}\\\\[2pt]\n    \\scriptsize \\lr{Cemento-Ossifying Fibroma}\\\\\\rl{ضایعه نئوپلاستیک کپسول‌دار مشخص}\\\\\\rl{ترابکول استخوان + سمنتوم کروی}\\\\\\rl{عود با خارج‌سازی کامل: \\textbf{۸٪ تا ۱۰٪}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{اسیفایینگ فیبروم جوانی \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Juvenile Ossifying Fibroma (JOF)}\\\\\\rl{ساب‌تایپ ترابکولار یا پساموماتوئید}\\\\\\rl{رشد سریع تخریبی در سنین اطفال}\\\\\\rl{عود با کورتاژ: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۳۰٪ تا ۵۸٪}}}\n};\n\\node (h4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{استئوما / سندرم گاردنر}}\\\\[2pt]\n    \\scriptsize \\lr{Osteoma / Gardner Syndrome}\\\\\\rl{توده متراکم کورتیکال/ترابکولار}\\\\\\rl{غربالگری پولیپوز روده الزامی}\\\\\\rl{عود پس از اکسیزیون: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۱٪}}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{کانتورینگ جراحی (\\lr{Shaving})}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{به تعویق انداختن تا پایان بلوغ}}\\\\\\rl{تراش محافظه‌کارانه برای تقارن صورت}\\\\\\rl{پرهیز اکید از رزکسیون‌های رادیکال}\n};\n\\node (i2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{انوکلئیشن ان‌بلوک}}\\\\[2pt]\n    \\scriptsize \\rl{جداسازی تمیز توده از بستر استخوانی}\\\\\\rl{استفاده از خط انفصال کپسول}\\\\\\rl{کورتاژ حاشیه‌ای برای پیشگیری از عود}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{رزکسیون یا کورتاژ تهاجمی}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{اکسیزیون کامل با مارجین سالم استخوان}}\\\\\\rl{\\lr{[\\textbf{PMID: 42750839}]}}\\\\\\rl{رزکسیون سگمنتال در عودهای مهاجم}\n};\n\\node (i4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون استخوانی ساده}}\\\\[2pt]\n    \\scriptsize \\rl{استئوتومی در قاعده ضایعه}\\\\\\textbf{\\rl{کولونوسکوپی غربالگری روده}}\\\\\\rl{\\lr{[\\textbf{PMID: 42867685}]}}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا پایان بلوغ}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش بالینی و فتوگرافی کانتور صورت؛}\\\\\\rl{سی‌تی اسکن کم‌دوز در صورت تغییر}\n};\n\\node (s2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{رادیوگرافی پانورامیک و \\lr{CBCT}؛}\\\\\\rl{پایش پرشدن بستر استخوانی}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۶ ماه (۵ سال)}}}\\\\[2pt]\n    \\scriptsize \\rl{سی‌تی اسکن دوره‌ای چندمقطعی؛}\\\\\\rl{پایش پنجره اوج عود زودهنگام}\n};\n\\node (s4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۳ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه کلینیکی و تصویربرداری فک؛}\\\\\\rl{پیگیری گوارشی دوره‌ای در گاردنر}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا مداخله جراحی اورژانسی (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری تشخیصی-درمانی در:}} (۱) اختلال حاد دید، افت حدت بینایی یا درگیری کانال اپتیک در اسفنوئید/قاعده جمجمه $\\bullet$ (۲) رشد سریع غیرعادی یا بروز درد فزاینده خارج از جهش بلوغ $\\bullet$ (۳) پیدایش لیتیک یا تخریب نامنظم استخوانی جدید در سی‌تی اسکن (مشکوک به بدخیمی) $\\bullet$ (۴) بیرون‌زدگی کره چشم (\\lr{Proptosis}) ناشی از اتساع به اربیت $\\bullet$ (۵) شکستگی پاتولوژیک فک.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، درمان‌های نوین ضد جذب و پایش دگرگونی سارکوماتوز (\\lr{Malignancy Surveillance}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (منع مطلق):} \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{پرتودرمانی} (\\lr{Radiotherapy}) \\rl{اکیداً ممنوع است}}} (افزایش خطر ترانسفورماسیون به استئوسارکوم ثانویه ناشی از پرتو تا ۴۰ برابر).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار دردهای استخوانی مقاوم):} بیس‌فسفونات‌های وریدی (\\lr{Pamidronate / Zoledronate}) یا آنتی‌بادی مونوکلونال ضد \\lr{RANKL} (\\lr{Denosumab}) با پایش دقیق کلسیم و ریسک \\lr{MRONJ}.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} بیوپسی برشی عمیق فوری در صورت تغییرات سریع تصویری جهت رد استئوسارکوم، فیبروسارکوم یا کندروسارکوم ثانویه (میزان شیوع حدود ۰٫۴٪ تا ۱٪ در ضایعات مزمن باسابقه).}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{خاموش (پایدار)}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{فعال / پیشرونده}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n% Final link to Refractory Box\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    fibrous_dysplasia: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: فیبروز دیسپلازی فکین (\\lr{Fibrous Dysplasia})}\\\\[2pt]\n{\\small\\itshape تریاژ رادیوگرافیک و سی‌تی، سنجش موتاسیون ژن \\lr{GNAS}، پایش درگیری جمجمه/اپتیک، کانتورینگ جراحی و استراتژی‌های ضد جذب استخوان}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و رادیوگرافیک: اتساع فک و نمای شیشه مات (\\lr{Ground-Glass})}}\\\\[2pt]\n    \\scriptsize \\rl{تورم بدون درد استخوان ماگزیلا یا مندیبل $\\bullet$ نمای پوست پرتقالی (\\lr{Peau d'orange}) در سی‌تی $\\bullet$ محو شدن لامینا دورا}\n};\n\n% 2. Diagnostic Workup & Triage\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: سی‌تی اسکن سه‌بعدی جمجمه و صورت و غربالگری اندوکرین (\\lr{MAS})}}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی وسعت کرانیوفاشیال $\\bullet$ بررسی لکه‌های کافه‌او‌له (\\lr{Café-au-lait}) و بلوغ زودرس در سندرم مک‌کون-آلبرایت $\\bullet$ رد سندرم مازابرو}\n};\n\n% 3. Extent Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{نوع درگیری؟}\\\\[-1pt]\\scriptsize \\lr{Extent?}};\n\\node (r_monostotic) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{مونواستوتیک خاموش \\emoji{⚓}}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه پایدار در بزرگسالان؛}\\\\\\rl{فاقد علائم حسی و فانکشنال؛}\\\\\\rl{پایش بالینی دوره‌ای سالانه}\n};\n\n% 4. Mandatory Incisional Biopsy & Molecular Testing\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی الزامی و سنجش مولکولی موتاسیون ژن \\lr{GNAS} (\\lr{Codon Arg201})}}}\\\\[2pt]\n    \\scriptsize \\rl{ترابکول‌های استخوان نابالغ شبه‌حروف چینی فاقد ریمینگ استئوبلاستی $\\bullet$ رد استئوسارکوم درجه پایین، فیبروم استخوان‌ساز و استئومیلیت}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{رفتار و زیرگروه}\\\\[-1pt]\\scriptsize \\lr{Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{مونواستوتیک خفیف}}\\\\[2pt]\n    \\scriptsize \\lr{Mild Monostotic}\\\\\\rl{محدود به یک فک، بدون اختلال}\\\\\\rl{ریسک پیشرفت: \\colorbox{hlgray}{\\strut\\textbf{کمتر از ۵٪}}}\n};\n\\node (h2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{کرانیوفاشیال فعال}}\\\\[2pt]\n    \\scriptsize \\lr{Active Juvenile Craniofacial}\\\\\\rl{اتساع پیشرونده و عدم تقارن}\\\\\\rl{رشد در فاز بلوغ: \\textbf{فعال}}\n};\n\\node (h3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{پلی‌استوتیک / سندرم \\lr{MAS}}}\\\\[2pt]\n    \\scriptsize \\lr{Polyostotic / McCune-Albright}\\\\\\rl{چندین استخوان و اختلال اندوکرین}\\\\\\rl{درد استخوان و ترن‌اور: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{بالا}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{درگیری کانال اپتیک \\emoji{👁}}}\\\\[2pt]\n    \\scriptsize \\lr{Optic Canal / Skull Base}\\\\\\rl{نزدیکی به عصب بینایی، اسفنوئید}\\\\\\rl{ریسک اختلال دید: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{اورژانسی}}}\n};\n\n% 7. Primary Surgical Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{مشاهده و مدیریت انتظاری}}\\\\[2pt]\n    \\scriptsize \\rl{پرهیز از جراحی زودهنگام}\\\\\\rl{پایش دوره‌ای بالینی و تصویربرداری}\\\\\\rl{آموزش علائم هشداردهنده}\n};\n\\node (i2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{کانتورینگ جراحی (\\lr{Shaving})}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{به تعویق انداختن تا پایان بلوغ}}\\\\\\rl{تراش محافظه‌کارانه برای کانتور صورت}\\\\\\rl{پرهیز از رزکسیون تخریبی رادیکال}\n};\n\\node (i3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{بیس‌فسفونات‌های وریدی}}\\\\[2pt]\n    \\scriptsize \\lr{Pamidronate / Zoledronate}\\\\\\rl{کنترل دردهای استخوانی مقاوم}\\\\\\rl{کاهش بازجذب و تثبیت ضایعات}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{دکمپرسیون فوری عصب اپتیک}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{فقط در صورت نقص عینی دید}}\\\\\\rl{جراحی مشترک با جراح مغز و اعصاب}\\\\\\rl{پرهیز از دکمپرسیون پیشگیرانه}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه بالینی و فوتوگرافی}\\\\\\rl{رادیوگرافی ساده در صورت تغییر}\n};\n\\node (s2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا پایان بلوغ}}}\\\\[2pt]\n    \\scriptsize \\rl{سی‌تی اسکن کم‌دوز در فاز رشد}\\\\\\rl{پایش تقارن کانتور اسکلت صورت}\n};\n\\node (s3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۶ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{سنجش کلسیم، \\lr{ALP} و \\lr{CTX}}\\\\\\rl{اسکن دانسیتومتری استخوان}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۱ تا ۳ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{پریمتری خودکار کامپیوتری}\\\\\\rl{ثبت پتانسیل برانگیخته دیداری (\\lr{VEP})}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا مداخله جراحی (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{اقدام فوری تشخیصی-درمانی در:}} (۱) افت حاد یا پیشرونده حدت بینایی یا نقص میدان دید \\lr{Visual Field Defect} $\\bullet$ (۲) رشد انفجاری سریع یا بروز درد شدید شبانه خارج از دوره جهش بلوغ $\\bullet$ (۳) پیدایش لیتیک یا تخریب استخوانی نامنظم جدید در سی‌تی اسکن (مشکوک به بدخیمی) $\\bullet$ (۴) بیرون‌زدگی کره چشم (\\lr{Proptosis}) یا دیپلوپیا $\\bullet$ (۵) شکستگی پاتولوژیک فک یا استخوان‌های مجاور.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، درمان‌های نوین بیولوژیک و پایش دگرگونی بدخیم (\\lr{Malignancy Surveillance}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (منع مطلق):} \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{پرتودرمانی (\\lr{Radiotherapy}) اکیداً ممنوع است}} (افزایش خطر ابتلا به سارکوم ثانویه ناشی از پرتو تا ۴۰ برابر).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار هدفمند استئوکلاست):} آنتی‌بادی مونوکلونال ضد \\lr{RANKL} (\\lr{Denosumab}) در موارد شدید، گسترده و مقاوم به بیس‌فسفونات‌ها با پایش دقیق هیپوکلسمی و استئونکروز فک (\\lr{MRONJ}).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} نمونه‌برداری برشی فوری در صورت تغییر سریع رادیوگرافیک جهت رد استئوسارکوم، فیبروسارکوم یا کندروسارکوم ثانویه (میزان شیوع حدود ۰٫۵٪ تا ۱٪ در موارد باسابقه طولانی).}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{خاموش (پایدار)}} (r_monostotic.west);\n\\draw [arrow] (d1.south) -- node[right=6pt, font=\\scriptsize\\bfseries] {\\rl{فعال / پیشرونده}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    inflammatory_lesions: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: inflammatory_lesions\n% DOC_SLUG: inflammatory_lesions\n% DOC_CATEGORY: cat_inflammatory\n% DOC_TITLE: الگوریتم جامع: ضایعات التهابی و واکنشی فکین و مخاط دهان\n% DOC_ALIASES: inflammatory lesions, ضایعات التهابی, گرانولوم پیوژنیک, اپولیس, PGCG, استئونکروز, MRONJ, فیبروم واکنشی\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Reactive and Inflammatory Lesions.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41456990 - Leonardi N et al. (Oral Surg Oral Med Oral Pathol Oral Radiol 2026) MRONJ Stages I-II Surgical & PenTo Protocol.\n% 4. PMID: 41969602 - Taguchi A et al. (Osteoporos Sarcopenia 2026) Consensus Statement on Medication-Related ONJ.\n% 5. PMID: 42532523 - He Y. (Zhonghua Kou Qiang Yi Xue Za Zhi 2026) Precision Therapeutic Strategies in Jaw Osteonecrosis.\n% 6. PMID: 39340412 - Alsabbagh R et al. (Clin Adv Periodontics 2025) Peripheral Gingival Lesions Differential Diagnosis.\n% 7. AAOMS 2022/2024 Position Paper on Medication-Related Osteonecrosis of the Jaw (Staging & Margin Criteria).\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ضایعات التهابی و واکنشی فکین و مخاط}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Inflammatory and Reactive Lesions of the Oral Cavity and Jaws}}\\\\[3pt]\n{\\small\\itshape تریاژ توده‌های ژنژیوال، پایش دارویی ضد جذب استخوان، کورتاژ پریوستال و پروتکل‌های دبریدمان \\lr{MRONJ}}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: توده اگروفیتیک ژنژیوال، تورم اریتماتوز یا استخوان اکسپوز نکروتیک}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه پدانکوله/سسیل لثه $\\bullet$ توده خونریزی‌دهنده با لمس $\\bullet$ استخوان برهنه فک با سابقه مصرف آنتی‌رزورپتیو}\n};\n\n% 2. Mandatory Triage & Drug History\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: ثبت دقیق سابقه دارویی (بیس‌فسفونات/دنوزوماب)، رادیوگرافی و حذف محرک موضعی}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی جرم و پلاک زیرلثه‌ای $\\bullet$ تصویربرداری پری‌آپیکال و سی‌بی‌سی‌تی (بررسی تحلیل استخوان کاسه‌ای یا سکوئستر نکروتیک)}\n};\n\n% 3. Drug-Induced Necrosis Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{استخوان اکسپوز؟}\\\\[-1pt]\\scriptsize \\lr{Exposed Bone?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{فیبروم تحریکی سطحی \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{توده فیبروز بدون عروق زایی فزاینده؛}\\\\\\rl{اکسیزیون ساده و رفع سایش دندانی؛}\\\\\\rl{پیش‌آگهی قطعی و بدون عود}\n};\n\n% 4. Mandatory Biopsy & AAOMS Staging\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی بافتی الزامی (\\lr{Biopsy}) و استیجینگ بالینی استئونکروز (\\rl{استیج‌های ۰ تا ۳} \\lr{AAOMS}) \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی ارتشاح عروقی، حضور سلول‌های ژانت چند‌هسته‌ای و گرانولاسیون $\\bullet$ بررسی درگیری کورتکس در استئونکروز فک \\lr{[\\textbf{PMID: 41456990}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{پاتولوژی و اتیولوژی}\\\\[-1pt]\\scriptsize \\lr{Histopathologic Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{گرانولوم پیوژنیک (\\lr{PG})}}\\\\[2pt]\n    \\scriptsize \\lr{Pyogenic Granuloma}\\\\\\rl{پرولیفراسیون عروقی با ارتشاح التهابی}\\\\\\rl{همراهی با بارداری (\\lr{Epulis Gravidarum})}\\\\\\rl{عود با حذف محرک: \\colorbox{hlgray}{\\strut\\textbf{\\rl{۳٪ تا ۵٪}}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{اپولیس فیبروماتوز}}\\\\[2pt]\n    \\scriptsize \\lr{Fibromatous Epulis}\\\\\\rl{بافت همبند کلاژنی متراکم و هایپوسلولار}\\\\\\rl{پاسخ واکنشی به ترومای مکانیکی مکرر}\\\\\\rl{عود پس از جراحی: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٪}}}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{سلول غول‌آسای محیطی \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Peripheral Giant Cell (PGCG)}\\\\\\rl{سلول‌های ژانت چند‌هسته‌ای + هموسیدرین}\\\\\\rl{تحلیل استخوان کاسه‌ای کورتکس (\\lr{Cupping})}\\\\\\rl{عود بدون کورتاژ عمقی: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۱۰٪ تا ۱۵٪}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{استئونکروز دارویی (\\lr{MRONJ})}}\\\\[2pt]\n    \\scriptsize \\lr{Medication-Related ONJ}\\\\\\rl{استخوان نکروتیک فاقد استئوسیت}\\\\\\rl{استیج \\lr{I} تا \\lr{III} طبق \\lr{AAOMS 2024}}\\\\\\rl{پروتکل چندتخصصی \\lr{[\\textbf{PMID: 41969602}]}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون کامل + جرم‌گیری}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون تا سطح پریوست}\\\\\\rl{جرم‌گیری کامل و روت پلنینگ دندان}\\\\\\textbf{\\rl{تعویق جراحی در بارداری تا زایمان}}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{اکسیزیون جراحی ساده}}\\\\[2pt]\n    \\scriptsize \\rl{برداشتن کامل توده فیبروزه}\\\\\\rl{اصلاح لبه تیز دندان یا ترمیم مجاور}\\\\\\rl{ارسال کامل نمونه جهت تایید پاتولوژی}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{اکسیزیون + کورتاژ پریوست}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{کورتاژ عمقی پریوست و بستر استخوان}}\\\\\\rl{جرم‌گیری ریشه دندان مجاور}\\\\\\rl{تراش سطحی استخوان برای جلوگیری از عود}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{دبریدمان جراحی + \\lr{PenTo}}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{پنتوکسی‌فیلین + توکوفرول (\\lr{PenTo})}}\\\\\\rl{سکوئسترکتومی محافظه‌کارانه + \\lr{PRF}}\\\\\\rl{پوشش کامل فلپ موکوزال \\lr{[\\textbf{PMID: 41456990}]}}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۱ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی بهداشت دهان؛}\\\\\\rl{پایش عدم وجود جرم و محرک موضعی}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه بالینی ساده لثه؛}\\\\\\rl{اطمینان از سازگاری پروتز و دندان}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ تا ۶ ماه (۲ سال)}}}\\\\[2pt]\n    \\scriptsize \\rl{رادیوگرافی پری‌آپیکال دوره‌ای؛}\\\\\\rl{پایش بازسازی استخوان حاشیه‌ای}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{ماهانه؛ سپس هر ۲ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش بسته ماندن بافت نرم؛}\\\\\\rl{بررسی علائم عفونت و ترشح فیستول}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا مداخله جراحی اورژانسی (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری تشخیصی-درمانی در:}} (۱) پیشرفت استخوان برهنه یا پیدایش فیستول چرکی خارج دهانی در فک $\\bullet$ (۲) بی‌حسی لب تحتانی یا چانه \\rl{علامت وینسنت} (\\lr{Paresthesia}) ناشی از نکروز مجاور عصب منتال $\\bullet$ (۳) پیدایش لیتیک وسیع نامنظم استخوانی با واکنش پریوستئال (مشکوک به استئومیلیت حاد یا کارسینوم استخوان) $\\bullet$ (۴) عود مکرر و سریع توده لثه با رشد انفجاری $\\bullet$ (۵) شکستگی پاتولوژیک فک تحتانی به دلیل استئونکروز گرید \\lr{III}.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، درمان‌های پیشرفته بازسازی و پایش دگرگونی بدخیم (\\lr{Refractory Protocols}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (سالواژ استئونکروز پیشرفته):} رزکسیون سگمنتال استخوان فک نکروتیک همراه با بازسازی فوری با فلپ آزاد فیبولا (\\lr{Microvascular Fibula Free Flap}) در موارد استیج \\lr{III} مقاوم به درمان‌های دارویی.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (اکسیژن هایپرباریک ادجوانت):} کاربرد \\lr{Hyperbaric Oxygen (HBO)} به عنوان درمان کمکی در استئورادیونکروز و موارد مقاوم به منظور تحریک آنژیوژنز و ترمیم بستر زخم.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} بیوپسی از بافت گرانولاسیون حاشیه استخوان نکروتیک در هر بیمار بدون سابقه مشخص دارویی/پرتودرمانی جهت رد کارسینوم سلول سنگفرشی لثه (\\lr{Gingival SCC}) که می‌تواند نمای مشابه استئونکروز ایجاد کند.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{خیر (سطحی)}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{بله / توده لثه‌ای}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n% Final link to Refractory Box\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    malignancy: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: malignancy\n% DOC_SLUG: malignancy\n% DOC_CATEGORY: cat_malignancy\n% DOC_TITLE: الگوریتم جامع: بدخیمی‌های دهان، فکین و غدد بزاقی\n% DOC_ALIASES: malignancy, بدخیمی دهان, OSCC, استئوسارکوم, آدنوئید کیستیک, موکواپیدرموئید, کارسینوم سلول سنگفرشی, سارکوم\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Carcinomas, Sarcomas & Salivary Malignancies.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41910924 - Yang KS et al. (Otolaryngol Head Neck Surg 2026) Margin to Depth of Invasion (DOI) Ratio in Node-Negative Oral Cancer.\n% 4. PMID: 41027777 - Zhang L et al. (Int J Oral Maxillofac Surg 2026) Neoadjuvant Chemotherapy & Radical Resection in Jaw Osteosarcoma.\n% 5. PMID: 41025478 - Ferreira IV et al. (Oral Dis 2026) Clinicopathologic Analysis of Oral and Maxillofacial Sarcomas.\n% 6. PMID: 42872286 - Ongkasuwan P. (Plast Reconstr Surg Glob Open 2026) Palatal Adenoid Cystic Carcinoma Surgical Margins & PNI.\n% 7. PMID: 42799523 - Ellam M et al. (Cureus 2026) Mucoepidermoid Carcinoma AFIP Grading & Bone-Sparing Surgical Management.\n% 8. NCCN Head and Neck Cancers Guidelines (2024/2026) - Margins >= 5mm, END for DOI > 4mm.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: بدخیمی‌های دهان، فکین و غدد بزاقی}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Malignancies of the Oral Cavity, Jaws, and Salivary Glands (Oncologic Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ \\lr{OSCC} بر اساس عمق تهاجم (\\lr{DOI})، استئوسارکوم فک، آدنوئید کیستیک (\\lr{PNI}) و کارسینوم موکواپیدرموئید}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=13.0cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: زخم مزمن ایندوره، توده سفت فیکس، لقی دندان با تخریب پروانه‌ای استخوان}}\\\\[2pt]\n    \\scriptsize \\rl{زخم مقاوم بالای ۲ هفته $\\bullet$ پارستزی عصب منتال/آلوئولار تحتانی $\\bullet$ نمای رادیوگرافیک شبیه پرتو خورشید یا تحلیل ریشه نوک‌تیز}\n};\n\n% 2. Mandatory Step 1\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: استیجینگ کامل سر و گردن (\\lr{CT/MRI}، \\lr{PET}) و رد متاستاز دوردست}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی وسعت عمقی درگیری فضاهای فاسیال و پایه جمجمه $\\bullet$ سونوگرافی داپلر گردن و پایش لنف‌نودهای گردنی (\\lr{Levels I-V})}\n};\n\n% 3. Solitary Benign Bone Sparing Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{ضایعه خوش‌خیم بدون تهاجم؟}\\\\[-1pt]\\scriptsize \\lr{Non-Malignant?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{ضایعات واکنشی یا استئومیلیت \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{رد بدخیمی با بیوپسی عمیق؛}\\\\\\rl{درمان متناسب با پاتولوژی؛}\\\\\\rl{پایش دوره‌ای تا ترمیم استخوان}\n};\n\n% 4. Mandatory Biopsy & Biomarker Assessment\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی عمیق بافت تومور (\\lr{Deep Incisional Biopsy}) و پنل ایمونوهیستوشیمی \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{سنجش مارکرهای انکولوژیک (\\lr{p16/p53}، \\lr{Ki-67}، \\lr{CK}، \\lr{SATB2} و بازآرایی \\lr{MYB/MAML2}) طبق گایدلاین \\lr{WHO 5th Ed 2024} \\lr{[\\textbf{PMID: 41025478}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{نوع بافت‌شناسی}\\\\[-1pt]\\scriptsize \\lr{Histopathologic Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{کارسینوم اسکواموس (\\lr{OSCC}) \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Squamous Cell Carcinoma}\\\\\\rl{تهاجم طناب‌های آتیپیک به استروما؛}\\\\\\rl{سنجش عمق تهاجم تومور (\\lr{DOI})؛}\\\\\\rl{مارجین پاک جراحی: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{حداقل ۵mm}}}}\n};\n\\node (h2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{استئوسارکوم فک (\\lr{OS}) \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Osteosarcoma of the Jaws}\\\\\\rl{استئوئید بدخیم نئوپلاستیک؛}\\\\\\rl{گسترش داخل مدولار فراتر از کورتکس؛}\\\\\\rl{عود با حاشیه مثبت: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{بیش از ۷۰٪}}}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{آدنوئید کیستیک (\\lr{AdCC}) \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Adenoid Cystic Carcinoma}\\\\\\rl{نمای غربالی/سیلیندروماتوز؛}\\\\\\rl{تهاجم عصب‌دوست شدید (\\lr{PNI})؛}\\\\\\rl{متاستاز دیرهنگام ریه: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{تا ۴۰٪}}}}\n};\n\\node (h4) [stepbox, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{موکواپیدرموئید (\\lr{MEC})}}\\\\[2pt]\n    \\scriptsize \\lr{Mucoepidermoid Carcinoma}\\\\\\rl{سلول‌های موکوس‌ساز و اپیدرموئید؛}\\\\\\rl{گریدبندی طبق سیستم \\lr{AFIP}؛}\\\\\\rl{بقای ۵ ساله گرید پایین: \\colorbox{hlgray}{\\strut\\textbf{\\rl{بالای ۹۰٪}}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{رزکسیون وسیع + \\lr{END}}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{رزکسیون با مارجین سه بعدی ۵mm؛}}\\\\\\rl{دایسکسیون گردن انتخابی در \\lr{DOI>4mm}؛}\\\\\\rl{بازسازی با فلپ آزاد فیبولا/ساعد}\\\\\\rl{\\lr{[\\textbf{PMID: 41910924}]}}\n};\n\\node (i2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{کمو نئوادجوانت + رزکسیون}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{کموتراپی القایی مپینگ‌محور؛}}\\\\\\rl{رزکسیون سگمنتال با مارجین ۱٫۵ تا ۲cm؛}\\\\\\rl{پرتودرمانی با یون پروتون در مارجین بسته}\\\\\\rl{\\lr{[\\textbf{PMID: 41027777}]}}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{رزکسیون رادیکال + رادیوتراپی}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{اکسیزیون وسیع با دنبال کردن اعصاب؛}}\\\\\\rl{فروزن سکشن حین عمل از تنه عصب؛}\\\\\\rl{پرتودرمانی ادجوانت پست‌اوپروتیک (\\lr{PORT})}\\\\\\rl{\\lr{[\\textbf{PMID: 42872286}]}}\n};\n\\node (i4) [stepbox, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون مارجینال یا رادیکال}}\\\\[2pt]\n    \\scriptsize \\rl{گرید پایین: اکسیزیون محافظه‌کارانه؛}\\\\\\rl{گرید متوسط تا بالا: رزکسیون کامل استخوان}\\\\\\rl{همراه با دایسکسیون گردن و رادیوتراپی}\\\\\\rl{\\lr{[\\textbf{PMID: 42799523}]}}\n};\n\n% 8. Surveillance Regimens\n\\node (s1) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{ماهانه تا هر ۳ ماه (۲ سال اول)}}}\\\\[2pt]\n    \\scriptsize \\rl{سپس هر ۶ ماه تا ۵ سال؛}\\\\\\rl{سونوگرافی و \\lr{PET-CT} دوره‌ای گردن}\n};\n\\node (s2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ ماه (۲ سال اول)؛ ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{سی‌تی اسکن قفسه سینه جهت رد متاستاز ریه؛}\\\\\\rl{\\lr{MRI} صورت پایش بازسازی استخوان}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۴ ماه به مدت ۱۵ تا ۲۰ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش مادام‌العمر بسیار طولانی؛}\\\\\\rl{احتمال عود موضعی یا متاستاز دوردست}\n};\n\\node (s4) [stepbox, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه تا ۵ سال}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه کلینیکی و تصویربرداری بزاقی؛}\\\\\\rl{در گرید بالا: پروتکل پیگیری سخت‌گیرانه مشابه \\lr{OSCC}}\n};\n\n% 9. Clinical Red Flags\n\\node (redflags) [stepbox, draw=darkred, line width=0.9pt, text width=15.8cm] at (0, -16.15) {\n    \\rl{\\textbf{هشدارهای انکولوژیک و اندیکاسیون‌های ارجاع فوری به \\lr{Tumor Board} (\\lr{Clinical Red Flags}):}}\\\\[3pt]\n    \\scriptsize \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{مداخله فوری چندرشته‌ای در:}}} \\rl{(۱) مارجین پاتولوژی مثبت یا کلوز (کمتر از ۵mm در بافت نرم، کمتر از ۱cm در استخوان) $\\bullet$ (۲) تهاجم خارج کپسولی لنف‌نود گردنی (\\lr{Extranodal Extension / ENE}) که نیازمند کمورادیوتراپی همزمان ادجوانت است $\\bullet$ (۳) تهاجم عروقی، لنفاوی و عصبی گسترده (\\lr{LVI / PNI}) $\\bullet$ (۴) بروز پارستزی ناگهانی صورت ناشی از درگیری شاخه‌های زوج پنجم و هفتم.}\n};\n\n% 10. Refractory / Malignancy Protocols\n\\node (refractory) [stepbox, line width=0.9pt, text width=15.8cm] at (0, -18.50) {\n    \\rl{\\textbf{پروتکل بیماری پیشرفته، عود موضعی و درمان‌های نوین تارگت (\\lr{Advanced Oncology Protocols}):}}\\\\[3pt]\n    \\scriptsize \\rl{\\textbf{سطح ۱ (ایمونوتراپی و تارگت در \\lr{OSCC} عودکننده/متاستاتیک):} ارزیابی بیان \\lr{PD-L1} (امتیاز \\lr{CPS}) و کاربرد مهارکننده‌های چک‌پوینت ایمنی نظیر پمبرولیزوماب (\\lr{Pembrolizumab}) یا نیولوماب با یا بدون پلاتینیوم و فلورواوراسیل.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۲ (پروتکل سالواژ در استئوسارکوم و سارکوم‌های راجعه):} جراحی سالواژ رادیکال در صورت امکان دستیابی به حاشیه منفی منجمد؛ کاربرد مهارکننده‌های کینازی چندگانه (\\lr{Regorafenib/Lenvatinib}) در بیماری پیشرونده.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۳ (آدنوئید کیستیک پیشرفته):} رادیوتراپی پیشرفته با یون سنگین کربن یا پروتون در تهاجم پایه جمجمه؛ سنجش بیومارکر \\lr{NOTCH1} جهت درمان هدفمند.}\n};\n\n% Arrows & Routing\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{خوش‌خیم}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{تایید یا شک قوی به بدخیمی}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow, darkred] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow, darkred] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow, darkred] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow, darkred] (h1.south) -- (i1.north);\n\\draw [arrow, darkred] (h2.south) -- (i2.north);\n\\draw [arrow, darkred] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow, darkred] (i1.south) -- (s1.north);\n\\draw [arrow, darkred] (i2.south) -- (s2.north);\n\\draw [arrow, darkred] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Red Flags Box\n\\draw [thick, darkred] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, darkred] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, darkred] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (redflags.north);\n\n\\draw [arrow] (redflags.south) -- (refractory.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    non_odontogenic_cysts: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: non_odontogenic_cysts\n% DOC_SLUG: non_odontogenic_cysts\n% DOC_CATEGORY: cat_non_odontogenic_cysts\n% DOC_TITLE: الگوریتم جامع: کیست‌های غیرادنتوژنیک و تکاملی فک و دهان\n% DOC_ALIASES: non-odontogenic cysts, کیست نازوپالاتین, درموئید, تیرویید زبانی, تیروگلوسال, لنفواپی تلیال, Sistrunk, Dermoid\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Developmental and Non-Odontogenic Cysts.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41721112 - Soares AC et al. (Oral Maxillofac Surg 2026) Clinicopathological Features of Nasopalatine Duct Cyst.\n% 4. PMID: 42840700 - Shaaban H et al. (OTO Open 2026) Outcomes of Modified Sistrunk Procedure for Thyroglossal Duct Cyst Removal.\n% 5. PMID: 41294898 - Andabak Rogulj A et al. (Diseases 2025) Intraoral Epidermoid and Dermoid Cysts Management.\n% 6. PMID: 41562809 - Papadopoulos C et al. (Reports MDPI 2025) Oral Lymphoepithelial Cyst and Branchial Cleft Diagnosis.\n% 7. PMID: 37291808 - Kim SJ et al. (Ear Nose Throat J 2025) Endoscopic Transnasal Marsupialization of Large Nasopalatine Cysts.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: کیست‌های غیرادنتوژنیک و تکاملی فک و دهان}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Non-Odontogenic and Developmental Cysts of the Jaws and Mouth (Differential Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ آناتومیک خط وسط، کیست مجرای نازوپالاتین، تیروگلوسال (\\lr{Sistrunk})، درموئید کف دهان و لنفواپی‌تلیال}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=13.0cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و تصویربرداری: تورم کیستیک بافت نرم خط وسط، قدام کام یا لترال گردن}}\\\\[2pt]\n    \\scriptsize \\rl{رادیولوسنسی قلبی/گلابی‌شکل بین سنترال‌های ماگزیلا $\\bullet$ توده خمیری کف دهان یا خط وسط گردن متحرک با بلع}\n};\n\n% 2. Mandatory Step 1\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تصویربرداری سه‌بعدی (\\lr{CBCT} / \\lr{MRI}) و سنجش حیات پالپ دندان‌های قدامی}}}\\\\[2pt]\n    \\scriptsize \\rl{رد کیست رادیکولار اینسایزیو با تایید حیات دندان‌های قدامی $\\bullet$ بررسی ارتباط توده گردن با استخوان هیوئید یا عضله میلوهیوئید}\n};\n\n% 3. Tooth-Related Vitality Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{دندان بدون حیات؟}\\\\[-1pt]\\scriptsize \\lr{Non-Vital Teeth?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{کیست پری‌آپیکال رادیکولار \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{منشأ ادنتوژنیک التهابی؛}\\\\\\rl{درمان ریشه (\\lr{RCT}) یا}\\\\\\rl{اپیکواکتومی با حفظ پالپ سالم}\n};\n\n% 4. Mandatory Surgical Mapping & Anatomic Triage\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{تریاژ موضع آناتومیک، آسپیراسیون سوزنی (\\lr{FNA}) و مپینگ فضاهای فاسیال \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{تمایز توده‌های داخل استخوانی ماگزیلا (\\lr{NPDC}) از ضایعات بافت نرم ساب‌لینگوال، ساب‌منتال و قوس‌های برانشیال \\lr{[\\textbf{PMID: 41721112}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{موقعیت و پاتولوژی}\\\\[-1pt]\\scriptsize \\lr{Anatomic Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{مجرای نازوپالاتین}}\\\\[2pt]\n    \\scriptsize \\lr{Nasopalatine Duct Cyst}\\\\\\rl{رادیولوسنسی متقارن قدام ماگزیلا؛}\\\\\\rl{اپیتلیوم تنفسی/مطبق و اعصاب پالاتین؛}\\\\\\rl{عود با انوکلیشن: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٪}}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{درموئید / اپیدرموئید}}\\\\[2pt]\n    \\scriptsize \\lr{Dermoid / Epidermoid}\\\\\\rl{توده قوام خمیری بالای/زیر میلوهیوئید؛}\\\\\\rl{حاوی کراتین، فولیکول مو و سباسه؛}\\\\\\rl{عود موضعی: \\textbf{زیر ۳٪}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{مجرای تیروگلوسال \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Thyroglossal Duct Cyst}\\\\\\rl{توده خط وسط گردن متحرک با بلع؛}\\\\\\rl{ریسک بدخیمی کارسینوم پاپیلاری؛}\\\\\\rl{عود بدون سیسترانک:} \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{۵۰٪ تا ۷۰٪}}}\n};\n\\node (h4) [stepbox, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{لنفواپی‌تلیال گردنی/دهانی}}\\\\[2pt]\n    \\scriptsize \\lr{Lymphoepithelial Cyst}\\\\\\rl{توده زردرنگ کف دهان یا لترال گردن؛}\\\\\\rl{اپیتلیوم سنگفرشی محصور در لنفوئید؛}\\\\\\rl{عود پس از جراحی: \\textbf{کمتر از ۱٪}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{انوکلیشن از فلپ پالاتال}}\\\\[2pt]\n    \\scriptsize \\rl{انوکلیشن کامل از طریق دسترسی کام؛}\\\\\\rl{حفظ عصب و عروق نازوپالاتین؛}\\\\\\rl{مارسوپیالیزاسیون در کیست غول‌آسا}\\\\\\rl{\\lr{[\\textbf{PMID: 37291808}]}}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{انوکلیشن ترانس‌اورال/گردنی}}\\\\[2pt]\n    \\scriptsize \\rl{خارج‌سازی با برش داخل دهانی}\\\\\\rl{(در صورت بالای عضله میلوهیوئید) یا}\\\\\\rl{برش اکسترااورال زیر چانه؛}\\\\\\rl{\\lr{[\\textbf{PMID: 41294898}]}}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{پروسیجر سیسترانک (\\lr{Sistrunk})}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{رزکسیون قطعه میانی استخوان هیوئید}}\\\\\\rl{همراه با هسته عضلات قاعده زبان؛}\\\\\\rl{کاهش عود به کمتر از ۳٪}\\\\\\rl{\\lr{[\\textbf{PMID: 42840700}]}}\n};\n\\node (i4) [stepbox, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون ساده کپسولی}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون ترانس‌اورال تمیز در کف دهان؛}\\\\\\rl{یا خارج‌سازی جراحی در حاشیه قدامی}\\\\\\rl{عضله استرنوکلیدوماستوئید}\\\\\\rl{\\lr{[\\textbf{PMID: 41562809}]}}\n};\n\n% 8. Surveillance Regimens\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\colorbox{hlgray}{\\strut\\textbf{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{رادیوگرافی اکلوزال یا پانورامیک؛}\\\\\\rl{تایید بازسازی استخوان قدام کام}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه تا ۲ سال}}\\\\[2pt]\n    \\scriptsize \\rl{لمس بالینی کف دهان؛}\\\\\\rl{عدم محدودیت حرکتی زبان و تنفس}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{سونوگرافی بافت نرم گردن؛}\\\\\\rl{پایش دقیق عود در قاعده زبان}\n};\n\\node (s4) [stepbox, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{سالانه در معاینات روتین}}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه خوش‌خیم بدون عود؛}\\\\\\rl{معاینه روتین مخاطی و گردنی}\n};\n\n% 9. Clinical Red Flags\n\\node (redflags) [stepbox, draw=darkred, line width=0.9pt, text width=15.8cm] at (0, -16.15) {\n    \\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع اورژانسی (\\lr{Clinical Red Flags}):}}\\\\[3pt]\n    \\scriptsize \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{مداخله فوری در:}}} \\rl{(۱) انسداد راه هوایی فوقانی یا دیسفونو/دیسفاژی حاد ناشی از اتساع کیست کف دهان به فضای حلقی $\\bullet$ (۲) عدم وجود بافت تیروئید نرمال در بستر آناتومیک اسکن تیروئید قبل از جراحی (\\lr{Ectopic Lingual Thyroid}) که جراحی منجر به هیپوتیروئیدیسم دائمی خواهد شد $\\bullet$ (۳) رشد سریع توده گردنی تیروگلوسال با لنفادنوپاتی مشکوک به کارسینوم پاپیلاری اولیه مجرا \\lr{[\\textbf{PMID: 42996571}]}.}\n};\n\n% 10. Refractory / Malignancy Protocols\n\\node (refractory) [stepbox, line width=0.9pt, text width=15.8cm] at (0, -18.50) {\n    \\rl{\\textbf{پروتکل موارد راجعه و پایش بدخیمی نادر مجاری تکاملی (\\lr{Malignancy Surveillance}):}}\\\\[3pt]\n    \\scriptsize \\rl{\\textbf{سطح ۱ (کیست عودکننده تیروگلوسال):} ارزیابی مجدد سونوگرافی و \\lr{MRI}؛ انجام جراحی مجدد با رزکسیون وسیع‌تر بافت هیویید و بافت همبند قاعده زبان به روش \\lr{Extended Sistrunk Procedure}.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۲ (پایش بدخیمی کارسینوم پاپیلاری):} پاتولوژی قطعی نمونه جراحی؛ در صورت وجود کارسینوم پاپیلاری تیروئید با تهاجم کپسولی، ارزیابی تیروئیدکتومی توتال و درمان با ید رادیواکتیو (\\lr{131-I}).}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۳ (ضایعات پرفوراتیو نازوپالاتین):} در کیست‌های بزرگ با تخریب وسیع کورتکس بینی، کاربرد تکنیک اندوسکوپیک ترانس‌نازال جهت پیشگیری از فیستول دهانی-بینی.}\n};\n\n% Arrows & Routing\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{خیر / دندان‌های وایتال}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow, darkred] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow, darkred] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow, darkred] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Red Flags Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, darkred] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (redflags.north);\n\n\\draw [arrow] (redflags.south) -- (refractory.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    odontogenic_cysts: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: odontogenic_cysts\n% DOC_SLUG: odontogenic_cysts\n% DOC_CATEGORY: cat_odontogenic_cysts\n% DOC_TITLE: الگوریتم جامع: کیست‌های ادنتوژنیک فکین (تشخیص افتراقی)\n% DOC_ALIASES: odontogenic cysts, کیست‌های ادنتوژنیک, کیست رادیکولار, دنتیژروس, کراتوسیست, OKC, OOC, کیست رویشی\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Odontogenic Cysts.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41454329 - Mahmoud R et al. (BMC Oral Health 2025) 5-FU Meta-Analysis in OKC.\n% 4. PMID: 40269316 - Aarthi S et al. (Evid Based Dent 2025) Alternatives to Carnoy's Solution.\n% 5. PMID: 39038594 - Jacobs T et al. (J Oral Maxillofac Surg 2024) 5-FU vs MCS Recurrence & Nerve Safety.\n% 6. PMID: 39406309 - Cobo-Vázquez C et al. (J Stomatol Oral Maxillofac Surg 2025) Pediatric Dentigerous Cyst.\n% 7. PMID: 42255106 - Leena Sankari S et al. (Case Rep Dent 2026) Orthokeratinized Odontogenic Cyst Criteria.\n% 8. PMID: 42054731 - Qu J et al. (Arch Oral Biol 2026) SPARC and MMP-9 in OKC vs OOC.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: کیست‌های ادنتوژنیک فکین}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Odontogenic Cysts of the Jaws (Differential Management)}}\\\\[3pt]\n{\\small\\itshape تریاژ حیات پالپ، آسپیراسیون مایع کیستیک، پایش کراتینیزاسیون دیواره، پروتکل‌های کارنوی/۵-FU و حفظ دندان}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و رادیوگرافیک: ضایعه رادیولوسنت کورتیکه‌دار فک (\\lr{Jaw Radiolucency})}}\\\\[2pt]\n    \\scriptsize \\rl{لوسنسی تک‌حفره‌ای یا چندحفره‌ای با مارجین مشخص $\\bullet$ همراه با دندان نرویتال، نهفته یا بدون دندان $\\bullet$ رد تروما و فیبروز}\n};\n\n% 2. Pulp Vitality & Aspiration Triage\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تست حیات پالپ دندان‌های مجاور، سی‌بی‌سی‌تی و آسپیراسیون سوزنی (\\lr{FNA})}}}\\\\[2pt]\n    \\scriptsize \\rl{سنجش حیات الکتریکی/حرارتی پالپ $\\bullet$ رنگ مایع: کاهی (سروز)، چرکی، شیری/کرمی غلیظ (کراتین) $\\bullet$ بررسی گسترش قدامی-خلفی}\n};\n\n% 3. Pulp Vitality Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{حیات پالپ؟}\\\\[-1pt]\\scriptsize \\lr{Pulp Vitality?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{ضایعه پری‌آپیکال دندانی \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{دندان نرویتال با ضایعه کوچک؛}\\\\\\rl{درمان ریشه (\\lr{RCT}) خط اول؛}\\\\\\rl{بهبودی در ۷۰٪ تا ۸۰٪ بدون جراحی}\n};\n\n% 4. Mandatory Incisional Biopsy & Keratin Analysis\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی از دیواره کیست (\\lr{Incisional Biopsy}) و ارزیابی کراتینیزاسیون و غربالگری سندرمیک \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{تفکیک پاراکراتینیزه در برابر ارتوکراتینیزه و غیرکراتینیزه $\\bullet$ سنجش ضخامت اپیتلیوم دیواره $\\bullet$ بررسی علائم بالینی سندرم گورلین (\\lr{PTCH1})}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{پاتولوژی دیواره}\\\\[-1pt]\\scriptsize \\lr{Histopathologic Subtype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{کیست رادیکولار مقاوم}}\\\\[2pt]\n    \\scriptsize \\lr{Radicular / Inflammatory}\\\\\\rl{اپیتلیوم مطبق غیرکراتینیزه}\\\\\\rl{اجسام راشتون و ارتشاح التهابی}\\\\\\rl{عود با جراحی کامل: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٪}}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{کیست دنتی‌ژروس تکاملی}}\\\\[2pt]\n    \\scriptsize \\lr{Dentigerous Cyst}\\\\\\rl{اتصال به طوق (\\lr{CEJ}) دندان نهفته}\\\\\\rl{اپیتلیوم نازک ۲ تا ۴ لایه‌ای}\\\\\\rl{عود با انوکلئیشن: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٪}}}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{کراتوسیست ادنتوژنیک (\\lr{OKC}) \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Odontogenic Keratocyst}\\\\\\rl{پاراکراتین چین‌دار؛ بازال پالیسادی}\\\\\\rl{موتاسیون \\lr{PTCH1} / سندرمیک}\\\\\\rl{عود با کورتاژ ساده: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۴۰٪ تا ۶۰٪}}}\n};\n\\node (h4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{کیست ارتوکراتینیزه / رویشی}}\\\\[2pt]\n    \\scriptsize \\lr{Orthokeratinized / Eruption}\\\\\\rl{ارتوکراتین ضخیم + لایه گرانولار}\\\\\\rl{فاقد تهاجم مدولار و جهش ژنتیکی}\\\\\\rl{عود با انوکلئیشن: \\colorbox{hlgray}{\\strut\\textbf{\\rl{کمتر از ۲٫۲٪}}}}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{انوکلئیشن + آپیکواکتومی}}\\\\[2pt]\n    \\scriptsize \\rl{خارج‌سازی کامل دیواره کیست}\\\\\\rl{قطع ۳ میلی‌متر انتهای ریشه}\\\\\\rl{سیل رتروگراد با بیوسرامیک (\\lr{MTA})}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{مارسوپیالیزاسیون یا انوکلئیشن}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{دکمپرسیون در اطفال برای حفظ دندان}}\\\\\\rl{\\lr{[\\textbf{PMID: 39406309}]}}\\\\\\rl{یا انوکلئیشن + خارج‌سازی دندان}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{انوکلئیشن + ادجوانت شیمیایی}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{استکتومی محیطی + ۵-فلورواوراسیل}}\\\\\\rl{گاز آغشته به \\lr{5\\% 5-FU} به مدت ۲۴ ساعت}\\\\\\rl{کاهش عود به کمتر از ۸٪}\\\\\\rl{\\lr{[\\textbf{PMID: 41454329}]}}\n};\n\\node (i4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{انوکلئیشن محافظه‌کارانه}}\\\\[2pt]\n    \\scriptsize \\rl{جداسازی تمیز کپسول از استخوان}\\\\\\rl{پرهیز از کاربرد ادجوانت شیمیایی}\\\\\\rl{اکسیزیون سقف در کیست رویشی}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش رادیوگرافیک پری‌آپیکال؛}\\\\\\rl{تایید بازسازی استخوان کورتیکال}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش مسیر رویش دندان دائم؛}\\\\\\rl{انوکلئیشن تکمیلی در صورت نیاز}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه (۵ سال)؛ سپس سالانه}}}\\\\[2pt]\n    \\scriptsize \\rl{تصویربرداری \\lr{CBCT} دوره‌ای؛}\\\\\\rl{پایش کیست‌های اقماری ثانویه}\n};\n\\node (s4) [stepbox, line width=0.9pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه بالینی و پانورامیک ساده؛}\\\\\\rl{پیش‌آگهی عالی و بدون عود}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های تغییر پروتکل جراحی یا بیوپسی مجدد (\\lr{Clinical Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری و ارتقای جراحی در:}} (۱) پرفوراسیون کورتکس باکال/لینگوال یا اتصال به بافت نرم پیرامونی $\\bullet$ (۲) بی‌حسی لب یا چانه (\\lr{Parethesia}) ناشی از فشار بر کانال عصب دندانی تحتانی $\\bullet$ (۳) عود سریع رادیولوسنسی در کمتر از ۱۲ ماه پس از جراحی $\\bullet$ (۴) وجود ندول سالید داخل لومن کیستیک (مشکوک به آملوبلاستوما یا دگرگونی بدخیم) $\\bullet$ (۵) بروز کیست‌های چندگانه در فکین در سنین نوجوانی (معیار ماژور سندرم گورلین-گولتز).}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، درمان‌های مولکولی و پایش کارسینوم اولیه داخل استخوان (\\lr{PIOC}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (سالواژ در عودهای مکرر OKC):} رزکسیون مارجینال استخوان فک با حفظ لبه تحتانی مندیبل یا رزکسیون سگمنتال همراه با بازسازی فوری فلپ استخوانی در صورت نفوذ تهاجمی به بافت نرم خارج کورتکس.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار هدفمند مسیر مولکولی):} کاربرد تارگت‌تراپی مهارکننده مسیر \\lr{Hedgehog} (\\lr{Vismodegib}) در بیماران مبتلا به سندرم گورلین با کیست‌های راجعه و وسیع غیرقابل جراحی.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش بدخیمی):} بیوپسی کامل از تمام نواحی ضخیم‌شدگی دیواره کیست جهت رد کارسینوم سلول سنگفرشی اولیه با منشأ کیستیک (\\lr{PIOSCC})؛ پرهیز اکید از باقی گذاشتن اپیتلیوم دیواره بدون هیستوپاتولوژی قطعی.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{نرویتال (پری‌آپیکال)}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{ویتال / کیست وسیع}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n% Final link to Refractory Box\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    odontogenic_tumors: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: تومورهای ادنتوژنیک فکین}\\\\[2pt]\n{\\small\\itshape تریاژ رادیوگرافیک، استراتژی بیوپسی، پروتکل‌های رزکسیون بر اساس مارجین و فالوآپ}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی و رادیوگرافیک: اتساع فک و لوسنسی کورتیکه‌دار (\\lr{Jaw Expansion})}}\\\\[2pt]\n    \\scriptsize \\rl{اکسپنشن باکال/لینگوال $\\bullet$ لوسنسی تک یا چندحفره‌ای (\\lr{Soap-bubble / Honeycomb}) $\\bullet$ تحلیل ریشه}\n};\n\n% 2. Diagnostic Workup & Aspiration\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تصویربرداری سه‌بعدی با \\lr{CBCT} و آسپیراسیون سوزنی (\\lr{FNA})}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی پرفوراسیون کورتکس $\\bullet$ رد مالفورماسیون عروقی و کیست‌ها با آسپیراسیون خشک (\\lr{Solid Mass})}\n};\n\n% 3. Mixed / Radiopacity Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{میکسد / اپک؟}\\\\[-1pt]\\scriptsize \\lr{Mixed / Opacity?}};\n\\node (r_mixed) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{تومور پین‌بورگ (\\lr{CEOT})}}\\\\[2pt]\n    \\scriptsize \\rl{کلسیفیکاسیون با ماده آمیلوئیدی؛}\\\\\n    \\rl{انوکلئیشن با مارجین یا رزکسیون محدود}\n};\n\n% 4. Mandatory Incisional Biopsy\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی برشی ترانس‌اورال الزامی (\\lr{Incisional Biopsy}) در حاشیه بافت سالم/ضایعه \\emoji{🗝}}}}\\\\[2pt]\n    \\scriptsize \\rl{پرهیز از انوکلئیشن زودرس کورکورانه بدون تشخیص پاتولوژی قطعی (\\lr{WHO 5th Ed})}\n};\n\n% 5. Histopathology Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{تشخیص پاتولوژی}\\\\[-1pt]\\scriptsize \\lr{Histotype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{تومور آدنوماتوئید (\\lr{AOT})}}\\\\[2pt]\n    \\scriptsize \\rl{قدام ماگزیلا، دور تاج نهفته}\\\\\\rl{کپسولار و خوش‌خیم؛ عود: \\colorbox{hlgray}{\\strut\\textbf{کمتر از ۱٪}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{آملوبلاستوما تک‌کیستی}}\\\\[2pt]\n    \\scriptsize \\lr{Unicystic Ameloblastoma}\\\\\\rl{لومینال یا اینترالومینال}\\\\\\rl{عود با کورتاژ: \\textbf{۱۰٪ تا ۲۵٪}}\n};\n\\node (h3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{آملوبلاستوما سالید/مولتی \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Solid / Multicystic}\\\\\\rl{نفوذ تهاجمی به مغز استخوان}\\\\\\rl{عود با کورتاژ: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۵۰٪ تا ۹۰٪}}}\n};\n\\node (h4) [stepbox, draw=orange!80!black, line width=1.0pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{میکسـومای ادنتوژنیک}}\\\\[2pt]\n    \\scriptsize \\lr{Odontogenic Myxoma}\\\\\\rl{استرومای میگزوئید فاقد کپسول}\\\\\\rl{عود با انوکلئیشن: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۲۵٪ تا ۴۳٪}}}\n};\n\n% 7. Primary Surgical Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{انوکلئیشن + کورتاژ ظریف}}\\\\[2pt]\n    \\scriptsize \\rl{خارج‌سازی با دندان درگیر}\\\\\\rl{جداسازی تمیز کپسول از استخوان}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{انوکلئیشن + ادجوانت}}\\\\[2pt]\n    \\scriptsize \\rl{استکتومی محیطی ۱ تا ۲ میلی‌متر}\\\\\\rl{یا کاربرد محلول کارنوی (\\lr{Carnoy})}\n};\n\\node (i3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{رزکسیون قطعی استخوانی}}\\\\[2pt]\n    \\scriptsize \\rl{رزکسیون مارجینال/سگمنتال}\\\\\\textbf{\\rl{مارجین استخوان ۱۰ تا ۱۵ میلی‌متر}}\\\\\\rl{همراه با یک لایه بافت نرم سالم}\n};\n\\node (i4) [stepbox, draw=orange!80!black, line width=1.0pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{رزکسیون مارجینال/سگمنتال}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{مارجین استخوانی ۱۰ میلی‌متر}}\\\\\\rl{حذف حاشیه وسیع به علت نفوذ ژلاتینی}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالیانه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه کلینیکی و رادیوگرافی}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{سپس سالیانه تا ۱۰ سال}\n};\n\\node (s3) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{سپس سالیانه به صورت مادام‌العمر}\n};\n\\node (s4) [stepbox, draw=orange!80!black, line width=1.0pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش دقیق عود لوسنت تا ۱۰ سال}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای تشخیصی و معیارهای کلیدی انحراف درمان (\\lr{Diagnostic Red Flags}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{ملاحظات حیاتی:}} (۱) اگر پاتولوژی آملوبلاستوم تک‌کیستی، نفوذ مورال (\\lr{Mural}) نشان دهد، درمان بلافاصله به رزکسیون ارتقا می‌یابد $\\bullet$ (۲) کورتاژ ساده در تومور سالید اکیداً ممنوع است $\\bullet$ (۳) جهش \\lr{BRAF V600E} در بیش از ۸۰٪ آملوبلاستوماهای مندیبل وجود دارد.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل افزایش گام‌به‌گام درمان (\\lr{Escalation}) برای موارد عودکننده / پرفوراسیون کورتکس:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پرفوراسیون کورتکس):} اکسیزیون پریوست و مخاط روی استخوان همراه با رزکسیون سگمنتال مندیبل.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۴ (عود مکرر جراحی):} رزکسیون قطعی با مارجین بافت نرم سالم ۵ تا ۱۰ میلی‌متر و بازسازی همزمان با فلپ آزاد فیبولا (\\lr{Free Fibula Flap}).}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۵ (غیرقابل جراحی / قاعده جمجمه):} مهارکننده‌های هدفمند \\lr{BRAF} (دابرافنیب + ترامتینیب) جهت کاهش حجم ضایعه.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{بله (ترکیبی)}} (r_mixed.west);\n\\draw [arrow] (d1.south) -- node[right=6pt, font=\\scriptsize\\bfseries] {\\rl{خیر (لوسنت)}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Histology columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    okc: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: odontogenic_keratocyst\n% DOC_SLUG: odontogenic_keratocyst\n% DOC_CATEGORY: cat_odontogenic_cysts\n% DOC_TITLE: ادنتوژنیک کراتوسیست (OKC)\n% DOC_ALIASES: OKC, Odontogenic Keratocyst, کراتوسیست, Gorlin-Goltz, PTCH1\n% =========================================================================\n\n% =========================================================================\n% CLINICAL EVIDENCE LEDGER & PMIDS (Super-Scientific Standard)\n% =========================================================================\n% 1. WHO Classification of Head and Neck Tumours, 5th Ed (2024) - OKC biological behavior & PTCH1/Hedgehog pathway.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology, 5th Ed (2024) - OKC vs NBCCS & recurrence risk.\n% 3. PMID: 36150944 - Al-Moraissi EA et al. (Int J Oral Maxillofac Surg 2023) Network Meta-Analysis of 2,989 patients: E+5FU (98.1% SUCRA), Resection (83.5%), E+CS (63.8%).\n% 4. PMID: 40269316 - Aarthi S et al. (Evid Based Dent 2025) Systematic Review: Alternative chemical adjuncts to Carnoy's solution.\n% 5. PMID: 42528791 - Shelke H et al. (J Maxillofac Oral Surg 2026) Randomized Clinical Trial: 5% 5-FU vs Liquid Nitrogen Cryotherapy (recurrence 8.3%).\n% 6. PMID: 35314081 - Singh AK et al. (Br J Oral Maxillofac Surg 2022) Meta-analysis: 5-Fluorouracil efficacy post-enucleation.\n% 7. PMID: 38954313 - Gonçalves TOF et al. (Oral Maxillofac Surg 2024) Overview of Systematic Reviews: Marsupialization & recurrence factors.\n% 8. PMID: 35476304 - Oginni FO et al. (Oral Maxillofac Surg 2023) Evidence-based surgical algorithm & Vismodegib in Gorlin syndrome.\n% 9. PMID: 42317910 - El Fid K et al. (Cureus 2026) Clinical & syndromic surveillance criteria in Gorlin-Goltz syndrome.\n% =========================================================================\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت فوق‌تخصصی تصمیم‌گیری بالینی: کراتوسیست ادنتوژنیک (\\lr{Odontogenic Keratocyst - OKC})}\\\\[2pt]\n{\\small\\itshape سنتز شواهد سطح ۱ (\\lr{WHO 5th Ed 2024}، \\lr{NMA} موریسی ۲۰۲۳، کارآزمایی شلکه ۲۰۲۶ و نویل ویرایش پنجم)}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\textbf{\\rl{تظاهر بالینی و سه‌گانه رادیوگرافیک پایه}} \\lr{[\\textbf{WHO 5th Ed 2024 / Neville 5th}]}\\\\[2pt]\n    \\scriptsize \\rl{ضایعه رادیولوسنت تک‌حجره‌ای یا چندحجره‌ای با بوردر کورتیکال دندانه‌دار $\\bullet$ رشد غالب در راستای قدامی-خلفی مدولای فک مندیبل بدون اتساع زودهنگام کورتکس باکال $\\bullet$ شیوع اوج در دهه‌های ۲ و ۳ زندگی}\n};\n\n% 2. Diagnostic Workup & Triage\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: تصویربرداری سه‌بعدی (\\lr{CBCT}) و غربالگری سندرم گورلین-گولتز (\\lr{NBCCS})}}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی پرفوراسیون کورتیکال و کانال مندیبولار $\\bullet$ غربالگری دنده‌های دوشاخه (\\lr{Bifid Ribs})، کلسیفیکاسیون فالکس سلبری و پیت‌های کف دست/پا \\lr{[\\textbf{PMID: 42317910}]} $\\bullet$ آزمایش ژنتیک موتاسیون \\lr{PTCH1} (\\lr{9q22.32})}\n};\n\n% 3. Decision 1 (Initial Stratification)\n\\node (d1) [decision] at (0, -3.35) {\\rl{وسعت و ریسک؟}\\\\[-1pt]\\scriptsize \\lr{Risk/Size?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\textbf{\\rl{ضایعه منفرد کوچک \\emoji{⚓}}}\\\\[2pt]\n    \\scriptsize \\rl{قطر کمتر از ۲ سانتی‌متر؛}\\\\\\rl{کورتکس کاملاً سالم؛}\\\\\\rl{انوکلیاسیون با استئوتومی سطحی}\\\\\\lr{[PMID: 35476304 - Oginni]}\n};\n\n% 4. Mandatory Biopsy & Molecular Assessment\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی الزامی، پاتولوژی قطعی و سیتولوژی مایع کیست}} \\lr{[\\textbf{WHO 5th Ed 2024 / PMID: 38954313}]}}\\\\[2pt]\n    \\scriptsize \\rl{اپیتلیوم سنگفرشی ۶ تا ۸ ردیف سلولی با سطح مواج پاراکراتینیزه $\\bullet$ لایه بازال با هسته‌های هایپرکروماتیک پالسیدی ستونی فاقد رته‌پگ $\\bullet$ آسپیراسیون مایع غلیظ کراتینی و الکتروفورز پروتئین کمتر از ۴ گرم بر دسی‌لیتر (افتراق از آملوبلاستوما)}\n};\n\n% 5. Decision 2 (Subtype & Biologic Stratification)\n\\node (d2) [decision] at (0, -7.00) {\\rl{زیرگروه و رفتار}\\\\[-1pt]\\scriptsize \\lr{Subtype/Phenotype?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\textbf{\\rl{منفرد با کورتکس سالم}}\\\\[2pt]\n    \\scriptsize \\lr{Solitary Intact Cortex}\\\\\\rl{تک‌حجره‌ای بدون گسترش نسج نرم}\\\\\\rl{عود با انوکلیاسیون تنها: \\colorbox{hlgray}{\\strut\\textbf{۲۵٪ تا ۳۰٪}}}\\\\\\lr{[PMID: 36150944 - Al-Moraissi]}\n};\n\\node (h2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\textbf{\\rl{ضایعه وسیع تنه و راموس}}\\\\[2pt]\n    \\scriptsize \\lr{Extensive Ramus Lesion}\\\\\\rl{مجاورت عصب آلوئولار تحتانی (\\lr{IAN})}\\\\\\rl{خطر شکستگی و آسیب حسی: \\textbf{بالا}}\\\\\\lr{[PMID: 38954313 - Gonçalves]}\n};\n\\node (h3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -9.10) {\n    \\textbf{\\rl{عودکننده / پرفوره کورتکس}}\\\\[2pt]\n    \\scriptsize \\lr{Recurrent / Perforated}\\\\\\rl{تهاجم میکروکیست دختر به پریوست}\\\\\\rl{ریسک عود مجدد:}\\ \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{بالای ۴۰٪}}}\\\\\\lr{[PMID: 40269316 - Aarthi]}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\textbf{\\rl{سندرم گورلین (\\lr{NBCCS})}}\\\\[2pt]\n    \\scriptsize \\lr{Syndromic (PTCH1 Germline)}\\\\\\rl{کیست‌های چندگانه همگام و ناهمگام}\\\\\\rl{ریسک عود تجمعی:}\\ \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{بالاتر از ۵۰٪}}}\\\\\\lr{[WHO 5th Ed / PMID: 42317910]}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\textbf{\\rl{انوکلیاسیون + درمان کمکی}}\\\\[2pt]\n    \\scriptsize \\rl{انوکلیاسیون و استئوتومی ۱-۲ میلی‌متر}\\\\\\rl{یا گاز ۵٪ \\lr{5-FU} برای ۲۴ ساعت (عود ۸٫۳٪)}\\\\\\lr{[PMID: 42528791 - Shelke 2026]}\n};\n\\node (i2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\textbf{\\rl{دکمپرسیون ۲ مرحله‌ای}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{مارسوپیالیزاسیون ۶ تا ۱۸ ماه}}\\\\\\rl{کاهش حجم بالای ۵۰٪ و حفظ عصب}\\\\\\rl{سپس انوکلیاسیون ثانویه و درمان کمکی}\\\\\\lr{[PMID: 36150944 - Al-Moraissi]}\n};\n\\node (i3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -11.35) {\n    \\textbf{\\rl{اکسیزیون مخاطی + رزکسیون}}\\\\[2pt]\n    \\scriptsize \\rl{برداشت مخاط روی کورتکس پرفوره}\\\\\\rl{کرایوتراپی نیتروژن مایع (۲ سیکل ۱ دقیقه‌ای)}\\\\\\rl{یا رزکسیون مارژینال (عود کمتر از ۲٪)}\\\\\\lr{[PMID: 36150944 / 42528791]}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\textbf{\\rl{مدیریت مرحله‌ای + هدفمند}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{انوکلیاسیون‌های مکرر و استئوتومی}}\\\\\\rl{پایش درماتولوژی برای \\lr{BCC}های پوستی}\\\\\\rl{تارگت‌تراپی ویسمودگیب در موارد وسیع}\\\\\\lr{[PMID: 35476304 - Oginni 2023]}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\textbf{\\rl{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{سالانه تا ۵ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{پانورامیک سالانه جهت رصد کیست‌های اقماری}\\\\\\lr{[PMID: 35476304 - Level 2a]}\n};\n\\node (s2) [stepbox, line width=0.9pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\textbf{\\rl{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۲ ماه فاز ۱، سپس سالانه}}}\\\\[2pt]\n    \\scriptsize \\rl{شستشوی روزانه لوله و سنجش حجم}\\\\\\rl{سی‌تی اسکن در ماه ۶ و ۱۲}\\\\\\lr{[PMID: 38954313]}\n};\n\\node (s3) [stepbox, line width=1.0pt, text width=3.6cm] at (2.05, -13.60) {\n    \\textbf{\\rl{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۶ ماه تا ۵ سال، سپس سالانه}}}\\\\[2pt]\n    \\scriptsize \\rl{تصویربرداری مقطعی \\lr{CBCT} سالانه}\\\\\\rl{لمس عمیق بافت نرم مجاور}\\\\\\lr{[PMID: 40269316]}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\textbf{\\rl{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{حداقل هر ۶ تا ۱۲ ماه مادام‌العمر}}}\\\\[2pt]\n    \\scriptsize \\rl{پایش تا حداقل ۲۵ سال به علت عود دیرهنگام}\\\\\\rl{غربالگری بدخیمی‌های پوستی و \\lr{CNS}}\\\\\\lr{[WHO 5th Ed 2024]}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{هشدارهای بالینی، علائم خطر (\\lr{Red Flags}) و اندیکاسیون‌های تغییر پروتکل جراحی:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مداخله فوری جراحی یا ارجاع انکولوژیک در:}} (۱) ظهور علامت وینسنت (\\lr{Vincent's Sign}) و پارستزی پیشرونده لب پایین (هشدار تخریب مستقیم عصب یا دگرگونی نئوپلاستیک) $\\bullet$ (۲) پرفوراسیون وسیع کورتکس باکال/لینگوال و توده قابل لمس در فضای پتریدومندیبولار یا کف دهان $\\bullet$ (۳) عود مکرر (۲ بار یا بیشتر) به رغم استفاده از عوامل نکروزان کمکی موضعی \\lr{[\\textbf{PMID: 36150944}]} $\\bullet$ (۴) بروز همزمان کارسینوم‌های سلول بازال پوستی متعدد (\\lr{BCC}) در نواحی صورت و گردن $\\bullet$ (۵) شکستگی پاتولوژیک فک ناشی از تخریب استخوان در تنه یا زاویه مندیبل.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل موارد مقاوم، تارگت‌تراپی مهارکننده \\lr{Hedgehog} و پایش دگرگونی بدخیم (\\lr{Surveillance}):}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۱ (رزکسیون سگمنتال با حاشیه امن استخوانی):} در صورت عود مکرر یا پرفوراسیون وسیع، رزکسیون مارژینال یا قطعه‌ای مندیبل با حاشیه پاک استخوانی ۱ سانتی‌متر و بازسازی همزمان استخوانی جهت کاهش نرخ عود به کمتر از ۲٪ \\lr{[\\textbf{PMID: 36150944 - NMA}]}.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۲ (مهار هدفمند مسیر سیگنالینگ \\lr{Hedgehog / SMO}):} تجویز خوراکی مهارکننده \\lr{SMO} نظیر ویسمودگیب (\\lr{Vismodegib 150mg/d}) در بیماران مبتلا به سندرم گورلین-گولتز با کیست‌های متعدد غیرقابل جراحی، جهت سرکوب پرولیفراسیون و کاهش اندازه تومورال \\lr{[\\textbf{PMID: 35476304 / 25484370}]}.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (پایش کارسینوم سلول سنگفرشی اولیه داخل استخوان \\lr{PIOC}):} نمونه‌برداری بافتی فوری در موارد تغییر ماهیت سریع؛ اگرچه تغییر بدخیم نادر است (۰٫۱۲٪ تا ۱٪ موارد)، بروز دیسپلازی اپیتلیالی شدید یا تهاجم استرومال نیازمند جراحی رادیکال انکولوژیک و دیسکسیون گردن است \\lr{[\\textbf{WHO 5th Ed 2024 / Neville 5th}]}.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{کوچک / سالم}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=6pt, font=\\scriptsize\\bfseries] {\\rl{وسیع / تهاجمی}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    oral_leukoplakia: "\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.12}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: لوکوپلاکی دهانی (\\lr{Oral Leukoplakia})}\\\\[2pt]\n{\\small\\itshape تریاژ سیستماتیک، حذف عوامل تروماتیک، ارزیابی دیسپلازی با بیوپسی، پروتکل‌های اکسیزیون و پایش بدخیمی}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt, rounded corners=2.5pt},\n    decision/.style={diamond, aspect=2.0, draw=black, fill=white, line width=0.7pt, inner sep=2.5pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.88]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: پلاک سفید بدون توجیه مخاط دهان (\\lr{White Plaque})}}\\\\[2pt]\n    \\scriptsize \\rl{پلاک غیرقابل برداشت با گاز؛ رد سایر بیماری‌های مشخص مخاط دهان (\\lr{WHO 2021})}\n};\n\n% 2. Screening & Elimination\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱: حذف تروماهای سایش دندانی و ترایال ضدقارچ کاندیدیازیس}}}\\\\[2pt]\n    \\scriptsize \\rl{اصلاح نواحی تیز دندانی/پروتزی $\\bullet$ درمان ضدقارچ: \\lr{Fluconazole 100\\,mg/d $\\times$ 14--21d}}\n};\n\n% 3. Persistence Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{پایداری؟}\\\\[-1pt]\\scriptsize \\rl{بیش از ۱۴ روز}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{کراتوز سایشی / برفک}}\\\\[2pt]\n    \\scriptsize \\rl{بهبودی کامل پلاک؛}\\\\\n    \\rl{پیگیری روتین دوره‌ای}\n};\n\n% 4. Mandatory Biopsy\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی الزامی با اسکالپل (\\lr{Incisional Biopsy}) با عمق کافی شامل لامینا پروپریا \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{بیوپسی‌های مپینگ چندگانه در صورت پلاک‌های بزرگتر از ۲ سانتی‌متر یا غیرهموژن (\\lr{speckled, nodular, verrucous})}\n};\n\n% 5. Histopathology Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{درجه دیسپلازی}\\\\[-1pt]\\scriptsize \\lr{Dysplasia?}};\n\n% 6. Histopathology 4 Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{فاقد دیسپلازی}}\\\\[2pt]\n    \\scriptsize \\lr{Hyperkeratosis / Acanthosis}\\\\\\rl{مخاط با هایپرپلازی خوش‌خیم}\\\\\\rl{ریسک بدخیمی سالیانه: \\colorbox{hlgray}{\\strut\\textbf{۰٫۳٪}}}\n};\n\\node (h2) [stepbox, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{دیسپلازی خفیف (\\lr{Mild})}}\\\\[2pt]\n    \\scriptsize \\rl{آتیپی در یک‌سوم تحتانی اپیتلیوم}\\\\\\rl{نیاز به پیگیری و حذف ریسک‌فاکتور}\\\\\\rl{ریسک بدخیمی سالیانه: \\textbf{۱٫۱٪}}\n};\n\\node (h3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{دیسپلازی متوسط / شدید / \\lr{CIS}}}\\\\[2pt]\n    \\scriptsize \\rl{آتیپی در دو‌سوم فوقانی یا تمام ضخامت}\\\\\\rl{اندیکاسیون قطعی مداخله جراحی}\\\\\\rl{ریسک سالیانه: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۳٫۲٪ تا ۸٫۵٪}}}\n};\n\\node (h4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{وروکوز پرولیفراتیو (\\lr{PVL}) \\emoji{🛡}}}\\\\[2pt]\n    \\scriptsize \\rl{مولتی‌فوکال، پیشرونده و مقاوم}\\\\\\rl{بالاترین نرخ دگرگونی بدخیم}\\\\\\rl{ریسک سالیانه: \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{۹٫۳٪ تا ۱۴٫۲٪}}}\n};\n\n% 7. Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{تحت‌نظر داشتن فعال}}\\\\[2pt]\n    \\scriptsize \\rl{قطع کامل دخانیات و الکل}\\\\\\rl{کنترل تروما $\\bullet$ جراحی توصیه نمی‌شود}\n};\n\\node (i2) [stepbox, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{اکسیزیون در برابر پیگیری}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون در نواحی پرخطر یا سایز بزرگ؛}\\\\\\rl{در غیر این صورت پیگیری نزدیک}\n};\n\\node (i3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{رزکسیون قطعی جراحی}}\\\\[2pt]\n    \\scriptsize \\rl{اکسیزیون کامل با اسکالپل یا لیزر $\\text{CO}_2$}\\\\\\textbf{\\rl{مارجین ۳ تا ۵ میلی‌متر}}\\rl{ تا سطح فاشیا}\n};\n\\node (i4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{ابلیشن متوالی با لیزر}}\\\\[2pt]\n    \\scriptsize \\rl{تخلیه با لیزر $\\text{CO}_2$ (پرهیز از جراحی وسیع)}\\\\\\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{پرتودرمانی ممنوع است}}}\n};\n\n% 8. Recall Schedules\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۶ ماه یکبار}}}\\\\[2pt]\n    \\scriptsize \\rl{فتوگرافی بالینی متوالی مادام‌العمر}\n};\n\\node (s2) [stepbox, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlgray}{\\strut\\textbf{\\rl{هر ۳ تا ۴ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{پیگیری فشرده در ۲ سال نخست}\n};\n\\node (s3) [stepbox, line width=0.9pt, draw=orange!80!black, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۲ تا ۳ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{سال اول؛ سپس هر ۳ تا ۴ ماه؛ لمس لنفاوی}\n};\n\\node (s4) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۱ تا ۲ ماه}}}\\\\[2pt]\n    \\scriptsize \\rl{مپینگ دائم فیلدهای مخاطی جدید}\n};\n\n% 9. Trigger Box\n\\node (trigger) [stepbox, line width=0.9pt, text width=16.4cm, align=right] at (0, -16.15) {\n    \\centerline{\\rl{\\textbf{اندیکاسیون‌های الزامی برای بیوپسی مجدد فوری و افزایش مرحله درمانی:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\colorbox{hlyellow}{\\strut\\textbf{بیوپسی مجدد فوری اجباری است در:}} (۱) بروز نمای اریتروپلاکی (تغییرات قرمز در پلاک) $\\bullet$ (۲) سفتی قابل لمس یا بافت وروکوز برجسته $\\bullet$ (۳) زخم یا خونریزی خودبه‌خودی $\\bullet$ (۴) رشد سریع (افزایش مساحت بیش از ۲۰٪ در پیگیری) $\\bullet$ (۵) لنفادنوپاتی گردنی مشکوک.}\n};\n\n% 10. Refractory Box\n\\node (refract) [stepbox, text width=16.4cm, align=right] at (0, -18.50) {\n    \\centerline{\\rl{\\textbf{پروتکل افزایش گام‌به‌گام درمان برای ضایعات مقاوم / راجعه / غیرقابل جراحی:}}}\\par\\vspace{3pt}\n    \\scriptsize \\rl{\\textbf{سطح ۳ (ابلیتیو):} فتودینامیک‌تراپی موضعی با \\lr{5-ALA} (\\lr{120 J/cm\\textsuperscript{2}}) یا تبخیر پیوسته با لیزر $\\text{CO}_2$ در فیلدهای وسیع مخاطی.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۴ (دارویی):} ایزوترتینوئین خوراکی (\\lr{0.5--1.0 mg/kg/d} به مدت ۳ ماه، سپس تیپر به \\lr{0.25 mg/kg/d}؛ \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{تراتوژن: \\lr{iPLEDGE}}}). دوز نگهدارنده: لیکوپن خوراکی \\lr{8\\,mg/day}.}\\par\\vspace{2.5pt}\n    \\scriptsize \\rl{\\textbf{سطح ۵ (هدفمند):} پروتکل‌های مولکولی: مهارکننده‌های \\lr{EGFR} (ارلوتینیب؛ کارآزمایی \\lr{EPOC})، متفورمین (محور \\lr{AMPK/mTOR})، مهارکننده‌های چک‌پوینت \\lr{PD-1/PD-L1}.}\n};\n\n% Connections\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{خیر}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=4pt, font=\\scriptsize\\bfseries] {\\rl{بله}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Histology columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Trigger Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, black] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (trigger.north);\n\n\\draw [arrow] (trigger.south) -- (refract.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
    traumatic_lesions: "% =========================================================================\n% PLATFORM TAXONOMY ROUTING (patho.dentnet.space)\n% =========================================================================\n% DOC_ID: traumatic_lesions\n% DOC_SLUG: traumatic_lesions\n% DOC_CATEGORY: cat_traumatic\n% DOC_TITLE: الگوریتم جامع: ضایعات تروماتیک و انسدادی بزاقی دهان\n% DOC_ALIASES: traumatic lesions, موکوسل, رانولا, سیالولیتیازیس, نوروم تروماتیک, غدد بزاقی, sialolithiasis, mucocele, ranula\n% =========================================================================\n% === CLINICAL EVIDENCE LEDGER & PMIDS ===\n% 1. WHO Classification of Head and Neck Tumours (5th Ed, 2024) - Non-Neoplastic Salivary & Traumatic Lesions.\n% 2. Neville BW, Damm DD, Allen CM, Chi AC. Oral and Maxillofacial Pathology (5th Ed).\n% 3. PMID: 41841403 - Nguyen K et al. (Oral Dis 2026) Management and Outcomes of Recurrent Ranulas: Meta-Analysis.\n% 4. PMID: 40921455 - Souza MRF et al. (J Oral Pathol Med 2025) Treatments to Avoid Ranula Recurrence: Network Meta-Analysis.\n% 5. PMID: 42486748 - Barnes PM et al. (Br J Oral Maxillofac Surg 2026) Submandibular Duct Sialendoscopy Interventions.\n% 6. PMID: 40087169 - Özçelik N et al. (Eur Arch Otorhinolaryngol 2025) Submandibular Sialolithiasis Holmium:YAG Lithotripsy.\n% 7. PMID: 41479499 - Ayoub M, Ghosein E. (Cureus 2025) Management of Recurrent Lip Mucocele & Feeder Gland Excision.\n% =========================================================================\n\n\\documentclass[a4paper]{article}\n\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}\n\\usepackage{hyperref}\n\\usepackage{fontspec}\n\n\\makeatletter\n\\newcommand{\\MathCollectFalse}{}\n\\newcommand{\\MathCollectTrue}{}\n\\let\\@kernel@tabular@init\\relax\n\\makeatother\n\n\\usepackage{xepersian}\n\n\\settextfont[\n  Path = Peyda/,\n  BoldFont = Peyda-Bold.ttf,\n  ItalicFont = Peyda-Medium.ttf,\n  BoldItalicFont = Peyda-Bold.ttf\n]{Peyda-Regular.ttf}\n\n\\setlatintextfont{Times New Roman}\n\n\\IfFileExists{Peyda/Symbola.ttf}{%\n  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%\n}{%\n  \\IfFileExists{editor/Peyda/Symbola.ttf}{%\n    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%\n  }{%\n    \\newfontfamily\\symb{Symbola}%\n  }%\n}\n\\newcommand{\\emoji}[1]{{\\symb #1}}\n\n\\linespread{1.10}\n\\pagestyle{empty}\n\\thispagestyle{empty}\n\n\\raggedbottom\n\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0pt}\n\n\\definecolor{hlgray}{HTML}{E2E8F0}\n\\definecolor{hlyellow}{HTML}{FEF08A}\n\\definecolor{hlred}{HTML}{FEE2E2}\n\\definecolor{darkred}{HTML}{991B1B}\n\\definecolor{navy}{HTML}{0A2540}\n\\definecolor{teal}{HTML}{0D9488}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ضایعات تروماتیک و انسدادی بزاقی دهان}\\\\[2pt]\n{\\normalsize\\bfseries\\color{navy} \\lr{Traumatic and Obstructive Salivary Lesions of the Oral Cavity (Differential Triage)}}\\\\[3pt]\n{\\small\\itshape تریاژ موکوسل و غدد فرعی، رانولای کف دهان، سیالولیتیازیس مجرا (\\lr{Sialendoscopy}) و نوروم تروماتیک دردناک}\n\\end{center}\n\\vspace{-4pt}\n\\hrule height 0.8pt\n\\vspace{6pt}\n\n\\begin{center}\n\\begin{latin}\n\\linespread{0.95}\\selectfont\n\\begin{tikzpicture}[\n    every node/.style={font=\\sffamily\\footnotesize, align=center},\n    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},\n    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},\n    arrow/.style={-{Stealth[scale=0.9]}, thick, black}\n]\n\n% 1. Initial Presentation\n\\node (n1) [stepbox, line width=1.0pt, text width=13.0cm] at (0, 0) {\n    \\rl{\\textbf{تظاهر بالینی: تورم کیستیک با نوسان اندازه حین غذا خوردن، توده زیرمخاطی دردناک یا سنگ مجرا}}\\\\[2pt]\n    \\scriptsize \\rl{تاول شفاف متمایل به آبی در لب پایین یا کف دهان $\\bullet$ درد و اتساع متناوب غدد ساب‌مندیبولار/پاروتید $\\bullet$ سابقه تروما/جراحی}\n};\n\n% 2. Mandatory Step 1\n\\node (n2) [stepbox, text width=14.2cm] at (0, -1.55) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{مرحله ۱ الزامی: ارزیابی ترشح بزاق با دوشش مجرا (\\lr{Milking})، رادیوگرافی اکلوزال و سونوگرافی}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی جریان شفاف یا چرکی بزاق از سوراخ وارتون/استنسن $\\bullet$ کشف کلسیفیکاسیون رادیواپک یا اتساع داکت در سونوگرافی}\n};\n\n% 3. Solitary Salivary Infection Decision\n\\node (d1) [decision] at (0, -3.35) {\\rl{ترشح چرکی یا سلولیت حاد؟}\\\\[-1pt]\\scriptsize \\lr{Acute Infection?}};\n\\node (r_benign) [stepbox, draw=teal, line width=0.9pt, text width=3.8cm] at (5.8, -3.35) {\n    \\rl{\\textbf{سیالادنیت حاد باکتریال \\emoji{🔍}}}\\\\[2pt]\n    \\scriptsize \\rl{آنتی‌بیوتیک سیستمیک؛}\\\\\\rl{هیدراتاسیون و سیالوگوگ؛}\\\\\\rl{پرهیز از پروپ‌زدن در فاز حاد}\n};\n\n% 4. Mandatory Mapping\n\\node (n3) [stepbox, line width=1.0pt, text width=15.8cm] at (0, -5.20) {\n    \\rl{\\colorbox{hlyellow}{\\strut\\textbf{تریاژ موضع آناتومیک، عمق گرفتگی بافت نرم و تمایز سنگ داکت از اکستراوازیشن موکوس \\emoji{🔬}}}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی گسترش رانولا به زیر عضله میلوهیوئید (\\lr{Plunging Ranula}) $\\bullet$ ارزیابی اندازه سنگ جهت انتخاب تکنیک آندوسکوپی \\lr{[\\textbf{PMID: 40087169}]}}\n};\n\n% 5. Subtype Decision\n\\node (d2) [decision] at (0, -7.00) {\\rl{فنوتیپ بالینی}\\\\[-1pt]\\scriptsize \\lr{Clinical Entity?}};\n\n% 6. 4 Main Columns\n\\node (h1) [stepbox, text width=3.6cm] at (-6.15, -9.10) {\n    \\rl{\\textbf{موکوسل دهانی}}\\\\[2pt]\n    \\scriptsize \\lr{Oral Mucocele (Extravasation)}\\\\\\rl{پارگی تروماتیک داکت غدد فرعی؛}\\\\\\rl{تجمع موین بدون پوشش اپیتلیال؛}\\\\\\rl{عود با آسپیراسیون:} \\colorbox{hlgray}{\\strut\\textbf{\\rl{نزدیک ۱۰۰٪}}}\n};\n\\node (h2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -9.10) {\n    \\rl{\\textbf{رانولا (کف دهان / گردنی) \\emoji{⚡}}}\\\\[2pt]\n    \\scriptsize \\lr{Ranula / Plunging Ranula}\\\\\\rl{نشت موکوس از غده زیرزبانی؛}\\\\\\rl{اتساع یکطرفه حجیم زیر زبان؛}\\\\\\rl{عود با مارسوپیالیزاسیون:} \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{۳۰٪ تا ۵۰٪}}}\n};\n\\node (h3) [stepbox, text width=3.6cm] at (2.05, -9.10) {\n    \\rl{\\textbf{سیالولیتیازیس (سنگ مجرا)}}\\\\[2pt]\n    \\scriptsize \\lr{Salivary Sialolithiasis}\\\\\\rl{رسوب نمک‌های کلسیم در مجرای وارتون؛}\\\\\\rl{اتساع دردناک غده حین صرف غذا؛}\\\\\\rl{موفقیت سیالندوسکوپی: \\colorbox{hlgray}{\\strut\\textbf{\\rl{بالای ۸۵٪}}}}\n};\n\\node (h4) [stepbox, text width=3.6cm] at (6.15, -9.10) {\n    \\rl{\\textbf{نوروم تروماتیک فکین}}\\\\[2pt]\n    \\scriptsize \\lr{Traumatic Neuroma}\\\\\\rl{پرولیفراسیون اکسون ناشی از تروما؛}\\\\\\rl{ندول دردناک در فورامن منتال/لب؛}\\\\\\rl{علامت مثبت تینل (\\lr{Tinel Sign})}\n};\n\n% 7. Primary Interventions\n\\node (i1) [stepbox, text width=3.6cm] at (-6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون موکوسل + غدد فرعی}}\\\\[2pt]\n    \\scriptsize \\rl{برداشت کامل لومن سودوسیست؛}\\\\\\rl{تراش و خارج‌سازی غدد بزاقی مجاور؛}\\\\\\rl{کاهش عود به زیر ۲٪}\\\\\\rl{\\lr{[\\textbf{PMID: 41479499}]}}\n};\n\\node (i2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -11.35) {\n    \\rl{\\textbf{خارج‌سازی غده زیرزبانی}}\\\\[2pt]\n    \\scriptsize \\textbf{\\rl{رزکسیون ساب‌لینگوال اکلکتومی؛}}\\\\\\rl{حفظ عصب لینگوال و مجرای وارتون؛}\\\\\\rl{درمان قطعی استاندارد رانولا}\\\\\\rl{\\lr{[\\textbf{PMID: 41841403}]}}\n};\n\\node (i3) [stepbox, text width=3.6cm] at (2.05, -11.35) {\n    \\rl{\\textbf{سیالندوسکوپی $\\pm$ لیتوتریپسی}}\\\\[2pt]\n    \\scriptsize \\rl{سنگ‌های زیر ۵mm: خارج‌سازی با بسکت؛}\\\\\\rl{سنگ‌های بالای ۵mm: خرد کردن با لیزر،}\\\\\\rl{یا داکتوتومی ترانس‌اورال در کف دهان}\\\\\\rl{\\lr{[\\textbf{PMID: 42486748}]}}\n};\n\\node (i4) [stepbox, text width=3.6cm] at (6.15, -11.35) {\n    \\rl{\\textbf{اکسیزیون جراحی تروماتیک}}\\\\[2pt]\n    \\scriptsize \\rl{برداشت ندول همراه با حاشیه کوچک عصب؛}\\\\\\rl{کوتر پروکسیمال تنه عصب جهت}\\\\\\rl{پیشگیری از تشکیل مجدد جوانه نوروما}\n};\n\n% 8. Surveillance Regimens\n\\node (s1) [stepbox, text width=3.6cm] at (-6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه تا ۱ سال}}\\\\[2pt]\n    \\scriptsize \\rl{بررسی مخاط لب پایین؛}\\\\\\rl{عدم بروز بی‌حسی لب یا عود موکوسل}\n};\n\\node (s2) [stepbox, draw=darkred, line width=1.2pt, text width=3.6cm] at (-2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{هر ۳ ماه تا ۲ سال}}}\\\\[2pt]\n    \\scriptsize \\rl{معاینه دقیق کف دهان و گردن؛}\\\\\\rl{سونوگرافی بافت نرم در رانولای پلانجینگ}\n};\n\\node (s3) [stepbox, text width=3.6cm] at (2.05, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{هر ۶ ماه تا ۲ سال}}\\\\[2pt]\n    \\scriptsize \\rl{ارزیابی پتنسی داکت بزاقی؛}\\\\\\rl{مصرف مایعات و ماساژ منظم غده}\n};\n\\node (s4) [stepbox, text width=3.6cm] at (6.15, -13.60) {\n    \\rl{\\textbf{زمان‌بندی پیگیری:}}\\\\[2pt]\n    \\rl{\\textbf{سالانه تا ۲ سال}}\\\\[2pt]\n    \\scriptsize \\rl{پایش دردهای نوروپاتیک؛}\\\\\\rl{درمان تکمیلی دارویی در صورت نیاز}\n};\n\n% 9. Clinical Red Flags\n\\node (redflags) [stepbox, draw=darkred, line width=0.9pt, text width=15.8cm] at (0, -16.15) {\n    \\rl{\\textbf{هشدارهای بالینی و اندیکاسیون‌های ارجاع فوری یا جراحی اورژانسی (\\lr{Clinical Red Flags}):}}\\\\[3pt]\n    \\scriptsize \\colorbox{hlred}{\\strut\\color{darkred}\\textbf{\\rl{مداخله فوری در:}}} \\rl{(۱) اتساع رانولای پلانجینگ به فضای پارافارنژیال و بروز تنگی نفس یا دیسفاژی شدید $\\bullet$ (۲) سیالادنیت چرکی حاد پیشرونده با تریسموس و درگیری فضاهای عمقی گردن (آنژین لودویگ) $\\bullet$ (۳) آسیب حین عمل به شاخه مارجینال مندیبولار عصب فاشیال یا عصب زبانی $\\bullet$ (۴) پایداری توده کف دهان بدون ارتباط با غذا خوردن مشکوک به موکواپیدرموئید کارسینوما.}\n};\n\n% 10. Refractory / Malignancy Protocols\n\\node (refractory) [stepbox, line width=0.9pt, text width=15.8cm] at (0, -18.50) {\n    \\rl{\\textbf{پروتکل موارد راجعه و درمان‌های پیشرفته بزاقی (\\lr{Advanced Salivary Protocols}):}}\\\\[3pt]\n    \\scriptsize \\rl{\\textbf{سطح ۱ (رانولای راجعه پس از مارسوپیالیزاسیون):} خارج‌سازی کامل و بی قید و شرط غده زیرزبانی در اتاق عمل همراه با درناژ کامل حفرات فاسیال گردن \\lr{[\\textbf{PMID: 40921455}]}.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۲ (سیالولیتیازیس پارانشیمال غده ساب‌مندیبولار):} در موارد سنگ‌های متعدد در عمق پارانشیم با آتروفی فیبروتیک غده، سیالادنکتومی کامل با دسترسی جراحی زیر فک.}\\\\\n    \\scriptsize \\rl{\\textbf{سطح ۳ (نوروپاتی راجعه و دردهای مزمن پس از قطع عصب):} کاربرد تکنیک‌های بازسازی میکروجراحی عصب (\\lr{Nerve Graft / Conduit}) یا درمان دارویی با پره‌گابالین و دوپوکستین.}\n};\n\n% Arrows & Routing\n\\draw [arrow] (n1) -- (n2);\n\\draw [arrow] (n2) -- (d1);\n\\draw [arrow] (d1.east) -- node[above, font=\\scriptsize\\bfseries] {\\rl{عفونت حاد}} (r_benign.west);\n\\draw [arrow] (d1.south) -- node[right=5pt, font=\\scriptsize\\bfseries] {\\rl{فاز غیرعفونی / مزمن}} (n3.north);\n\\draw [arrow] (n3.south) -- (d2.north);\n\n% Bus-Bar from Decision 2 to 4 Subtype columns\n\\draw [thick, black] (d2.south) -- (0, -7.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (-6.15, -7.90) -- (h1.north);\n\\draw [arrow, darkred] (-2.05, -7.90) -- (h2.north);\n\\draw [arrow] (2.05, -7.90) -- (h3.north);\n\\draw [arrow] (6.15, -7.90) -- (h4.north);\n\n% Column Downward Arrows\n\\draw [arrow] (h1.south) -- (i1.north);\n\\draw [arrow, darkred] (h2.south) -- (i2.north);\n\\draw [arrow] (h3.south) -- (i3.north);\n\\draw [arrow] (h4.south) -- (i4.north);\n\n\\draw [arrow] (i1.south) -- (s1.north);\n\\draw [arrow, darkred] (i2.south) -- (s2.north);\n\\draw [arrow] (i3.south) -- (s3.north);\n\\draw [arrow] (i4.south) -- (s4.north);\n\n% Collector Bus into Red Flags Box\n\\draw [thick, black] (s1.south) -- (-6.15, -14.90);\n\\draw [thick, darkred] (s2.south) -- (-2.05, -14.90);\n\\draw [thick, black] (s3.south) -- (2.05, -14.90);\n\\draw [thick, black] (s4.south) -- (6.15, -14.90);\n\\draw [thick, black] (-6.15, -7.90) -- (6.15, -7.90);\n\\draw [arrow] (0, -14.90) -- (redflags.north);\n\n\\draw [arrow] (redflags.south) -- (refractory.north);\n\n\\end{tikzpicture}\n\\end{latin}\n\\end{center}\n\n\\end{document}\n",
  };

  // ==========================================================================
  // TikZ Engine — Parser, Serializer, and TeX/HTML Converter
  // ==========================================================================

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
        const nl = s.indexOf('\n', i);
        i = nl < 0 ? s.length : nl + 1;
        continue;
      }

      if (c === '\\') {
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
      while (i < s.length && '\\{}$%'.indexOf(s[i]) === -1) {
        t += s[i];
        i++;
      }
      out += escHtml(t.replace(/~/g, '\u00A0'));
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
        if (node.classList.contains('hl-yellow')) return `\\colorbox{hlyellow}{${inner}}`;
        if (node.classList.contains('hl-red')) return `\\colorbox{hlred}{${inner}}`;
        if (node.classList.contains('hl-gray')) return `\\colorbox{hlgray}{${inner}}`;
        if (tag === 'strong' || tag === 'b') return `\\textbf{${inner}}`;
        if (tag === 'u') return `\\underline{${inner}}`;
        if (tag === 'br') return '\\\
  ';
        if (node.classList.contains('tx-small')) return `{\\scriptsize ${inner}}`;
        if (node.classList.contains('lang-en')) return `\\lr{${inner}}`;
        if (node.classList.contains('lang-fa')) return `\\rl{${inner}}`;

        return inner;
      }
      return '';
    }

    return walk(temp).trim();
  }

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
    const body = src.slice(i, eIdx < 0 ? src.length : eIdx);
    res.start = bStart;
    res.end = eIdx < 0 ? src.length : eIdx;

    let p = 0;
    while (p < body.length) {
      const c = body[p];
      if (c === '%') {
        const nl = body.indexOf('\n', p);
        p = nl < 0 ? body.length : nl + 1;
        continue;
      }

      if (body.startsWith('\\node', p) || body.startsWith('\\coordinate', p)) {
        const stmt = parseNodeStmt(body, p, i);
        if (stmt) {
          if (stmt.node) res.nodes.push(stmt.node);
          p = stmt.end;
          continue;
        }
      }

      if (body.startsWith('\\draw', p) || body.startsWith('\\path', p)) {
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
    const isCoord = body.startsWith('\\coordinate', p);
    let q = p + (isCoord ? 11 : 5);
    let opts = '', id = '', x = 0, y = 0, text = '', cRange = null;

    while (q < body.length && /\s/.test(body[q])) q++;
    if (body[q] === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts = body.slice(q + 1, e);
      q = e + 1;
    }

    while (q < body.length && /\s/.test(body[q])) q++;
    if (body[q] === '(') {
      const e = matchDelim(body, q, '(', ')');
      if (e < 0) return null;
      id = body.slice(q + 1, e).trim();
      q = e + 1;
    }

    while (q < body.length && /\s/.test(body[q])) q++;
    if (body[q] === '[') {
      const e = matchDelim(body, q, '[', ']');
      if (e < 0) return null;
      opts += ',' + body.slice(q + 1, e);
      q = e + 1;
    }

    while (q < body.length && /\s/.test(body[q])) q++;
    if (body.startsWith('at', q)) {
      q += 2;
      while (q < body.length && /\s/.test(body[q])) q++;
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
    while (q < body.length && /\s/.test(body[q])) q++;
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
    const twMatch = /text width\s*=\s*([\d.]+)\s*cm/i.exec(opts);
    if (twMatch) tw = parseFloat(twMatch[1]) * SCALE;

    let heavyBorder = /line width\s*=\s*(?:0\.9|1\.\d+)pt/i.test(opts);

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
    const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = String.raw`((?:\\node|\\coordinate)\b[^{;]*?\(${safeId}\)[^{;]*?at\s*\()([^)]+)(\))`;
    const re = new RegExp(pattern);
    return src.replace(re, (m, p1, oldC, p3) => p1 + x + ', ' + y + p3);
  }

  function updateNodeText(src, id, newText) {
    if (!src || !id) return src;
    const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = String.raw`(\\node\s+[^{;]*?\(${safeId}\)[^{;]*?)(\{)`;
    const re = new RegExp(pattern);
    const match = re.exec(src);
    if (!match) return src;
    const braceOpenIdx = match.index + match[1].length;
    const braceCloseIdx = matchDelim(src, braceOpenIdx, '{', '}');
    if (braceCloseIdx < 0) return src;
    return src.slice(0, braceOpenIdx + 1) + '\n  ' + newText.trim() + '\n' + src.slice(braceCloseIdx);
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
    pendingDroppedTex: null,
    pendingDroppedTitle: '',
    pendingDroppedFileName: '',

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
    saveDraft();
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
    saveDraft();
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
          tokenizeWords(n.bodyEl);
        }
      }
    });
    layoutEdges();
    updateTelemetryHud();
  }

  function updateUndoRedoUI() {
    const uCount = toFaDigits(State.historyStack.length);
    const rCount = toFaDigits(State.redoStack.length);

    setTxt('dockUndoBadge', uCount);
    setTxt('undoCountBadge', uCount);
    setTxt('dockRedoBadge', rCount);
    setTxt('redoCountBadge', rCount);

    const btnUndo = $('#dockBtnUndo') || $('#btnUndo');
    const btnRedo = $('#dockBtnRedo') || $('#btnRedo');
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

    const banner = $('#flowchartHeaderBanner');
    if (banner && banner.style.display !== 'none') {
      const bannerH = banner.offsetHeight || 90;
      const bannerTop = (parseFloat(banner.style.top) || 0) - bannerH;
      const bannerCx = parseFloat(banner.style.left) || 0;
      minY = Math.min(minY, bannerTop);
      minX = Math.min(minX, bannerCx - 360);
      maxX = Math.max(maxX, bannerCx + 360);
    }

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

    // ==========================================================================
  // Flowchart Title & Subtitle Header (PDF Parity & Inline Editable)
  // ==========================================================================
  function extractFlowchartHeader(src) {
    if (!src) return { title: 'فلوچارت تصمیم‌گیری بالینی', subtitle: '' };

    let rawTitle = '';
    let rawSubtitle = '';

    const centerIdx = src.indexOf('\\begin{center}');
    const centerEnd = src.indexOf('\\end{center}', centerIdx);
    const headerChunk = (centerIdx !== -1 && centerEnd !== -1)
      ? src.slice(centerIdx, centerEnd + 14)
      : src.slice(0, src.indexOf('\\begin{tikzpicture}') !== -1 ? src.indexOf('\\begin{tikzpicture}') : 600);

    // Extract Title after \Large\bfseries until \\ or end of block
    const tm = headerChunk.match(/\\Large\\bfseries\s*([\s\S]*?)(?:\\\\[[^\]]*\]|\\\\|\n\s*\n|\\end\{center\})/);
    if (tm) {
      rawTitle = tm[1];
    } else {
      const tm2 = headerChunk.match(/\{\\Large\\bfseries\s*([\s\S]*?)\}/);
      if (tm2) rawTitle = tm2[1];
    }

    // Extract Subtitle after \small\itshape
    const sm = headerChunk.match(/\\(?:small|footnotesize)?\\itshape\s*([\s\S]*?)(?:\\\\[[^\]]*\]|\\\\|\n\s*\n|\\end\{center\})/);
    if (sm) {
      rawSubtitle = sm[1];
    } else {
      const sm2 = headerChunk.match(/\{\\small\\itshape\s*([\s\S]*?)\}/);
      if (sm2) rawSubtitle = sm2[1];
    }

    function cleanTexHeader(s) {
      if (!s) return '';
      return s
        .replace(/\\(?:lr|rl)\s*\{([^\}]*)\}/g, '$1')
        .replace(/\\(?:textbf|textit|text)\s*\{([^\}]*)\}/g, '$1')
        .replace(/\\(?:Large|bfseries|small|itshape|footnotesize|scriptsize|Huge|huge|bf)\b/g, '')
        .replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?(\{([^\}]*)\})?/g, '$3')
        .replace(/\\\\[[^\]]*\]/g, ' ')
        .replace(/\\\\/g, ' ')
        .replace(/[\{\}]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }

    let cleanTitle = cleanTexHeader(rawTitle);
    let cleanSubtitle = cleanTexHeader(rawSubtitle);

    if (!cleanTitle && State.activeDocId) {
      cleanTitle = getDocTitle(State.activeDocId);
    }

    return { title: cleanTitle, subtitle: cleanSubtitle };
  }

  function renderFlowchartHeaderBanner(src) {
    const banner = $('#flowchartHeaderBanner');
    const titleEl = $('#fchTitle');
    const subEl = $('#fchSubtitle');
    if (!banner || !titleEl || !subEl) return;

    const { title, subtitle } = extractFlowchartHeader(src || State.texSource);
    titleEl.textContent = title;
    subEl.textContent = subtitle;
    subEl.style.display = subtitle ? 'block' : 'none';

    // Position banner right above the top-most node
    const rootNode = State.nodes.find(n => n.id === 'n1') || State.nodes[0];
    let bannerCx = 0;
    let bannerTopY = -60;

    if (rootNode) {
      bannerCx = rootNode.cx;
      const rootH = rootNode.h || (rootNode.el ? rootNode.el.offsetHeight : 60);
      bannerTopY = rootNode.cy - (rootH / 2) - 30;
    }

    banner.style.left = `${bannerCx}px`;
    banner.style.top = `${bannerTopY}px`;
  }

  function formatMixedBidi(str) {
    if (!str) return '';
    if (str.includes('\\lr{')) return str;
    return str.replace(/\(([A-Za-z0-9][A-Za-z0-9\s,\.\-–]*)\)/g, '(\\lr{$1})');
  }

  function updateFlowchartHeaderInTex(tex, newTitle, newSubtitle) {
    if (!tex) return tex;
    const formattedTitle = formatMixedBidi(newTitle ? newTitle.trim() : '');
    const formattedSub = formatMixedBidi(newSubtitle ? newSubtitle.trim() : '');

    const tikzIdx = tex.indexOf('\\begin{tikzpicture}');
    const searchScope = tikzIdx !== -1 ? tex.slice(0, tikzIdx) : tex.slice(0, 1000);

    const centerStart = searchScope.indexOf('\\begin{center}');
    const centerEnd = centerStart !== -1 ? searchScope.indexOf('\\end{center}', centerStart) : -1;

    if (centerStart !== -1 && centerEnd !== -1) {
      const fullCenterEnd = centerEnd + '\\end{center}'.length;
      let newCenter = `\\begin{center}\n{\\Large\\bfseries ${formattedTitle}}\\\\[2pt]\n{\\small\\itshape ${formattedSub}}\n\\end{center}`;
      return tex.slice(0, centerStart) + newCenter + tex.slice(fullCenterEnd);
    }

    // Fallback: replace using line boundary instead of fragile [^\}]*
    let updated = tex;
    const tm = updated.match(/\\Large\\bfseries[\s\S]*?(?=\\\s*\[|\\\\|\n\s*\n)/);
    if (tm) {
      updated = updated.replace(tm[0], `\\Large\\bfseries ${formattedTitle}`);
    }
    const sm = updated.match(/\\small\\itshape[\s\S]*?(?=\\\s*\[|\\\\|\n\s*\n|\\end\{center\})/);
    if (sm) {
      updated = updated.replace(sm[0], `\\small\\itshape ${formattedSub}`);
    }
    return updated;
  }

  function initHeaderBannerEditing() {
    const titleEl = $('#fchTitle');
    const subEl = $('#fchSubtitle');

    function onHeaderCommit() {
      const newTitle = titleEl ? titleEl.textContent.trim() : '';
      const newSub = subEl ? subEl.textContent.trim() : '';

      pushUndoState('Edit Flowchart Title/Subtitle');
      State.texSource = updateFlowchartHeaderInTex(State.texSource, newTitle, newSub);
      if (texCodeEditor) texCodeEditor.value = State.texSource;
      saveDraft();
      playSound('highlight');
      showToast('عنوان و مشخصات فلوچارت همگام‌سازی شد');
    }

    if (titleEl) {
      titleEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          titleEl.blur();
        }
      });
      titleEl.addEventListener('blur', onHeaderCommit);
    }

    if (subEl) {
      subEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          subEl.blur();
        }
      });
      subEl.addEventListener('blur', onHeaderCommit);
    }
  }

  function parseAndRenderDocument(src) {
    State.texSource = src;
    if (texCodeEditor) texCodeEditor.value = src;

    const parsed = parseTikz(src);
    State.nodes = parsed.nodes;
    State.edges = parsed.edges;

    renderNodes();
    renderFlowchartHeaderBanner(src);
    layoutEdges(true);
    requestAnimationFrame(() => {
      layoutEdges(true);
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

  function layoutEdges(fullRebuild = false) {
    if (!svgEdgeGroup) return;

    // Always keep node dimensions synchronized before edge routing
    updateNodeDimensions();

    const needsFullRebuild = fullRebuild || !State._edgesInitialized || !svgEdgeGroup.hasChildNodes();

    if (needsFullRebuild) {
      svgEdgeGroup.innerHTML = '';
      $$('.edge-label-pill').forEach(pill => pill.remove());
      updateNodeDimensions();
      State._edgesInitialized = true;

      State.edges.forEach((edge, index) => {
        edge._paths = [];
        edge._pills = [];
        const pts = edge.points;
        if (!pts || pts.length < 2) return;

        for (let k = 0; k < pts.length - 1; k++) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
          edge._paths.push(path);
        }

        edge.labels.forEach(lbl => {
          const pill = document.createElement('div');
          pill.className = 'edge-label-pill';
          pill.innerHTML = texToHtml(lbl.text);
          pill.title = 'دوبار کلیک برای ویرایش متن مسیر ارتباطی';
          pill.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!pill.isContentEditable) {
              inspectConnectorEdge(edge, null);
            }
          });
          pill.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            startEditingEdgeLabel(edge, lbl, pill);
          });
          world.appendChild(pill);
          edge._pills.push(pill);
        });
      });
    }

    // High-performance in-place vector coordinate update (Zero DOM destruction, Zero layout thrashing)
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

        const path = edge._paths && edge._paths[k];
        if (path) {
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
        }
      }

      edge.labels.forEach((lbl, lblIdx) => {
        const pill = edge._pills && edge._pills[lblIdx];
        if (!pill) return;

        const segIdx = Math.min(lbl.segmentIndex !== undefined ? lbl.segmentIndex : 0, segmentCoords.length - 1);
        const seg = segmentCoords[segIdx] || segmentCoords[0];
        if (!seg) return;

        const mx = (seg.start.x + seg.end.x) / 2;
        const my = (seg.start.y + seg.end.y) / 2;
        let lx = mx;
        let ly = my;

        const pw = pill.offsetWidth || 36;
        const ph = pill.offsetHeight || 20;

        if (lbl.opts.includes('above')) ly -= (ph / 2 + 8);
        if (lbl.opts.includes('below')) ly += (ph / 2 + 8);
        if (lbl.opts.includes('right')) lx += (pw / 2 + 12);
        if (lbl.opts.includes('left')) lx -= (pw / 2 + 12);

        pill.style.left = `${lx}px`;
        pill.style.top = `${ly}px`;
      });
    });
  }

  
  function startEditingEdgeLabel(edge, lbl, pill) {
    if (!pill) return;
    deselectAll();
    pill.contentEditable = 'true';
    pill.focus();
    showToast('متن مسیر قابل ویرایش شد — Enter برای ذخیره');

    let finished = false;
    function finishEdit() {
      if (finished) return;
      finished = true;
      pill.contentEditable = 'false';
      const newText = pill.textContent.trim();
      if (newText && newText !== lbl.text) {
        pushUndoState('Edit Edge Label');
        const oldTex = lbl.text;
        const newTex = `\\rl{${newText}}`;
        if (State.texSource.includes(oldTex)) {
          State.texSource = State.texSource.replace(oldTex, newTex);
        }
        lbl.text = newTex;
        if (texCodeEditor) texCodeEditor.value = State.texSource;
        saveDraft();
        playSound('snap');
        showToast('متن ارتباط به‌روزرسانی شد');
      }
    }

    pill.addEventListener('blur', finishEdit, { once: true });
    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        pill.blur();
      } else if (e.key === 'Escape') {
        finished = true;
        pill.contentEditable = 'false';
        pill.innerHTML = texToHtml(lbl.text);
      }
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

  let highlightPopoverGuardTimer = null;

  function showHighlightPopover(spanEl, node) {
    const popover = $('#highlightPopover');
    if (!popover || !spanEl || !viewport) return;

    State.activeSelectionSpan = spanEl;
    State.activeSelectionNode = node;

    const spanRect = spanEl.getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();

    let left = spanRect.left + spanRect.width / 2 - vpRect.left;
    let top = spanRect.top - vpRect.top;

    popover.classList.remove('pop-below');
    if (top < 56) {
      popover.classList.add('pop-below');
      top = spanRect.bottom - vpRect.top;
    }

    const popWidth = 110;
    left = Math.max(popWidth / 2 + 10, Math.min(vpRect.width - popWidth / 2 - 10, left));

    if (!popover._stopBound) {
      popover._stopBound = true;
      popover.addEventListener('pointerdown', (e) => e.stopPropagation());
      popover.addEventListener('click', (e) => e.stopPropagation());
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.display = 'flex';
    popover.style.pointerEvents = 'none'; // Prevent accidental clicks during opening transition

    requestAnimationFrame(() => {
      popover.classList.add('is-visible');
      if (highlightPopoverGuardTimer) clearTimeout(highlightPopoverGuardTimer);
      highlightPopoverGuardTimer = setTimeout(() => {
        popover.style.pointerEvents = 'auto';
      }, 140);
    });
  }

  function hideHighlightPopover() {
    const popover = $('#highlightPopover');
    if (popover) {
      popover.classList.remove('is-visible');
      popover.style.pointerEvents = 'none';
      popover.style.display = 'none';
    }
    if (highlightPopoverGuardTimer) clearTimeout(highlightPopoverGuardTimer);
    State.activeSelectionSpan = null;
    State.activeSelectionNode = null;
  }

  function changeActiveHighlightColor(color) {
    if (!State.activeSelectionSpan || !State.activeSelectionNode) return;
    const curClass = State.activeSelectionSpan.className;
    if (curClass === `hl-${color}`) {
      hideHighlightPopover();
      return;
    }
    pushUndoState('Change Highlight Color');

    State.activeSelectionSpan.className = `hl-${color}`;
    const node = State.activeSelectionNode;

    normalizeNodeHighlights(node.bodyEl);
    tokenizeWords(node.bodyEl);
    updateNodeFromHtml(node);
    saveDraft();
    playSound('highlight');
    hideHighlightPopover();
    showToast('رنگ هایلایت تغییر کرد');
  }

  function clearHighlightFromSpan(span, nodeBodyEl) {
    if (!span || !span.parentNode) return;
    while (span.firstChild) {
      span.parentNode.insertBefore(span.firstChild, span);
    }
    span.remove();
    if (nodeBodyEl) {
      normalizeNodeHighlights(nodeBodyEl);
      tokenizeWords(nodeBodyEl);
    }
  }

  function removeActiveHighlight() {
    if (!State.activeSelectionSpan || !State.activeSelectionNode) return;
    pushUndoState('Remove Highlight');

    const span = State.activeSelectionSpan;
    const node = State.activeSelectionNode;

    clearHighlightFromSpan(span, node.bodyEl);
    updateNodeFromHtml(node);
    hideHighlightPopover();
    showToast('هایلایت حذف شد');
  }

  function clearHighlightsFromWords(selectedWords, bodyEl) {
    if (!selectedWords || selectedWords.length === 0 || !bodyEl) return false;

    const hlSpans = new Set();
    selectedWords.forEach(w => {
      const hl = w.closest('.hl-yellow, .hl-red, .hl-gray');
      if (hl && bodyEl.contains(hl)) hlSpans.add(hl);
    });

    if (hlSpans.size === 0) return false;

    const toClearSet = new Set(selectedWords);

    hlSpans.forEach(hlSpan => {
      const allWordsInHl = Array.from(hlSpan.querySelectorAll('.w'));
      const allSelected = allWordsInHl.every(w => toClearSet.has(w));

      if (allSelected || allWordsInHl.length <= 1) {
        while (hlSpan.firstChild) {
          hlSpan.parentNode.insertBefore(hlSpan.firstChild, hlSpan);
        }
        hlSpan.remove();
      } else {
        const hlClass = hlSpan.className;
        const wordsToKeep = allWordsInHl.filter(w => !toClearSet.has(w));

        while (hlSpan.firstChild) {
          hlSpan.parentNode.insertBefore(hlSpan.firstChild, hlSpan);
        }
        hlSpan.remove();

        wordsToKeep.forEach(w => {
          if (!w.closest('.hl-yellow, .hl-red, .hl-gray')) {
            const newSpan = document.createElement('span');
            newSpan.className = hlClass;
            if (w.parentNode) {
              w.parentNode.insertBefore(newSpan, w);
              newSpan.appendChild(w);
            }
          }
        });
      }
    });

    normalizeNodeHighlights(bodyEl);
    tokenizeWords(bodyEl);
    return true;
  }

  // ==========================================================================
  // Node Listeners & Interaction (Select, Move, Double-Tap Inline Edit, Highlight)
  // ==========================================================================

  let isHighlightDragging = false;
  let highlightDragStartWord = null;
  let highlightDragNode = null;
  let highlightDragPointerStart = null;

  function selectNode(id) {
    deselectAll();
    State.selectedNodeId = id;
    const n = State.nodes.find(item => item.id === id);
    if (!n || !n.el) return;

    n.el.classList.add('selected');

    const sheet = $('#nodeActionSheet');
    if (sheet) {
      setTxt('sheetNodeTitle', `گره #${toFaDigits(n.id)}`);
      setTxt('sheetNodeCoords', `X: ${toFaDigits(n.x)}, Y: ${toFaDigits(n.y)}`);
      sheet.style.display = 'flex';
    }
    updateTelemetryHud();
  }

  function nudgeSelectedNode(dx, dy) {
    if (!State.selectedNodeId) return;
    const n = State.nodes.find(item => item.id === State.selectedNodeId);
    if (!n) return;

    pushUndoState('Nudge Node');

    n.x = +(n.x + dx).toFixed(2);
    n.y = +(n.y + dy).toFixed(2);
    n.cx = +(n.x * SCALE);
    n.cy = +(-n.y * SCALE);

    if (n.el) {
      n.el.style.left = `${n.cx}px`;
      n.el.style.top = `${n.cy}px`;
    }

    setTxt('sheetNodeCoords', `X: ${toFaDigits(n.x)}, Y: ${toFaDigits(n.y)}`);
    layoutEdges();
    updateTelemetryHud();
    State.texSource = updateNodeCoord(State.texSource, n.id, n.x, n.y);
    if (texCodeEditor) texCodeEditor.value = State.texSource;
    saveDraft();
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

  function startInlineEditingNode(n, e) {
    if (!n || !n.bodyEl) return;
    if (State.isEditingText && State.activeEditingNode === n && n.bodyEl.isContentEditable) {
      return; // Already editing this node: DO NOT touch selection or caret!
    }
    State.activeEditingNode = n;
    State.isEditingText = true;
    State.initialEditingText = n.bodyEl.innerHTML;

    n.bodyEl.contentEditable = 'true';
    n.bodyEl.style.userSelect = 'text';
    n.bodyEl.style.webkitUserSelect = 'text';
    n.bodyEl.classList.add('inline-editing-active');
    if (n.el) n.el.classList.add('editing');

    n.bodyEl.focus();
    try {
      const selection = window.getSelection();
      let rangePlaced = false;
      if (e && e.clientX && e.clientY) {
        if (document.caretRangeFromPoint) {
          const cr = document.caretRangeFromPoint(e.clientX, e.clientY);
          if (cr && n.bodyEl.contains(cr.startContainer)) {
            selection.removeAllRanges();
            selection.addRange(cr);
            rangePlaced = true;
          }
        } else if (document.caretPositionFromPoint) {
          const cp = document.caretPositionFromPoint(e.clientX, e.clientY);
          if (cp && n.bodyEl.contains(cp.offsetNode)) {
            const r = document.createRange();
            r.setStart(cp.offsetNode, cp.offset);
            r.collapse(true);
            selection.removeAllRanges();
            selection.addRange(r);
            rangePlaced = true;
          }
        }
      }
      if (!rangePlaced) {
        const range = document.createRange();
        range.selectNodeContents(n.bodyEl);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } catch (err) {}

    showToast('ویرایش متن فعال شد — متن را ویرایش کنید و برای ثبت بیرون ضربه بزنید');
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

    // --- Double Click on Node / Body ---
    el.addEventListener('dblclick', (e) => {
      // If already editing, allow native browser word selection on double click!
      if (body.isContentEditable || (State.isEditingText && State.activeEditingNode === n)) {
        return;
      }
      e.stopPropagation();
      hideHighlightPopover();
      focusNode(n.id);
      startInlineEditingNode(n, e);
    });

    body.addEventListener('pointerenter', (e) => {
      if (body.isContentEditable || State.isEditingText) return;
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
      if (body.isContentEditable || State.isEditingText) return;
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
        const dist = highlightDragPointerStart ? Math.hypot(e.clientX - highlightDragPointerStart.x, e.clientY - highlightDragPointerStart.y) : 10;
        if (dist > 5) {
          hideHighlightPopover();
          const curEl = document.elementFromPoint(e.clientX, e.clientY);
          const curW = (curEl && curEl.closest('.w')) || findClosestWord(body, e.clientX, e.clientY);
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
      }
    });

    body.addEventListener('pointerleave', () => {
      if (!isHighlightDragging) {
        clearLivePreviews();
      }
    });

    // --- PointerDown on Node / Body ---
    el.addEventListener('pointerdown', (e) => {
      if (body.isContentEditable || (State.isEditingText && State.activeEditingNode === n)) return;

      const existingHl = e.target.closest('.hl-yellow, .hl-red, .hl-gray');

      // 1. HIGHLIGHT MODE:
      if (State.toolMode === 'highlight') {
        const wTarget = e.target.closest('.w') || existingHl || findClosestWord(body, e.clientX, e.clientY);
        if (wTarget) {
          e.stopPropagation();
          isHighlightDragging = true;
          highlightDragNode = n;
          highlightDragStartWord = wTarget.classList.contains('w') ? wTarget : (wTarget.querySelector('.w') || wTarget);
          highlightDragPointerStart = {
            x: e.clientX,
            y: e.clientY,
            targetHl: existingHl,
            time: performance.now()
          };
          try {
            body.setPointerCapture(e.pointerId);
          } catch (err) {}

          clearLivePreviews();
          if (!existingHl && highlightDragStartWord) {
            highlightDragStartWord.classList.add('hl-preview-' + State.activeHighlightColor);
          }
          return;
        }
      }

      // 2. Click an existing highlight in Select Mode -> Show Popover!
      if (existingHl && State.toolMode === 'select') {
        e.stopPropagation();
        selectNode(n.id);
        showHighlightPopover(existingHl, n);
        return;
      }

      hideHighlightPopover();

      // 3. Select Mode:
      if (State.toolMode === 'select') {
        e.stopPropagation();

        // If this node is ALREADY selected and tapped again -> ENTER EDIT MODE IMMEDIATELY!
        if (State.selectedNodeId === n.id && !body.isContentEditable) {
          startInlineEditingNode(n, e);
          return;
        }

        // First tap: Select node and focus it
        selectNode(n.id);
        focusNode(n.id);
        return;
      }

      // 4. Move Mode:
      if (State.toolMode === 'move') {
        e.stopPropagation();
        selectNode(n.id);

        State.draggingNode = n;
        State.dragNodeStartPointer = { x: e.clientX, y: e.clientY };
        State.dragNodeStartPos = { cx: n.cx, cy: n.cy };
        State.hasDragMoved = false;
        State.dragNodeStartSnapshot = {
          docId: State.activeDocId,
          texSource: State.texSource,
          nodes: State.nodes.map(item => ({
            id: item.id, x: item.x, y: item.y, cx: item.cx, cy: item.cy, text: item.text,
            html: item.bodyEl ? item.bodyEl.innerHTML : ''
          }))
        };

        el.classList.add('dragging');
        el.setPointerCapture(e.pointerId);
        return;
      }
    });

    body.addEventListener('pointerup', (e) => {
      if (body.isContentEditable || State.isEditingText) return;
      if (State.toolMode === 'highlight' && isHighlightDragging && highlightDragNode === n) {
        if (body.hasPointerCapture && body.hasPointerCapture(e.pointerId)) {
          body.releasePointerCapture(e.pointerId);
        }
        isHighlightDragging = false;
        clearLivePreviews();

        const dist = highlightDragPointerStart ? Math.hypot(e.clientX - highlightDragPointerStart.x, e.clientY - highlightDragPointerStart.y) : 999;
        const targetHl = highlightDragPointerStart && highlightDragPointerStart.targetHl;

        // If user tapped/clicked on an existing highlight span without dragging:
        if (targetHl && dist < 6) {
          e.stopPropagation();
          selectNode(n.id);
          showHighlightPopover(targetHl, n);
          highlightDragStartWord = null;
          highlightDragNode = null;
          highlightDragPointerStart = null;
          return;
        }

        highlightDragPointerStart = null;

        const curEl = document.elementFromPoint(e.clientX, e.clientY);
        const curW = (curEl && curEl.closest('.w')) || findClosestWord(body, e.clientX, e.clientY) || highlightDragStartWord;
        const allW = Array.from(body.querySelectorAll('.w'));
        const i1 = allW.indexOf(highlightDragStartWord);
        const i2 = curW ? allW.indexOf(curW) : i1;

        if (i1 !== -1) {
          const minI = i2 !== -1 ? Math.min(i1, i2) : i1;
          const maxI = i2 !== -1 ? Math.max(i1, i2) : i1;
          const selectedWords = allW.slice(minI, maxI + 1);

          if (State.activeHighlightColor === 'clear') {
            const cleared = clearHighlightsFromWords(selectedWords, body);
            if (cleared) {
              pushUndoState('Remove Highlight');
              updateNodeFromHtml(n);
              showToast('هایلایت پاک شد');
            }
          } else {
            let changed = false;
            for (const w of selectedWords) {
              const curHl = w.closest('.hl-yellow, .hl-red, .hl-gray');
              if (!curHl || !curHl.classList.contains(`hl-${State.activeHighlightColor}`)) {
                changed = true;
                break;
              }
            }
            if (changed) {
              pushUndoState('Apply Highlight');
              selectedWords.forEach(w => highlightWord(w, State.activeHighlightColor));
              normalizeNodeHighlights(body);
              tokenizeWords(body);
              updateNodeFromHtml(n);
              saveDraft();
              playSound('highlight');
              showToast('هایلایت اعمال شد');
            }
          }
        }

        highlightDragStartWord = null;
        highlightDragNode = null;
      }
    });

    // Node dragging is handled globally by document pointermove/pointerup with rAF batching
    body.addEventListener('blur', () => {
      if (body.isContentEditable) {
        body.contentEditable = 'false';
        body.classList.remove('inline-editing-active');
        if (n.el) n.el.classList.remove('editing');
        State.isEditingText = false;
        State.activeEditingNode = null;
        normalizeNodeHighlights(body);
        tokenizeWords(body);
        const hasChanged = body.innerHTML !== State.initialEditingText;
        if (hasChanged) {
          pushUndoState('Edit Node Text');
          updateNodeFromHtml(n);
          saveDraft();
          showToast(`متن گره #${toFaDigits(n.id)} ذخیره شد`);
        }
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
    const snapDistance = 7; // pixels in world units (responsive & feelable, but subtle)
    let snapCx = cx;
    let snapCy = cy;
    let alignedX = null;
    let alignedY = null;
    let minDiffX = snapDistance;
    let minDiffY = snapDistance;

    State.nodes.forEach(other => {
      if (other.id === activeNode.id) return;
      const diffX = Math.abs(other.cx - cx);
      if (diffX < minDiffX) {
        minDiffX = diffX;
        snapCx = other.cx;
        alignedX = other.cx;
      }
      const diffY = Math.abs(other.cy - cy);
      if (diffY < minDiffY) {
        minDiffY = diffY;
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

    return { cx: snapCx, cy: snapCy, isSnapped: (alignedX !== null || alignedY !== null) };
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
  // Studio Library & Clinical Protocols Data
  // ==========================================================================

  const TAXONOMY_CATEGORIES = [
    {
      id: "cat_fibro_osseous",
      title: "ضایعات Fibro-Osseous",
      doc: "fibro_osseous",
      items: [
        { id: "item_fibrous_dysplasia", title: "فیبروز دیسپلازی (Fibrous Dysplasia)", doc: "fibrous_dysplasia" },
        { id: "item_juvenile_ossifying_fibroma", title: "Juvenile Ossifying Fibroma (JOF)", doc: "juvenile_ossifying_fibroma" },
        { id: "item_ossifying_fibroma", title: "Ossifying Fibroma (OF)", doc: "ossifying_fibroma" }
      ]
    },
    {
      id: "cat_inflammatory",
      title: "ضایعات التهابی",
      doc: "inflammatory_lesions",
      items: [
        { id: "item_osteonecrosis_mandible", title: "استئونکروز مندیبل (MRONJ / Osteonecrosis)", doc: "osteonecrosis_mandible" },
        { id: "item_pyogenic_granuloma", title: "پایوژنیک گرانولوما (Pyogenic Granuloma)", doc: "pyogenic_granuloma" },
        { id: "item_radicular_cyst", title: "رادیکولار سیست (Radicular Cyst)", doc: "radicular_cyst" }
      ]
    },
    {
      id: "cat_benign_mesenchymal",
      title: "تومورهای خوش‌خیم مزانشیمی",
      doc: "benign_mesenchymal",
      items: [
        { id: "item_capillary_hemangioma", title: "Capillary Hemangioma", doc: "capillary_hemangioma" },
        { id: "item_lymphangioma", title: "لنفانژیوم (Lymphangioma)", doc: "lymphangioma" },
        { id: "item_lipomatous_tumor", title: "لیپوماتوز تومور (Lipoma / Lipomatous)", doc: "lipomatous_tumor" },
        { id: "item_plexiform_neurofibroma", title: "پلکسی‌فرم نوروفیبروما (Plexiform Neurofibroma)", doc: "plexiform_neurofibroma" },
        { id: "item_fibro_fatty_tissue", title: "Fibro-fatty Tissue (ضایعه فیبروفتی)", doc: "fibro_fatty_tissue" },
        { id: "item_fibromatosis", title: "فیبروماتوزیس (Desmoid / Fibromatosis)", doc: "fibromatosis" },
        { id: "item_inflammatory_myofibroblastic_tumor", title: "Inflammatory Myofibroblastic Tumor (IMT)", doc: "inflammatory_myofibroblastic_tumor" },
        { id: "item_desmoplastic_fibroma", title: "دسموپلاستیک فیبروما (با منشأ استخوانی)", doc: "desmoplastic_fibroma" },
        { id: "item_osteoma", title: "استئوما (Osteoma با منشأ استخوانی)", doc: "osteoma" }
      ]
    },
    {
      id: "cat_odontogenic_tumors",
      title: "تومورهای ادنتوژنیک",
      doc: "odontogenic_tumors",
      items: [
        { id: "item_ameloblastoma", title: "آملوبلاستوما (Ameloblastoma)", doc: "odontogenic_tumors" },
        { id: "item_odontogenic_fibroma", title: "ادنتوژنیک فیبروما (Odontogenic Fibroma)", doc: "odontogenic_fibroma" },
        { id: "item_odontogenic_myxoma", title: "ادنتوژنیک میگزوما (Odontogenic Myxoma)", doc: "odontogenic_tumors" },
        { id: "item_cementoblastoma", title: "سمنتوبلاستوما (Cementoblastoma)", doc: "cementoblastoma" },
        { id: "item_odontoma", title: "ادنتوما (Odontoma کمپلکس و کامپوند)", doc: "odontoma" },
        { id: "item_ameloblastic_fibroma", title: "املوبلاستیک فیبروما (Ameloblastic Fibroma)", doc: "ameloblastic_fibroma" },
        { id: "item_ameloblastic_fibro_odontoma", title: "املوبلاستیک فیبروادنتوم (AFO)", doc: "ameloblastic_fibro_odontoma" }
      ]
    },
    {
      id: "cat_odontogenic_cysts",
      title: "ضایعات کیستیک ادنتوژنیک",
      doc: "odontogenic_cysts",
      items: [
        { id: "item_dentigerous_cyst", title: "دنتیژروس (Dentigerous Cyst)", doc: "dentigerous_cyst" },
        { id: "item_inflammatory_dentigerous_cyst", title: "دنتیژروس سیست التهابی", doc: "inflammatory_dentigerous_cyst" },
        { id: "item_odontogenic_keratocyst", title: "ادنتوژنیک کراتوسیست (OKC)", doc: "odontogenic_keratocyst" },
        { id: "item_eruption_cyst", title: "Eruption Cyst (کیست رویشی)", doc: "eruption_cyst" }
      ]
    },
    {
      id: "cat_developmental",
      title: "ضایعات تکاملی",
      doc: "developmental_lesions",
      items: [
        { id: "item_cgcg", title: "CGCG (گرانولوم سلول غول‌آسای مرکزی)", doc: "cgcg" },
        { id: "item_reparative_cgcg", title: "Reparative CGCG", doc: "reparative_cgcg" },
        { id: "item_aneurysmal_bone_cyst", title: "Abc (Aneurysmal Bone Cyst)", doc: "aneurysmal_bone_cyst" },
        { id: "item_brown_tumor", title: "Brown Tumor (تومور قهوه‌ای پاراتیروئید)", doc: "brown_tumor" },
        { id: "item_cherubism", title: "چرابیسم (Cherubism)", doc: "cherubism" },
        { id: "item_giant_cell_neoplasm", title: "نئوپلاسم سلول جاینت (Giant Cell Tumor)", doc: "giant_cell_neoplasm" }
      ]
    },
    {
      id: "cat_benign_epithelial",
      title: "تومورهای خوش‌خیم و پیش‌بدخیم اپیتلیالی",
      doc: "benign_epithelial",
      items: [
        { id: "item_oral_leukoplakia", title: "لوکوپلاکی دهانی (Oral Leukoplakia)", doc: "oral_leukoplakia" },
        { id: "item_squamous_papilloma", title: "اسکواموس پاپیلوما (Squamous Papilloma)", doc: "squamous_papilloma" }
      ]
    },
    {
      id: "cat_non_odontogenic_cysts",
      title: "ضایعات کیستیک غیر ادنتوژنیک",
      doc: "non_odontogenic_cysts",
      items: [
        { id: "item_dermoid_cyst", title: "کیست درموئید (Dermoid Cyst)", doc: "dermoid_cyst" }
      ]
    },
    {
      id: "cat_malignancy",
      title: "بدخیمی",
      doc: "malignancy",
      items: [
        { id: "item_spindle_cell_tumor", title: "Spindle Cell Tumor (کارسینوم/سارکوم سلول دوکی)", doc: "spindle_cell_tumor" },
        { id: "item_ewing_sarcoma", title: "Ewing Sarcoma (سارکوم یوئینگ فکین)", doc: "ewing_sarcoma" }
      ]
    },
    {
      id: "cat_traumatic",
      title: "تروما",
      doc: "traumatic_lesions",
      items: [
        { id: "item_mucocele", title: "موکوسل (Mucocele / Extravasation)", doc: "mucocele" },
        { id: "item_ranula", title: "رانولا (Ranula / کیست بزاقی زیرزبان)", doc: "ranula" }
      ]
    }
  ];

  let currentDocFilter = 'all'; // 'all', 'has_chart', 'no_chart'
  let currentDocQuery = '';

  function toFaDigits(num) {
    const pDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, d => pDigits[+d]);
  }

  function hasDocFlowchart(docId) {
    if (!docId) return false;
    if (EMBEDDED_DOCS[docId]) return true;
    try {
      if (localStorage.getItem('tikz_doc_' + docId)) return true;
    } catch (e) {}
    if (State.serverDocs && State.serverDocs.includes(docId)) return true;
    return false;
  }

  function getDocTitle(docId) {
    if (docId === 'traumatic_lesions') return 'ضایعات تروماتیک و انسدادی بزاقی دهان (Traumatic & Salivary)';
    if (docId === 'malignancy') return 'بدخیمی‌های دهان، فکین و غدد بزاقی (Malignancies & Oncology)';
    if (docId === 'non_odontogenic_cysts') return 'کیست‌های غیرادنتوژنیک و تکاملی فک و دهان (Non-Odontogenic Cysts)';
    if (docId === 'benign_epithelial') return 'ضایعات اپی‌تلیال خوش‌خیم و لکوپلاکیا (Benign Epithelial & Leukoplakia)';
    if (docId === 'developmental_lesions') return 'ضایعات تکاملی و سلول غول‌آسای فکین (Developmental & Giant Cell)';
    if (docId === 'fibrous_dysplasia') return 'فیبروز دیسپلازی (Fibrous Dysplasia)';
    if (docId === 'oral_leukoplakia') return 'Oral Leukoplakia (لوکوپلاکی دهانی)';
    if (docId === 'cgcg') return 'CGCG (گرانولوم سلول غول‌آسا)';
    if (docId === 'odontogenic_tumors') return 'تومورهای ادنتوژنیک فکین';
    if (docId === 'benign_mesenchymal') return 'تومورهای خوش‌خیم مزانشیمی (Benign Mesenchymal)';
    if (docId === 'odontogenic_cysts') return 'کیست‌های ادنتوژنیک فکین (Odontogenic Cysts)';
    if (docId === 'fibro_osseous') return 'ضایعات فیبرو-استخوانی فکین (Fibro-Osseous)';
    if (docId === 'inflammatory_lesions') return 'ضایعات التهابی و واکنشی فکین و مخاط (Inflammatory)';

    for (const cat of TAXONOMY_CATEGORIES) {
      if (cat.doc === docId) return cat.title;
      for (const item of cat.items) {
        if (item.doc === docId) return item.title;
      }
    }
    return docId;
  }

  
  const LESION_SUBTITLES = {
    fibro_osseous: "تریاژ رادیوگرافیک و هیستوپاتولوژی ضایعات فیبرو-استخوانی، تمایز افتراقی دیسپلازی فیبروز و تومورهای استخوان‌ساز، استراتژی‌های درمانی بر اساس سن و رفتار بیولوژیک",
    inflammatory_lesions: "تریاژ بالینی، پایش عفونت و نکروز، اندیکاسیون‌های دبریدمان جراحی و حذف عوامل محرک موضعی",
    benign_mesenchymal: "تریاژ بالینی و تصویربرداری توده‌های بافت نرم دهان، پنل افتراقی ایمونوهیستوشیمی (IHC)، استراتژی‌های اکسیزیون و مدیریت ضایعات لوکال اگرسیو",
    odontogenic_tumors: "تریاژ رادیوگرافیک، استراتژی بیوپسی، پروتکل‌های رزکسیون بر اساس مارجین و فالوآپ",
    odontogenic_cysts: "تفکیک کیست‌های تکاملی و التهابی، مارسوپیالیزاسیون در برابر انوکلئیشن، کاربرد ادجوانت کارنوی در کراتوسیست",
    developmental_lesions: "تریاژ ضایعات ژانت‌سل و کیستیک، بررسی‌های اندوکرین و ژنتیک، درمان‌های سیستمیک کورتیکواستروئید و جراحی محافظه‌کارانه",
    benign_epithelial: "ارزیابی دیسپلازی اپیتلیالی، تریاژ ضایعات سفید و پاپیلاری، اکسیزیون جراحی کامل و پروتکل‌های پیشگیری از بدخیمی",
    non_odontogenic_cysts: "ارزیابی سونوگرافی و ام‌آرآی کیست‌های تکاملی خط وسط، تکنیک‌های انوکلئیشن کپسولار و حفظ آناتومی حیاتی کف دهان",
    malignancy: "استیجینگ تومورهای بدخیم فک، پنل هیستوپاتولوژی تشخیصی، اصول رزکسیون رادیکال و مدیریت لنف‌نودهای گردنی",
    traumatic_lesions: "تریاژ ضایعات کیستیک بزاقی و توده‌های واکنشی، تکنیک‌های اکسیزیون و خارج‌سازی غدد زیرزبانی و بزاقی فرعی",
    fibrous_dysplasia: "تریاژ رادیوگرافیک و سی‌تی، سنجش موتاسیون ژن GNAS، پایش درگیری جمجمه/اپتیک، کانتورینگ جراحی و استراتژی‌های ضد جذب استخوان",
    juvenile_ossifying_fibroma: "تریاژ سی‌تی سه‌بعدی، تفکیک ساب‌تایپ ترابکولار و پساموماتوئید، انوکلئیشن با کورتاژ تهاجمی و پایش عود",
    ossifying_fibroma: "ارزیابی کورتیکاسیون محیطی، تفکیک از فیبروز دیسپلازی، انوکلئیشن ان‌بلوک و بازسازی فانکشنال فک",
    osteonecrosis_mandible: "استیجینگ AAOMS، پایش داروهای ضد بازجذب و رگ‌زایی، دبریدمان جراحی، درمان‌های ادجوانت و کنترل درد",
    pyogenic_granuloma: "حذف عوامل محرک موضعی و جرم‌گیری، اکسیزیون جراحی کامل همراه با پریوست و پایش عود پس از زایمان",
    radicular_cyst: "ارزیابی حیات پالپ، درمان اندودانتیک اولیه، انوکلئیشن کیستیک همراه با رتروگراد فیلینگ و بیوپسی قطعی",
    capillary_hemangioma: "آسپیراسیون سوزنی الزامی، بررسی جریان عروقی با داپلر، اسکلروتراپی نئوادجوانت و اکسیزیون ایمن",
    lymphangioma: "ارزیابی راه‌های هوایی، ام‌آرآی با کنتراست، ابلیشن با رادیوفرکوئنسی/لیزر یا اسکلروتراپی با بلئومایسین",
    lipomatous_tumor: "سونوگرافی بافت نرم، رد لیپوسارکوم با بیوپسی برشی، اکسیزیون محافظه‌کارانه با کپسول دست‌نخورده",
    plexiform_neurofibroma: "غربالگری نوروفیبروماتوز نوع ۱ (NF1)، ام‌آرآی شبکه عصبی، جراحی سالواژ فانکشنال و مهارکننده MEK",
    fibro_fatty_tissue: "تفکیک رادیوگرافیک بافت چربی اسکلتی نرمال، بیوپسی جهت رد استئومیلیت، پیگیری سالانه بالینی",
    fibromatosis: "ام‌آرآی وسعت درگیری فاسیال، اکسیزیون وسیع با مارجین منفی، مهارکننده‌های تیروزین کیناز در موارد راجعه",
    inflammatory_myofibroblastic_tumor: "بررسی ایمونوهیستوشیمی ALK، رد سارکوم‌های بدخیم، رزکسیون موضعی کامل و تارگت‌تراپی کریزوتینیب",
    desmoplastic_fibroma: "بررسی تخریب کورتیکال در CBCT، رزکسیون سگمنتال با مارجین استخوانی ایمن به دلیل نرخ عود بالا",
    osteoma: "بررسی علائم انسدادی سینوس و کانال عصب، غربالگری سندرم گاردنر (کولونوسکوپی) و کانتورینگ جراحی",
    ameloblastoma: "امپراتوری بیوپسی برشی، تفکیک سالید از یونیکیستیک، رزکسیون سگمنتال با مارجین استخوانی ۱۰ تا ۱۵ میلی‌متر",
    odontogenic_fibroma: "انوکلئیشن موضعی همراه با کورتاژ دقیق پیرامونی، پایش رادیوگرافیک بلندمدت تحلیل ریشه دندان‌ها",
    odontogenic_myxoma: "ارزیابی نفوذ ماتریکس ژلاتینی بدون کپسول، رزکسیون مارجینال یا سگمنتال با مارجین ۱۰ میلی‌متر استخوان سالم",
    cementoblastoma: "اتصال به ریشه دندان درگیر در رادیوگرافی، خارج‌سازی دندان همراه با تومور و کورتاژ بستر پیرامونی",
    odontoma: "تفکیک کامپوند و کمپلکس، انوکلئیشن محافظه‌کارانه و هدایت رویش دندان‌های نهفته مجاور",
    ameloblastic_fibroma: "بیوپسی برشی دقیق، انوکلئیشن محافظه‌کارانه با کورتاژ استخوانی، پایش دقیق جهت رد ترانسفورماسیون بدخیم",
    ameloblastic_fibro_odontoma: "انوکلئیشن ساده همراه با کورتاژ لایت، آزادسازی دندان نهفته زیرین و حفظ صفحه کورتیکال",
    dentigerous_cyst: "مارسوپیالیزاسیون یا انوکلئیشن، ارزیابی پتانسیل رویش دندان نهفته و ارسال کل دیواره کیست به پاتولوژی",
    inflammatory_dentigerous_cyst: "درمان عفونت دندان شیری پیشین، رفع التهاب و انوکلئیشن دقیق کپسول جهت پیشگیری از آسیب جوانه دائمی",
    odontogenic_keratocyst: "بررسی جهش PTCH1 و سندرم گورلین، انوکلئیشن به همراه ادجوانت محلول کارنوی یا کرایوتراپی جهت کاهش عود",
    eruption_cyst: "مشاهده انتظاری تا زمان رویش خودبه‌خودی، اکسیزیون سقف کیستیک (اوپرکولکتومی) فقط در صورت ممانعت از رویش",
    cgcg: "تریاژ آزمایشگاهی اندوکرین (رد تومور براون)، طبقه‌بندی بیولوژیک تهاجمی/غیرتهاجمی، کورتیکواستروئید داخل ضایعه و دنوزوماب",
    reparative_cgcg: "پایش پاسخ ترمیمی پس از تروما، آسپیراسیون و کورتاژ کم‌تهاجم جهت حفظ جوانه‌های دندانی مجاور",
    aneurysmal_bone_cyst: "آنژیوگرافی و آمبولیزاسیون قبل از عمل، کورتاژ داخل ضایعه‌ای سریع و کنترل خونریزی شریانی با کوتر/بن‌واکس",
    brown_tumor: "درمان ادنوما پاراتیروئید و کنترل کلسیم خون، پایش رمینرالیزاسیون خودبه‌خودی استخوان فک بدون جراحی تخریبی",
    cherubism: "بررسی جهش ژن SH3BP2، مدیریت محافظه‌کارانه غیرجراحی تا بعد از بلوغ و پایش خط راه‌های هوایی",
    giant_cell_neoplasm: "تفکیک تومور سلول جاینت واقعی استخوان از CGCG، رزکسیون قطعی استخوانی با مارجین وسیع ایمن",
    oral_leukoplakia: "تریاژ سیستماتیک، حذف عوامل تروماتیک، ارزیابی دیسپلازی با بیوپسی اسکالپل، پروتکل‌های اکسیزیون و پایش بدخیمی",
    squamous_papilloma: "بررسی عفونت ویروس پاپیلومای انسانی (HPV)، اکسیزیون برشی کامل پایه ساقه با مارجین ۱ میلی‌متر",
    dermoid_cyst: "سونوگرافی و ام‌آرآی خط وسط کف دهان، انوکلئیشن کامل کپسول از طریق دسترسی داخل یا خارج دهانی",
    spindle_cell_tumor: "ایمونوهیستوشیمی تشخیصی مارکرهای سارکوم، رزکسیون رادیکال وسیع ان‌بلوک و لنفادنکتومی گردنی در صورت نیاز",
    ewing_sarcoma: "بررسی نوترکیبی ژن EWSR1، شیمی‌درمانی نئوادجوانت سیستمیک چنددارویی، رزکسیون رادیکال و رادیوتراپی",
    mucocele: "اکسیزیون کامل همراه با غدد بزاقی فرعی تغذیه‌کننده پیرامونی جهت جلوگیری از عود زودهنگام",
    ranula: "مارسوپیالیزاسیون میکروسکوپی یا خارج‌سازی قطعی غده بزاقی زیرزبانی (ساب‌لینگوال) از طریق رویکرد داخل‌دهانی"
  };

  function generateStarterTex(docId, title) {
    const cleanTitle = (title || 'پروتکل بالینی ضایعه').trim();
    return `\\documentclass[a4paper]{article}
\\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}
\\usepackage{amsmath,amssymb}
\\usepackage{xcolor}
\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,positioning,shapes.geometric}
\\usepackage{hyperref}
\\usepackage{fontspec}

\\makeatletter
\\newcommand{\\MathCollectFalse}{}
\\newcommand{\\MathCollectTrue}{}
\\let\\@kernel@tabular@init\\relax
\\makeatother

\\usepackage{xepersian}

\\settextfont[
  Path = Peyda/,
  BoldFont = Peyda-Bold.ttf,
  ItalicFont = Peyda-Medium.ttf,
  BoldItalicFont = Peyda-Bold.ttf
]{Peyda-Regular.ttf}

\\setlatintextfont{Times New Roman}

\\IfFileExists{Peyda/Symbola.ttf}{%
  \\newfontfamily\\symb[Path=Peyda/]{Symbola.ttf}%
}{%
  \\IfFileExists{editor/Peyda/Symbola.ttf}{%
    \\newfontfamily\\symb[Path=editor/Peyda/]{Symbola.ttf}%
  }{%
    \\newfontfamily\\symb{Symbola}%
  }%
}
\\newcommand{\\emoji}[1]{{\\symb #1}}

\\linespread{1.10}
\\pagestyle{empty}
\\thispagestyle{empty}

\\raggedbottom
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

\\definecolor{hlgray}{HTML}{E2E8F0}
\\definecolor{hlyellow}{HTML}{FEF08A}
\\definecolor{hlred}{HTML}{FEE2E2}
\\definecolor{darkred}{HTML}{991B1B}
\\definecolor{navy}{HTML}{0A2540}
\\definecolor{teal}{HTML}{0D9488}

\\begin{document}

\\begin{center}
{\\Large\\bfseries فلوچارت تصمیم‌گیری بالینی: ${cleanTitle}}\\\\[2pt]
{\\small\\itshape تریاژ بالینی، استراتژی بیوپسی، رویکردهای تشخیصی-درمانی و پایش}
\\end{center}
\\vspace{-4pt}
\\hrule height 0.8pt
\\vspace{6pt}

\\begin{center}
\\begin{latin}
\\linespread{0.95}\\selectfont
\\begin{tikzpicture}[
    every node/.style={font=\\sffamily\\footnotesize, align=center},
    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},
    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\\sffamily\\scriptsize\\bfseries},
    arrow/.style={-{Stealth[scale=0.9]}, thick, black}
]

% 1. Initial Presentation
\\node (n1) [stepbox, line width=1.0pt, text width=12.2cm] at (0, 0) {
    \\rl{\\textbf{تظاهر بالینی و تریاژ اولیه: ${cleanTitle}}}\\\\[2pt]
    \\scriptsize \\rl{ارزیابی بالینی و رادیوگرافیک $\\bullet$ تعیین ریسک $\\bullet$ طرح درمان مبتنی بر شواهد}
};

\\end{tikzpicture}
\\end{latin}
\\end{center}

\\end{document}
`;
  }

  function renderDocLibrary() {
    const listEl = $('#comboboxList');
    if (!listEl) return;

    let totalItems = 0;
    let totalWithChart = 0;
    let totalWithoutChart = 0;

    TAXONOMY_CATEGORIES.forEach(cat => {
      totalItems += cat.items.length;
      cat.items.forEach(item => {
        if (hasDocFlowchart(item.doc)) totalWithChart++;
        else totalWithoutChart++;
      });
    });

    const hasEl = $('#hasChartCount');
    const noEl = $('#noChartCount');
    if (hasEl) hasEl.textContent = toFaDigits(totalWithChart);
    if (noEl) noEl.textContent = toFaDigits(totalWithoutChart);

    const q = currentDocQuery.toLowerCase().trim();

    let html = '';

    TAXONOMY_CATEGORIES.forEach(cat => {
      const catHasChart = hasDocFlowchart(cat.doc);
      let catItems = cat.items;

      if (currentDocFilter === 'has_chart') {
        catItems = catItems.filter(item => hasDocFlowchart(item.doc));
      } else if (currentDocFilter === 'no_chart') {
        catItems = catItems.filter(item => !hasDocFlowchart(item.doc));
      }

      if (q) {
        catItems = catItems.filter(item => {
          return item.title.toLowerCase().includes(q) ||
                 item.doc.toLowerCase().includes(q) ||
                 cat.title.toLowerCase().includes(q);
        });
      }

      const isCatActive = State.activeDocId === cat.doc;
      const umbrellaMatchesQuery = !q || cat.title.toLowerCase().includes(q) || cat.doc.toLowerCase().includes(q);
      const showUmbrellaCard = umbrellaMatchesQuery && (
        (currentDocFilter === 'all') || 
        (currentDocFilter === 'has_chart' && catHasChart) || 
        (currentDocFilter === 'no_chart' && !catHasChart)
      );

      const showCat = catItems.length > 0 || showUmbrellaCard;
      if (!showCat) return;

      const umbrellaHtml = showUmbrellaCard ? `
        <div class="cb-umbrella-card ${isCatActive ? 'is-active-doc' : ''}" data-doc-id="${cat.doc}">
          <div class="cb-lesion-info">
            <div class="cb-umbrella-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>فلوچارت چتری و جامع (تریاژ و تشخیص افتراقی)</span>
            </div>
            <div class="cb-umbrella-title">الگوریتم جامع: ${cat.title}</div>
            <div class="cb-lesion-meta" style="display:flex; align-items:center; gap:8px;">
              ${catHasChart ? '<span class="cb-status-pill ready">● دارای فلوچارت فعال</span>' : '<span class="cb-status-pill empty" style="color:#94a3b8;font-size:10px;">فاقد فلوچارت (آماده ایجاد)</span>'}
              <span class="cb-doc-key" style="margin-inline-start: 4px;">${cat.doc}</span>
            </div>
          </div>
          <div class="cb-lesion-actions">
            ${catHasChart ? `
              <button type="button" class="cb-icon-btn btn-open-chart" onclick="CanvasApp.selectDocument('${cat.doc}', 'الگوریتم جامع: ${cat.title.replace(/'/g, "\\'")}')" title="مشاهده فلوچارت جامع ${cat.title}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="6" rx="1.5"></rect><rect x="14" y="3" width="7" height="6" rx="1.5"></rect><rect x="8.5" y="15" width="7" height="6" rx="1.5"></rect><path d="M6.5 9v3h11V9M12 12v3"></path></svg>
              </button>
            ` : `
              <button type="button" class="cb-icon-btn btn-add-chart" onclick="CanvasApp.createAndLoadFlowchart('${cat.doc}', 'الگوریتم جامع: ${cat.title.replace(/'/g, "\\'")}')" title="ایجاد فلوچارت جامع ${cat.title}">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            `}
          </div>
        </div>
      ` : '';

      const itemsHtml = catItems.map(item => {
        const itemHasChart = hasDocFlowchart(item.doc);
        const isActive = State.activeDocId === item.doc;

        return `
          <div class="cb-lesion-card ${isActive ? 'is-active-doc' : ''}" data-doc-id="${item.doc}" data-has-chart="${itemHasChart}">
            <div class="cb-lesion-info">
              <div class="cb-lesion-name">${item.title}</div>
              <div class="cb-lesion-meta" style="display: flex; align-items: center; gap: 8px;">
                ${itemHasChart ? '<span class="cb-status-pill ready">● دارای فلوچارت</span>' : ''}
                <span class="cb-doc-key" style="margin-inline-start: 4px;">${item.doc}</span>
              </div>
            </div>
            <div class="cb-lesion-actions">
              ${itemHasChart ? `
                <button type="button" class="cb-icon-btn btn-open-chart" onclick="CanvasApp.selectDocument('${item.doc}', '${item.title.replace(/'/g, "\'")}')" title="مشاهده فلوچارت ${item.title}">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="6" rx="1.5"></rect><rect x="14" y="3" width="7" height="6" rx="1.5"></rect><rect x="8.5" y="15" width="7" height="6" rx="1.5"></rect><path d="M6.5 9v3h11V9M12 12v3"></path></svg>
                </button>
              ` : `
                <button type="button" class="cb-icon-btn btn-add-chart" onclick="CanvasApp.createAndLoadFlowchart('${item.doc}', '${item.title.replace(/'/g, "\'")}')" title="ایجاد فلوچارت ${item.title}">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              `}
            </div>
          </div>
        `;
      }).join('');

      const isCardOpen = q.length > 0;

      html += `
        <div class="cb-category-card ${isCardOpen ? 'open' : ''}" id="card_${cat.id}" data-cat-id="${cat.id}">
          <div class="cb-category-header-bar" onclick="CanvasApp.toggleDocCategory('${cat.id}')">
            <div class="cb-cat-title-wrap">
              <span class="cb-cat-chevron">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
              <span class="cb-cat-title">${cat.title}</span>
              <span class="cb-cat-count-badge">${toFaDigits(cat.items.length)}</span>
            </div>
            <div class="cb-cat-actions" onclick="event.stopPropagation()">
              ${catHasChart ? `
                <button type="button" class="cb-icon-btn btn-open-chart" onclick="CanvasApp.selectDocument('${cat.doc}', 'الگوریتم جامع: ${cat.title.replace(/'/g, "\'")}')" title="مشاهده فلوچارت دسته ${cat.title}">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="6" rx="1.5"></rect><rect x="14" y="3" width="7" height="6" rx="1.5"></rect><rect x="8.5" y="15" width="7" height="6" rx="1.5"></rect><path d="M6.5 9v3h11V9M12 12v3"></path></svg>
                </button>
              ` : `
                <button type="button" class="cb-icon-btn btn-add-chart" onclick="CanvasApp.createAndLoadFlowchart('${cat.doc}', 'الگوریتم جامع: ${cat.title.replace(/'/g, "\'")}')" title="ساخت فلوچارت دسته ${cat.title}">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              `}
            </div>
          </div>
          <div class="cb-category-body-wrapper">
            <div class="cb-category-body-inner">
              <div class="cb-category-items-grid">
                ${umbrellaHtml}
                ${itemsHtml || (!umbrellaHtml ? '<div style="padding:10px; color:#64748b; font-size:12px;">موردی در این فیلتر یافت نشد.</div>' : '')}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  }

  function setDocFilter(type) {
    currentDocFilter = type;
    $$('.lib-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === type);
    });
    loadCheckpoints();
    renderDocLibrary();
  }

  function filterDocuments(query) {
    currentDocQuery = query || '';
    renderDocLibrary();
  }

  function toggleAllDocCategories() {
    const cards = $$('.cb-category-card');
    const anyClosed = Array.from(cards).some(c => !c.classList.contains('open'));
    cards.forEach(c => {
      if (anyClosed) c.classList.add('open');
      else c.classList.remove('open');
    });
    const label = $('#toggleAllCatsLabel');
    if (label) label.textContent = anyClosed ? 'بستن همه' : 'باز کردن همه';
  }

  function toggleDocCategory(catId) {
    const card = $(`#card_${catId}`);
    if (card) card.classList.toggle('open');
  }

  async function selectDocument(docId, docTitle) {
    if (!docId) return;

    if (!EMBEDDED_DOCS[docId]) {
      try {
        const local = localStorage.getItem('tikz_doc_' + docId);
        if (local) EMBEDDED_DOCS[docId] = local;
      } catch (e) {}

      if (!EMBEDDED_DOCS[docId]) {
        try {
          const res = await fetch('/api/document?file=' + encodeURIComponent(docId) + '.tex');
          if (res.ok) {
            const data = await res.json();
            if (data && data.tex) EMBEDDED_DOCS[docId] = data.tex;
          }
        } catch (e) {}
      }
    }

    if (!EMBEDDED_DOCS[docId]) {
      showToast('فلوچارتی برای این عنوان یافت نشد. می‌توانید با دکمه + آن را بسازید.');
      return;
    }

    State.activeDocId = docId;
    const title = docTitle || getDocTitle(docId);
    setTxt('docComboboxLabel', title);
    closeCombobox();

    parseAndRenderDocument(EMBEDDED_DOCS[docId]);
    fitAll(true);
    showToast(`سند «${title}» بارگذاری شد`);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('doc', docId);
      url.searchParams.delete('new');
      url.searchParams.delete('title');
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}

    renderDocLibrary();
  }

  async function createAndLoadFlowchart(docId, title) {
    if (!docId) return;
    const cleanTitle = title || docId;
    const starterTex = generateStarterTex(docId, cleanTitle);

    EMBEDDED_DOCS[docId] = starterTex;
    try {
      localStorage.setItem('tikz_doc_' + docId, starterTex);
    } catch (e) {}

    // Persist to server in background
    try {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: 'flowcharts/' + docId + '.tex',
          tex: starterTex
        })
      }).catch(() => {});
    } catch (e) {}

    State.activeDocId = docId;
    setTxt('docComboboxLabel', cleanTitle);
    closeCombobox();

    parseAndRenderDocument(starterTex);
    fitAll(true);
    showToast(`فلوچارت جدید «${cleanTitle}» ایجاد شد`);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('doc', docId);
      url.searchParams.delete('new');
      url.searchParams.delete('title');
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}

    renderDocLibrary();
  }

  function toggleCombobox(e) {
    if (e) e.stopPropagation();
    const trigger = $('#docComboboxTrigger');
    const popover = $('#docComboboxPopover');
    const backdrop = $('#comboboxBackdrop');
    if (!trigger || !popover) return;

    const isOpen = popover.classList.contains('show');
    if (isOpen) {
      closeCombobox();
    } else {
      trigger.classList.add('open');
      popover.classList.add('show');
      if (backdrop) backdrop.classList.add('show');
      renderDocLibrary();
      const search = $('#comboboxSearchInput');
      if (search) {
        search.value = '';
        currentDocQuery = '';
        search.focus();
      }
    }
  }

  function closeCombobox() {
    const trigger = $('#docComboboxTrigger');
    const popover = $('#docComboboxPopover');
    const backdrop = $('#comboboxBackdrop');
    if (trigger) trigger.classList.remove('open');
    if (popover) popover.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
  }

  function loadLocalDocsIntoMemory() {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('tikz_doc_')) {
          const docId = key.substring('tikz_doc_'.length);
          const content = localStorage.getItem(key);
          if (content && !EMBEDDED_DOCS[docId]) {
            EMBEDDED_DOCS[docId] = content;
          }
        }
      }
    } catch (e) {}
  }

  async function refreshServerDocsList() {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const data = await res.json();
        if (data && data.documents) {
          State.serverDocs = data.documents.map(d => d.id || d.name.replace(/\.tex$/, ''));
          renderDocLibrary();
        }
      }
    } catch (e) {}
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

    let nodeDragRaf = null;
    let pendingPointerCoords = null;

    function applyNodeDragMove() {
      nodeDragRaf = null;
      if (!State.draggingNode || State.toolMode !== 'move' || !pendingPointerCoords) return;

      const n = State.draggingNode;
      const { clientX, clientY } = pendingPointerCoords;
      const dx = (clientX - State.dragNodeStartPointer.x) / State.zoom;
      const dy = (clientY - State.dragNodeStartPointer.y) / State.zoom;

      if (!State.hasDragMoved && Math.hypot(dx, dy) < 2) return;
      State.hasDragMoved = true;

      const targetCx = State.dragNodeStartPos.cx + dx;
      const targetCy = State.dragNodeStartPos.cy + dy;

      const snapResult = checkMagneticAlignment(n, targetCx, targetCy);
      n.cx = snapResult.cx;
      n.cy = snapResult.cy;

      n.x = +(n.cx / SCALE).toFixed(2);
      n.y = +(-n.cy / SCALE).toFixed(2);

      if (n.el) {
        n.el.style.left = `${n.cx}px`;
        n.el.style.top = `${n.cy}px`;
      }

      layoutEdges(false);
      updateTelemetryHud();
    }

    document.addEventListener('pointermove', (e) => {
      updatePointerHud(e.clientX, e.clientY);

      // Handle Node Dragging in Move Mode (Unstoppable tracking across entire screen via rAF)
      if (State.draggingNode && State.toolMode === 'move') {
        pendingPointerCoords = { clientX: e.clientX, clientY: e.clientY };
        if (!nodeDragRaf) {
          nodeDragRaf = requestAnimationFrame(applyNodeDragMove);
        }
        return;
      }

      if (State.isDraggingCanvas) {
        State.panX = e.clientX - State.dragCanvasStartX;
        State.panY = e.clientY - State.dragCanvasStartY;
        State.hasUserTransformed = true;
        applyTransform();
      }
    });

    document.addEventListener('pointerup', (e) => {
      if (nodeDragRaf) {
        cancelAnimationFrame(nodeDragRaf);
        nodeDragRaf = null;
      }
      if (State.draggingNode && pendingPointerCoords) {
        applyNodeDragMove();
        pendingPointerCoords = null;
      }

      if (State.draggingNode) {
        const n = State.draggingNode;
        if (n.el) {
          try {
            if (n.el.hasPointerCapture && n.el.hasPointerCapture(e.pointerId)) {
              n.el.releasePointerCapture(e.pointerId);
            }
          } catch(err) {}
          n.el.classList.remove('dragging');
          n.el.classList.add('snap-feedback');
          setTimeout(() => n.el.classList.remove('snap-feedback'), 200);
        }
        hideAlignmentGuides();

        if (State.hasDragMoved) {
          const moved = (n.cx !== State.dragNodeStartPos.cx || n.cy !== State.dragNodeStartPos.cy);
          if (moved && State.dragNodeStartSnapshot) {
            State.historyStack.push(State.dragNodeStartSnapshot);
            if (State.historyStack.length > State.maxHistory) State.historyStack.shift();
            State.redoStack = [];
            updateUndoRedoUI();

            State.hasUserTransformed = true;
            State.texSource = updateNodeCoord(State.texSource, n.id, n.x, n.y);
            if (texCodeEditor) texCodeEditor.value = State.texSource;
            saveDraft();
            playSound('drop');
            showToast(`موقعیت گره #${toFaDigits(n.id)} ذخیره شد`);
          }
        }
        State.draggingNode = null;
        State.dragNodeStartSnapshot = null;
      }

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
      const popover = $('#docComboboxPopover');
      if (popover && popover.classList.contains('show')) {
        if (!popover.contains(e.target) && (!wrapper || !wrapper.contains(e.target))) {
          closeCombobox();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
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
        closeCheckpointsModal();
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
    if (!viewport) return;
    viewport.classList.remove('mode-select', 'mode-hand-move', 'mode-highlight-active');
    hideHighlightPopover();
    clearLivePreviews();

    if (mode === 'move') viewport.classList.add('mode-hand-move');
    if (mode === 'highlight') viewport.classList.add('mode-highlight-active');
    if (mode === 'select') viewport.classList.add('mode-select');

    const btnSelect = $('#btnToolSelect') || $('#dockBtnSelect');
    const btnMove = $('#btnToolMove') || $('#dockBtnMove');
    const btnHighlight = $('#btnToolHighlight') || $('#dockBtnHighlight');
    if (btnSelect) btnSelect.classList.toggle('active', mode === 'select');
    if (btnMove) btnMove.classList.toggle('active', mode === 'move');
    if (btnHighlight) btnHighlight.classList.toggle('active', mode === 'highlight');

    const subHighlight = $('#subBarHighlight');
    const subNormal = $('#subBarNormal');
    if (mode === 'highlight') {
      if (subHighlight) {
        subHighlight.style.display = 'flex';
        subHighlight.classList.remove('hidden');
      }
      if (subNormal) {
        subNormal.style.display = 'none';
        subNormal.classList.add('hidden');
      }
      setActiveHighlightColor(State.activeHighlightColor);
    } else {
      if (subHighlight) {
        subHighlight.style.display = 'none';
        subHighlight.classList.add('hidden');
      }
      if (subNormal) {
        subNormal.style.display = 'flex';
        subNormal.classList.remove('hidden');
      }
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

  
  // ==========================================================================
  // Web Audio Tactile Sound Effects Engine
  // ==========================================================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!State.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, t);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.04);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.start(t);
        osc.stop(t + 0.04);
      } else if (type === 'snap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, t);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.06);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.start(t);
        osc.stop(t + 0.06);
      } else if (type === 'highlight') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(540, t + 0.08);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.start(t);
        osc.stop(t + 0.08);
      } else if (type === 'erase') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(210, t + 0.07);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.start(t);
        osc.stop(t + 0.07);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t);
        osc.frequency.setValueAtTime(659.25, t + 0.07);
        gain.gain.setValueAtTime(0.09, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.start(t);
        osc.stop(t + 0.22);
      }
    } catch (e) {}
  }

  function toggleSound() {
    State.soundEnabled = !State.soundEnabled;
    const btn = $('#btnToggleSound');
    if (btn) {
      btn.classList.toggle('active', State.soundEnabled);
      btn.title = State.soundEnabled ? 'صدا: روشن (کلیک برای قطع)' : 'صدا: خاموش (کلیک برای فعال‌سازی)';
    }
    showToast(State.soundEnabled ? 'افکت‌های صوتی فعال شد' : 'افکت‌های صوتی خاموش شد');
    if (State.soundEnabled) playSound('click');
  }


  // ==========================================================================
  // View Modes (Canvas, Live PDF, TeX Code Drawer)
  // ==========================================================================
  function setViewMode(mode) {
    State.viewMode = mode;
    document.querySelectorAll('#btnViewCanvas').forEach(b => b.classList.toggle('active', mode === 'canvas'));
    document.querySelectorAll('#btnViewPdf').forEach(b => b.classList.toggle('active', mode === 'pdf'));
    document.querySelectorAll('#btnViewTex').forEach(b => b.classList.toggle('active', mode === 'tex'));

    const canvasPane = $('#paneCanvas');
    const pdfPane = $('#panePdf');
    const texPane = $('#paneTex');

    if (canvasPane) canvasPane.classList.toggle('active', mode === 'canvas');
    if (pdfPane) {
      pdfPane.classList.toggle('active', mode === 'pdf');
      if (mode === 'pdf') {
        const pdfFrame = $('#pdfFrame');
        const emptyState = $('#pdfEmptyState');
        if (pdfFrame && State.activeDocId) {
          if (!pdfFrame.src || pdfFrame.src === window.location.href || pdfFrame.src.endsWith('/')) {
            pdfFrame.src = `/${State.activeDocId}.pdf?t=${Date.now()}`;
          }
          if (emptyState) emptyState.style.display = 'none';
        }
      }
    }
    if (texPane) {
      texPane.classList.toggle('active', mode === 'tex');
      if (mode === 'tex' && texCodeEditor) {
        texCodeEditor.value = State.texSource;
      }
    }
    playSound('click');
  }

  function toFaDigits(num) {
    const f = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/[0-9]/g, d => f[+d]);
  }

  State.spacingX = 100;
  State.spacingY = 100;

  function adjustSpacing(axis, delta) {
    pushUndoState('Adjust Spacing');
    const step = delta > 0 ? 10 : -10;

    if (axis === 'x' || axis === 'horizontal') {
      State.spacingX = Math.max(50, Math.min(200, State.spacingX + step));
      const factor = 1 + (step / 100);
      State.nodes.forEach(n => {
        if (n.x !== 0) {
          n.x = +(n.x * factor).toFixed(2);
          n.cx = n.x * SCALE;
          if (n.el) n.el.style.left = `${n.cx}px`;
        }
      });
      const badge = $('#hSpacingBadge');
      if (badge) badge.textContent = `${toFaDigits(State.spacingX)}٪`;
    } else if (axis === 'y' || axis === 'vertical') {
      State.spacingY = Math.max(50, Math.min(200, State.spacingY + step));
      const factor = 1 + (step / 100);
      State.nodes.forEach(n => {
        if (n.y !== 0) {
          n.y = +(n.y * factor).toFixed(2);
          n.cy = -n.y * SCALE;
          if (n.el) n.el.style.top = `${n.cy}px`;
        }
      });
      const badge = $('#vSpacingBadge');
      if (badge) badge.textContent = `${toFaDigits(State.spacingY)}٪`;
    }
    layoutEdges();
    updateTelemetryHud();
    saveDraft();
    playSound('snap');
    showToast(`فاصله ${axis === 'x' || axis === 'horizontal' ? 'افقی' : 'عمودی'} تنظیم شد`);
  }

  
  function toggleSpacingSlider(axis) {
    const popV = $('#sliderPopoverV');
    const popH = $('#sliderPopoverH');
    const btnV = $('#btnToggleVSpacing');
    const btnH = $('#btnToggleHSpacing');

    if (axis === 'v') {
      if (popH) popH.classList.remove('open');
      if (btnH) btnH.classList.remove('active');
      if (popV) {
        const isOpen = popV.classList.toggle('open');
        if (btnV) btnV.classList.toggle('active', isOpen);
      }
    } else {
      if (popV) popV.classList.remove('open');
      if (btnV) btnV.classList.remove('active');
      if (popH) {
        const isOpen = popH.classList.toggle('open');
        if (btnH) btnH.classList.toggle('active', isOpen);
      }
    }
  }

  function setSpacingDirect(axis, val) {
    const targetVal = parseInt(val, 10) || 100;
    if (axis === 'x') {
      const oldVal = State.spacingX || 100;
      State.spacingX = targetVal;
      const factor = targetVal / oldVal;
      State.nodes.forEach(n => {
        if (n.x !== 0) {
          n.x = +(n.x * factor).toFixed(2);
          n.cx = n.x * SCALE;
          if (n.el) n.el.style.left = `${n.cx}px`;
        }
      });
      const badge = $('#hSpacingBadge');
      if (badge) badge.textContent = `${toFaDigits(State.spacingX)}٪`;
    } else if (axis === 'y') {
      const oldVal = State.spacingY || 100;
      State.spacingY = targetVal;
      const factor = targetVal / oldVal;
      State.nodes.forEach(n => {
        if (n.y !== 0) {
          n.y = +(n.y * factor).toFixed(2);
          n.cy = -n.y * SCALE;
          if (n.el) n.el.style.top = `${n.cy}px`;
        }
      });
      const badge = $('#vSpacingBadge');
      if (badge) badge.textContent = `${toFaDigits(State.spacingY)}٪`;
    }
    layoutEdges();
    updateTelemetryHud();
    saveDraft();
  }

  function resetSpacing() {
    pushUndoState('Reset Spacing');
    State.spacingX = 100;
    State.spacingY = 100;
    const vBadge = $('#vSpacingBadge');
    const hBadge = $('#hSpacingBadge');
    if (vBadge) vBadge.textContent = '۱۰۰٪';
    if (hBadge) hBadge.textContent = '۱۰۰٪';

    parseAndRenderDocument(EMBEDDED_DOCS[State.activeDocId] || State.texSource);
    fitAll(true);
    saveDraft();
    playSound('snap');
    showToast('فاصله‌ها به ۱۰۰٪ بازنشانی شدند');
  }


  // ==========================================================================
    // ==========================================================================
  // Version Checkpoints & History Management
  // ==========================================================================
  State.checkpoints = [];

  function loadCheckpoints() {
    if (!State.activeDocId) return;
    try {
      const stored = localStorage.getItem('tikz_checkpoints_' + State.activeDocId);
      if (stored) {
        State.checkpoints = JSON.parse(stored) || [];
      } else {
        State.checkpoints = [];
      }
    } catch (e) {
      State.checkpoints = [];
    }
    const badge = $('#checkpointsCountBadge');
    if (badge) badge.textContent = toFaDigits(State.checkpoints.length);
  }

  function openCheckpointsModal() {
    const m = $('#checkpointsModal');
    if (m) {
      m.classList.add('show');
      m.style.display = 'flex';
      loadCheckpoints();
      renderCheckpointSelect();
    }
    playSound('click');
  }

  function closeCheckpointsModal() {
    const m = $('#checkpointsModal');
    if (m) {
      m.classList.remove('show');
      m.style.display = 'none';
    }
  }

  function createCheckpoint() {
    const input = $('#newCheckpointName');
    const nowTime = new Date().toLocaleTimeString('fa-IR');
    const name = (input && input.value.trim()) || `نسخه ${toFaDigits(State.checkpoints.length + 1)} (${nowTime})`;
    const cp = {
      id: 'cp_' + Date.now(),
      name,
      time: nowTime,
      tex: State.texSource
    };
    State.checkpoints.push(cp);
    try {
      localStorage.setItem('tikz_checkpoints_' + State.activeDocId, JSON.stringify(State.checkpoints));
    } catch (e) {}
    if (input) input.value = '';
    renderCheckpointSelect();
    const sel = $('#checkpointSelect');
    if (sel) {
      sel.value = cp.id;
      compareWithCheckpoint(cp.id);
    }
    const countBadge = $('#checkpointsCountBadge');
    if (countBadge) countBadge.textContent = toFaDigits(State.checkpoints.length);
    playSound('success');
    showToast(`چک‌پوینت «${name}» با موفقیت ذخیره شد`);
  }

  function renderCheckpointSelect() {
    const sel = $('#checkpointSelect');
    if (!sel) return;
    sel.innerHTML = '';

    // 1. Original Baseline Document
    const optOrig = document.createElement('option');
    optOrig.value = 'orig';
    optOrig.textContent = '📄 نسخه اصلی پایه (Original Baseline)';
    optOrig.style.color = '#93c5fd';
    sel.appendChild(optOrig);

    // 2. Unsaved Local Draft (ONLY if user actually modified something)
    try {
      const draft = localStorage.getItem('tikz_draft_' + State.activeDocId);
      const orig = (EMBEDDED_DOCS[State.activeDocId] || '').trim();
      const current = (State.texSource || '').trim();
      const cleanDraft = (draft || '').trim();
      if (cleanDraft && orig && cleanDraft !== orig && current !== orig) {
        const optDraft = document.createElement('option');
        optDraft.value = 'draft';
        optDraft.textContent = '⚡ پیش‌نویس فعلی (تغییرات اعمال‌شده)';
        optDraft.style.color = '#f59e0b';
        optDraft.style.fontWeight = 'bold';
        sel.appendChild(optDraft);
      }
    } catch (e) {}

    // 3. User Registered Checkpoints
    State.checkpoints.forEach(cp => {
      const opt = document.createElement('option');
      opt.value = cp.id;
      opt.textContent = `🔖 ${cp.name} (${toFaDigits(cp.time)})`;
      sel.appendChild(opt);
    });

    if (sel.options.length > 0) {
      sel.selectedIndex = sel.options.length > 1 ? 1 : 0;
      compareWithCheckpoint(sel.value);
    } else {
      const diffPre = $('#diffViewer');
      if (diffPre) diffPre.textContent = 'نسخه‌ای برای نمایش وجود ندارد.';
    }
  }

  function compareWithCheckpoint(cpId) {
    const diffPre = $('#diffViewer');
    if (!diffPre) return;

    let targetTex = '';
    if (cpId === 'orig') {
      targetTex = EMBEDDED_DOCS[State.activeDocId] || '';
    } else if (cpId === 'draft') {
      targetTex = localStorage.getItem('tikz_draft_' + State.activeDocId) || '';
    } else {
      const cp = State.checkpoints.find(c => c.id === cpId);
      if (cp) targetTex = cp.tex;
    }

    if (!targetTex) {
      diffPre.innerHTML = '<div style="color:#94a3b8; padding:8px; text-align:center;">محتوایی برای مقایسه یافت نشد.</div>';
      return;
    }

    const oldLines = targetTex.split('\n');
    const curLines = State.texSource.split('\n');
    diffPre.innerHTML = '';
    const maxL = Math.max(oldLines.length, curLines.length);
    let diffCount = 0;
    for (let i = 0; i < maxL; i++) {
      const o = oldLines[i];
      const c = curLines[i];
      if (o !== c) {
        diffCount++;
        if (o !== undefined) {
          const div = document.createElement('div');
          div.className = 'diff-del';
          div.textContent = '- ' + o;
          diffPre.appendChild(div);
        }
        if (c !== undefined) {
          const div = document.createElement('div');
          div.className = 'diff-add';
          div.textContent = '+ ' + c;
          diffPre.appendChild(div);
        }
      }
    }
    if (diffCount === 0) {
      diffPre.innerHTML = '<div style="color:#10b981; padding:8px; text-align:center; font-weight:700;">✓ هیچ تفاوتی بین نسخه فعلی و این نسخه وجود ندارد (کاملاً یکسان هستند).</div>';
    }
  }

  function restoreSelectedCheckpoint() {
    const sel = $('#checkpointSelect');
    if (!sel || !sel.value) return;
    const val = sel.value;

    let targetTex = '';
    let targetName = '';
    if (val === 'orig') {
      targetTex = EMBEDDED_DOCS[State.activeDocId] || '';
      targetName = 'نسخه اصلی پایه';
    } else if (val === 'draft') {
      targetTex = localStorage.getItem('tikz_draft_' + State.activeDocId) || '';
      targetName = 'پیش‌نویس محلی';
    } else {
      const cp = State.checkpoints.find(c => c.id === val);
      if (cp) {
        targetTex = cp.tex;
        targetName = cp.name;
      }
    }

    if (!targetTex) return;
    pushUndoState('Restore Checkpoint');
    State.texSource = targetTex;
    parseAndRenderDocument(targetTex);
    fitAll(true);
    closeCheckpointsModal();
    saveDraft();
    playSound('success');
    showToast(`نسخه «${targetName}» بازگردانده شد`);
  }

  function deleteSelectedCheckpoint() {
    const sel = $('#checkpointSelect');
    if (!sel || !sel.value) return;
    const val = sel.value;
    if (val === 'orig') {
      showToast('امکان حذف نسخه اصلی پایه وجود ندارد.');
      return;
    }
    if (val === 'draft') {
      try {
        localStorage.removeItem('tikz_draft_' + State.activeDocId);
      } catch (e) {}
      updateDraftUI(false);
      renderCheckpointSelect();
      showToast('پیش‌نویس محلی حذف شد');
      return;
    }
    State.checkpoints = State.checkpoints.filter(c => c.id !== val);
    try {
      localStorage.setItem('tikz_checkpoints_' + State.activeDocId, JSON.stringify(State.checkpoints));
    } catch (e) {}
    renderCheckpointSelect();
    const countBadge = $('#checkpointsCountBadge');
    if (countBadge) countBadge.textContent = toFaDigits(State.checkpoints.length);
    showToast('چک‌پوینت حذف شد');
  }

  async function saveToServer() {
    showToast('در حال ذخیره روی سرور...');
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: 'flowcharts/' + State.activeDocId + '.tex',
          tex: State.texSource
        })
      });
      if (res.ok) {
        playSound('success');
        showToast('فایل با موفقیت روی سرور ذخیره شد ✓');
      } else {
        showToast('خطا در ذخیره روی سرور');
      }
    } catch (e) {
      showToast('خطا در برقراری ارتباط با سرور');
    }
  }

    function openPdfNewTab() {
    if (!State.activeDocId) return;
    const url = `/${State.activeDocId}.pdf?t=${Date.now()}`;
    window.open(url, '_blank');
  }

  function downloadPdf() {
    if (!State.activeDocId) return;
    const url = `/${State.activeDocId}.pdf?t=${Date.now()}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${State.activeDocId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function compileXeLaTeX() {
    showToast('در حال کامپایل با موتور XeLaTeX...');
    const btn = $('#btnCompile');
    if (btn) btn.disabled = true;
    try {
      const res = await fetch('/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tex: State.texSource,
          job: State.activeDocId,
          file: State.activeDocId + '.tex'
        })
      });
      const data = await res.json();
      if (data && data.success) {
        playSound('success');
        showToast('کامپایل با موفقیت انجام شد ✓');
        const pdfUrl = data.pdf_url || `/${State.activeDocId}.pdf?t=${Date.now()}`;
        const frame = $('#pdfFrame');
        const emptyState = $('#pdfEmptyState');
        if (frame) frame.src = pdfUrl;
        if (emptyState) emptyState.style.display = 'none';
        setViewMode('pdf');
      } else {
        const errMsg = (data && data.log) || (data && data.errors && data.errors.join('\n')) || 'خطای نامشخص در کامپایل';
        showToast('خطای کامپایل XeLaTeX: ' + errMsg);
      }
    } catch (e) {
      showToast('خطا در اتصال به سرور کامپایل');
    } finally {
      if (btn) btn.disabled = false;
    }
  }


  // ==========================================================================
  // Auto-Save Draft System
  // ==========================================================================
  function saveDraft() {
    if (!State.activeDocId) return;
    try {
      localStorage.setItem('tikz_draft_' + State.activeDocId, State.texSource);
      updateDraftUI(true);
    } catch (e) {}
  }

  function updateDraftUI(hasDraft) {
    const badge = $('#btnDraftBadge');
    const revertBtn = $('#btnRevertDraft');
    if (badge) badge.style.display = hasDraft ? 'inline-flex' : 'none';
    if (revertBtn) revertBtn.style.display = hasDraft ? 'inline-flex' : 'none';
  }

  function revertDraft() {
    if (!State.activeDocId) return;
    try {
      localStorage.removeItem('tikz_draft_' + State.activeDocId);
    } catch (e) {}
    updateDraftUI(false);
    const orig = EMBEDDED_DOCS[State.activeDocId] || '';
    if (orig) {
      // Reverting to base point zero: clear undo/redo stacks completely!
      State.historyStack = [];
      State.redoStack = [];
      updateUndoRedoUI();

      State.texSource = orig;
      parseAndRenderDocument(orig);
      fitAll(true);
      playSound('erase');
      showToast('سند به نسخه اولیه بازنشانی شد (شمارنده آندو صفر گردید)');
    }
  }

  function handleDraftClick() {
    revertDraft();
  }


  function findClosestWord(body, clientX, clientY) {
    const allW = Array.from(body.querySelectorAll('.w'));
    if (allW.length === 0) return null;
    let closest = null;
    let minDist = Infinity;
    for (const w of allW) {
      const r = w.getBoundingClientRect();
      const dx = Math.max(r.left - clientX, 0, clientX - r.right);
      const dy = Math.max(r.top - clientY, 0, clientY - r.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist < minDist) {
        minDist = dist;
        closest = w;
      }
    }
    return minDist < 70 ? closest : null;
  }


  // ==========================================================================
  // Document Header in Canvas Preview (Title, Subtitle, Divider)
  // ==========================================================================
  function extractDocHeader(tex) {
    let title = '';
    let subtitle = '';
    if (!tex) return { title, subtitle };

    const mTitle = /\{\\Large\\bfseries\s*([^}]+)\}/.exec(tex);
    if (mTitle) {
      title = mTitle[1].replace(/\\rl\{/g, '').replace(/\\lr\{/g, '').replace(/\}/g, '').trim();
    }
    const mSub = /\{\\small\\itshape\s*([^}]+)\}/.exec(tex);
    if (mSub) {
      subtitle = mSub[1].replace(/\\rl\{/g, '').replace(/\\lr\{/g, '').replace(/\}/g, '').trim();
    }
    return { title, subtitle };
  }

  function updateDocHeaderInTex(newTitle, newSubtitle) {
    if (!State.texSource) return;
    let s = State.texSource;
    if (newTitle) {
      s = s.replace(/(\{\\Large\\bfseries\s*)([^}]+)(\})/, `$1${newTitle}$3`);
    }
    if (newSubtitle) {
      s = s.replace(/(\{\\small\\itshape\s*)([^}]+)(\})/, `$1${newSubtitle}$3`);
    }
    State.texSource = s;
    if (texCodeEditor) texCodeEditor.value = s;
    saveDraft();
  }

  function renderDocHeaderBox() {
    const box = $('#chartDocHeaderBox');
    if (!box) return;
    const { title, subtitle } = extractDocHeader(State.texSource);
    const titleEl = $('#chartDocTitle');
    const subEl = $('#chartDocSubtitle');
    if (titleEl && title) titleEl.innerText = title;
    if (subEl && subtitle) subEl.innerText = subtitle;

    // Attach inline edit handlers once
    if (titleEl && !titleEl._bound) {
      titleEl._bound = true;
      titleEl.addEventListener('blur', () => {
        updateDocHeaderInTex(titleEl.innerText.trim(), null);
        showToast('عنوان فلوچارت همگام‌سازی شد');
      });
    }
    if (subEl && !subEl._bound) {
      subEl._bound = true;
      subEl.addEventListener('blur', () => {
        updateDocHeaderInTex(null, subEl.innerText.trim());
        showToast('زیرعنوان فلوچارت همگام‌سازی شد');
      });
    }
  }


  // ==========================================================================
  // Prevent Browser Viewport Zoom on Mobile (Keep App Page Stable)
  // ==========================================================================
  let lastTouchEndTimeGlobal = 0;
  document.addEventListener('touchend', (e) => {
    const now = performance.now();
    if (now - lastTouchEndTimeGlobal <= 320) {
      const tag = e.target && e.target.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.target.isContentEditable) {
        e.preventDefault();
      }
    }
    lastTouchEndTimeGlobal = now;
  }, { passive: false });

  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

  // ==========================================================================
  // Smart Drag & Drop, Clipboard Paste & Auto-Taxonomy Matcher
  // ==========================================================================

  const TAXONOMY_ALIASES = {
    'fibro_osseous': ['fibro osseous', 'fibro-osseous', 'فیبرو استخوانی', 'فیبرو-استخوانی', 'ضایعات فیبرو استخوانی', 'جامع فیبرو استخوانی'],
    'inflammatory_lesions': ['inflammatory', 'التهابی', 'ضایعات التهابی', 'التهابی و واکنشی', 'جامع التهابی'],
    'benign_mesenchymal': ['benign mesenchymal', 'mesenchymal', 'مزانشیمی', 'خوش‌خیم مزانشیمی', 'خوش خیم مزانشیمی', 'تومورهای خوش خیم مزانشیمی', 'جامع مزانشیمی'],
    'odontogenic_tumors': ['odontogenic tumors', 'odontogenic tumor', 'تومورهای ادنتوژنیک', 'تومور ادنتوژنیک', 'جامع تومورهای ادنتوژنیک'],
    'odontogenic_cysts': ['odontogenic cysts', 'odontogenic cyst', 'کیست‌های ادنتوژنیک', 'کیست ادنتوژنیک', 'ضایعات کیستیک ادنتوژنیک', 'جامع کیست ادنتوژنیک'],
    'developmental_lesions': ['developmental', 'تکاملی', 'ضایعات تکاملی', 'سلول غول آسا', 'سلول غول‌آسا', 'جامع تکاملی'],
    'benign_epithelial': ['benign epithelial', 'epithelial', 'اپیتلیالی', 'خوش خیم اپیتلیالی', 'خوش‌خیم اپیتلیالی', 'جامع اپیتلیالی'],
    'non_odontogenic_cysts': ['non odontogenic', 'غیر ادنتوژنیک', 'کیست های غیرادنتوژنیک', 'جامع غیر ادنتوژنیک'],
    'malignancy': ['malignancy', 'malignancies', 'بدخیمی', 'بدخیمی ها', 'بدخیمی‌های استخوانی', 'جامع بدخیمی'],
    'traumatic_lesions': ['traumatic', 'تروما', 'ضایعات تروماتیک', 'بزاقی', 'جامع بزاقی', 'تروماتیک'],
    'fibrous_dysplasia': ['fibrous dysplasia', 'فیبروز دیسپلازی', 'دیسپلازی فیبرو', 'fd', 'mccune', 'albright'],
    'juvenile_ossifying_fibroma': ['juvenile ossifying fibroma', 'jof', 'جوانان', 'اسیفایینگ فیبروم جوانان', 'psammomatoid', 'trabecular'],
    'ossifying_fibroma': ['ossifying fibroma', 'اسیفایینگ فیبروما', 'of', 'سمنتواسیفایینگ'],
    'osteonecrosis_mandible': ['osteonecrosis', 'mronj', 'استئونکروز', 'استئومیلیت', 'مندیبل', 'bionj', 'bronj'],
    'pyogenic_granuloma': ['pyogenic granuloma', 'پایوژنیک گرانولوما', 'پیوژنیک', 'گرانولوم پیوژنیک'],
    'radicular_cyst': ['radicular cyst', 'رادیکولار', 'کیست پری‌آپیکال', 'periapical cyst'],
    'capillary_hemangioma': ['capillary hemangioma', 'همانژیوم', 'کاپیلاری همانژیوم', 'hemangioma'],
    'lymphangioma': ['lymphangioma', 'لنفانژیوم', 'کیستیک هیگروما'],
    'lipomatous_tumor': ['lipoma', 'lipomatous', 'لیپوما', 'لیپوماتوز'],
    'plexiform_neurofibroma': ['plexiform neurofibroma', 'پلکسی‌فرم نوروفیبروما', 'neurofibroma', 'نوروفیبروماتوز'],
    'fibro_fatty_tissue': ['fibro-fatty', 'fibrofatty', 'فیبروفتی', 'فیبرو فتی'],
    'fibromatosis': ['fibromatosis', 'desmoid', 'فیبروماتوزیس', 'دسموئید'],
    'inflammatory_myofibroblastic_tumor': ['inflammatory myofibroblastic', 'imt', 'میوفیبروبلاستیک'],
    'desmoplastic_fibroma': ['desmoplastic fibroma', 'دسموپلاستیک فیبروما', 'دسموپلاستیک'],
    'osteoma': ['osteoma', 'استئوما', 'gardner'],
    'ameloblastoma': ['ameloblastoma', 'آملوبلاستوما', 'املوبلاستوم', 'آملوبلاستوم', 'braf'],
    'odontogenic_fibroma': ['odontogenic fibroma', 'ادنتوژنیک فیبروما', 'فیبروم ادنتوژنیک'],
    'odontogenic_myxoma': ['odontogenic myxoma', 'ادنتوژنیک میگزوما', 'میکسومای ادنتوژنیک', 'myxoma'],
    'cementoblastoma': ['cementoblastoma', 'سمنتوبلاستوما', 'سمنتوبلاستوم'],
    'odontoma': ['odontoma', 'ادنتوما', 'کمپلکس', 'کامپوند'],
    'ameloblastic_fibroma': ['ameloblastic fibroma', 'املوبلاستیک فیبروما', 'آملوبلاستیک فیبروم'],
    'ameloblastic_fibro_odontoma': ['ameloblastic fibro-odontoma', 'afo', 'املوبلاستیک فیبروادنتوم'],
    'dentigerous_cyst': ['dentigerous cyst', 'دنتیژروس', 'کیست دنتیجروس', 'dentigerous'],
    'inflammatory_dentigerous_cyst': ['inflammatory dentigerous', 'دنتیژروس التهابی'],
    'odontogenic_keratocyst': ['odontogenic keratocyst', 'okc', 'کراتوسیست', 'کیست کراتوسیتیک', 'gorlin', 'ptch1'],
    'eruption_cyst': ['eruption cyst', 'کیست رویشی', 'کیست رویش'],
    'cgcg': ['cgcg', 'central giant cell', 'گرانولوم سلول غول‌آسای مرکزی', 'سلول جاینت', 'giant cell granuloma'],
    'reparative_cgcg': ['reparative cgcg', 'reparative giant cell', 'رپراتیو'],
    'aneurysmal_bone_cyst': ['aneurysmal bone cyst', 'abc', 'کیست آنوریسمال', 'استخوانی آنوریسمال'],
    'brown_tumor': ['brown tumor', 'تومور براون', 'هیپرپاراتیروئیدیسم', 'hyperparathyroidism', 'pth'],
    'cherubism': ['cherubism', 'چرابیسم', 'sh3bp2'],
    'giant_cell_neoplasm': ['giant cell tumor', 'giant cell neoplasm', 'نئوپلاسم سلول جاینت', 'gct'],
    'squamous_papilloma': ['squamous papilloma', 'اسکواموس پاپیلوما', 'پاپیلوما', 'hpv'],
    'dermoid_cyst': ['dermoid cyst', 'کیست درموئید', 'درموئید', 'اپیدرموئید'],
    'spindle_cell_tumor': ['spindle cell', 'سلول دوکی', 'کارسینوم سلول دوکی', 'سارکوم سلول دوکی'],
    'ewing_sarcoma': ['ewing sarcoma', 'سارکوم یوئینگ', 'یوئینگ'],
    'mucocele': ['mucocele', 'موکوسل', 'کیست موکوسی', 'اکستراوازیشن'],
    'ranula': ['ranula', 'رانولا', 'کیست زیر زبان', 'پلنجینگ'],
    'oral_leukoplakia': ['oral leukoplakia', 'leukoplakia', 'لوکوپلاکی', 'لوکوپلاکیا', 'پلاک سفید']
  };

  function extractTitleFromTex(tex, defaultName = 'فلوچارت بالینی') {
    if (!tex) return defaultName;
    // 0. Explicit DOC_TITLE metadata comment tag
    const mMeta = tex.match(/%\s*(?:DOC_TITLE|TITLE):\s*([^\r\n]+)/i);
    if (mMeta && mMeta[1].trim()) {
      return mMeta[1].trim();
    }
    // 1. Primary LaTeX title in center block (\Large\bfseries)
    const m1 = tex.match(/\{\\Large\\bfseries\s*([\s\S]*?)\}(?:\s*\\\\|\s*\n)/);
    if (m1 && m1[1].trim()) {
      return m1[1]
        .replace(/\\lr\{([^}]+)\}/g, '$1')
        .replace(/\\rl\{([^}]+)\}/g, '$1')
        .replace(/\\textbf\{([^}]+)\}/g, '$1')
        .replace(/[\{\}\\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    const m2 = tex.match(/\\title\{([^}]+)\}/);
    if (m2 && m2[1].trim()) {
      return m2[1].replace(/\\lr\{/g, '').replace(/\\rl\{/g, '').replace(/[\{\}]/g, '').trim();
    }
    const m3 = tex.match(/\\textbf\{([^}]+)\}/);
    if (m3 && m3[1].trim()) {
      return m3[1].replace(/\\lr\{/g, '').replace(/\\rl\{/g, '').replace(/[\{\}]/g, '').trim();
    }
    return defaultName;
  }

  function getAllTaxonomyItemsFlat() {
    const list = [];
    TAXONOMY_CATEGORIES.forEach(cat => {
      // Umbrella / Categorical flowchart item
      list.push({
        id: cat.id + '_umbrella',
        title: `الگوریتم جامع: ${cat.title}`,
        doc: cat.doc,
        catId: cat.id,
        catTitle: cat.title,
        isUmbrella: true
      });
      cat.items.forEach(item => {
        list.push({
          ...item,
          catId: cat.id,
          catTitle: cat.title
        });
      });
    });
    return list;
  }

  function scoreTaxonomyMatch(item, tex, fileName, extractedTitle) {
    let score = 0;
    const cleanFn = (fileName || '').toLowerCase().replace(/\.tex$/i, '');
    const cleanTitle = (extractedTitle || '').toLowerCase();
    const cleanDoc = item.doc.toLowerCase();
    const docUnderscore = cleanDoc.replace(/_/g, ' ');

    // 0. Exact authoritative DOC_ID / DOC_SLUG metadata comment match
    const docMetaMatch = tex.match(/%\s*(?:DOC_ID|DOC_SLUG|SLUG):\s*([a-zA-Z0-9_\-]+)/i);
    if (docMetaMatch) {
      const metaSlug = docMetaMatch[1].trim().toLowerCase();
      if (metaSlug === cleanDoc || metaSlug === cleanDoc.replace(/_/g, '')) {
        return 300; // Immediate 100% authoritative match!
      }
    }

    // Exact filename match
    if (cleanFn === cleanDoc || cleanFn === cleanDoc.replace(/_/g, '')) {
      score += 120;
    } else if (cleanFn.includes(cleanDoc) || cleanDoc.includes(cleanFn)) {
      score += 70;
    }

    // Match in extracted title
    if (cleanTitle.includes(cleanDoc) || cleanTitle.includes(docUnderscore)) {
      score += 80;
    }

    // Aliases match
    const aliases = TAXONOMY_ALIASES[item.doc] || [];
    for (const a of aliases) {
      const al = a.toLowerCase();
      if (cleanFn.includes(al)) score += 50;
      if (cleanTitle.includes(al)) score += 60;
    }

    // Header scanning in first 3000 chars of TeX
    const sample = tex.slice(0, 3000).toLowerCase();
    for (const a of aliases) {
      if (sample.includes(a.toLowerCase())) {
        score += 25;
        break;
      }
    }

    return score;
  }

  function findBestTaxonomyMatch(tex, fileName, extractedTitle) {
    const allItems = getAllTaxonomyItemsFlat();
    const scored = allItems.map(item => ({
      item,
      score: scoreTaxonomyMatch(item, tex, fileName, extractedTitle)
    }));

    scored.sort((a, b) => b.score - a.score);
    const top = scored[0];
    const second = scored[1];

    if (top && top.score >= 60 && (!second || (top.score - second.score >= 15))) {
      return { confident: true, item: top.item, candidates: scored };
    }

    return { confident: false, item: top ? top.item : null, candidates: scored };
  }

  async function applyFlowchartToDoc(docId, docTitle, texText, isConfident = false) {
    if (!docId || !texText) return;
    pushUndoState('Load Flowchart: ' + docTitle);

    EMBEDDED_DOCS[docId] = texText;
    try {
      localStorage.setItem('tikz_doc_' + docId, texText);
    } catch (e) {}

    // Persist to server in background
    try {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: 'flowcharts/' + docId + '.tex',
          tex: texText
        })
      }).catch(() => {});
    } catch (e) {}

    State.activeDocId = docId;
    setTxt('docComboboxLabel', docTitle);
    closeTaxonomyMatchModal();
    closeCombobox();

    parseAndRenderDocument(texText);
    fitAll(true);
    playSound('success');

    if (isConfident) {
      showToast(`فلوچارت با موفقیت به عنوان «${docTitle}» شناسایی و بارگذاری شد ✓`);
    } else {
      showToast(`فلوچارت «${docTitle}» با موفقیت بارگذاری شد`);
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('doc', docId);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}

    renderDocLibrary();
  }

  function openTaxonomyMatchModal(detectedTitle, candidates) {
    const modal = $('#taxonomyMatchModal');
    const titleEl = $('#taxMatchDetectedTitle');
    const searchInput = $('#taxMatchSearchInput');
    if (!modal) return;

    if (titleEl) titleEl.textContent = detectedTitle || 'عنوان ناشناخته';
    if (searchInput) searchInput.value = '';

    renderTaxMatchCandidates(candidates || []);
    modal.style.display = 'flex';
  }

  function closeTaxonomyMatchModal() {
    const modal = $('#taxonomyMatchModal');
    if (modal) modal.style.display = 'none';
    State.pendingDroppedTex = null;
    State.pendingDroppedTitle = '';
    State.pendingDroppedFileName = '';
  }

  function renderTaxMatchCandidates(candidates, filterQuery = '') {
    const container = $('#taxMatchList');
    if (!container) return;
    container.innerHTML = '';

    const cleanQ = (filterQuery || '').toLowerCase().trim();
    let itemsToRender = candidates && candidates.length ? candidates.map(c => c.item) : getAllTaxonomyItemsFlat();

    if (cleanQ) {
      itemsToRender = itemsToRender.filter(it => 
        it.title.toLowerCase().includes(cleanQ) ||
        it.doc.toLowerCase().includes(cleanQ) ||
        it.catTitle.toLowerCase().includes(cleanQ)
      );
    }

    // Group by category
    const groups = {};
    itemsToRender.forEach(it => {
      if (!groups[it.catTitle]) groups[it.catTitle] = [];
      groups[it.catTitle].push(it);
    });

    for (const [catName, items] of Object.entries(groups)) {
      const catTitleEl = document.createElement('div');
      catTitleEl.className = 'tax-match-cat-title';
      catTitleEl.textContent = catName;
      container.appendChild(catTitleEl);

      items.forEach(it => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tax-match-item-btn';
        btn.innerHTML = `
          <span>${it.title}</span>
          <span class="item-code">${it.doc}</span>
        `;
        btn.onclick = () => {
          if (State.pendingDroppedTex) {
            applyFlowchartToDoc(it.doc, it.title, State.pendingDroppedTex, false);
          }
        };
        container.appendChild(btn);
      });
    }

    if (itemsToRender.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:12px;text-align:center;">موردی مطابق با جستجو یافت نشد.</div>';
    }
  }

  function filterTaxMatchList(q) {
    const all = getAllTaxonomyItemsFlat().map(item => ({ item, score: 0 }));
    renderTaxMatchCandidates(all, q);
  }

  function loadAsCustomDocument() {
    if (!State.pendingDroppedTex) {
      closeTaxonomyMatchModal();
      return;
    }
    const cleanTitle = State.pendingDroppedTitle || 'فلوچارت سفارشی جدید';
    const slug = 'custom_' + Date.now().toString(36);
    applyFlowchartToDoc(slug, cleanTitle, State.pendingDroppedTex, false);
  }

  function processIncomingTexCode(rawText, fileName = 'uploaded.tex') {
    if (!rawText || typeof rawText !== 'string') return;
    const trimmed = rawText.trim();

    const isTex = trimmed.includes('\\begin{tikzpicture}') || 
                  trimmed.includes('\\documentclass') || 
                  trimmed.includes('\\node');

    if (!isTex) {
      showToast('فایل یا متن ارائه‌شده حاوی ساختار معتبر XeLaTeX/TikZ نیست.');
      return;
    }

    const detectedTitle = extractTitleFromTex(trimmed, fileName.replace(/\.tex$/i, ''));
    const matchResult = findBestTaxonomyMatch(trimmed, fileName, detectedTitle);

    if (matchResult.confident && matchResult.item) {
      applyFlowchartToDoc(matchResult.item.doc, matchResult.item.title, trimmed, true);
    } else {
      State.pendingDroppedTex = trimmed;
      State.pendingDroppedTitle = detectedTitle;
      State.pendingDroppedFileName = fileName;
      openTaxonomyMatchModal(detectedTitle, matchResult.candidates);
    }
  }

  function initDragAndDropSupport() {
    let dragCounter = 0;
    const overlay = $('#globalDropOverlay');

    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      if (overlay) overlay.classList.add('active');
    });

    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    });

    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        if (overlay) overlay.classList.remove('active');
      }
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCounter = 0;
      if (overlay) overlay.classList.remove('active');

      const dt = e.dataTransfer;
      if (!dt) return;

      if (dt.files && dt.files.length > 0) {
        const file = dt.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target && evt.target.result;
          processIncomingTexCode(content, file.name);
        };
        reader.readAsText(file);
      } else {
        const text = dt.getData('text/plain') || dt.getData('text');
        if (text) {
          processIncomingTexCode(text, 'dropped_snippet.tex');
        }
      }
    });

    // Global Clipboard Paste (Cmd+V / Ctrl+V anywhere on canvas)
    window.addEventListener('paste', (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      const clipData = e.clipboardData || window.clipboardData;
      if (!clipData) return;
      const text = clipData.getData('text/plain');
      if (text && (text.includes('\\begin{tikzpicture}') || text.includes('\\documentclass'))) {
        e.preventDefault();
        processIncomingTexCode(text, 'clipboard.tex');
      }
    });
  }

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
    initHeaderBannerEditing();
    initDragAndDropSupport();
    updateUndoRedoUI();

    loadLocalDocsIntoMemory();
    refreshServerDocsList();

    const urlParams = new URLSearchParams(window.location.search);
    const reqDoc = urlParams.get('doc');
    const isNew = urlParams.get('new') === '1';
    const reqTitle = urlParams.get('title');

    if (reqDoc) {
      if (isNew || (!EMBEDDED_DOCS[reqDoc] && !localStorage.getItem('tikz_doc_' + reqDoc))) {
        createAndLoadFlowchart(reqDoc, reqTitle || reqDoc);
      } else {
        selectDocument(reqDoc, reqTitle);
      }
    } else {
      // Default load: Oral Leukoplakia
      State.activeDocId = 'oral_leukoplakia';
      loadCheckpoints();
      parseAndRenderDocument(EMBEDDED_DOCS['oral_leukoplakia']);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        layoutEdges(true);
      });
    }

    requestAnimationFrame(() => {
      layoutEdges(true);
      fitAll(false);
    });
  }

    window.CanvasApp = {
    setToolMode,
    setViewMode,
    toggleSound,
    adjustSpacing,
    resetSpacing,
    toggleSpacingSlider,
    setSpacingDirect,
    openCheckpointsModal,
    closeCheckpointsModal,
    openPdfNewTab,
    downloadPdf,
    createCheckpoint,
    compareWithCheckpoint,
    restoreSelectedCheckpoint,
    deleteSelectedCheckpoint,
    saveToServer,
    compileXeLaTeX,
    revertDraft,
    handleDraftClick,
    setActiveHighlightColor,
    changeActiveHighlightColor,
    removeActiveHighlight,
    toggleCombobox,
    closeCombobox,
    filterDocuments,
    selectDocument,
    createAndLoadFlowchart,
    toggleAllDocCategories,
    toggleDocCategory,
    setDocFilter,
    zoomBy,
    resetZoom,
    fitAll,
    deselectAll,
    undo,
    redo,
    openQuickSearch,
    closeQuickSearch,
    filterQuickSearchNodes,
    closeTaxonomyMatchModal,
    filterTaxMatchList,
    loadAsCustomDocument,
    processIncomingTexCode,
    focusSelectedNode: () => State.selectedNodeId && focusNode(State.selectedNodeId),
    editSelectedNodeDirectly: () => {
      if (!State.selectedNodeId) return;
      const n = State.nodes.find(item => item.id === State.selectedNodeId);
      if (n) startInlineEditingNode(n, e);
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

window.CanvasApp = CanvasApp;


  // ==========================================================================
  // Mobile Fast Long-Tap Tooltip Engine (320ms, haptic feedback)
  // ==========================================================================
  (function initMobileTooltip() {
    let timer = null;
    let startX = 0, startY = 0;
    let tooltipEl = null;

    function getTooltipTarget(target) {
      if (!target || target === document.body) return null;
      const el = target.closest('[title], [data-tip], [aria-label]');
      if (!el) return null;
      const txt = el.getAttribute('data-tip') || el.getAttribute('title') || el.getAttribute('aria-label');
      return txt ? { el, text: txt.trim() } : null;
    }

    function showTooltip(text, x, y) {
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'mobileQuickTooltip';
        tooltipEl.className = 'mobile-quick-tooltip';
        document.body.appendChild(tooltipEl);
      }
      tooltipEl.textContent = text;
      tooltipEl.style.display = 'block';
      const rect = tooltipEl.getBoundingClientRect();
      let left = x - rect.width / 2;
      let top = y - rect.height - 14;
      if (left < 10) left = 10;
      if (left + rect.width > window.innerWidth - 10) left = window.innerWidth - rect.width - 10;
      if (top < 10) top = y + 24;
      tooltipEl.style.left = `${left}px`;
      tooltipEl.style.top = `${top}px`;
      tooltipEl.classList.add('visible');
      if (navigator.vibrate) try { navigator.vibrate(20); } catch(e){}
    }

    function hideTooltip() {
      if (timer) { clearTimeout(timer); timer = null; }
      if (tooltipEl) {
        tooltipEl.classList.remove('visible');
        setTimeout(() => {
          if (tooltipEl && !tooltipEl.classList.contains('visible')) {
            tooltipEl.style.display = 'none';
          }
        }, 150);
      }
    }

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) { hideTooltip(); return; }
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      const match = getTooltipTarget(e.target);
      if (!match) return;

      timer = setTimeout(() => {
        showTooltip(match.text, startX, startY);
      }, 320);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!timer && !tooltipEl?.classList.contains('visible')) return;
      const touch = e.touches[0];
      if (Math.hypot(touch.clientX - startX, touch.clientY - startY) > 8) {
        hideTooltip();
      }
    }, { passive: true });

    document.addEventListener('touchend', hideTooltip, { passive: true });
    document.addEventListener('touchcancel', hideTooltip, { passive: true });
  })();
