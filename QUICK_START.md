# 🚀 Quick Start Guide

## ⚠️ Three Files Need Manual Updates

I've prepared everything, but Replit security prevents me from editing these files directly. Please copy the templates:

### 1️⃣ Copy `replit.nix`
```bash
cp config_templates/replit.nix.template replit.nix
```

### 2️⃣ Copy `.replit`  
```bash
cp config_templates/.replit.template .replit
```

### 3️⃣ Update `package.json` Scripts
Open `package.json` and replace the `"scripts"` section with:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview --port 5173",
  "serve": "npm run build && python3 -m http.server 5000 -d dist/public",
  "check": "tsc"
}
```

## 🎯 Then Run

Click the **Run** button at the top, or execute:
```bash
npm install
npm run dev
```

Your landing page will open on port 5173! 🎉

## 📁 What Changed

✅ **Moved landing page files to work with Vite:**
- `index.html` → `client/index.html`
- `styles.css` → `client/src/styles.css`
- `main.js` → `client/src/main.js`

✅ **Updated asset paths** in HTML to use Vite module system

✅ **Updated `.gitignore`** to include `.cache`

✅ **Created template files** in `config_templates/` for easy copying

## 🎨 Landing Page Features

- ✨ Mobile-first responsive design (360px+)
- 🎬 YouTube video modal with lazy loading
- 🎯 Audience segmentation tabs (student/night/tourism)
- 📊 Analytics tracking hooks ready for GA4/GTM
- ♿ Full accessibility (ARIA, keyboard nav, skip links)
- 🔍 Complete SEO (OGP, Twitter cards, JSON-LD)
- 📱 Fixed mobile CTA bar
- 🌐 i18n-ready with data-i18n attributes

## 🔄 Two Modes

**Dev Mode** (default Run button):
- Hot reload on file changes
- Port 5173
- Fast development experience

**Build & Serve** (Workflows menu):
- Production-optimized build
- Port 5000
- Serves from `dist/public/`

---

📖 See `SETUP_INSTRUCTIONS.md` for detailed documentation
