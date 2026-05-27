# IT Convenience Scripts Portal

Single-page dark-mode portal for listing IT convenience scripts, prepared for Google Apps Script deployment with `clasp`.

## Where This Is Stored

- The frontend source is stored in this Git repository (`index.html`).
- `Code.gs` is the Apps Script server entry point.
- Google Apps Script does not automatically read files from this repo unless you connect the project with `clasp`.

## Prerequisites

Install dependencies and authenticate `clasp`:

```powershell
npm install
npm run clasp:login
```

## Create or Connect the Apps Script Project

From this project folder, create a new standalone Apps Script project:

```powershell
npm run clasp:create
```

Or connect to an existing Apps Script project:

```powershell
npx clasp clone <SCRIPT_ID>
```

Replace `<SCRIPT_ID>` with the target Apps Script project ID.

If connecting manually, copy `.clasp.json.example` to `.clasp.json` and replace `PASTE_SCRIPT_ID_HERE` with the Apps Script project ID:

```powershell
Copy-Item .clasp.json.example .clasp.json
```

## Apps Script Entry Point

`Code.gs` serves `index.html`:

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
```

## Push and Open

Push local files to Apps Script:

```powershell
npm run clasp:push
```

Open the Apps Script project in the browser:

```powershell
npm run clasp:open
```

Deploy from the Apps Script editor when ready.

Only the Apps Script files are pushed by `clasp`: `Code.gs`, `index.html`, and `appsscript.json`. Repository-only files such as `README.md`, `package.json`, and `.gitignore` are excluded by `.claspignore`.

## Required User-Side Adjustments

- Confirm the correct Google account is used during `clasp login`.
- If using `clasp clone`, use the correct Apps Script project ID.
- Review generated `.clasp.json` before pushing to ensure it points to the intended project.
- Update `index.html` when script cards, endpoints, or UI text change.
- Update `Code.gs` if server-side Apps Script behavior changes.
- Run `clasp push` after Git changes so Apps Script stays in sync.
