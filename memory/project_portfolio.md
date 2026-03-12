---
name: project_portfolio
description: Portfolio project design system, components, and key decisions
type: project
---

Next.js 14 portfolio deployed to GitHub Pages via static export (`output: 'export'`).

**Design system colors:** cyan `#16f2b3`, violet `#a78bfa`, pink `#ec4899`, bg `#0d1224`

**Key components added/upgraded:**
- `app/components/helper/particle-canvas.jsx` — neural network particle bg (vanilla canvas, 70 particles desktop / 30 mobile), mouse repulsion
- `app/components/helper/custom-cursor.jsx` — custom dot+ring cursor with lerp lag, hover/click states
- `app/components/navbar.jsx` — scroll-aware shrink, active section detection via scroll, scroll progress bar gradient
- `app/components/homepage/hero-section/index.jsx` — typing animation for designation, corner resize handles (4 corners with L-bracket + directional arrows), stats row, VS Code status bar
- `app/components/homepage/about/index.jsx` — CountUp animation on scroll, 3D flip stat cards (front/back), 3D tilt profile image
- `app/components/homepage/projects/project-card.jsx` — holo-card + 3D tilt + cursor glow overlay
- `app/components/homepage/skills/index.jsx` — dual-row marquee (left + right), skill cards with 3D transform + glow

**CSS classes in globals.scss:**
- `.glass-card`, `.holo-card`, `.tilt-card`, `.project-card-3d`, `.skill-card`, `.blog-card-3d`
- `.stat-card-3d` (CSS 3D flip with front/back faces)
- `.orb`, `.orb-cyan/.violet/.pink` — floating blur orbs
- `.section-heading` — glassmorphism section label
- `.mesh-bg` — radial gradient mesh per section
- `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` — scroll reveal classes
- `.cursor-dot`, `.cursor-ring` — custom cursor elements
- `.blog-content` — full prose styling for blog posts

**GitHub Actions deployment:** Fixed 401 error by adding explicit `permissions: pages: write / id-token: write` to the deploy job. User also needs to go to Settings → Pages → Source → "GitHub Actions" (one-time manual step).

**Why:** User wants the most visually impressive developer portfolio
**How to apply:** Always use this design system and CSS classes for new components. Never downgrade animations.
