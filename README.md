# OralPath Flow (بوم بالینی)

> **Publication-Grade Clinical Decision Flowcharts & Interactive TikZ Engine for Oral & Maxillofacial Pathology.**

[![Live Platform](https://img.shields.io/badge/Live%20Studio-patho.dentnet.space-0D9488?style=flat-square)](https://patho.dentnet.space)
[![XeLaTeX](https://img.shields.io/badge/Engine-XeLaTeX%20%2F%20TikZ-0A2540?style=flat-square)](https://tug.org/xetex/)
[![Standard](https://img.shields.io/badge/Clinical%20Standard-WHO%205th%20Ed%20(2024)-blue?style=flat-square)](https://publications.iarc.fr/)

---

## 🌟 Overview

**OralPath Flow** is a specialized platform for Oral and Maxillofacial Pathology & Surgery. It bridges evidence-based clinical algorithms (WHO 5th Ed, Neville 5th Ed, Cochrane reviews) with publication-ready vector graphics:

1. **Interactive Vector Canvas ([patho.dentnet.space](https://patho.dentnet.space)):**
   - **Global Drag & Drop:** Drop any `.tex` flowchart anywhere on the screen for instant rendering.
   - **Smart Auto-Taxonomy Detection:** Automatically maps incoming flowcharts to one of 30+ disease taxonomy categories.
   - **Touch & Mobile First:** Seamless word-level highlighting, magnetic node snapping, checkpoints, and 60 FPS gestures.
   - **Round-Trip Synchronization:** Visual canvas edits update the XeLaTeX source code bidirectionally.
2. **XeLaTeX Vector Engine:**
   - Single-page A4 portrait geometry (`margin=1.15cm`).
   - Bulletproof XePersian bidi containment (`\begin{latin}\begin{tikzpicture}...\end{tikzpicture}\end{latin}`).
   - Typographic hierarchy using the **Peyda** Persian font and standard **Times New Roman** Latin fonts.

---

## 🗂 Lesion Taxonomy Matrix

The clinical knowledge base encompasses 10 major oral & maxillofacial pathology categories:

1. **Fibro-Osseous Lesions:** Fibrous Dysplasia, Juvenile Ossifying Fibroma (JOF), Ossifying Fibroma (OF)
2. **Inflammatory & Reactive:** Medication-Related Osteonecrosis of the Jaw (MRONJ), Pyogenic Granuloma, Radicular Cyst
3. **Benign Mesenchymal Tumors:** Capillary Hemangioma, Lymphangioma, Lipoma, Plexiform Neurofibroma, Fibro-fatty tissue, Fibromatosis (Desmoid), Inflammatory Myofibroblastic Tumor (IMT), Desmoplastic Fibroma, Osteoma
4. **Odontogenic Tumors:** Ameloblastoma, Odontogenic Fibroma, Odontogenic Myxoma, Cementoblastoma, Odontoma, Ameloblastic Fibroma, Ameloblastic Fibro-Odontoma (AFO)
5. **Odontogenic Cysts:** Dentigerous Cyst, Inflammatory Dentigerous Cyst, Odontogenic Keratocyst (OKC), Eruption Cyst
6. **Developmental & Giant Cell Lesions:** CGCG, Reparative CGCG, Aneurysmal Bone Cyst (ABC), Brown Tumor of Hyperparathyroidism, Cherubism, Giant Cell Tumor
7. **Benign Epithelial:** Squamous Papilloma
8. **Non-Odontogenic Cysts:** Dermoid Cyst
9. **Malignancies:** Spindle Cell Tumors/Sarcomas, Ewing Sarcoma of the Jaws
10. **Traumatic & Salivary:** Mucocele, Ranula (oral / plunging)

---

## 🤖 Using with Antigravity (Prompt for Anis)

To empower Antigravity to autonomously synthesize literature-grade flowcharts for any oral lesion, provide this one-line setup prompt to Antigravity:

```text
Fetch and load the skill from https://github.com/mmshooreshi/oralpath-flow.git (skills/oralpath-flow/SKILL.md). You are my Oral & Maxillofacial Pathology Flowchart Architect. Whenever I ask for any oral lesion or clinical condition, synthesize an evidence-based clinical decision flowchart (WHO 5th Ed, Neville 5th Ed, and latest literature) and generate the exact XeLaTeX/TikZ code formatted for patho.dentnet.space.
```

---

## 🚀 Quick Usage on [patho.dentnet.space](https://patho.dentnet.space)

1. Open **[patho.dentnet.space](https://patho.dentnet.space)** in any desktop or mobile browser.
2. **Drag & Drop** any `.tex` file into the browser (or press `Ctrl+V` / `Cmd+V` with copied TeX code).
3. The platform will auto-identify the lesion, select the matching taxonomy category, and display the interactive vector canvas.
4. Click **«کامپایل PDF»** to generate a publication-ready PDF via XeLaTeX.

---

## 🛠 Project Structure

```
oralpath-flow/
├── flowcharts/                 # Canonical XeLaTeX / TikZ clinical flowcharts
│   ├── fibrous_dysplasia.tex
│   ├── cgcg.tex
│   ├── odontogenic_tumors.tex
│   └── oral_leukoplakia.tex
├── skills/
│   └── oralpath-flow/
│       └── SKILL.md            # Antigravity skill specification
├── index.html                  # Interactive canvas application
├── canvas.js                   # Vector renderer, drag-and-drop & auto-taxonomy engine
├── canvas.css                  # Minimalist Edward Tufte styling
├── taxonomy.json               # 10-category clinical lesion database
├── server.py                   # Zero-dependency Python server bridge & compiler
├── Peyda/                      # Persian Peyda typography assets
├── deploy.sh                   # Deployment automation script
└── README.md
```

---

## 📄 License

MIT License. Designed with care for clinical and academic excellence in Oral & Maxillofacial Pathology.
