// Personality test content: 4 axes x 2 questions, 16 result types, and how each axis
// narrows the part pools the character is drawn from. Part ids refer to parts.js.
window.QUIZ = {
  // axis: [first letter, second letter], labels shown as result tags
  axes: [
    { id: "EI", letters: ["E", "I"], tags: ["반짝반짝", "꼬물꼬물"] },
    { id: "SN", letters: ["S", "N"], tags: ["냠냠", "몽글몽글"] },
    { id: "TF", letters: ["T", "F"], tags: ["씩씩", "다정"] },
    { id: "JP", letters: ["J", "P"], tags: ["꼼꼼", "말랑말랑"] },
  ],

  // Each answer gives one point to a letter.
  questions: [
    { axis: "EI", q: "풀숲에서 처음 보는 친구를 만났다!", a: [["E", "먼저 손 흔들며 인사한다"], ["I", "풀 뒤에 숨어서 살짝 지켜본다"]] },
    { axis: "SN", q: "주머니에 동전이 생겼다!", a: [["S", "맛있는 주먹밥을 사 먹는다"], ["N", "반짝이는 별 모양 돌멩이를 산다"]] },
    { axis: "TF", q: "친구가 시험에 떨어져서 울고 있다", a: [["T", "다음엔 꼭 붙자! 같이 연습하자고 한다"], ["F", "꼭 안아 주고 같이 운다"]] },
    { axis: "JP", q: "내일은 소풍 가는 날!", a: [["J", "도시락 메뉴까지 미리 정해 둔다"], ["P", "내일 일은 내일의 내가 알아서!"]] },
    { axis: "EI", q: "기다리던 쉬는 날이다", a: [["E", "친구들을 불러서 피크닉!"], ["I", "이불 속에서 하루 종일 뒹굴뒹굴"]] },
    { axis: "SN", q: "몽실몽실한 구름을 보면…", a: [["S", "솜사탕처럼 맛있겠다…"], ["N", "저 구름 위엔 누가 살고 있을까?"]] },
    { axis: "TF", q: "앗, 커다란 괴물이 나타났다!", a: [["T", "용기를 내서 막대기를 든다"], ["F", "친구 손을 꼭 잡는다"]] },
    { axis: "JP", q: "내 방은 보통…", a: [["J", "늘 반듯반듯 정리되어 있다"], ["P", "어질러져 있어도 어디에 뭐가 있는지 다 안다"]] },
  ],

  types: {
    ESTJ: ["씩씩한 반장", "앞장서서 모두를 챙기는 든든한 친구. 도시락도 친구 몫까지 싸 와요."],
    ESTP: ["용감한 모험가", "궁금한 건 일단 해 봐야 직성이 풀려요. 넘어져도 금방 벌떡!"],
    ESFJ: ["다정한 살림꾼", "모두의 생일을 기억하는 따뜻한 친구. 간식 나눠 주기 대장이에요."],
    ESFP: ["신나는 분위기메이커", "등장만 해도 모두가 웃어요. 탬버린만 있으면 어디든 무대!"],
    ENTJ: ["반짝이는 대장", "큰 꿈을 향해 척척 계획을 세워요. 왕관이 잘 어울리는 타입."],
    ENTP: ["엉뚱한 발명가", "머릿속에 아이디어가 퐁퐁! 오늘도 이상한 걸 만들고 있어요."],
    ENFJ: ["응원단장", "친구가 힘들면 제일 먼저 달려가요. 말 한마디에 힘이 솟아요."],
    ENFP: ["몽글몽글 햇살", "호기심도 정도 많아요. 새 친구를 사귀는 데 1분이면 충분!"],
    ISTJ: ["꼼꼼한 성실이", "약속은 꼭 지키는 믿음직한 친구. 매일 같은 시간에 풀을 뽑아요."],
    ISTP: ["조용한 손재주꾼", "말은 적어도 뭐든 뚝딱 고쳐요. 혼자만의 시간도 좋아해요."],
    ISFJ: ["포근한 지킴이", "티 내지 않고 조용히 챙겨 주는 친구. 담요 같은 존재예요."],
    ISFP: ["말랑말랑 감성파", "작은 꽃 하나에도 감동하는 섬세한 친구. 그림 그리기를 좋아해요."],
    INTJ: ["생각 많은 전략가", "혼자 조용히 계획을 세우고 결국 해내요. 책 읽는 시간이 최고."],
    INTP: ["궁금한 꼬마 박사", "왜?를 백 번 묻는 탐구가. 별을 보며 생각에 잠기곤 해요."],
    INFJ: ["신비로운 꿈꾸미", "마음속 이야기가 깊은 친구. 가끔 미래를 아는 것 같아요."],
    INFP: ["꼬물꼬물 몽상가", "구름 위 세계를 상상하는 여린 친구. 울보지만 마음은 제일 커요."],
  },

  // Part pools per letter (numbers -> "<cat>_NN"). Letters of one axis pick the same category.
  pools: {
    face: { E: [2, 8, 9, 13, 16, 17], I: [1, 3, 5, 6, 14, 15], T: [7, 17, 18, 8], F: [9, 2, 3, 1] },
    prop: { S: [1, 2, 3, 6, 8, 9, 12, 13, 15, 16, 18], N: [4, 5, 7, 10, 11, 14, 17] },
    deco: { S: [1, 6, 11, 12, 13, 14, 15, 18], N: [3, 4, 5, 7, 9, 10, 16, 17] },
    ears: { T: [4, 5, 9, 10, 12, 13, 14, 17, 18], F: [1, 2, 3, 6, 7, 8, 11, 15, 16] },
    back: { T: [2, 3, 4, 5, 7, 9, 13, 15, 16], F: [1, 6, 8, 10, 11, 12, 14, 17] },
    body: { J: [1, 7, 8, 9, 12, 14, 15], P: [2, 3, 4, 6, 10, 11, 13, 16] },
  },
  // Chance that an optional category is worn, by the J/P letter (P = more stuff).
  wear: { J: { deco: 0.55, back: 0.4, prop: 0.8 }, P: { deco: 0.75, back: 0.7, prop: 0.9 } },

  // Birth month -> body color ("탄생 컬러") and season backgrounds.
  months: [
    null,
    ["#ffffff", "눈송이 화이트"], ["#ffdbe4", "딸기 우유"], ["#fff6e0", "찹쌀 크림"], ["#ffc9bd", "벚꽃 살구"],
    ["#d6f2e0", "새싹 민트"], ["#d6ecfb", "소다 하늘"], ["#fff0b8", "레몬 버터"], ["#ffdcc8", "복숭아"],
    ["#e6dcf7", "라벤더"], ["#ecdcc4", "밀크티"], ["#c9a58a", "군밤"], ["#e2e2e2", "구름 회색"],
  ],
  seasons: { spring: ["sakura", "meadow"], summer: ["beach", "meadow", "sunset"], autumn: ["sunset", "dusk"], winter: ["snow", "night"] },
  nightOwls: ["night", "room", "dusk"], // extra choices for I types

  nameSuffix: ["몽이", "콩이", "찌", "뽀", "링", "룽이", "미", "동이", "쪼", "롱이"],
};
