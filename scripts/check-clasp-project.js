const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), '.clasp.json');
const expectedScriptId = process.env.EXPECTED_SCRIPT_ID;

function fail(message) {
  console.error(`clasp project check failed: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(configPath)) {
  fail('missing .clasp.json. Copy .clasp.json.example to .clasp.json and set the Apps Script project ID.');
}

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  fail(`.clasp.json is not valid JSON: ${error.message}`);
}

if (!config.scriptId || config.scriptId === 'PASTE_SCRIPT_ID_HERE') {
  fail('scriptId is not configured in .clasp.json.');
}

if (config.rootDir && config.rootDir !== '.') {
  fail(`rootDir must be "." for this repository, got "${config.rootDir}".`);
}

if (expectedScriptId && config.scriptId !== expectedScriptId) {
  fail(`.clasp.json points to ${config.scriptId}, expected ${expectedScriptId}.`);
}

console.log(`clasp project check passed: ${config.scriptId}`);
