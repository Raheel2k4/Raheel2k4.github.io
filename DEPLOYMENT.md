# 🚀 Portfolio Deployment Guide

## File Structure
```
portfolio/
├── index.html            ← Main portfolio
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── data.js       ← Your content
│       └── main.js
├── admin/
│   └── index.html        ← Your private CMS
└── DEPLOYMENT.md
```

---

## Step 1 — Create GitHub Repo
1. GitHub → **New repository**
2. Name it: `yourusername.github.io`
3. Set to **Public** → Create

## Step 2 — Upload Files
**Web UI:** In the repo, click "uploading an existing file" → drag all files maintaining folder structure → Commit

**Git CLI:**
```bash
cd portfolio
git init && git add . && git commit -m "launch"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

## Step 3 — Enable Pages
Settings → Pages → Source: `main` branch, `/ (root)` → Save

✅ Live at **https://yourusername.github.io** in ~2 min

---

## Admin Panel
URL: `https://yourusername.github.io/admin/index.html`

Not linked publicly — only you know it exists.
Default password: `admin123` → change in Settings tab

## Content Update Workflow
1. Open `/admin/index.html`
2. Edit content → Save
3. Export tab → Generate → Copy
4. GitHub → `assets/js/data.js` → Edit → Paste → Commit
5. Site updates automatically in ~30s
