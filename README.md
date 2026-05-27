# IT Convenience Scripts

Minimal Google Apps Script project scaffold for an HTML-served Apps Script app.

## Prerequisites

Install and authenticate `clasp`:

```powershell
npm install -g @google/clasp
clasp login
```

## Create or Connect the Apps Script Project

From this project folder, create a new standalone Apps Script project:

```powershell
clasp create --type standalone --title "IT Convenience Scripts"
```

Or connect to an existing Apps Script project:

```powershell
clasp clone <SCRIPT_ID>
```

Replace `<SCRIPT_ID>` with the target Apps Script project ID.

## Server Entry Point

`Code.gs` serves `index.html`:

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
```

## Push and Open

Push local files to Apps Script:

```powershell
clasp push
```

Open the Apps Script project in the browser:

```powershell
clasp open
```

Deploy from the Apps Script editor when ready.

## Required User-Side Adjustments

- Confirm the correct Google account is used during `clasp login`.
- If using `clasp clone`, use the correct Apps Script project ID.
- Review generated `.clasp.json` before pushing to ensure it points to the intended project.
- Update `index.html` and `Code.gs` with the actual UI and server-side script behavior.
