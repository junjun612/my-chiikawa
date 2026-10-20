"""Replace the hand-like legacy squirrel ears with a round unused atlas pair."""
from pathlib import Path
import json
from PIL import Image
import slice_ears as utils

HERE=Path(__file__).resolve().parent
OUT=HERE.parents[2]/'parts/ears'


def main():
    sheet=Image.open(HERE/'sheet-02.png').convert('RGBA')
    cw,ch=sheet.width/4,sheet.height/4
    pair=sheet.crop(tuple(round(v) for v in (3*cw,0,4*cw,ch)))
    split=pair.width//2
    halves=[utils.clean_crop(pair.crop((0,0,split,pair.height))),utils.clean_crop(pair.crop((split,0,pair.width,pair.height)))]
    scale=min(111/max(h.width for h in halves),111/max(h.height for h in halves))
    halves=[h.resize((round(h.width*scale),round(h.height*scale)),Image.Resampling.LANCZOS) for h in halves]
    padded=[]
    for h in halves:
        p=Image.new('RGBA',(h.width+4,h.height+4));p.alpha_composite(h,(2,2));padded.append(p)
    halves=padded
    ident='ears_12';color=utils.hex_color(halves[0])
    part={'id':ident,'label':'아기 수달','src':f'parts/ears/{ident}.webp','color':color}
    combined=Image.new('RGBA',(sum(h.width for h in halves)+37,max(h.height for h in halves)))
    x=0
    for side,h in zip(['L','R'],halves):
        name=f'{ident}_{side}';fill,line=utils.masks(h)
        for img,suffix in [(h,''),(fill,'_fill'),(line,'_line')]:utils.save(img,OUT/f'{name}{suffix}.webp')
        part[side]={'src':f'parts/ears/{name}.webp','w':h.width,'h':h.height,'root':[h.width/2,h.height-4],
                    'color':color,'fill':f'parts/ears/{name}_fill.webp','line':f'parts/ears/{name}_line.webp'}
        combined.alpha_composite(h,(x,combined.height-h.height));x+=h.width+37
    fill,line=utils.masks(combined)
    for img,suffix in [(combined,''),(fill,'_fill'),(line,'_line')]:utils.save(img,OUT/f'{ident}{suffix}.webp')
    part.update(w=combined.width,h=combined.height,fill=f'parts/ears/{ident}_fill.webp',line=f'parts/ears/{ident}_line.webp')
    path=HERE/'replacements.json'
    replacements={p['id']:p for p in json.loads(path.read_text())} if path.exists() else {}
    replacements[ident]=part
    path.write_text(json.dumps(sorted(replacements.values(),key=lambda p:p['id']),ensure_ascii=False,indent=2)+'\n')
    utils.persist_legacy_attachments()
    preview=Image.new('RGBA',combined.size,'#e7f5ed');preview.alpha_composite(combined);preview.convert('RGB').save(HERE/'replacement-ears12.jpg',quality=95)
    print('Replaced ears_12 assets; metadata: '+str(HERE/'replacements.json'))


if __name__=='__main__':main()
