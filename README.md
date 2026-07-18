# Eka — Landing Page

The official landing page for **Eka**, a full-stack conversational AI assistant with voice, live web search, and markdown rendering — available on Windows and Android.

**Live:** [abhiraj1121.github.io/eka](https://abhiraj1121.github.io/eka/)

---

## ✨ What's in this repo

A single, self-contained `index.html` — no build step, no dependencies to install. Pure HTML, CSS, and vanilla JavaScript, styled with a dark glassmorphism / neon aesthetic (glass cards, ambient glow orbs, animated grid background).

Includes:
- Hero section with an animated typing terminal and 3D tilt-on-hover glass card
- "What is Eka" / tech stack overview
- Feature grid (AI core, web search, voice I/O, markdown, chat UX, UI controls)
- Cross-platform highlight block with a live typed conversation demo
- Download section with direct links to the Windows `.exe` and Android `.apk`
- Developer bio section
- Scroll-reveal animations throughout, with `prefers-reduced-motion` respected

## 🗂 File structure

```
eka/
├── index.html          ← the entire site (HTML + CSS + JS)
├── README.md            ← this file
└── photo/                ← optional: your own images (see below)
    ├── logo.jpg
    └── photo.jpg
```

## 🖼 Adding your own logo & photo

By default the nav logo and developer avatar are CSS-drawn letter badges ("E" and "A"), so the site works with zero image assets. To swap them for real images:

1. Add your images to a `photo/` folder next to `index.html`.
2. In `index.html`, find:
   - **Nav logo** — `<span class="mark-glyph">E</span>` (nav bar, top left)
   - **Developer avatar** — `<div class="dev-avatar">A</div>` (Developer section)
3. Replace each with an `<img src="photo/logo.jpg" ...>` / `<img src="photo/photo.jpg" ...>` tag. See inline comments near those elements for sizing.

> Paths are case-sensitive on GitHub Pages. Use relative paths (`photo/logo.jpg`), never a local Windows path (`C:/Users/...`) — those only work on your own machine.

## 🔗 Key links used in the page

| Purpose | URL |
|---|---|
| Live demo | `https://abhiraj1121.github.io/eka/` |
| Windows download | `https://github.com/abhiraj1121/eka/releases/download/EKA-WIN/EkaAI.exe` |
| Android APK | `https://github.com/abhiraj1121/eka/releases/download/EKA/EKA.v0.1-Beta.x32.x64.apk` |
| Main repo | `https://github.com/abhiraj1121/eka` |
| Eka Mini repo | `https://github.com/abhiraj1121/ekamini` |

Update these in `index.html` if a link ever changes (search for the URL text to find every place it's used).

## 🚀 Deploying

This page is built for **GitHub Pages**:

1. Push `index.html` (and `photo/` if used) to the root of the `eka` repo, on the `main` branch.
2. In the repo settings → **Pages**, set the source to `main` / root.
3. The site publishes at `https://abhiraj1121.github.io/eka/`.

No build tools, no `npm install` — just commit and it's live.

## 🛠 Stack

- HTML5 / CSS3 (custom properties, backdrop-filter glassmorphism, CSS animations)
- Vanilla JavaScript (typing effects, scroll-reveal via `IntersectionObserver`, mouse-tilt effect)
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono

## 📄 About Eka

Eka is a modern AI chat assistant built for real conversations — voice input/output, toggled Wikipedia-grounded search, and clean markdown rendering, running on any OpenAI / OpenRouter-compatible model. Read more on the [main Eka repo](https://github.com/abhiraj1121/eka).

## 👤 Developer

Built by **Abhi Raj** — [GitHub](https://github.com/Abhiraj1121)

---

© 2026 Eka. Built with curiosity, deployed with confidence.
