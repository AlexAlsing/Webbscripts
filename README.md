# IT Convenience Scripts Portal

## Purpose
This repository contains a single-page dark-mode portal mockup for listing IT convenience scripts.


## Where this is stored
- The frontend source is stored in this Git repository (`index.html`).
- Google Apps Script does **not** automatically read files from this repo unless you set up a sync flow (for example with `clasp`).

## Google Apps Script usage
- **Option 1 (quick/manual):** Copy the HTML from `index.html` into an Apps Script HTML file (for example `Index.html`) and serve it through `HtmlService`.
- **Option 2 (recommended for long-term):** Keep the source in Git and use `clasp` to push/pull your Apps Script project so you avoid repeated manual copy/paste.

## User adjustments log
- If script endpoints, card contents, or execution environments need to be changed, update `index.html` directly.
- If you deploy via manual copy/paste, any frontend update in Git must be copied again into the Apps Script project.
- If you deploy via `clasp`, run your normal `clasp push` flow after Git changes so Apps Script stays in sync.
=======
## User adjustments log
- No manual user-side configuration changes are required for this implementation.
- If script endpoints, card contents, or execution environments need to be changed, update `index.html` directly.

