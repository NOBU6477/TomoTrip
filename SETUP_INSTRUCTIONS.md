# TomoTrip Landing Page - Setup Instructions

## Project Status
✅ Landing page HTML/CSS/JS moved to `client/` directory for Vite integration
✅ `.gitignore` updated to include `.cache`
✅ Asset paths updated in `client/index.html`

## Required Manual Steps

Since I cannot directly edit `.replit`, `replit.nix`, or `package.json`, you need to make these changes manually:

### 1. Update `replit.nix`
Replace the entire contents with:
```nix
{ pkgs }:
{
  deps = [
    pkgs.nodejs_20
  ];
}
```

### 2. Update `.replit`
Replace the entire contents with:
```toml
run = ["bash", "-lc", "npm run dev"]

[nix]
channel = "stable-24_05"

[env]
PORT = "5173"

[[ports]]
localPort = 5173
externalPort = 80

[workflows]
runButton = "Start dev server"

[[workflows.workflow]]
name = "Start dev server"
task = "shell.exec"
args = "npm run dev"
waitForPort = 5173

[[workflows.workflow]]
name = "Build & serve dist"
task = "shell.exec"
args = "npm run build && python3 -m http.server 5000 -d dist/public"
waitForPort = 5000
```

### 3. Update `package.json` Scripts
Modify the `"scripts"` section to:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview --port 5173",
  "serve": "npm run build && python3 -m http.server 5000 -d dist/public",
  "check": "tsc"
}
```

### 4. Run Installation
After making the above changes, click the **Run** button or execute in Shell:
```bash
npm install
```

## Usage

### Dev Mode (Default)
Click the **Run** button at the top of Replit. This will:
- Start Vite dev server on port 5173
- Enable hot module replacement (HMR)
- Open preview in browser

### Build & Serve Mode
Go to **Workflows → Build & serve dist** to:
- Build production assets to `dist/public/`
- Serve static files on port 5000 using Python

## File Structure
```
.
├── client/
│   ├── index.html          # Landing page HTML (Vite entry)
│   └── src/
│       ├── styles.css      # Landing page styles
│       └── main.js         # Landing page JavaScript
├── assets/
│   └── images/             # Landing page images
├── .replit                 # Replit configuration (needs manual update)
├── replit.nix             # Nix environment (needs manual update)
├── package.json           # Dependencies (needs manual script update)
├── vite.config.ts         # Vite configuration (already set up)
└── manifest.json          # PWA manifest
```

## What Changed

### Automated Changes:
1. ✅ Moved `index.html` from root to `client/`
2. ✅ Moved `styles.css` to `client/src/`
3. ✅ Moved `main.js` to `client/src/`
4. ✅ Updated asset paths in HTML to use `/src/` prefix
5. ✅ Changed script tag to `<script type="module">`
6. ✅ Updated `.gitignore` to include `.cache`

### Manual Changes Needed:
1. ⚠️ Update `replit.nix` (remove Python, keep Node.js 20 only)
2. ⚠️ Update `.replit` (configure workflows and ports)
3. ⚠️ Update `package.json` scripts (simplify for frontend-only)

## Testing

After completing manual steps:

1. **Test Dev Server:**
   ```bash
   npm run dev
   ```
   Should open on port 5173

2. **Test Build:**
   ```bash
   npm run build
   ```
   Should create `dist/public/` directory

3. **Test Serve:**
   ```bash
   npm run serve
   ```
   Should serve built files on port 5000

## TODOs in Landing Page

The landing page has placeholder content that needs updating:
- `TODO: Replace with actual LINE URL` - Update all `https://lin.ee/yourline` links
- `TODO: Replace with actual YouTube URL` - Update video embed URL
- `TODO: Update bonus amounts` - Confirm ¥3,000 and ¥5,000 bonuses
- `TODO: Add actual company page URLs` - Update footer links
- `TODO: Add actual social media URLs` - Update social media links

## Support

If you encounter issues:
1. Ensure Node.js 20 is installed (`node --version`)
2. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check port availability (5173 and 5000)
4. Verify Vite config points to `client/` directory

## Current Vite Configuration

The project uses Vite with:
- **Root:** `client/` directory
- **Build output:** `dist/public/`
- **Aliases:**
  - `@` → `client/src`
  - `@shared` → `shared`
  - `@assets` → `attached_assets`
