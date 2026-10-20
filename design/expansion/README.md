# 파츠 확장 기록

내장 `image_gen`으로 기존 에셋을 참조해 투명 배경의 4×4 시트를 생성했습니다. 원래의 둥근 실루엣, 거친 검은 선, 크림색 바탕과 분홍 볼을 유지합니다. 파츠를 각각 잘라 WebP로 변환하고 몸 색 마스크와 부착점을 계산했습니다.

## 생성 프롬프트와 원본

- 몸통: `body/prompt.txt`, `body/source-sheet.png`
- 기존 몸통 교체와 손 보정: `body/replacements-prompt.txt`, `body/replacements-hand-repair-prompt.txt`, 해당 `*-sheet.png`
- 귀: `ears/prompt-01.txt`, `ears/prompt-02.txt`, `ears/sheet-01.png`, `ears/sheet-02.png`
- 머리 장식: `deco/prompt-sheet-01.txt`, `deco/prompt-sheet-02.txt`, `deco/sheet-01.png`, `deco/sheet-02.png`
- 표정·소품·등/꼬리·추가 변형: 실제 프롬프트와 참조 경로는 `root-prompts.json`, 원본은 각 폴더의 `source-sheet.png`

## 런타임 반영

| 종류 | 최종 개수 | 추가 ID |
| --- | ---: | --- |
| 몸통 | 30 | body_17–31 |
| 귀 | 36 | ears_19–36 |
| 머리 장식 | 36 | deco_19–36 |
| 표정 | 36 | face_19–36 |
| 소품 | 36 | prop_19–36 |
| 등/꼬리 | 32 | back_18–33 |

ID 중간의 빈 번호는 기존 호환성을 위해 유지합니다. 공룡 꼬리 `back_16`은 제외했습니다. `parts.json`은 추가 파츠, `replacements.json`은 교체한 기존 ID의 메타데이터입니다. `tools/merge_parts.js`로 합칩니다.

몸통·귀·동기화되는 꼬리는 src/fill/line의 캔버스 크기를 맞추고 손 마스크도 몸통과 같은 크기로 유지합니다. 귀의 `root`는 실제 머리 접점이며, 처진 귀는 개별 `sink`, `rotation`, `offset`으로 아래쪽 윤곽이 머리 뒤에 숨지 않도록 붙입니다.

## 검수 자료

- `random-review-1.jpg`–`random-review-4.jpg`: 전체 파츠를 포함한 192개 실제 Canvas 합성
- `random-review.json`: 해당 조합의 파츠·색상·배경
- `review/replacement-bodies-summary.jpg`: 손·소품 위치를 고친 기존 몸통
- `review/clipping-before-after.jpg`: 4×4 셀 경계를 넘은 몸통 윤곽 복원
- `review/clipping-fix-report.json`: 복원 범위와 파일 검사 결과
- `ears/attachment-browser-review.jpg`: 처진 귀 3종을 기존·신규 몸통에 실제 Canvas로 합성한 결과
- `ears/attachment-browser-proof.png`: 해당 브라우저 검수 화면
- `ears/attachment-fixed-six-bodies.jpg`: 같은 구조의 기존 귀까지 포함한 5종·6몸통 검수
- `back/boundary-repair-review.jpg`: 꼬리·망토의 원본 외곽선 복원
- `saved-card-proof.png`: 실제 저장 버튼으로 만든 1080×1440 PNG
- `verification.json`: 최종 규격·흐름·조합 검사 결과와 캐시 버전
- 각 파츠 폴더의 contact/review/qa 이미지: 부착 크기와 조합별 시각 검수

생성 시트의 셀 경계를 그대로 자르지 않고 완전한 연결 요소를 복원합니다. 새 원본을 처리할 때도 검은 외곽선이 셀 바깥으로 이어지는지 확인해야 합니다. 런타임에서는 시트 대신 최적화된 `parts/` WebP만 불러옵니다.
