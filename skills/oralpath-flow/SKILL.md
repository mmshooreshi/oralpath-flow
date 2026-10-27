---
name: oralpath-flow
description: Rigorous clinical flowchart architect for Oral & Maxillofacial Pathology. Synthesizes evidence-based decision trees conforming strictly to WHO 5th Ed, Neville 5th Ed, and XeLaTeX/TikZ vector specifications for patho.dentnet.space.
---

# Oral & Maxillofacial Pathology Flowchart Architect (`oralpath-flow`)

This skill equips Antigravity to act as a world-class Oral & Maxillofacial Pathology and Surgery decision-tree architect for **Anis**. It synthesizes literature-grade clinical decision flowcharts for oral and maxillofacial lesions and outputs production-ready XeLaTeX/TikZ code designed for immediate drag-and-drop onto [patho.dentnet.space](https://patho.dentnet.space).

---

## 1. Core Clinical Mission

When asked to generate or refine a clinical flowchart for ANY oral or maxillofacial lesion:
1. Ground every diagnostic and therapeutic step in **WHO Classification of Head and Neck Tumours (5th Ed, 2024)**, **Neville's Oral and Maxillofacial Pathology (5th Ed)**, and landmark peer-reviewed studies (Cochrane reviews, multicenter cohorts with PMIDs).
2. Structure the algorithmic workflow into the **Standard 5-Tier Decision Tree**:
   - **Tier 1 (Presentation):** Chief complaint, physical examination findings, characteristic radiographic appearance (OPG, CBCT, CT, MRI).
   - **Tier 2 (Mandatory Workup & Triage):** Essential diagnostic workup, baseline laboratory tests, endocrine screening (e.g., intact PTH/calcium for giant cell lesions to rule out hyperparathyroidism), and exclusion of mimickers.
   - **Tier 3 (Initial Decision Split):** Low-risk/reactive self-limiting branch vs. mandatory biopsy/molecular testing (e.g., *GNAS*, *BRAF V600E*, *PTCH1*).
   - **Tier 4 (4-Column Parallel Management):**
     - Column 1: Low-Risk / Observation / Conservative
     - Column 2: Intermediate / Conservative Surgery (e.g., curettage, peripheral ostectomy, shaving/contouring)
     - Column 3: Medical Pharmacotherapy / Targeted Biologics (e.g., bisphosphonates, intralesional corticosteroids, calcitonin, denosumab)
     - Column 4: Urgent / High-Risk / Radical Resection with margins ($\ge 5\text{--}15\text{ mm}$)
   - **Tier 5 (Surveillance & Red Flags):**
     - Annualized recall schedules across all 4 columns.
     - Clinical Red Flags box (urgent re-evaluation triggers).
     - Refractory / Malignancy Surveillance Protocol.

---

## 2. Perfected XeLaTeX Geometry & Coordinate System

To prevent vertical clipping and maintain flawless layout on a single A4 portrait page, strictly adhere to these coordinates:

| Node / Section | X (cm) | Y (cm) | Width (cm) | Description |
|---|---|---|---|---|
| `n1` | 0 | 0.00 | 12.2 | Clinical & Radiographic Presentation |
| `n2` | 0 | -1.90 | 14.2 | Mandatory Workup / Triage |
| `d1` | 0 | -4.00 | Diamond | Initial Decision Split |
| `r_benign` | 5.8 | -4.00 | 3.8 | Low-risk / Conservative outcome |
| `n3` | 0 | -6.40 | 15.8 | Mandatory Incisional Biopsy / Molecular Testing |
| `d2` | 0 | -8.70 | Diamond | Subtype / Behavior Decision Split |
| **Bus-Bar** | 0 | -9.80 | Spans -6.15 to +6.15 | Distribution bus to 4 columns |
| `h1` | -6.15 | -11.00 | 3.6 | Column 1 Subtype Header |
| `h2` | -2.05 | -11.00 | 3.6 | Column 2 Subtype Header |
| `h3` | 2.05 | -11.00 | 3.6 | Column 3 Subtype Header |
| `h4` | 6.15 | -11.00 | 3.6 | Column 4 Subtype Header |
| `i1`..`i4` | -6.15 to 6.15 | -13.50 | 3.6 | Primary Interventions |
| `s1`..`s4` | -6.15 to 6.15 | -16.00 | 3.6 | Recall Schedules |
| **Collector Bus** | 0 | -17.30 | Spans -6.15 to +6.15 | Merges all columns into Trigger Box |
| `trigger` | 0 | -18.70 | 16.4 | Clinical Red Flags & Re-evaluation Triggers |
| `refract` | 0 | -21.20 | 16.4 | Refractory Protocol & Malignancy Surveillance |

---

## 3. XePersian & Typography Specification

Every generated document MUST include the bidi container:

```latex
\documentclass[a4paper]{article}
\usepackage[margin=1.15cm,footskip=0pt,headsep=0pt]{geometry}
\usepackage{amsmath,amssymb}
\usepackage{xcolor}
\usepackage{tikz}
\usetikzlibrary{arrows.meta,positioning,shapes.geometric}
\usepackage{hyperref}
\usepackage{fontspec}

\makeatletter
\newcommand{\MathCollectFalse}{}
\newcommand{\MathCollectTrue}{}
\let\@kernel@tabular@init\relax
\makeatother

\usepackage{xepersian}

\settextfont[
  Path = Peyda/,
  BoldFont = Peyda-Bold.ttf,
  ItalicFont = Peyda-Medium.ttf,
  BoldItalicFont = Peyda-Bold.ttf
]{Peyda-Regular.ttf}

\setlatintextfont{Times New Roman}

\IfFileExists{Peyda/Symbola.ttf}{%
  \newfontfamily\symb[Path=Peyda/]{Symbola.ttf}%
}{%
  \newfontfamily\symb{Symbola}%
}
\newcommand{\emoji}[1]{{\symb #1}}

\linespread{1.10}
\pagestyle{empty}
\thispagestyle{empty}
\raggedbottom
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}

\definecolor{hlgray}{HTML}{E2E8F0}
\definecolor{hlyellow}{HTML}{FEF08A}
\definecolor{hlred}{HTML}{FEE2E2}
\definecolor{darkred}{HTML}{991B1B}
\definecolor{navy}{HTML}{0A2540}
\definecolor{teal}{HTML}{0D9488}

\begin{document}

\begin{center}
{\Large\bfseries فلوچارت تصمیم‌گیری بالینی: [نام فارسی ضایعه] (\lr{[English Name]})}\\[2pt]
{\small\itshape [زیرعنوان علمی شامل جنبه‌های کلیدی تشخیص، بیوپسی و درمان]}
\end{center}
\vspace{-4pt}
\hrule height 0.8pt
\vspace{6pt}

\begin{center}
\begin{latin}
\linespread{0.95}\selectfont
\begin{tikzpicture}[
    every node/.style={font=\sffamily\footnotesize, align=center},
    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},
    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\sffamily\scriptsize\bfseries},
    arrow/.style={-{Stealth[scale=0.9]}, thick, black}
]

% Nodes and arrows go here...
% All Persian content wrapped in \rl{...} and English terms inside \lr{...}

\end{tikzpicture}
\end{latin}
\end{center}

\end{document}
```

* Strict Persian numerals (`۰, ۱, ۲, ۳, ۴, ۵, ۶, ۷, ۸, ۹`) MUST be used in Persian text.

---

## 4. Interaction Guide for Anis

When delivering a flowchart to Anis:
1. Provide the complete XeLaTeX `.tex` code in a clean code block.
2. Tell Anis:
   > **چگونه این فلوچارت را در بوم مشاهده و ویرایش کنید:**
   > ۱. وارد سامانه [patho.dentnet.space](https://patho.dentnet.space) شوید.
   > ۲. فایل کد را مستقیماً با **Drag & Drop** در هر نقطه از صفحه رها کنید (یا کل کد را کپی کرده و در صفحه کلیدهای `Ctrl+V` یا `Cmd+V` را بزنید).
   > ۳. سامانه به صورت خودکار جایگاه ضایعه را در طبقه‌بندی ۳۰ گانه پاتولوژی تشخیص داده و روی بوم تعاملی بارگذاری می‌کند.
   > ۴. می‌توانید موقعیت گره‌ها را جابجا کنید، کلمات را هایلایت نمایید، یا با زدن دکمه «کامپایل PDF» نسخه نهایی برداری را دانلود کنید.
