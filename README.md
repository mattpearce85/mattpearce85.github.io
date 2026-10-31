# Matthew Pearce — Software Engineer & Team Leader

Portfolio: https://mattpearce85.github.io/

Built with HTML, CSS, and JavaScript. No build step or external dependencies.

## Files

- `index.html`: portfolio text and SVG graphics
- `style.css`: layout, typography, and print styles
- `script.js`: scroll animation, priority-queue demo, and print controls
- `.nojekyll`: tells GitHub Pages to serve the files without Jekyll

## Update the site

Upload the changed files to the root of the repository and commit to `main`. GitHub Pages publishes from `main` and `/(root)`. Wait for the deployment to finish, then refresh the website. If an older version appears, use Ctrl + Shift + R.

## Preview locally

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000/.

## Check changes

Run `node --check script.js`. Check navigation, expanded project details, the queue controls, scroll animation, reduced-motion behavior, mobile layouts, and print output.

If moving to a different address, update the canonical and `og:url` tags in `index.html`.
