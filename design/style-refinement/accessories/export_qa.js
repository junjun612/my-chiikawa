const fs=require('fs');
global.window={};
eval(fs.readFileSync('parts.js','utf8'));
for(const cat of ['deco','back']){
  const replacements=JSON.parse(fs.readFileSync(`design/style-refinement/accessories/${cat}-replacements.json`,'utf8'));
  window.PARTS[cat]=window.PARTS[cat].map(p=>replacements.find(q=>p.id===q.id)||p);
}
eval(fs.readFileSync('engine.js','utf8'));
const samples=[];
for(const target of ['deco_08','back_05','back_07','back_14']){
  for(const [body,ears] of [['body_01','ears_01'],['body_17','ears_03'],['body_15','ears_04']]){
    for(const bodyColor of ['#fffaf0','#e2f5e9']){
      const look={parts:{body,ears,face:'face_01',deco:'deco_08',prop:null,
        back:target.startsWith('back')?target:null},bodyColor,sync:true};
      samples.push({id:target,look,layers:window.Creature.computeLayout(look)});
    }
  }
}
fs.writeFileSync('design/style-refinement/accessories/qa-layouts.json',JSON.stringify(samples,null,2));
