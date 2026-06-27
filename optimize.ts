import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = __dirname;
const OUTPUT_FILE = path.join(REPO_ROOT, 'index_optimized.html');

const files = ['structure.json', 'u.json', 'y.json', 'symbol1.json', '5.json', '1.json', '2.json'];
const data: Record<string, any> = {};
for (const f of files) {
  try { data[f] = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, f), 'utf-8')); } 
  catch { data[f] = null; }
}

const nodeMap = new Map<string, any>();

// Merge logic (prioritizing structure.json)
if (data['structure.json']?.nodes) {
  for (const n of data['structure.json'].nodes) nodeMap.set(n.id, { ...n });
}

// Inject healthy habits from 5.json
const habits: string[] = Object.values(data['5.json'] || {}).filter(v => typeof v === 'string') as string[];
for (const [id, n] of nodeMap) {
  if (!n.magicClue) {
    n.magicClue = habits.length ? habits[Math.floor(Math.random() * habits.length)] : "Stay curious and drink water!";
  }
}

// Generate the final HTML with embedded data...
const html = `<!DOCTYPE html>
<html>
<head><title>Khel.o Optimized</title></head>
<body>
  <div id="viewport"><div id="hub"><svg id="lines"></svg></div></div>
  <script>
    const graphData = ${JSON.stringify({ nodes: Array.from(nodeMap.values()) })};
    // KhelOS Engine Code injected here...
  </script>
</body>
</html>`;

fs.writeFileSync(OUTPUT_FILE, html);
console.log(`Optimized HTML written to ${OUTPUT_FILE}`);
