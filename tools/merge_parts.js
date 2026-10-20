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
for (const cat of ['body', 'ears', 'deco', 'face', 'prop', 'back']) {
  for (const name of ['parts.json', 'replacements.json']) {
    const manifest = path.join(root, 'design', 'expansion', cat, name);
    if (!fs.existsSync(manifest)) continue;
    for (const part of JSON.parse(fs.readFileSync(manifest, 'utf8'))) {
      const index = parts[cat].findIndex((existing) => existing.id === part.id);
      if (index < 0) parts[cat].push(part);
      else parts[cat][index] = part;
    }
  }
  parts[cat].sort((a, b) => Number(a.id.split('_')[1]) - Number(b.id.split('_')[1]));
}
const prefix = source.slice(0, source.indexOf('window.PARTS ='));
const tail = source.slice(source.indexOf('window.PART_ADJUST ='));
fs.writeFileSync(file, `${prefix}window.PARTS = ${JSON.stringify(parts, null, 1)};\n${tail}`);
console.log(Object.fromEntries(Object.entries(parts).map(([cat, values]) => [cat, values.length])));
