"""Fit five handled props to one C hand without editing shared game files.

Uses current parts.js geometry and engine.js computeLayout, then renders the
actual images/masks. Parent work can merge only the final independent JSON.
"""
import argparse
import json
import math
import subprocess
from pathlib import Path
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

GRIPS={'prop_04':[34,180],'prop_05':[132,194],'prop_11':[55,180],
       'prop_13':[44,166],'prop_30':[112,216]}
ANGLES={'prop_04':[65,80,95],'prop_05':[110,115,120],'prop_11':[80,90,100],
        'prop_13':[55,60,65],'prop_30':[120,135,150]}
BODY_GRIPS={'body_20':[155,151.5],'body_23':[154.5,161]}
SCALES={'body_20':.78,'body_23':.85}
# Filled after visual selection of all three angle candidates.
SELECTION={'body_20':{'prop_04':1,'prop_05':1,'prop_11':1,'prop_13':0,'prop_30':1},
           'body_23':{'prop_04':0,'prop_05':0,'prop_11':0,'prop_13':0,'prop_30':0}}

def node(code,stdin=''):
    result=subprocess.run(['node','-e',code],cwd=ROOT,input=stdin,capture_output=True,text=True,check=True)
    return json.loads(result.stdout)

parts=node("const fs=require('fs');global.window={};eval(fs.readFileSync('parts.js','utf8'));console.log(JSON.stringify(window.PARTS));")

def offset(body_id,prop_id,angle,scale):
    body=next(p for p in parts['body'] if p['id']==body_id)
    prop=next(p for p in parts['prop'] if p['id']==prop_id)
    anchor=body['anchors']['prop']
    size=anchor[2]*scale
    pixel_scale=min(size/prop['w'],size*1.25/prop['h'])
    gx,gy=GRIPS[prop_id]
    dx=(gx-prop['w']/2)*pixel_scale
    dy=(gy-prop['h']/2)*pixel_scale
    rad=math.radians(angle)
    rx=dx*math.cos(rad)-dy*math.sin(rad)
    ry=dx*math.sin(rad)+dy*math.cos(rad)
    tx,ty=BODY_GRIPS[body_id]
    return [round(tx-rx-anchor[0],2),round(ty-ry-anchor[1],2),
            round(angle-(anchor[3]if len(anchor)>3 else 0),2),scale]

def layouts(cases):
    js=r"""const fs=require('fs');global.window={};eval(fs.readFileSync('parts.js','utf8'));
eval(fs.readFileSync('engine.js','utf8'));
const cases=JSON.parse(fs.readFileSync(0,'utf8'));
console.log(JSON.stringify(cases.map(c=>{
 const b=window.PARTS.body.find(p=>p.id===c.body);
 b.anchors.propOffsets={...(b.anchors.propOffsets||{}),[c.prop]:c.offset};
 const look={parts:{body:c.body,ears:'ears_19',deco:null,face:'face_19',prop:c.prop,back:null},bodyColor:'#e2f5e9',sync:true};
 return {...c,look,layers:window.Creature.computeLayout(look)};
})));"""
    return node(js,json.dumps(cases))

def render(sample):
    stage=Image.new('RGBA',(512,512),'#fff9ee')
    for layer in sample['layers']:
        if layer.get('type')=='blush':continue
        img=layer['img']
        art=Image.open(ROOT/img['src']).convert('RGBA')
        if layer.get('tint') and img.get('fill'):
            mask=Image.open(ROOT/img['fill']).convert('RGBA').getchannel('A')
            art=Image.new('RGBA',mask.size,layer['tint']);art.putalpha(mask)
            art.alpha_composite(Image.open(ROOT/img['line']).convert('RGBA'))
        art=art.resize((max(1,round(layer['w'])),max(1,round(layer['h']))),Image.Resampling.LANCZOS)
        local=Image.new('RGBA',(512,512))
        local.alpha_composite(art,(round(layer['x']),round(layer['y'])))
        if layer['rot']:
            local=local.rotate(-layer['rot'],Image.Resampling.BICUBIC,
                center=(layer['x']+layer['ox'],layer['y']+layer['oy']))
        stage.alpha_composite(local)
    return stage

def candidates():
    cases=[]
    for body in BODY_GRIPS:
        for prop in GRIPS:
            for index,angle in enumerate(ANGLES[prop]):
                cases.append({'body':body,'prop':prop,'variant':index,'angle':angle,
                              'offset':offset(body,prop,angle,SCALES[body])})
    samples=layouts(cases)
    (HERE/'two-hand-prop-candidate-layouts.json').write_text(json.dumps(samples,ensure_ascii=False,indent=2)+'\n')
    for body in BODY_GRIPS:
        group=[s for s in samples if s['body']==body]
        board=Image.new('RGB',(3*350,5*370),'#fff9ee');draw=ImageDraw.Draw(board)
        for i,s in enumerate(group):
            art=render(s).crop((80,100,430,440))
            x=i%3*350;y=i//3*370;board.paste(art,(x,y),art)
            draw.text((x+78,y+347),f"{s['prop']} / {s['angle']} deg / {s['variant']}",fill='#594337')
        board.save(HERE/f'two-hand-prop-{body}-candidates.jpg',quality=94)

def final():
    overrides={};cases=[]
    for body in BODY_GRIPS:
        overrides[body]={}
        for prop in GRIPS:
            angle=ANGLES[prop][SELECTION[body][prop]]
            value=offset(body,prop,angle,SCALES[body]);overrides[body][prop]=value
            cases.append({'body':body,'prop':prop,'angle':angle,'offset':value})
    (HERE/'two-hand-prop-overrides.json').write_text(json.dumps(overrides,ensure_ascii=False,indent=2)+'\n')
    samples=layouts(cases)
    (HERE/'two-hand-prop-final-layouts.json').write_text(json.dumps(samples,ensure_ascii=False,indent=2)+'\n')
    board=Image.new('RGB',(5*300,2*330),'#fff9ee');draw=ImageDraw.Draw(board)
    detail=Image.new('RGB',(5*300,2*260),'#fff9ee');dd=ImageDraw.Draw(detail)
    evidence=[]
    for i,s in enumerate(samples):
        art=render(s)
        tile=art.crop((80,100,430,440));tile.thumbnail((300,300),Image.Resampling.LANCZOS)
        x=i%5*300;y=i//5*330;board.paste(tile,(x,y),tile)
        draw.text((x+72,y+306),s['body']+' / '+s['prop'],fill='#594337')
        body=next(p for p in parts['body'] if p['id']==s['body'])
        scale=190/body['w'];left=256-95;top=440-body['h']*scale
        grip=BODY_GRIPS[s['body']];tx=left+grip[0]*scale;ty=top+grip[1]*scale
        # Expanded unmarked crop proves that the visible handle enters the hand.
        crop=art.crop((round(tx-35),round(ty-80),round(tx+95),round(ty+30)))
        crop=crop.resize((300,230),Image.Resampling.LANCZOS)
        detail.paste(crop,(x,i//5*260),crop)
        dd.text((x+72,i//5*260+237),s['body']+' / '+s['prop'],fill='#594337')
        evidence.append({'body':s['body'],'prop':s['prop'],'source_grip':GRIPS[s['prop']],
                         'body_grip':grip,'offset':s['offset'],'angle':s['angle']})
    board.save(HERE/'two-hand-prop-final-qa.jpg',quality=94)
    detail.save(HERE/'two-hand-prop-grip-detail.jpg',quality=95)
    (HERE/'two-hand-prop-grip-evidence.json').write_text(json.dumps(evidence,indent=2)+'\n')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--final',action='store_true');args=parser.parse_args()
    final()if args.final else candidates()
