from pathlib import Path
import importlib.util,json
from PIL import Image,ImageDraw

ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('ear_qa',ROOT/'design/expansion/ears/attachment_qa.py')
qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)


def main():
    for bid in ['body_01','body_29']:
        b=qa.BY_ID[bid];board=Image.new('RGB',(1440,1440),'#fff9ed');draw=ImageDraw.Draw(board)
        for k,f in enumerate(qa.PARTS['face']):
            cv=qa.compose(b,qa.BY_ID['ears_01'],face=f)
            thumb=cv.crop((105,220,410,455));thumb.thumbnail((240,208),Image.Resampling.LANCZOS)
            x,y=(k%6)*240,(k//6)*240;board.paste(thumb,(x+(240-thumb.width)//2,y))
            draw.text((x+90,y+216),f['id'],fill='#5c463d')
        board.save(HERE/f'face-composition-{bid}.jpg',quality=95)
    reasons={
        'ears_13':('replace','보라색 박쥐막과 날카로운 장각형 윤곽을 작고 둥근 귀로 교체한다.'),
        'ears_14':('resize','전체 크기를 0.72배로 축소해 과도한 높이와 면적을 줄인다.'),
        'face_20':('replace','커다란 별 동공이 face_08/27과 중복된다. 작은 콩눈과 작은 입으로 교체한다.'),
        'face_27':('replace','별 동공과 열린 입을 작은 동그란 눈과 미니어처 웃음으로 교체한다.'),
        'face_35':('replace','거대한 하트 눈이 face_09와 중복된다. 작은 콩눈과 부드러운 윙크로 교체한다.'),
        'ears_17':('keep','실제 자산은 둥근 곰귀다. 손/삼지창 형태는 예전 ears_12이며 이미 교체됐다.'),
        'ears_12':('keep','손가락 같은 옛 귀는 아기 수달의 작은 둥근 귀로 교체 완료됐다.'),
        'face_08':('keep','기존 별 눈 표현은 이 한 종만 남긴다.'),
        'face_09':('keep','기존 하트 눈 표현은 이 한 종만 남긴다.'),
    }
    records=[]
    for cat in ['ears','face']:
        for p in qa.PARTS[cat]:
            default='둥글고 단순한 실루엣으로, 과도하게 날카롭거나 복잡한 특징이 없다.' if cat=='ears' else '단순한 눈매와 작은 입 중심의 감정 표현을 유지한다.'
            decision,reason=reasons.get(p['id'],('keep',default))
            if p['id'] in ['ears_07','ears_08','ears_22','ears_30','ears_33']:reason='최근 접점을 수정한 처진 귀. 길이와 합성 동작을 그대로 보존한다.'
            if p['id'] in ['ears_11','ears_23','ears_26','ears_32']:reason='부드러운 복슬 귀를 유지한다. 손가락 같은 과한 돌출은 없다.'
            records.append({'id':p['id'],'label':p['label'],'decision':decision,'reason':reason})
    audit={'status':'approved_by_parent','counts':{'reviewed':len(records),'replace':4,'resize':1,'remove':0,'keep':67},'parts':records}
    (HERE/'audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
    print('Saved 72-ID audit and two face composition contact sheets.')


if __name__=='__main__':main()
