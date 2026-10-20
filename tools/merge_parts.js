// Merge generated catalog manifests; preserve existing part IDs and manual adjustments.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'parts.js');
const source = fs.readFileSync(file, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const parts = context.window.PARTS;
const styleRoot = path.join(root, 'design', 'style-refinement');
const styleConfigFile = path.join(styleRoot, 'catalog.json');
const style = fs.existsSync(styleConfigFile) ? JSON.parse(fs.readFileSync(styleConfigFile, 'utf8')) : {};
for (const cat of ['body', 'ears', 'deco', 'face', 'prop', 'back']) {
  // Style corrections must follow the original generation manifests so rerunning
  // this tool cannot restore rejected silhouettes or the old attachment geometry.
  const manifests = ['parts.json', 'replacements.json'].map((name) => path.join(root, 'design', 'expansion', cat, name));
  for (const name of [style.replacements?.[cat]].flat().filter(Boolean)) manifests.push(path.join(styleRoot, name));
  for (const manifest of manifests) {
    if (!fs.existsSync(manifest)) continue;
    for (const part of JSON.parse(fs.readFileSync(manifest, 'utf8'))) {
      const index = parts[cat].findIndex((existing) => existing.id === part.id);
      if (index < 0) parts[cat].push(part);
      else parts[cat][index] = part;
    }
  }
  const retired = new Set(style.retired?.[cat] || []);
  parts[cat] = parts[cat].filter((part) => !retired.has(part.id));
  parts[cat].sort((a, b) => Number(a.id.split('_')[1]) - Number(b.id.split('_')[1]));
}
for (const name of style.propOffsets || []) {
  const overrides = JSON.parse(fs.readFileSync(path.join(styleRoot, name), 'utf8'));
  for (const body of parts.body) if (overrides[body.id]) {
    body.anchors.propOffsets = { ...body.anchors.propOffsets, ...overrides[body.id] };
  }
}
const prefix = source.slice(0, source.indexOf('window.PARTS ='));
const tail = source.slice(source.indexOf('window.PART_ADJUST ='));
fs.writeFileSync(file, `${prefix}window.PARTS = ${JSON.stringify(parts, null, 1)};\n${tail}`);
console.log(Object.fromEntries(Object.entries(parts).map(([cat, values]) => [cat, values.length])));
