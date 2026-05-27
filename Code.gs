const GITHUB_SCRIPT_BASE = 'https://raw.githubusercontent.com/AlexAlsing/Webbscripts/main/scripts/';

const SCRIPT_ROUTES = {
  'crcfix': true,
  'hwinfo': true,
  'oobe-visualizer': true,
  'test-fun': true
};

function doGet(e) {
  const pathInfo = e && e.pathInfo ? String(e.pathInfo).trim() : '';
  if (pathInfo) {
    return proxyScript_(pathInfo);
  }
  return HtmlService.createHtmlOutputFromFile('index');
}

function proxyScript_(pathInfo) {
  const slug = pathInfo.split('/')[0].toLowerCase();
  if (!SCRIPT_ROUTES[slug]) {
    return ContentService.createTextOutput('Unknown script route.')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const sourceUrl = GITHUB_SCRIPT_BASE + encodeURIComponent(slug);
  const response = UrlFetchApp.fetch(sourceUrl, {
    muteHttpExceptions: true,
    followRedirects: true
  });
  const code = response.getResponseCode();
  if (code !== 200) {
    return ContentService.createTextOutput('Failed to fetch script from GitHub: HTTP ' + code)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  return ContentService.createTextOutput(response.getContentText())
    .setMimeType(ContentService.MimeType.TEXT);
}
