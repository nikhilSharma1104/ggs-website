// Regenerates server/schoolKnowledge.json from src/data (site.ts + knowledge.ts)
// so the AI guide on the server always matches the website's content.
// Usage: npm run knowledge
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'ggs-knowledge-'));
execFileSync(
  path.join(root, 'node_modules', '.bin', 'tsc'),
  ['src/data/knowledge.ts', '--outDir', out, '--module', 'commonjs', '--target', 'es2019', '--skipLibCheck', '--esModuleInterop'],
  { cwd: root, stdio: 'inherit' }
);
const { knowledgeText } = require(path.join(out, 'knowledge.js'));
const text = knowledgeText();
fs.writeFileSync(
  path.join(root, 'server', 'schoolKnowledge.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), text }, null, 2) + '\n'
);
fs.rmSync(out, { recursive: true, force: true });
console.log(`server/schoolKnowledge.json written (${text.length} chars)`);
