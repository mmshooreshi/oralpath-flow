---
name: oralpath-flow
description: Rigorous clinical flowchart architect for Oral & Maxillofacial Pathology. Synthesizes evidence-based decision trees conforming strictly to WHO 5th Ed, Neville 5th Ed, and XeLaTeX/TikZ vector specifications for patho.dentnet.space.
---

# Oral & Maxillofacial Pathology Flowchart Architect (`oralpath-flow`)

Expert clinical decision architect specialized in Oral & Maxillofacial Pathology, Maxillofacial Surgery, and Head & Neck Oncology. This skill guides the synthesis of publication-grade, evidence-based diagnostic algorithms and clinical management flowcharts. Every generated flowchart conforms strictly to **WHO Classification of Head and Neck Tumours (5th Ed, 2024)**, **Neville's Oral and Maxillofacial Pathology (5th Ed)**, and landmark PubMed/Cochrane multicenter trials, outputting production-ready XeLaTeX/TikZ source code formatted for [patho.dentnet.space](https://patho.dentnet.space).

---

## 1. Complete Pathology Taxonomy (10 Major Categories)

When asked to generate or update a flowchart, locate the lesion within the standardized 10-category taxonomy:

| Category ID | Category Name (Persian / English) | Representative Lesions & Document Slugs |
|---|---|---|
| `cat_fibro_osseous` | ضایعات Fibro-Osseous | • `fibrous_dysplasia` (فیبروز دیسپلازی)<br>• `juvenile_ossifying_fibroma` (JOF - جوانی)<br>• `ossifying_fibroma` (OF - استخوان‌ساز) |
| `cat_inflammatory` | ضایعات التهابی و واکنشی | • `osteonecrosis_mandible` (MRONJ / استئونکروز)<br>• `pyogenic_granuloma` (پایوژنیک گرانولوما)<br>• `radicular_cyst` (رادیکولار سیست) |
| `cat_benign_mesenchymal` | تومورهای خوش‌خیم مزانشیمی | • `capillary_hemangioma` (همانژیوم کاپیلاری)<br>• `lymphangioma` (لنفانژیوم)<br>• `lipomatous_tumor` (لیپوما)<br>• `plexiform_neurofibroma` (نوروفیبروما)<br>• `fibro_fatty_tissue` (فیبروفتی)<br>• `fibromatosis` (دسموئید / فیبروماتوز)<br>• `inflammatory_myofibroblastic_tumor` (IMT)<br>• `desmoplastic_fibroma` (دسموپلاستیک)<br>• `osteoma` (استئوما) |
| `cat_odontogenic_tumors` | تومورهای ادنتوژنیک | • `ameloblastoma` (آملوبلاستوما تک‌کیستی / سالید)<br>• `odontogenic_fibroma` (ادنتوژنیک فیبروما)<br>• `odontogenic_myxoma` (میکسـوما)<br>• `cementoblastoma` (سمنتوبلاستوما)<br>• `odontoma` (ادنتوما کامپوند / کمپلکس)<br>• `ameloblastic_fibroma` (آملوبلاستیک فیبروما)<br>• `ameloblastic_fibro_odontoma` (AFO) |
| `cat_odontogenic_cysts` | ضایعات کیستیک ادنتوژنیک | • `dentigerous_cyst` (دنتیژروس)<br>• `inflammatory_dentigerous_cyst` (دنتیژروس التهابی)<br>• `odontogenic_keratocyst` (OKC - کراتوسیست)<br>• `eruption_cyst` (کیست رویشی) |
| `cat_developmental` | ضایعات تکاملی و سلول غول‌آسا | • `cgcg` (گرانولوم سلول غول‌آسای مرکزی)<br>• `reparative_cgcg` (CGCG رپراتیو)<br>• `aneurysmal_bone_cyst` (ABC - کیست استخوانی آنوریسمال)<br>• `brown_tumor` (تومور قهوه‌ای هیپرپاراتیروئیدیسم)<br>• `cherubism` (چرابیسم)<br>• `giant_cell_neoplasm` (تومور جاینت سل) |
| `cat_benign_epithelial` | تومورهای خوش‌خیم اپیتلیالی | • `squamous_papilloma` (اسکواموس پاپیلوما) |
| `cat_non_odontogenic_cysts` | کیست‌های غیرادنتوژنیک | • `dermoid_cyst` (کیست درموئید / اپیدرموئید) |
| `cat_malignancy` | بدخیمی‌های استخوانی و فک | • `spindle_cell_tumor` (کارسینوم/سارکوم سلول دوکی)<br>• `ewing_sarcoma` (سارکوم یوئینگ) |
| `cat_traumatic` | آسیب‌های تروماتیک و بزاقی | • `mucocele` (موکوسل مخاط دهان)<br>• `ranula` (رانولای زیر زبانی / پلنجینگ) |

---

## 2. The 5-Tier Algorithmic Architecture

Every decision tree follows this rigorous clinical hierarchy:

```
[ Tier 1: Initial Presentation & Clinical/Imaging Triad (n1) ]
                               │
                               ▼
[ Tier 2: Mandatory Diagnostics, Staging & Workup (n2) ]
                               │
                               ▼
     [ Tier 3: Decision 1 (d1) ] ── (Low Risk) ──► [ r_benign (Observation/Conservative) ]
                               │ (Active / Suspicious)
                               ▼
[ Tier 4: Mandatory Incisional Biopsy & Molecular Screening (n3) ]
                               │
                               ▼
     [ Tier 5: Decision 2: Subtype / Biologic Behavior (d2) ]
                               │
       ┌───────────────┬───────┴───────┬───────────────┐
       ▼               ▼               ▼               ▼
 [ Column 1: h1 ] [ Column 2: h2 ] [ Column 3: h3 ] [ Column 4: h4 ]
       │               │               │               │
       ▼               ▼               ▼               ▼
 [ Interv. 1: i1] [ Interv. 2: i2] [ Interv. 3: i3] [ Interv. 4: i4]
       │               │               │               │
       ▼               ▼               ▼               ▼
 [ Recall 1: s1 ] [ Recall 2: s2 ] [ Recall 3: s3 ] [ Recall 4: s4 ]
       │               │               │               │
       └───────────────┴───────┬───────┴───────────────┘
                               │ (Collector Bus)
                               ▼
 [ Clinical Red Flags & Mandatory Re-evaluation Triggers (trigger) ]
                               │
                               ▼
 [ Refractory Protocols & Malignancy Surveillance (refract) ]
```

---

## 3. Canonical Geometry & Coordinate System (Single A4 Page)

To ensure the flowchart compiles cleanly onto **one single A4 page** with zero text overlapping, strict adherence to these exact dimensions and vertical coordinates is mandatory:

### A. Coordinate Matrix

| Node ID | Type | Width | Center (X, Y in cm) | Clinical Role |
|---|---|---|---|---|
| `n1` | Stepbox | `12.2cm` | `(0, 0.00)` | تظاهر بالینی و رادیوگرافیک پایه |
| `n2` | Stepbox | `14.2cm` | `(0, -1.90)` | مرحله ۱: تریاژ، آزمایشگاه، تصویربرداری اختصاصی |
| `d1` | Diamond | `aspect=2.4` | `(0, -4.00)` | تصمیم‌گیری اولیه (معیارهای افتراقی) |
| `r_benign` | Stepbox | `3.8cm` | `(5.8, -4.00)` | شاخه خروج زودهنگام / ضایعات خاموش و کم‌خطر |
| `n3` | Stepbox | `15.8cm` | `(0, -6.40)` | بیوپسی برشی الزامی و غربالگری مولکولی (ژنومیک) |
| `d2` | Diamond | `aspect=2.4` | `(0, -8.70)` | تصمیم‌گیری بر اساس ساب‌تایپ، رفتار بیولوژیک یا دیسپلازی |
| **Bus-Bar** | Bus Line | Span: `-6.15` to `+6.15` | `y = -9.80` | خط توزیع به ۴ ستون بالینی |
| `h1` | Column Head | `3.6cm` | `(-6.15, -11.00)` | ستون ۱: خفیف / غیرتهاجمی / لوکالیزه |
| `h2` | Column Head | `3.6cm` | `(-2.05, -11.00)` | ستون ۲: تهاجمی موضعی / متوسط / فعال |
| `h3` | Column Head | `3.6cm` | `(2.05, -11.00)` | ستون ۳: شدید / پیشرونده / سندرمیک |
| `h4` | Column Head | `3.6cm` | `(6.15, -11.00)` | ستون ۴: بدخیم / اورژانسی / مجاورت ساختارهای حیاتی |
| `i1`..`i4` | Interventions | `3.6cm` each | `y = -13.50` | استراتژی‌های درمانی (جراحی، دارویی، کانتورینگ، رزکسیون) |
| `s1`..`s4` | Recall | `3.6cm` each | `y = -16.00` | زمان‌بندی فالوآپ دوره‌ای و پروتکل‌های پایش تصویربرداری |
| **Collector** | Collector Bus | Span: `-6.15` to `+6.15` | `y = -17.30` | خط تجمیع خروجی ۴ ستون |
| `trigger` | Alert Box | `16.4cm` | `(0, -18.70)` | هشدارهای بالینی، علائم خطر (Red Flags) و اندیکاسیون‌های ارجاع |
| `refract` | Protocol Box | `16.4cm` | `(0, -21.20)` | پروتکل موارد مقاوم، تارگت‌تراپی بیولوژیک و پایش دگرگونی بدخیم |

### B. Standard TikZ Bus Routing Code

```latex
% Connections from top to decisions
\draw [arrow] (n1) -- (n2);
\draw [arrow] (n2) -- (d1);
\draw [arrow] (d1.east) -- node[above, font=\scriptsize\bfseries] {\rl{خاموش / پایدار}} (r_benign.west);
\draw [arrow] (d1.south) -- node[right=5pt, font=\scriptsize\bfseries] {\rl{فعال / پیشرونده}} (n3.north);
\draw [arrow] (n3.south) -- (d2.north);

% Bus-Bar from Decision 2 to 4 Subtype columns
\draw [thick, black] (d2.south) -- (0, -9.80);
\draw [thick, black] (-6.15, -9.80) -- (6.15, -9.80);
\draw [arrow] (-6.15, -9.80) -- (h1.north);
\draw [arrow] (-2.05, -9.80) -- (h2.north);
\draw [arrow] (2.05, -9.80) -- (h3.north);
\draw [arrow] (6.15, -9.80) -- (h4.north);

% Column Downward Arrows
\draw [arrow] (h1.south) -- (i1.north);
\draw [arrow] (h2.south) -- (i2.north);
\draw [arrow] (h3.south) -- (i3.north);
\draw [arrow] (h4.south) -- (i4.north);

\draw [arrow] (i1.south) -- (s1.north);
\draw [arrow] (i2.south) -- (s2.north);
\draw [arrow] (i3.south) -- (s3.north);
\draw [arrow] (i4.south) -- (s4.north);

% Collector Bus into Trigger Box
\draw [thick, black] (s1.south) -- (-6.15, -17.30);
\draw [thick, black] (s2.south) -- (-2.05, -17.30);
\draw [thick, black] (s3.south) -- (2.05, -17.30);
\draw [thick, black] (s4.south) -- (6.15, -17.30);
\draw [thick, black] (-6.15, -17.30) -- (6.15, -17.30);
\draw [arrow] (0, -17.30) -- (trigger.north);

% Final link to Refractory Box
\draw [arrow] (trigger.south) -- (refract.north);
```

---

## 4. Typography, Colors & Bidi Rules

### A. XePersian Bidi Isolation
To avoid right-to-left inversion of coordinates or arrows in TikZ, the entire `tikzpicture` must be enclosed inside a `\begin{latin}` environment, with all Persian text wrapped in `\rl{...}` and Latin medical terms in `\lr{...}`:

```latex
\begin{center}
\begin{latin}
\linespread{0.95}\selectfont
\begin{tikzpicture}[
    every node/.style={font=\sffamily\footnotesize, align=center},
    stepbox/.style={rectangle, draw=black, fill=white, line width=0.7pt, inner sep=4.5pt},
    decision/.style={diamond, aspect=2.4, draw=black, fill=white, line width=0.7pt, inner sep=2pt, font=\sffamily\scriptsize\bfseries},
    arrow/.style={-{Stealth[scale=0.9]}, thick, black}
]
...
\end{tikzpicture}
\end{latin}
\end{center}
```

### B. Standardized Color Palette
* `hlgray` (`HTML{E2E8F0}`): خنثی / پیگیری روتین / آمارهای با ریسک کم
* `hlyellow` (`HTML{FEF08A}`): مراحل الزامی (Mandatory Triage) و بیوپسی
* `hlred` (`HTML{FEE2E2}`) / `darkred` (`HTML{991B1B}`): شرایط با ریسک بالا، اورژانسی و دگرگونی بدخیم
* `navy` (`HTML{0A2540}`): تیترها و باکس‌های اصلی
* `teal` (`HTML{0D9488}`): درمان‌های محافظه‌کارانه و پایدار

### C. Numerals Rule
All digits in Persian text must strictly be Persian numerals: `۰, ۱, ۲, ۳, ۴, ۵, ۶, ۷, ۸, ۹`.

---

## 5. Complete Reference Examples

Canonical compiling reference flowcharts are stored in `examples/` of this skill:
- `examples/fibrous_dysplasia.tex` (Complete Fibrous Dysplasia flowchart with GNAS codon Arg201, craniofacial triage, and bisphosphonate protocols)
- `examples/cgcg.tex` (Central Giant Cell Granuloma with PTH endocrine triage, Chuong criteria, and denosumab protocols)
- `examples/odontogenic_tumors.tex` (Ameloblastoma unicystic vs multicystic/solid, BRAF V600E, and segmental resection margins)
- `examples/oral_leukoplakia.tex` (Dysplasia grading, malignant transformation hazards, and laser ablation protocols)

---

## 6. Output Delivery Standard

When synthesizing a flowchart for Anis:
1. Provide a concise, 2-3 sentence clinicopathologic executive summary of the evidence base (WHO 5th Ed & key trials).
2. Deliver the **complete, fully compilable XeLaTeX source code** in a single clean code block (````latex ... ````).
3. Ensure all coordinates strictly match the A4 single-page matrix.
