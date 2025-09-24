# React Portfolio Website Template

A clean, modern two-page React portfolio template featuring a bio-focused home page and a resume page. This project is built with Create React App conventions, Tailwind CSS, and React Router so it can be deployed quickly to GitHub Pages.

## ✨ Features

- Responsive, mobile-first layout with polished animations
- Tailwind CSS utility classes with a modern, professional color palette
- Reusable components for navigation, footer, and buttons
- Resume download button wired to `/public/resume.pdf`
- Placeholder content clearly labelled with comments for quick customization
- GitHub Pages deployment scripts powered by `gh-pages`

## 📁 Project Structure

```
├── public
│   ├── favicon.svg
│   ├── index.html
│   ├── manifest.json
│   ├── profile-placeholder.svg
│   ├── resume.pdf          # Replace with your actual resume
│   └── robots.txt
├── src
│   ├── App.js              # Router + page shell
│   ├── components
│   │   ├── Button.js
│   │   ├── Footer.js
│   │   └── Header.js
│   ├── index.css           # Tailwind directives + global styles
│   ├── index.js
│   └── pages
│       ├── Home.js
│       └── Resume.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js ≥ 18 and npm ≥ 9
- GitHub repository configured for Pages (classic or via GitHub Actions)

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

The app will be available at `http://localhost:3000`. Tailwind JIT compilation is handled automatically by `react-scripts`.

### 4. Linting & formatting

This starter does not include a dedicated linter, but you can add ESLint/Prettier if desired. Tailwind handles most styling conventions.

## 🎨 Tailwind & Design Notes

- Tailwind is preconfigured via `tailwind.config.js` and `postcss.config.js`.
- Global typography, color, and utility helpers live in `src/index.css`.
- The palette uses desaturated navy backgrounds with bright cyan and warm accent highlights (`brand.dark`, `brand`, `brand.light`, `brand.accent`, `brand.muted`). Update the palette in the Tailwind config if you want a different look.

## 🧩 Customizing Content

Every section in `Home.js`, `Resume.js`, `Header.js`, and `Footer.js` includes comments like `/* Replace with... */` so you can quickly locate text to edit.

Key updates to make:

1. **Branding:** Replace "Your Name" and job titles in `Header.js`, `Home.js`, `Resume.js`, and `Footer.js`.
2. **Bio & Skills:** Update the hero paragraph, skills array, and interests in `Home.js`.
3. **Resume Details:** Update the `experience` and `education` arrays in `Resume.js` with real data. Add new entries as needed.
4. **Contact Links:** Update email, location, and social links in `Footer.js` and `Resume.js`.
5. **Resume PDF:** Replace `public/resume.pdf` with your actual PDF (keep the same filename so the download button continues to work).
6. **Profile Photo:** Swap `public/profile-placeholder.svg` with your own image and adjust sizing if necessary.

## 🚀 Deploying to GitHub Pages

1. Update the `homepage` value in `package.json` to match your GitHub Pages URL:
   ```json
   "homepage": "https://<username>.github.io/<repository>"
   ```
2. Commit your changes and push to the `main` branch.
3. Deploy with:
   ```bash
   npm run deploy
   ```
   The `predeploy` script builds the app, then `gh-pages` publishes the `build` directory to the `gh-pages` branch. Configure GitHub Pages to serve from that branch.

## 📄 License

This template is provided as-is. Feel free to customize and adapt it for personal or commercial use. Attribution is appreciated but not required.
