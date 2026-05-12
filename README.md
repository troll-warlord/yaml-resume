# yaml-resume

Write your resume in a single YAML file. Get a clean, web-hosted resume and a print-ready PDF — no design tools, no Word docs, no fiddling with margins.

**Live demo:** <https://troll-warlord.github.io/yaml-resume>

---

## Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/troll-warlord/yaml-resume.git
cd yaml-resume

# 2. Create your resume from the example
copy resume.example.yaml resume.yaml   # Windows
# cp resume.example.yaml resume.yaml   # Mac / Linux

# 3. Install and run
npm install
npm run dev
```

Open `http://localhost:5173` to see your resume. Edit `resume.yaml` and the page hot-reloads instantly.

> `resume.yaml` is gitignored — it will never be accidentally committed to this repo. Keep it in a separate private repository.

---

## Generating a PDF

```bash
npm run build
npm run pdf
```

This produces `resume.pdf` in the project root — pixel-perfect, no browser headers or footers.

> `npm run pdf` requires the dev/preview server to be running. It will start one automatically if needed.

---

## Editing Your Resume

Everything lives in `resume.yaml`. There are three top-level keys: `basics`, `config`, and `sections`.

---

### `basics`

Your personal and contact information.

```yaml
basics:
  name: Jane Smith
  label: Senior Product Engineer
  email: jane@example.com
  phone: +1 (555) 000-0000
  location:
    city: New York
    region: NY
    country: USA
  summary: >
    A brief paragraph shown under your name. Keep it 2-3 sentences.
  social:
    - network: LinkedIn
      url: https://linkedin.com/in/janesmith
      icon: linkedin
    - network: GitHub
      url: https://github.com/janesmith
      icon: github
    - network: Portfolio
      url: https://janesmith.dev
      icon: globe
```

**Supported icons:** `linkedin`, `github`, `globe`, `mail`, `phone`, `map-pin`

---

### `config`

Controls how the resume looks and behaves. All fields are optional — defaults are shown below.

```yaml
config:
  showDuration: false       # Show "3 yrs 2 mos" next to dates
  showLocation: true        # Show city/location on timeline entries
  bulletMarker: '>'         # Bullet prefix character — try '-', '•', '›'
  dateLocale: 'en-US'       # Date format locale — e.g. 'en-GB' for UK dates
  accentColor: '#2563eb'    # Primary colour — drives icons, borders, links
  pageSize: 'A4'            # PDF page size — 'A4' or 'Letter'
```

---

### `sections`

An ordered list of sections. Each section needs an `id`, `title`, and `type`.

#### Section types

---

#### `text` — a single paragraph

```yaml
- id: about
  title: About Me
  type: text
  content: >
    Write anything here. Good for a summary or personal statement.
```

---

#### `list` — a bulleted list

```yaml
- id: highlights
  title: Professional Summary
  type: list
  bullets:
    - First bullet point
    - Second bullet point
    - Third bullet point
```

---

#### `timeline` — work experience, education, certifications

```yaml
- id: experience
  title: Experience
  type: timeline
  items:
    - designation: Senior Engineer
      organization: Acme Corp
      location: San Francisco, CA       # optional
      startDate: '2021-03'              # YYYY-MM format
      endDate: null                     # null = present
      current: true
      bullets:                          # optional
        - Led migration to microservices
        - Mentored a team of 5 engineers
```

**Optional flags on the section:**

| Flag | Effect |
| ------ | -------- |
| `flipHierarchy: true` | Swaps organisation and designation — useful for certifications where the cert name is more important than the issuing body |
| `breakInside: true` | Prevents this section from splitting across PDF pages — recommended for short sections like Education and Certifications |

**Optional fields on each item:**

| Field | Effect |
| ------- | -------- |
| `url` | Adds an external-link icon next to the heading — useful for credential links |
| `location` | Shows a map-pin with the city |
| `bullets` | List of achievement bullet points |

**Certifications example** (using `flipHierarchy` and `url`):

```yaml
- id: certifications
  title: Certifications
  type: timeline
  flipHierarchy: true
  breakInside: true
  items:
    - designation: Certified Kubernetes Application Developer (CKAD)
      organization: Cloud Native Computing Foundation
      url: https://www.credly.com/badges/your-badge-id
      startDate: '2023-04'
      endDate: '2026-04'
      current: false
```

---

#### `grid` — skills or projects

**Skills:**

```yaml
- id: skills
  title: Skills
  type: grid
  items:
    - group: Languages
      tags: [TypeScript, Python, Go]
    - group: Frontend
      tags: [Vue 3, React, Tailwind CSS]
```

**Projects:**

```yaml
- id: projects
  title: Projects
  type: grid
  items:
    - title: My Project
      url: https://github.com/you/project
      description: One-line description of what it does.
      tags: [Vue, Vite, Open Source]
```

The section automatically renders as skills (label + tag badges) when items have a `group` key, and as projects (title + description + tags) when items have a `title` key.

---

## All Commands

| Command | What it does |
| --------- | ------------- |
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run pdf` | Generate `resume.pdf` from the production build |
| `npm run format` | Auto-format all source files with Prettier |
| `npm run lint` | Check for lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
