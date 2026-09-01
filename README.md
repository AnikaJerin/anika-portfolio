# Anika Jerin Portfolio

Dark, interactive React portfolio for software and AI engineering roles. It includes resume-backed experience, real public GitHub projects, and dynamic GitHub / LeetCode / Codeforces data.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test the production build

```bash
npm run build
npm run preview
```

## GitHub Pages

1. Create a public GitHub repository, for example `anika-portfolio`.
2. From this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Create portfolio"
   git branch -M main
   git remote add origin https://github.com/AnikaJerin/anika-portfolio.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow publishes it automatically at `https://anikajerin.github.io/anika-portfolio/`.

## Dynamic data

The included `refresh-profile-data.yml` workflow fetches public profile data daily and commits the current snapshot to `public/live-data.json`. To update it on demand, use **Actions → Refresh portfolio profile data → Run workflow**. Test a refresh locally with `npm run refresh:data`.

LeetCode can occasionally rate-limit public automation; the workflow preserves the last successful values rather than blanking the site.
