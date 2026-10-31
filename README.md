# Matthew Pearce — Software & Systems

A standalone portfolio built with HTML, CSS, and vanilla JavaScript. No build step, external assets, tracking, backend, or account is required to view the site. Project diagrams and the interactive priority queue are illustrative; no real messages are sent.

## Files

- `index.html`: portfolio content and inline SVG illustrations
- `style.css`: responsive layout and print styling
- `script.js`: priority-queue demo and print behavior
- `.nojekyll`: serve this static site without Jekyll processing

## Preview locally

From this folder, run `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public repository owned by your GitHub account. For the root user site, use `mattpearce85.github.io` only if it is available; do not overwrite an existing site. Otherwise use a new project repository.
2. Commit these five files at the root of the repository's `main` branch.
3. In **Settings → Pages → Build and deployment**, select **Deploy from a branch**, then choose **main** and **/(root)** and save.
4. Wait for the Pages deployment to succeed, then use the **Visit site** link in Pages settings. Verify it in a signed-out/private browser window.
5. This user-site configuration uses `https://mattpearce85.github.io/` for its canonical and `og:url` tags. If moving to another host, update both tags.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Checks

Run `node --check script.js`. Check the queue's insert, process, empty, and reset states; navigation anchors; responsive layout; and print overview before publishing updates.
