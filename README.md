# Agustin Calderon Life Site

Standalone static site package for Render.

## What this folder is for

This folder is separated from the rest of the repo so the life insurance website can be deployed as its own Render project and later assigned its own custom domain.

## Render options

Option 1:
Create a new Git repo just for this folder and deploy it with the included `render.yaml`.

Option 2:
Create a new Render Static Site from the current GitHub repo and use this folder as the app root.

Recommended Render settings if you create it manually:

- Service type: `Static Site`
- Root directory: `agustin-calderon-life-site`
- Build command: `echo "Static site ready"`
- Publish directory: `.`

## Main files

- `index.html`
- `styles.css`
- `app.js`
- `assets/agustin-calderon-portrait.png`
- `render.yaml`
