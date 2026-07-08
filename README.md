# DATUM — CAD Engineering Scrollytelling Site

A Next.js 14 + Tailwind + Framer Motion landing page for a mechanical
design / CAD engineering practice. The hero is a scroll-linked exploded
technical diagram (bolts → cover → bearing → gear → housing) built
natively in SVG — no external frame images required.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Scroll through the hero to see the
assembly separate, show its GD&T-style callouts, and reassemble.

## Hosting on GitHub

The repo is already git-initialized with one commit on `main` and a
GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
the site as a static export and deploys it to GitHub Pages on every
push.

**1. Push it to GitHub**

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

**2. Set the repo name in `next.config.mjs`**

GitHub Pages serves project sites from `https://<user>.github.io/<repo>/`,
so the site needs to know its own subpath. Open `next.config.mjs` and
set `REPO_NAME` to match the repository name you used above (skip this
if you're deploying to a user/org page instead — set `REPO_NAME` to
`""`).

**3. Turn on Pages**

In the GitHub repo: **Settings → Pages → Build and deployment → Source**,
choose **GitHub Actions**. The next push to `main` will build and
publish the site automatically; check the **Actions** tab for progress
and the deployed URL.

**Alternative: Vercel**

Since this project has no server-only features, it also deploys as-is
to [Vercel](https://vercel.com/new) with zero config — just import the
GitHub repo there. Vercel doesn't need the static-export settings above
(you can leave `next.config.mjs` as is; `output: "export"` still works
fine on Vercel too).

## Project structure

```
app/
  layout.tsx      – root layout, fonts/metadata
  page.tsx        – page content: hero + services + contact
  globals.css     – design tokens (color, type) and base styles
components/
  ScrollAssembly.tsx – the scroll-driven exploded diagram + text panels
```

## Swapping in fonts

`globals.css` references Space Grotesk, Inter, and JetBrains Mono by
name. Load them with `next/font/google` in `app/layout.tsx`, e.g.:

```tsx
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
```

then apply the returned `className`s to `<body>`.

## Editing the copy or services

- Hero headline, section copy, and the CTA all live in
  `components/ScrollAssembly.tsx`.
- The five service cards below the fold live in the `SERVICES` array in
  `app/page.tsx`.

## If you want a photoreal version instead

If you'd rather use an AI-generated photoreal hero image/video (e.g.
for a marketing hero above this section, or as a poster frame), here
are the two prompts from your template filled in for this brand:

**Start Frame Prompt:**
Ultra-premium product photography of a precision mechanical gear
housing assembly called "DATUM" placed on a brushed steel surface,
minimalistic studio photoshoot. Deep graphite background with subtle
gradient falloff, soft rim lighting outlining the machined edges and
housing curves, controlled reflections on brass and anodized aluminum
textures. Cinematic lighting, high contrast, luxury precision-engineering
aesthetic, sharp focus, shallow depth of field. No clutter, no text, no
logos emphasized. Shot with a professional medium-format camera, 100mm
macro lens, f/2.8, ultra-high resolution, photorealistic, Apple-level
product shoot, dramatic mood, modern and elegant.

**End Frame Prompt:**
Exploded technical diagram view of the DATUM gear housing assembly,
every component precisely separated and floating in perfect alignment,
suspended in mid-air against a deep graphite studio background. Visible
internal structure including the gear teeth, bearing race, shaft, cover
plate, and mounting bolts, clearly showing how the product is assembled.
Hyper-realistic product visualization, ultra-sharp focus, studio rim
lighting identical to the hero image, soft highlights tracing each
component, controlled reflections on brushed metal and anodized
surfaces. Cinematic lighting, high contrast, luxury precision-engineering
aesthetic. No labels, no annotations, no text. Photorealistic,
ultra-high resolution, Apple-style industrial design render, dramatic
and clean.

**Motion prompt:** Smoothly transition from the assembled housing to
the exploded view, slow motion.

To use frames generated from these prompts instead of the SVG diagram,
replace the `<svg>` block in `ScrollAssembly.tsx` with a `<canvas>` and
draw the frame matching `Math.round(scrollYProgress * (totalFrames - 1))`
on each scroll update — the `useScroll`/`useTransform` wiring already in
the file carries over directly.
