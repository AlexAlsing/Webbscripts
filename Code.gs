const GITHUB_SCRIPT_BASE = 'https://raw.githubusercontent.com/AlexAlsing/Webbscripts/main/scripts/';

const SCRIPT_CATALOG = {
  'crcfix': {
    description: 'Solves CRC error while downloading from filewave booster servers.',
    runner: 'bash'
  },
  'hwinfo': {
    description: 'Collects and prints structured hardware inventory details for quick diagnostics.',
    runner: 'bash'
  },
  'oobe-visualizer': {
    description: 'Visualizes OOBE progress and key checkpoints during endpoint provisioning.',
    runner: 'iex'
  },
  'test-fun': {
    description: 'Simple test script that prints a few lines.',
    runner: 'iex'
  }
};

function doGet(e) {
  const pathInfo = e && e.pathInfo ? String(e.pathInfo).trim() : '';
  if (pathInfo) {
    return routeRequest_(pathInfo);
  }
  return renderIndex_();
}

function routeRequest_(pathInfo) {
  const parts = pathInfo.split('/').filter(String);
  const first = (parts[0] || '').toLowerCase();

  if (first === 'view') {
    return renderScriptView_(parts[1]);
  }
  return proxyScript_(first);
}

function renderIndex_() {
  const template = HtmlService.createTemplateFromFile('index');
  template.scriptCatalogJson = JSON.stringify(SCRIPT_CATALOG);
  return template.evaluate().setTitle('IT Convenience Scripts');
}

function proxyScript_(slug) {
  if (!SCRIPT_CATALOG[slug]) {
    return ContentService.createTextOutput('Unknown script route: ' + slug)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const fetchResult = fetchScriptText_(slug);
  if (!fetchResult.ok) {
    return ContentService.createTextOutput('Failed to fetch script from GitHub: HTTP ' + fetchResult.code)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  return ContentService.createTextOutput(fetchResult.body)
    .setMimeType(ContentService.MimeType.TEXT);
}

function renderScriptView_(slugValue) {
  const slug = (slugValue || '').toLowerCase();
  if (!SCRIPT_CATALOG[slug]) {
    return HtmlService.createHtmlOutput('<h3>Unknown script route.</h3>');
  }

  const fetchResult = fetchScriptText_(slug);
  if (!fetchResult.ok) {
    return HtmlService.createHtmlOutput('<h3>Failed to fetch script from GitHub: HTTP ' + fetchResult.code + '</h3>');
  }

  const escaped = fetchResult.body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const html = [
    '<!doctype html><html><head><meta charset="utf-8"><title>Script View - ' + slug + '</title>',
    '<style>body{font-family:Consolas,monospace;background:#0f1218;color:#d1d5db;margin:0;padding:16px;}',
    'h2{color:#22d3ee;font-family:Consolas,monospace;margin:0 0 12px;}',
    'pre{white-space:pre-wrap;word-break:break-word;background:#111827;border:1px solid #374151;border-radius:8px;padding:12px;}</style>',
    '</head><body><h2>/' + slug + '</h2><pre>' + escaped + '</pre></body></html>'
  ].join('');

  return HtmlService.createHtmlOutput(html);
}

function fetchScriptText_(slug) {
  const sourceUrl = GITHUB_SCRIPT_BASE + encodeURIComponent(slug);
  const response = UrlFetchApp.fetch(sourceUrl, {
    muteHttpExceptions: true,
    followRedirects: true
  });
  return {
    ok: response.getResponseCode() === 200,
    code: response.getResponseCode(),
    body: response.getContentText()
  };
}
