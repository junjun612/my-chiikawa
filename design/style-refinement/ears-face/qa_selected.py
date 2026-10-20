"""Before/after style QA, using preserved original sprite paths."""
from pathlib import Path
import importlib.util,json,copy
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
spec=importlib.util.spec_from_file_location('ear_qa',ROOT/'design/expansion/ears/attachment_qa.py')
qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)


def old_paths(part,mapping):
    part=copy.deepcopy(part)
    for p in [part]+[part[s] for s in ['L','R'] if s in part]:
        for key in ['src','fill','line']:
            if p.get(key) in mapping:p[key]=mapping[p[key]]
    return part


def main():
    old={p['id']:p for p in json.loads((HERE/'before-parts.json').read_text())}
    paths=json.loads((HERE/'before-paths.json').read_text())
    updated={p['id']:p for name in ['ears-replacements.json','face-replacements.json'] for p in json.loads((HERE/name).read_text())}
    cases=['ears_13','ears_14','face_20','face_27','face_35']
    board=Image.new('RGB',(1280,len(cases)*280),'#fff9ed');draw=ImageDraw.Draw(board)
    for row,ident in enumerate(cases):
        for col,(bid,before) in enumerate([('body_01',True),('body_01',False),('body_29',True),('body_29',False)]):
            p=old_paths(old[ident],paths) if before else updated[ident]
            ear=p if ident.startswith('ears_') else qa.BY_ID['ears_01']
            face=p if ident.startswith('face_') else qa.BY_ID['face_01']
            cv=qa.compose(qa.BY_ID[bid],ear,face=face)
            thumb=cv.crop((80,130,435,455));thumb.thumbnail((320,250),Image.Resampling.LANCZOS)
            x,y=col*320,row*280;board.paste(thumb,(x+(320-thumb.width)//2,y))
            draw.text((x+58,y+259),f'{ident} / {bid} / '+('before' if before else 'after'),fill='#5a3d31')
    board.save(HERE/'before-after-two-bodies.jpg',quality=95)
    # Full refined facial-expression catalog confirms only the three approved swaps.
    for bid in ['body_01','body_29']:
        board=Image.new('RGB',(1440,1440),'#fff9ed');draw=ImageDraw.Draw(board)
        for k,f in enumerate(qa.PARTS['face']):
            f=updated.get(f['id'],f);cv=qa.compose(qa.BY_ID[bid],qa.BY_ID['ears_01'],face=f)
            thumb=cv.crop((105,220,410,455));thumb.thumbnail((240,208),Image.Resampling.LANCZOS)
            x,y=(k%6)*240,(k//6)*240;board.paste(thumb,(x+(240-thumb.width)//2,y));draw.text((x+90,y+216),f['id'],fill='#5c463d')
        board.save(HERE/f'face-after-{bid}.jpg',quality=95)
    print('Saved before/after for five changes and two full refined face catalogs.')


if __name__=='__main__':main()
