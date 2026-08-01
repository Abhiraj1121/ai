<div align="center">

# ✦ EKA — Hyper-Premium 3D Agentic AI Landing Page ✦

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-22C55E?style=for-the-badge&logo=github)](https://pages.github.com/)

*An award-winning, production-grade 3D landing page for EKA — the intelligent agentic AI assistant and tool orchestrator.*

</div>

---

## ⚡ Overview

**EKA** is an Agentic AI platform designed around a single conversational core that reads natural language intent and routes itself — automatically generating verified code, Mermaid.js diagrams, DOCX/PDF documents, and SVG avatars without requiring manual slash commands.

This landing page matches the visual sophistication, motion design, and typography execution of Apple, Linear, Vercel, and OpenAI.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) · TypeScript (`strict: true`) |
| **3D WebGL Engine** | Three.js wrapped via `@react-three/fiber` (R3F) & `@react-three/drei` |
| **Motion Core** | Framer Motion (declarative layout transitions) · GSAP (cursor physics & tilt math) |
| **Styling** | Tailwind CSS with custom alpha-channel glassmorphic frosted primitives |
| **Typography** | Google Fonts (`Unbounded`, `Plus Jakarta Sans`, `JetBrains Mono`) |

---

## ✨ Key Features & UX Systems

- 🌐 **3D WebGL AI Synthesis Core**: Glossy floating sphere with Drei `<MeshDistortMaterial>` PBR fluidic wave distortion, metallic sheen, and orbiting gold/blue torus rings.
- ⌨️ **Interactive Typewriter Terminal**: Micro-animated prompt line typing and backspacing through EKA's capabilities (`/code`, `/diagram`, `/doc`, `/avatar`).
- 🖥️ **3D Monitor Product Showcase**: Perspective-tilted monitor container with live preset switcher for Code Writer (AST static checks), Diagram Engine, Document Press, and Avatar Forge.
- 🎯 **Magnetic Cursor & Dotted Lattice Cards**: GSAP-driven dual-layer magnetic cursor with active dotted hover grid overlay clipping inside glass cards.
- 📊 **Comprehensive System Topology & Matrix**: Interactive 4-step pipeline blueprint, comparative platform matrix table, and product roadmap timeline.
- 🖼️ **Classic Star Brand Asset Integration**: EKA Classic Star Logo integrated across header navigation, AI agent avatars, footer, and browser tab favicons.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Production Static Build & Export

```bash
npm run build
```

This compiles your site and generates the optimized production static bundle in `out/`.

---

## 🌐 GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

To deploy to your GitHub account:

```bash
git init
git add .
git commit -m "feat: initial commit for EKA 3D landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eka-landing.git
git push -u origin main
```

In your repository **Settings → Pages**, set **Source** to **GitHub Actions**. Your landing page will automatically build and publish live!

---

<div align="center">
<sub>© EKA Agentic AI Platform — Built by Cognix Studio</sub>
</div>
