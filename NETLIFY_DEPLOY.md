Manual Netlify deploy instructions

This file explains how to manually deploy this Next.js project to Netlify using the official Netlify Next.js plugin.

1) Install plugin locally (optional):

```bash
npm install -D @netlify/plugin-nextjs
```

2) Ensure `netlify.toml` is committed (this repo includes one). It contains:

[build]
  command = "npm run build"
  publish = ".next"
  functions = ".netlify/functions"

[[plugins]]
  package = "@netlify/plugin-nextjs"

3) In Netlify (New site from Git) connect your repo. If the UI doesn't auto-detect, use:

- Build command: `npm run build`
- Publish directory: `.next`

4) Add any required environment variables in Netlify Site settings > Build & deploy > Environment.

Notes:
- If you prefer a static export (`next export`), change the build command to `npm run build && npm run export` and set publish directory to `out`.
- If using features outside the plugin's support, review Netlify build logs and plugin docs.

References:
- https://docs.netlify.com/configure-builds/get-started/
- https://github.com/netlify/netlify-plugin-nextjs
