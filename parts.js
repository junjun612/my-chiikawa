// Part geometry uses original design pixels; optimized WebP rasters may be smaller.
// PART_ADJUST is preserved across asset updates.
window.PART_CATEGORIES = [
  {
    "id": "body",
    "label": "몸통",
    "required": true
  },
  {
    "id": "ears",
    "label": "귀",
    "required": false
  },
  {
    "id": "deco",
    "label": "머리 장식",
    "required": false
  },
  {
    "id": "face",
    "label": "표정",
    "required": true
  },
  {
    "id": "prop",
    "label": "소품",
    "required": false
  },
  {
    "id": "back",
    "label": "등/꼬리",
    "required": false
  }
];
window.PARTS = {
 "body": [
  {
   "id": "body_01",
   "label": "기본 모찌",
   "src": "parts/body/body_01.webp",
   "w": 674,
   "h": 619,
   "color": "#f9f5e9",
   "line": "parts/body/body_01_line.webp",
   "fill": "parts/body/body_01_fill.webp",
   "anchors": {
    "top": [
     338.5,
     5
    ],
    "headW": 565,
    "earL": [
     152.04999999999998,
     62,
     -15
    ],
    "earR": [
     524.95,
     56,
     16.1
    ],
    "prop": [
     338.5,
     414.08636660146783,
     220.8
    ],
    "face": [
     338.5,
     290.76,
     384.53999999999996
    ],
    "tail": [
     552.18,
     454.92
    ],
    "sideL": [
     120.08,
     260.36
    ],
    "sideR": [
     556.92,
     260.36
    ],
    "center": [
     338.5,
     309
    ],
    "H": 608,
    "W": 663
   },
   "arms": "parts/body/body_01_arms.webp"
  },
  {
   "id": "body_02",
   "label": "몽실",
   "src": "parts/body/body_02.webp",
   "w": 640,
   "h": 579,
   "color": "#fdf5de",
   "line": "parts/body/body_02_line.webp",
   "fill": "parts/body/body_02_fill.webp",
   "anchors": {
    "top": [
     315,
     17
    ],
    "headW": 530,
    "earL": [
     140.1,
     54,
     -10.6
    ],
    "earR": [
     489.9,
     61,
     13.7
    ],
    "prop": [
     315,
     396.1025081357686,
     202.4
    ],
    "face": [
     315,
     271.96,
     363.65999999999997
    ],
    "tail": [
     496.94,
     425.32
    ],
    "sideL": [
     108.64,
     243.56
    ],
    "sideR": [
     524.36,
     243.56
    ],
    "center": [
     315,
     289
    ],
    "H": 568,
    "W": 629
   },
   "arms": "parts/body/body_02_arms.webp"
  },
  {
   "id": "body_03",
   "label": "보송 털뭉치",
   "src": "parts/body/body_03.webp",
   "fill": "parts/body/body_03_fill.webp",
   "line": "parts/body/body_03_line.webp",
   "arms": "parts/body/body_03_arms.webp",
   "w": 303,
   "h": 282,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     152.5,
     6
    ],
    "headW": 248.46,
    "earL": [
     69.17,
     49,
     -15
    ],
    "earR": [
     235.82,
     49,
     15
    ],
    "prop": [
     150.03,
     192.12,
     62.13
    ],
    "face": [
     150.03,
     129.72,
     172.71
    ],
    "tail": [
     251.49,
     208.68
    ],
    "sideL": [
     51.51,
     121.26
    ],
    "sideR": [
     251.49,
     121.26
    ],
    "center": [
     151.5,
     141
    ],
    "H": 271,
    "W": 292
   },
   "sourceCell": 2
  },
  {
   "id": "body_04",
   "label": "구름 몽실",
   "src": "parts/body/body_04.webp",
   "w": 670,
   "h": 634,
   "color": "#fdf7e9",
   "line": "parts/body/body_04_line.webp",
   "fill": "parts/body/body_04_fill.webp",
   "anchors": {
    "top": [
     336,
     17
    ],
    "headW": 524,
    "earL": [
     163.07999999999998,
     60,
     -8
    ],
    "earR": [
     508.92,
     60,
     14.4
    ],
    "prop": [
     336,
     437.83621240324345,
     216
    ],
    "face": [
     336,
     297.81,
     374.09999999999997
    ],
    "tail": [
     532.74,
     466.02
    ],
    "sideL": [
     135.44,
     266.65999999999997
    ],
    "sideR": [
     532.56,
     266.65999999999997
    ],
    "center": [
     336,
     316.5
    ],
    "H": 623,
    "W": 659
   },
   "arms": "parts/body/body_04_arms.webp"
  },
  {
   "id": "body_06",
   "label": "볼빵빵",
   "src": "parts/body/body_06.webp",
   "w": 748,
   "h": 655,
   "color": "#fdf8e9",
   "line": "parts/body/body_06_line.webp",
   "fill": "parts/body/body_06_fill.webp",
   "anchors": {
    "top": [
     374,
     5
    ],
    "headW": 562,
    "earL": [
     188.54,
     69,
     -17.7
    ],
    "earR": [
     559.46,
     65,
     18.3
    ],
    "prop": [
     374,
     448.0101432935465,
     221.4
    ],
    "face": [
     374,
     307.68,
     416.44
    ],
    "tail": [
     563.68,
     481.56
    ],
    "sideL": [
     126.08,
     275.48
    ],
    "sideR": [
     622.92,
     275.48
    ],
    "center": [
     374,
     327
    ],
    "H": 644,
    "W": 738
   },
   "arms": "parts/body/body_06_arms.webp"
  },
  {
   "id": "body_07",
   "label": "우유 구름떡",
   "src": "parts/body/body_07.webp",
   "fill": "parts/body/body_07_fill.webp",
   "line": "parts/body/body_07_line.webp",
   "arms": "parts/body/body_07_arms.webp",
   "w": 304,
   "h": 279,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     158,
     5
    ],
    "headW": 249.28,
    "earL": [
     74.4,
     45,
     -15
    ],
    "earR": [
     241.6,
     57,
     15
    ],
    "prop": [
     146.02,
     192.6,
     71.67
    ],
    "face": [
     146.02,
     128.34,
     173.28
    ],
    "tail": [
     252.32,
     206.46
    ],
    "sideL": [
     51.68,
     119.97
    ],
    "sideR": [
     252.32,
     119.97
    ],
    "center": [
     152,
     139.5
    ],
    "H": 269,
    "W": 293
   },
   "sourceCell": 14
  },
  {
   "id": "body_08",
   "label": "하트 배",
   "src": "parts/body/body_08.webp",
   "w": 667,
   "h": 597,
   "color": "#fdf8ea",
   "line": "parts/body/body_08_line.webp",
   "fill": "parts/body/body_08_fill.webp",
   "anchors": {
    "top": [
     333.5,
     8
    ],
    "headW": 515,
    "earL": [
     163.54999999999998,
     52,
     -16.4
    ],
    "earR": [
     503.45000000000005,
     53,
     16.4
    ],
    "prop": [
     333.5,
     419.5165441176471,
     228
    ],
    "face": [
     333.5,
     280.41999999999996,
     376.41999999999996
    ],
    "tail": [
     537.16,
     438.64
    ],
    "sideL": [
     124.96000000000001,
     251.12
    ],
    "sideR": [
     539.04,
     251.12
    ],
    "center": [
     333.5,
     298
    ],
    "H": 586,
    "W": 656
   },
   "arms": "parts/body/body_08_arms.webp"
  },
  {
   "id": "body_09",
   "label": "밤색 머리",
   "src": "parts/body/body_09.webp",
   "w": 712,
   "h": 655,
   "color": "#c8a27f",
   "line": "parts/body/body_09_line.webp",
   "fill": "parts/body/body_09_fill.webp",
   "anchors": {
    "top": [
     355.5,
     8
    ],
    "headW": 587,
    "earL": [
     161.79,
     64,
     -20.2
    ],
    "earR": [
     549.21,
     60,
     20.6
    ],
    "prop": [
     355.5,
     436.9884580125643,
     212.8
    ],
    "face": [
     355.5,
     307.68,
     405.41999999999996
    ],
    "tail": [
     572.72,
     481.56
    ],
    "sideL": [
     122.32000000000001,
     275.48
    ],
    "sideR": [
     589.68,
     275.48
    ],
    "center": [
     355.5,
     327
    ],
    "H": 644,
    "W": 702
   },
   "arms": "parts/body/body_09_arms.webp"
  },
  {
   "id": "body_10",
   "label": "점박이",
   "src": "parts/body/body_10.webp",
   "w": 723,
   "h": 672,
   "color": "#c9a487",
   "line": "parts/body/body_10_line.webp",
   "fill": "parts/body/body_10_fill.webp",
   "anchors": {
    "top": [
     354,
     5
    ],
    "headW": 580,
    "earL": [
     162.6,
     62,
     -17.3
    ],
    "earR": [
     545.4,
     57,
     15.8
    ],
    "prop": [
     354,
     484.14409065433654,
     218.4
    ],
    "face": [
     354,
     316.14,
     409.47999999999996
    ],
    "tail": [
     596.3199999999999,
     494.88
    ],
    "sideL": [
     136.92000000000002,
     283.03999999999996
    ],
    "sideR": [
     585.08,
     283.03999999999996
    ],
    "center": [
     354,
     336
    ],
    "H": 662,
    "W": 712
   },
   "arms": "parts/body/body_10_arms.webp"
  },
  {
   "id": "body_11",
   "label": "줄무늬",
   "src": "parts/body/body_11.webp",
   "w": 750,
   "h": 679,
   "color": "#f8e9c6",
   "line": "parts/body/body_11_line.webp",
   "fill": "parts/body/body_11_fill.webp",
   "anchors": {
    "top": [
     374.5,
     5
    ],
    "headW": 565,
    "earL": [
     188.04999999999998,
     96,
     -18.3
    ],
    "earR": [
     560.95,
     95,
     18.1
    ],
    "prop": [
     374.5,
     458.5383967883596,
     233.60000000000002
    ],
    "face": [
     374.5,
     318.9,
     421.65999999999997
    ],
    "tail": [
     593.54,
     499.8
    ],
    "sideL": [
     138.24,
     285.4
    ],
    "sideR": [
     610.76,
     285.4
    ],
    "center": [
     374.5,
     339
    ],
    "H": 670,
    "W": 739
   },
   "arms": "parts/body/body_11_arms.webp"
  },
  {
   "id": "body_12",
   "label": "하트 밀크푸딩",
   "src": "parts/body/body_12.webp",
   "fill": "parts/body/body_12_fill.webp",
   "line": "parts/body/body_12_line.webp",
   "arms": "parts/body/body_12_arms.webp",
   "w": 302,
   "h": 274,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     152,
     5
    ],
    "headW": 247.64,
    "earL": [
     68.95,
     41,
     -15
    ],
    "earR": [
     235.05,
     40,
     15
    ],
    "prop": [
     148.5,
     185.01,
     68.34
    ],
    "face": [
     148.5,
     126.04,
     172.14
    ],
    "tail": [
     250.66,
     202.76
    ],
    "sideL": [
     51.34,
     117.82
    ],
    "sideR": [
     250.66,
     117.82
    ],
    "center": [
     151,
     137
    ],
    "H": 263,
    "W": 292
   },
   "sourceCell": 6
  },
  {
   "id": "body_13",
   "label": "양말 발",
   "src": "parts/body/body_13.webp",
   "w": 719,
   "h": 639,
   "color": "#fdf8e8",
   "line": "parts/body/body_13_line.webp",
   "fill": "parts/body/body_13_fill.webp",
   "anchors": {
    "top": [
     358,
     6
    ],
    "headW": 606,
    "earL": [
     158.01999999999998,
     54,
     -18.7
    ],
    "earR": [
     557.98,
     56,
     19.4
    ],
    "prop": [
     358,
     464.86594016565476,
     212.7
    ],
    "face": [
     358,
     300.15999999999997,
     407.15999999999997
    ],
    "tail": [
     571.74,
     469.71999999999997
    ],
    "sideL": [
     135.44,
     268.76
    ],
    "sideR": [
     590.56,
     268.76
    ],
    "center": [
     358,
     319
    ],
    "H": 628,
    "W": 709
   },
   "arms": "parts/body/body_13_arms.webp"
  },
  {
   "id": "body_14",
   "label": "흰 입가",
   "src": "parts/body/body_14.webp",
   "w": 700,
   "h": 719,
   "color": "#f9ce97",
   "line": "parts/body/body_14_line.webp",
   "fill": "parts/body/body_14_fill.webp",
   "anchors": {
    "top": [
     349.5,
     6
    ],
    "headW": 601,
    "earL": [
     151.17,
     68,
     -19.3
    ],
    "earR": [
     547.83,
     68,
     19.5
    ],
    "prop": [
     349.5,
     481.28406961472626,
     235.20000000000002
    ],
    "face": [
     349.5,
     338.22999999999996,
     400.2
    ],
    "tail": [
     573.26,
     529.66
    ],
    "sideL": [
     118.56,
     302.78
    ],
    "sideR": [
     581.44,
     302.78
    ],
    "center": [
     349.5,
     359.5
    ],
    "H": 709,
    "W": 691
   },
   "arms": "parts/body/body_14_arms.webp"
  },
  {
   "id": "body_15",
   "label": "달걀 몽실",
   "src": "parts/body/body_15.webp",
   "w": 604,
   "h": 687,
   "color": "#fef5dd",
   "line": "parts/body/body_15_line.webp",
   "fill": "parts/body/body_15_fill.webp",
   "anchors": {
    "top": [
     300.5,
     6
    ],
    "headW": 483,
    "earL": [
     141.10999999999999,
     66,
     -19.8
    ],
    "earR": [
     459.89,
     64,
     20.2
    ],
    "prop": [
     300.5,
     473.90141173358035,
     212
    ],
    "face": [
     300.5,
     323.19,
     326.53999999999996
    ],
    "tail": [
     498.98,
     505.98
    ],
    "sideL": [
     116.88,
     289.34
    ],
    "sideR": [
     485.12,
     289.34
    ],
    "center": [
     300.5,
     343.5
    ],
    "H": 677,
    "W": 593
   },
   "arms": "parts/body/body_15_arms.webp"
  },
  {
   "id": "body_16",
   "label": "몽실 구름배",
   "src": "parts/body/body_16.webp",
   "fill": "parts/body/body_16_fill.webp",
   "line": "parts/body/body_16_line.webp",
   "arms": "parts/body/body_16_arms.webp",
   "w": 305,
   "h": 294,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     147.5,
     5
    ],
    "headW": 250.1,
    "earL": [
     63.62,
     68,
     -15
    ],
    "earR": [
     231.38,
     56,
     15
    ],
    "prop": [
     150.24,
     203.76,
     71.96
    ],
    "face": [
     150.24,
     135.24,
     173.85
    ],
    "tail": [
     253.15,
     217.56
    ],
    "sideL": [
     51.85,
     126.42
    ],
    "sideR": [
     253.15,
     126.42
    ],
    "center": [
     152.5,
     147
    ],
    "H": 284,
    "W": 294
   },
   "sourceCell": 11
  },
  {
   "id": "body_17",
   "label": "동글 우유",
   "src": "parts/body/body_17.webp",
   "fill": "parts/body/body_17_fill.webp",
   "line": "parts/body/body_17_line.webp",
   "arms": "parts/body/body_17_arms.webp",
   "w": 274,
   "h": 244,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     140.5,
     5
    ],
    "headW": 224.68,
    "earL": [
     65.15,
     26,
     -15
    ],
    "earR": [
     215.85,
     29,
     15
    ],
    "prop": [
     138.53,
     166.46,
     88.71
    ],
    "face": [
     138.53,
     112.24,
     156.18
    ],
    "tail": [
     227.42,
     180.56
    ],
    "sideL": [
     46.58,
     104.92
    ],
    "sideR": [
     227.42,
     104.92
    ],
    "center": [
     137,
     122
    ],
    "H": 234,
    "W": 263
   },
   "sourceCell": 1
  },
  {
   "id": "body_18",
   "label": "통통 볼살",
   "src": "parts/body/body_18.webp",
   "fill": "parts/body/body_18_fill.webp",
   "line": "parts/body/body_18_line.webp",
   "arms": "parts/body/body_18_arms.webp",
   "w": 297,
   "h": 252,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     151.5,
     6
    ],
    "headW": 243.54,
    "earL": [
     69.82,
     31,
     -15
    ],
    "earR": [
     233.18,
     34,
     15
    ],
    "prop": [
     146.32,
     173.77,
     88.84
    ],
    "face": [
     146.32,
     115.92,
     169.29
    ],
    "tail": [
     246.51,
     186.48
    ],
    "sideL": [
     50.49,
     108.36
    ],
    "sideR": [
     246.51,
     108.36
    ],
    "center": [
     148.5,
     126
    ],
    "H": 241,
    "W": 286
   },
   "sourceCell": 2
  },
  {
   "id": "body_19",
   "label": "몽글 식빵",
   "src": "parts/body/body_19.webp",
   "fill": "parts/body/body_19_fill.webp",
   "line": "parts/body/body_19_line.webp",
   "arms": "parts/body/body_19_arms.webp",
   "w": 265,
   "h": 245,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     135,
     6
    ],
    "headW": 217.3,
    "earL": [
     62.12,
     16,
     -15
    ],
    "earR": [
     207.88,
     17,
     15
    ],
    "prop": [
     133.39,
     167.33,
     86.87
    ],
    "face": [
     133.39,
     112.7,
     151.05
    ],
    "tail": [
     219.95,
     181.3
    ],
    "sideL": [
     45.05,
     105.35
    ],
    "sideR": [
     219.95,
     105.35
    ],
    "center": [
     132.5,
     122.5
    ],
    "H": 234,
    "W": 253
   },
   "sourceCell": 3
  },
  {
   "id": "body_20",
   "label": "말랑 찹쌀",
   "src": "parts/body/body_20.webp",
   "fill": "parts/body/body_20_fill.webp",
   "line": "parts/body/body_20_line.webp",
   "arms": "parts/body/body_20_arms.webp",
   "w": 298,
   "h": 237,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     156,
     6
    ],
    "headW": 244.36,
    "earL": [
     74.05,
     29,
     -15
    ],
    "earR": [
     237.95,
     31,
     15
    ],
    "prop": [
     147.37,
     160.66,
     95.01
    ],
    "face": [
     147.37,
     109.02,
     169.86
    ],
    "tail": [
     247.34,
     175.38
    ],
    "sideL": [
     50.66,
     101.91
    ],
    "sideR": [
     247.34,
     101.91
    ],
    "center": [
     149,
     118.5
    ],
    "H": 226,
    "W": 286
   },
   "sourceCell": 4
  },
  {
   "id": "body_21",
   "label": "배동글 모찌",
   "src": "parts/body/body_21.webp",
   "fill": "parts/body/body_21_fill.webp",
   "line": "parts/body/body_21_line.webp",
   "arms": "parts/body/body_21_arms.webp",
   "w": 289,
   "h": 260,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     149,
     5
    ],
    "headW": 202.3,
    "earL": [
     85.42,
     27,
     -15
    ],
    "earR": [
     212.58,
     31,
     15
    ],
    "prop": [
     144.89,
     181.59,
     94.1
    ],
    "face": [
     144.89,
     119.6,
     164.73
    ],
    "tail": [
     239.87,
     192.4
    ],
    "sideL": [
     49.13,
     111.8
    ],
    "sideR": [
     239.87,
     111.8
    ],
    "center": [
     144.5,
     130
    ],
    "H": 249,
    "W": 277
   },
   "sourceCell": 5
  },
  {
   "id": "body_22",
   "label": "구름 찹쌀",
   "src": "parts/body/body_22.webp",
   "fill": "parts/body/body_22_fill.webp",
   "line": "parts/body/body_22_line.webp",
   "arms": "parts/body/body_22_arms.webp",
   "w": 306,
   "h": 260,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     156.5,
     5
    ],
    "headW": 250.92,
    "earL": [
     72.35,
     38,
     -15
    ],
    "earR": [
     240.65,
     37,
     15
    ],
    "prop": [
     151.54,
     176.54,
     94.05
    ],
    "face": [
     151.54,
     119.6,
     174.42
    ],
    "tail": [
     253.98,
     192.4
    ],
    "sideL": [
     52.02,
     111.8
    ],
    "sideR": [
     253.98,
     111.8
    ],
    "center": [
     153,
     130
    ],
    "H": 250,
    "W": 294
   },
   "sourceCell": 6
  },
  {
   "id": "body_23",
   "label": "포근 주먹밥",
   "src": "parts/body/body_23.webp",
   "fill": "parts/body/body_23_fill.webp",
   "line": "parts/body/body_23_line.webp",
   "arms": "parts/body/body_23_arms.webp",
   "w": 292,
   "h": 246,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     148.5,
     5
    ],
    "headW": 239.44,
    "earL": [
     68.2,
     37,
     -15
    ],
    "earR": [
     228.8,
     42,
     15
    ],
    "prop": [
     145.2,
     165.13,
     92.82
    ],
    "face": [
     145.2,
     113.16,
     166.44
    ],
    "tail": [
     242.36,
     182.04
    ],
    "sideL": [
     49.64,
     105.78
    ],
    "sideR": [
     242.36,
     105.78
    ],
    "center": [
     146,
     123
    ],
    "H": 236,
    "W": 281
   },
   "sourceCell": 7
  },
  {
   "id": "body_24",
   "label": "하얀 마시멜로",
   "src": "parts/body/body_24.webp",
   "fill": "parts/body/body_24_fill.webp",
   "line": "parts/body/body_24_line.webp",
   "arms": "parts/body/body_24_arms.webp",
   "w": 287,
   "h": 247,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     145,
     6
    ],
    "headW": 235.34,
    "earL": [
     66.07,
     25,
     -15
    ],
    "earR": [
     223.93,
     25,
     15
    ],
    "prop": [
     141.37,
     167.24,
     96.12
    ],
    "face": [
     141.37,
     113.62,
     163.59
    ],
    "tail": [
     238.21,
     182.78
    ],
    "sideL": [
     48.79,
     106.21
    ],
    "sideR": [
     238.21,
     106.21
    ],
    "center": [
     143.5,
     123.5
    ],
    "H": 236,
    "W": 275
   },
   "sourceCell": 8
  },
  {
   "id": "body_25",
   "label": "갸우뚱 모찌",
   "src": "parts/body/body_25.webp",
   "fill": "parts/body/body_25_fill.webp",
   "line": "parts/body/body_25_line.webp",
   "arms": "parts/body/body_25_arms.webp",
   "w": 282,
   "h": 255,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     141.5,
     6
    ],
    "headW": 231.24,
    "earL": [
     63.95,
     30,
     -15
    ],
    "earR": [
     219.05,
     32,
     15
    ],
    "prop": [
     160.55,
     164.08,
     84.54
    ],
    "face": [
     160.55,
     117.3,
     160.74
    ],
    "tail": [
     234.06,
     188.7
    ],
    "sideL": [
     47.94,
     109.65
    ],
    "sideR": [
     234.06,
     109.65
    ],
    "center": [
     141,
     127.5
    ],
    "H": 244,
    "W": 270
   },
   "sourceCell": 9
  },
  {
   "id": "body_26",
   "label": "밀크 푸딩",
   "src": "parts/body/body_26.webp",
   "fill": "parts/body/body_26_fill.webp",
   "line": "parts/body/body_26_line.webp",
   "arms": "parts/body/body_26_arms.webp",
   "w": 287,
   "h": 252,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     149.5,
     6
    ],
    "headW": 235.34,
    "earL": [
     70.57,
     27,
     -15
    ],
    "earR": [
     228.43,
     28,
     15
    ],
    "prop": [
     144.45,
     168.84,
     92.15
    ],
    "face": [
     144.45,
     115.92,
     163.59
    ],
    "tail": [
     238.21,
     186.48
    ],
    "sideL": [
     48.79,
     108.36
    ],
    "sideR": [
     238.21,
     108.36
    ],
    "center": [
     143.5,
     126
    ],
    "H": 241,
    "W": 276
   },
   "sourceCell": 10
  },
  {
   "id": "body_27",
   "label": "보송 솜뭉치",
   "src": "parts/body/body_27.webp",
   "fill": "parts/body/body_27_fill.webp",
   "line": "parts/body/body_27_line.webp",
   "arms": "parts/body/body_27_arms.webp",
   "w": 295,
   "h": 265,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     135.7,
     6
    ],
    "headW": 241.9,
    "earL": [
     54.58,
     44,
     -15
    ],
    "earR": [
     216.83,
     33,
     15
    ],
    "prop": [
     152.35,
     179.41,
     93.3
    ],
    "face": [
     152.35,
     121.9,
     168.15
    ],
    "tail": [
     244.85,
     196.1
    ],
    "sideL": [
     50.15,
     113.95
    ],
    "sideR": [
     244.85,
     113.95
    ],
    "center": [
     147.5,
     132.5
    ],
    "H": 254,
    "W": 283
   },
   "sourceCell": 11
  },
  {
   "id": "body_28",
   "label": "둥근 우유떡",
   "src": "parts/body/body_28.webp",
   "fill": "parts/body/body_28_fill.webp",
   "line": "parts/body/body_28_line.webp",
   "arms": "parts/body/body_28_arms.webp",
   "w": 285,
   "h": 238,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     144.5,
     6
    ],
    "headW": 233.7,
    "earL": [
     66.12,
     32,
     -15
    ],
    "earR": [
     222.88,
     33,
     15
    ],
    "prop": [
     137.76,
     156.32,
     90.09
    ],
    "face": [
     137.76,
     109.48,
     162.45
    ],
    "tail": [
     236.55,
     176.12
    ],
    "sideL": [
     48.45,
     102.34
    ],
    "sideR": [
     236.55,
     102.34
    ],
    "center": [
     142.5,
     119
    ],
    "H": 227,
    "W": 275
   },
   "sourceCell": 12
  },
  {
   "id": "body_29",
   "label": "감자 모찌",
   "src": "parts/body/body_29.webp",
   "fill": "parts/body/body_29_fill.webp",
   "line": "parts/body/body_29_line.webp",
   "arms": "parts/body/body_29_arms.webp",
   "w": 299,
   "h": 254,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     150.5,
     5
    ],
    "headW": 245.18,
    "earL": [
     68.27,
     34,
     -15
    ],
    "earR": [
     232.73,
     34,
     15
    ],
    "prop": [
     150.03,
     171.24,
     89.78
    ],
    "face": [
     150.03,
     116.84,
     170.43
    ],
    "tail": [
     248.17,
     187.96
    ],
    "sideL": [
     50.83,
     109.22
    ],
    "sideR": [
     248.17,
     109.22
    ],
    "center": [
     149.5,
     127
    ],
    "H": 243,
    "W": 287
   },
   "sourceCell": 13
  },
  {
   "id": "body_30",
   "label": "눈송이 모찌",
   "src": "parts/body/body_30.webp",
   "fill": "parts/body/body_30_fill.webp",
   "line": "parts/body/body_30_line.webp",
   "arms": "parts/body/body_30_arms.webp",
   "w": 276,
   "h": 256,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     139,
     6
    ],
    "headW": 226.32,
    "earL": [
     63.1,
     31,
     -15
    ],
    "earR": [
     214.9,
     32,
     15
    ],
    "prop": [
     133.88,
     171.11,
     87.14
    ],
    "face": [
     133.88,
     117.76,
     157.32
    ],
    "tail": [
     229.08,
     189.44
    ],
    "sideL": [
     46.92,
     110.08
    ],
    "sideR": [
     229.08,
     110.08
    ],
    "center": [
     138,
     128
    ],
    "H": 244,
    "W": 265
   },
   "sourceCell": 15
  },
  {
   "id": "body_31",
   "label": "몽실 우유떡",
   "src": "parts/body/body_31.webp",
   "fill": "parts/body/body_31_fill.webp",
   "line": "parts/body/body_31_line.webp",
   "arms": "parts/body/body_31_arms.webp",
   "w": 302,
   "h": 257,
   "color": "#fff9eb",
   "anchors": {
    "top": [
     144.5,
     5
    ],
    "headW": 247.64,
    "earL": [
     61.45,
     49,
     -15
    ],
    "earR": [
     227.55,
     31,
     15
    ],
    "prop": [
     151.63,
     174.13,
     90.13
    ],
    "face": [
     151.63,
     118.22,
     172.14
    ],
    "tail": [
     250.66,
     190.18
    ],
    "sideL": [
     51.34,
     110.51
    ],
    "sideR": [
     250.66,
     110.51
    ],
    "center": [
     151,
     128.5
    ],
    "H": 247,
    "W": 291
   },
   "sourceCell": 16
  }
 ],
 "ears": [
  {
   "id": "ears_01",
   "label": "곰",
   "src": "parts/ears/ears_01.webp",
   "w": 288,
   "h": 104,
   "color": "#ffffff",
   "line": "parts/ears/ears_01_line.webp",
   "fill": "parts/ears/ears_01_fill.webp",
   "L": {
    "src": "parts/ears/ears_01_L.webp",
    "w": 111,
    "h": 103,
    "color": "#ffffff",
    "line": "parts/ears/ears_01_L_line.webp",
    "fill": "parts/ears/ears_01_L_fill.webp",
    "root": [
     55,
     97
    ]
   },
   "R": {
    "src": "parts/ears/ears_01_R.webp",
    "w": 111,
    "h": 102,
    "color": "#ffffff",
    "line": "parts/ears/ears_01_R_line.webp",
    "fill": "parts/ears/ears_01_R_fill.webp",
    "root": [
     55,
     96
    ]
   }
  },
  {
   "id": "ears_02",
   "label": "햄스터",
   "src": "parts/ears/ears_02.webp",
   "w": 293,
   "h": 111,
   "color": "#fef8e8",
   "line": "parts/ears/ears_02_line.webp",
   "fill": "parts/ears/ears_02_fill.webp",
   "L": {
    "src": "parts/ears/ears_02_L.webp",
    "w": 114,
    "h": 111,
    "color": "#fef8e8",
    "line": "parts/ears/ears_02_L_line.webp",
    "fill": "parts/ears/ears_02_L_fill.webp",
    "root": [
     57,
     105
    ]
   },
   "R": {
    "src": "parts/ears/ears_02_R.webp",
    "w": 115,
    "h": 110,
    "color": "#fef8e7",
    "line": "parts/ears/ears_02_R_line.webp",
    "fill": "parts/ears/ears_02_R_fill.webp",
    "root": [
     57,
     104
    ]
   }
  },
  {
   "id": "ears_03",
   "label": "토끼",
   "src": "parts/ears/ears_03.webp",
   "w": 229,
   "h": 215,
   "color": "#fef8e0",
   "line": "parts/ears/ears_03_line.webp",
   "fill": "parts/ears/ears_03_fill.webp",
   "L": {
    "src": "parts/ears/ears_03_L.webp",
    "w": 96,
    "h": 213,
    "color": "#fef8e0",
    "line": "parts/ears/ears_03_L_line.webp",
    "fill": "parts/ears/ears_03_L_fill.webp",
    "root": [
     47.5,
     208
    ]
   },
   "R": {
    "src": "parts/ears/ears_03_R.webp",
    "w": 95,
    "h": 215,
    "color": "#fef9e7",
    "line": "parts/ears/ears_03_R_line.webp",
    "fill": "parts/ears/ears_03_R_fill.webp",
    "root": [
     46.5,
     209
    ]
   }
  },
  {
   "id": "ears_04",
   "label": "고양이",
   "src": "parts/ears/ears_04.webp",
   "w": 295,
   "h": 114,
   "color": "#ffffff",
   "line": "parts/ears/ears_04_line.webp",
   "fill": "parts/ears/ears_04_fill.webp",
   "L": {
    "src": "parts/ears/ears_04_L.webp",
    "w": 113,
    "h": 114,
    "color": "#ffffff",
    "line": "parts/ears/ears_04_L_line.webp",
    "fill": "parts/ears/ears_04_L_fill.webp",
    "root": [
     56.5,
     108
    ]
   },
   "R": {
    "src": "parts/ears/ears_04_R.webp",
    "w": 112,
    "h": 112,
    "color": "#ffffff",
    "line": "parts/ears/ears_04_R_line.webp",
    "fill": "parts/ears/ears_04_R_fill.webp",
    "root": [
     56,
     106
    ]
   }
  },
  {
   "id": "ears_05",
   "label": "여우",
   "src": "parts/ears/ears_05.webp",
   "w": 317,
   "h": 141,
   "color": "#febe7d",
   "line": "parts/ears/ears_05_line.webp",
   "fill": "parts/ears/ears_05_fill.webp",
   "L": {
    "src": "parts/ears/ears_05_L.webp",
    "w": 137,
    "h": 141,
    "color": "#febe7d",
    "line": "parts/ears/ears_05_L_line.webp",
    "fill": "parts/ears/ears_05_L_fill.webp",
    "root": [
     68,
     135
    ]
   },
   "R": {
    "src": "parts/ears/ears_05_R.webp",
    "w": 135,
    "h": 139,
    "color": "#febe7d",
    "line": "parts/ears/ears_05_R_line.webp",
    "fill": "parts/ears/ears_05_R_fill.webp",
    "root": [
     66.5,
     133
    ]
   }
  },
  {
   "id": "ears_06",
   "label": "쥐",
   "src": "parts/ears/ears_06.webp",
   "w": 360,
   "h": 158,
   "color": "#ddddde",
   "line": "parts/ears/ears_06_line.webp",
   "fill": "parts/ears/ears_06_fill.webp",
   "L": {
    "src": "parts/ears/ears_06_L.webp",
    "w": 158,
    "h": 157,
    "color": "#dddddd",
    "line": "parts/ears/ears_06_L_line.webp",
    "fill": "parts/ears/ears_06_L_fill.webp",
    "root": [
     78.5,
     151
    ]
   },
   "R": {
    "src": "parts/ears/ears_06_R.webp",
    "w": 158,
    "h": 157,
    "color": "#dedede",
    "line": "parts/ears/ears_06_R_line.webp",
    "fill": "parts/ears/ears_06_R_fill.webp",
    "root": [
     78,
     151
    ]
   }
  },
  {
   "id": "ears_07",
   "label": "돼지",
   "src": "parts/ears/ears_07.webp",
   "w": 324,
   "h": 118,
   "color": "#fed4d3",
   "line": "parts/ears/ears_07_line.webp",
   "fill": "parts/ears/ears_07_fill.webp",
   "L": {
    "src": "parts/ears/ears_07_L.webp",
    "w": 130,
    "h": 118,
    "color": "#fed4d3",
    "line": "parts/ears/ears_07_L_line.webp",
    "fill": "parts/ears/ears_07_L_fill.webp",
    "root": [
     109,
     66
    ],
    "sink": 0,
    "rotation": -15,
    "offset": [
     8,
     6
    ]
   },
   "R": {
    "src": "parts/ears/ears_07_R.webp",
    "w": 130,
    "h": 118,
    "color": "#fed4d3",
    "line": "parts/ears/ears_07_R_line.webp",
    "fill": "parts/ears/ears_07_R_fill.webp",
    "root": [
     22,
     67
    ],
    "sink": 0,
    "rotation": 15,
    "offset": [
     -8,
     6
    ]
   }
  },
  {
   "id": "ears_08",
   "label": "양",
   "src": "parts/ears/ears_08.webp",
   "w": 360,
   "h": 117,
   "color": "#f9e9d3",
   "line": "parts/ears/ears_08_line.webp",
   "fill": "parts/ears/ears_08_fill.webp",
   "L": {
    "src": "parts/ears/ears_08_L.webp",
    "w": 146,
    "h": 117,
    "color": "#f9e9d3",
    "line": "parts/ears/ears_08_L_line.webp",
    "fill": "parts/ears/ears_08_L_fill.webp",
    "root": [
     129,
     56
    ],
    "sink": 0,
    "rotation": 0,
    "offset": [
     8,
     6
    ]
   },
   "R": {
    "src": "parts/ears/ears_08_R.webp",
    "w": 146,
    "h": 117,
    "color": "#f9e9d2",
    "line": "parts/ears/ears_08_R_line.webp",
    "fill": "parts/ears/ears_08_R_fill.webp",
    "root": [
     17,
     56
    ],
    "sink": 0,
    "rotation": 0,
    "offset": [
     -8,
     6
    ]
   }
  },
  {
   "id": "ears_09",
   "label": "너구리",
   "src": "parts/ears/ears_09.webp",
   "w": 332,
   "h": 136,
   "color": "#fef6e7",
   "line": "parts/ears/ears_09_line.webp",
   "fill": "parts/ears/ears_09_fill.webp",
   "L": {
    "src": "parts/ears/ears_09_L.webp",
    "w": 136,
    "h": 132,
    "color": "#bda089",
    "tintRegion": "coat",
    "line": "parts/ears/ears_09_L_line.webp",
    "fill": "parts/ears/ears_09_L_fill.webp",
    "root": [
     67,
     126
    ]
   },
   "R": {
    "src": "parts/ears/ears_09_R.webp",
    "w": 136,
    "h": 135,
    "color": "#bda089",
    "tintRegion": "coat",
    "line": "parts/ears/ears_09_R_line.webp",
    "fill": "parts/ears/ears_09_R_fill.webp",
    "root": [
     67.5,
     129
    ]
   }
  },
  {
   "id": "ears_10",
   "label": "판다",
   "src": "parts/ears/ears_10.webp",
   "w": 307,
   "h": 115,
   "L": {
    "src": "parts/ears/ears_10_L.webp",
    "w": 121,
    "h": 112,
    "root": [
     60.5,
     107
    ]
   },
   "R": {
    "src": "parts/ears/ears_10_R.webp",
    "w": 121,
    "h": 115,
    "root": [
     60,
     110
    ]
   }
  },
  {
   "id": "ears_11",
   "label": "코알라",
   "src": "parts/ears/ears_11.webp",
   "w": 343,
   "h": 163,
   "color": "#d4d2d1",
   "line": "parts/ears/ears_11_line.webp",
   "fill": "parts/ears/ears_11_fill.webp",
   "L": {
    "src": "parts/ears/ears_11_L.webp",
    "w": 156,
    "h": 162,
    "color": "#d4d2d2",
    "line": "parts/ears/ears_11_L_line.webp",
    "fill": "parts/ears/ears_11_L_fill.webp",
    "root": [
     78,
     156
    ]
   },
   "R": {
    "src": "parts/ears/ears_11_R.webp",
    "w": 155,
    "h": 162,
    "color": "#d4d2d1",
    "line": "parts/ears/ears_11_R_line.webp",
    "fill": "parts/ears/ears_11_R_fill.webp",
    "root": [
     77,
     157
    ]
   }
  },
  {
   "id": "ears_12",
   "label": "아기 수달",
   "src": "parts/ears/ears_12.webp",
   "color": "#fbf5e2",
   "L": {
    "src": "parts/ears/ears_12_L.webp",
    "w": 113,
    "h": 115,
    "root": [
     56.5,
     111
    ],
    "color": "#fbf5e2",
    "fill": "parts/ears/ears_12_L_fill.webp",
    "line": "parts/ears/ears_12_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_12_R.webp",
    "w": 114,
    "h": 115,
    "root": [
     57,
     111
    ],
    "color": "#fbf5e2",
    "fill": "parts/ears/ears_12_R_fill.webp",
    "line": "parts/ears/ears_12_R_line.webp"
   },
   "w": 264,
   "h": 115,
   "fill": "parts/ears/ears_12_fill.webp",
   "line": "parts/ears/ears_12_line.webp"
  },
  {
   "id": "ears_13",
   "label": "박쥐",
   "src": "parts/ears/ears_13.webp",
   "w": 335,
   "h": 185,
   "color": "#fadef4",
   "line": "parts/ears/ears_13_line.webp",
   "fill": "parts/ears/ears_13_fill.webp",
   "L": {
    "src": "parts/ears/ears_13_L.webp",
    "w": 138,
    "h": 185,
    "color": "#fadef4",
    "line": "parts/ears/ears_13_L_line.webp",
    "fill": "parts/ears/ears_13_L_fill.webp",
    "root": [
     68,
     179
    ]
   },
   "R": {
    "src": "parts/ears/ears_13_R.webp",
    "w": 138,
    "h": 185,
    "color": "#fadef4",
    "line": "parts/ears/ears_13_R_line.webp",
    "fill": "parts/ears/ears_13_R_fill.webp",
    "root": [
     68.5,
     179
    ]
   }
  },
  {
   "id": "ears_14",
   "label": "사막여우",
   "src": "parts/ears/ears_14.webp",
   "w": 366,
   "h": 284,
   "color": "#fef6df",
   "line": "parts/ears/ears_14_line.webp",
   "fill": "parts/ears/ears_14_fill.webp",
   "L": {
    "src": "parts/ears/ears_14_L.webp",
    "w": 168,
    "h": 284,
    "color": "#fef6df",
    "line": "parts/ears/ears_14_L_line.webp",
    "fill": "parts/ears/ears_14_L_fill.webp",
    "root": [
     84,
     278
    ]
   },
   "R": {
    "src": "parts/ears/ears_14_R.webp",
    "w": 167,
    "h": 283,
    "color": "#fef6df",
    "line": "parts/ears/ears_14_R_line.webp",
    "fill": "parts/ears/ears_14_R_fill.webp",
    "root": [
     83.5,
     278
    ]
   }
  },
  {
   "id": "ears_15",
   "label": "짧은 토끼",
   "src": "parts/ears/ears_15.webp",
   "w": 226,
   "h": 138,
   "color": "#fefaeb",
   "line": "parts/ears/ears_15_line.webp",
   "fill": "parts/ears/ears_15_fill.webp",
   "L": {
    "src": "parts/ears/ears_15_L.webp",
    "w": 91,
    "h": 137,
    "color": "#fefaea",
    "line": "parts/ears/ears_15_L_line.webp",
    "fill": "parts/ears/ears_15_L_fill.webp",
    "root": [
     45,
     131
    ]
   },
   "R": {
    "src": "parts/ears/ears_15_R.webp",
    "w": 90,
    "h": 137,
    "color": "#fefaeb",
    "line": "parts/ears/ears_15_R_line.webp",
    "fill": "parts/ears/ears_15_R_fill.webp",
    "root": [
     44.5,
     132
    ]
   }
  },
  {
   "id": "ears_16",
   "label": "짝짝이 토끼",
   "src": "parts/ears/ears_16.webp",
   "w": 302,
   "h": 247,
   "color": "#fef1c6",
   "line": "parts/ears/ears_16_line.webp",
   "fill": "parts/ears/ears_16_fill.webp",
   "L": {
    "src": "parts/ears/ears_16_L.webp",
    "w": 111,
    "h": 244,
    "color": "#fef1c6",
    "line": "parts/ears/ears_16_L_line.webp",
    "fill": "parts/ears/ears_16_L_fill.webp",
    "root": [
     55.5,
     238
    ]
   },
   "R": {
    "src": "parts/ears/ears_16_R.webp",
    "w": 155,
    "h": 161,
    "color": "#fef1c6",
    "line": "parts/ears/ears_16_R_line.webp",
    "fill": "parts/ears/ears_16_R_fill.webp",
    "root": [
     76.5,
     155
    ]
   }
  },
  {
   "id": "ears_17",
   "label": "갈색 곰",
   "src": "parts/ears/ears_17.webp",
   "w": 315,
   "h": 124,
   "color": "#caa586",
   "line": "parts/ears/ears_17_line.webp",
   "fill": "parts/ears/ears_17_fill.webp",
   "L": {
    "src": "parts/ears/ears_17_L.webp",
    "w": 128,
    "h": 122,
    "color": "#cea98b",
    "line": "parts/ears/ears_17_L_line.webp",
    "fill": "parts/ears/ears_17_L_fill.webp",
    "root": [
     64,
     117
    ]
   },
   "R": {
    "src": "parts/ears/ears_17_R.webp",
    "w": 127,
    "h": 124,
    "color": "#cca687",
    "line": "parts/ears/ears_17_R_line.webp",
    "fill": "parts/ears/ears_17_R_fill.webp",
    "root": [
     63,
     118
    ]
   }
  },
  {
   "id": "ears_18",
   "label": "하늘 고양이",
   "src": "parts/ears/ears_18.webp",
   "w": 334,
   "h": 139,
   "color": "#c4e2f8",
   "line": "parts/ears/ears_18_line.webp",
   "fill": "parts/ears/ears_18_fill.webp",
   "L": {
    "src": "parts/ears/ears_18_L.webp",
    "w": 131,
    "h": 137,
    "color": "#c4e2f8",
    "line": "parts/ears/ears_18_L_line.webp",
    "fill": "parts/ears/ears_18_L_fill.webp",
    "root": [
     65,
     131
    ]
   },
   "R": {
    "src": "parts/ears/ears_18_R.webp",
    "w": 131,
    "h": 139,
    "color": "#c4e2f8",
    "line": "parts/ears/ears_18_R_line.webp",
    "fill": "parts/ears/ears_18_R_fill.webp",
    "root": [
     65,
     133
    ]
   }
  },
  {
   "id": "ears_19",
   "label": "솜사탕 곰",
   "src": "parts/ears/ears_19.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_19_L.webp",
    "w": 120,
    "h": 115,
    "root": [
     60,
     111
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_19_L_fill.webp",
    "line": "parts/ears/ears_19_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_19_R.webp",
    "w": 120,
    "h": 115,
    "root": [
     60,
     111
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_19_R_fill.webp",
    "line": "parts/ears/ears_19_R_line.webp"
   },
   "w": 277,
   "h": 115,
   "fill": "parts/ears/ears_19_fill.webp",
   "line": "parts/ears/ears_19_line.webp"
  },
  {
   "id": "ears_20",
   "label": "동글 아기 고양이",
   "src": "parts/ears/ears_20.webp",
   "color": "#fbf3dd",
   "L": {
    "src": "parts/ears/ears_20_L.webp",
    "w": 115,
    "h": 117,
    "root": [
     57.5,
     113
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_20_L_fill.webp",
    "line": "parts/ears/ears_20_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_20_R.webp",
    "w": 114,
    "h": 117,
    "root": [
     57,
     113
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_20_R_fill.webp",
    "line": "parts/ears/ears_20_R_line.webp"
   },
   "w": 266,
   "h": 117,
   "fill": "parts/ears/ears_20_fill.webp",
   "line": "parts/ears/ears_20_line.webp"
  },
  {
   "id": "ears_21",
   "label": "통통 토끼",
   "src": "parts/ears/ears_21.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_21_L.webp",
    "w": 103,
    "h": 160,
    "root": [
     51.5,
     156
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_21_L_fill.webp",
    "line": "parts/ears/ears_21_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_21_R.webp",
    "w": 102,
    "h": 160,
    "root": [
     51,
     156
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_21_R_fill.webp",
    "line": "parts/ears/ears_21_R_line.webp"
   },
   "w": 242,
   "h": 160,
   "fill": "parts/ears/ears_21_fill.webp",
   "line": "parts/ears/ears_21_line.webp"
  },
  {
   "id": "ears_22",
   "label": "말랑 강아지",
   "src": "parts/ears/ears_22.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_22_L.webp",
    "w": 124,
    "h": 128,
    "root": [
     110,
     44
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_22_L_fill.webp",
    "line": "parts/ears/ears_22_L_line.webp",
    "sink": 0,
    "rotation": 0,
    "offset": [
     8,
     6
    ]
   },
   "R": {
    "src": "parts/ears/ears_22_R.webp",
    "w": 125,
    "h": 127,
    "root": [
     14,
     44
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_22_R_fill.webp",
    "line": "parts/ears/ears_22_R_line.webp",
    "sink": 0,
    "rotation": 0,
    "offset": [
     -8,
     6
    ]
   },
   "w": 286,
   "h": 128,
   "fill": "parts/ears/ears_22_fill.webp",
   "line": "parts/ears/ears_22_line.webp"
  },
  {
   "id": "ears_23",
   "label": "폭신 아기 양",
   "src": "parts/ears/ears_23.webp",
   "color": "#fcf6e3",
   "L": {
    "src": "parts/ears/ears_23_L.webp",
    "w": 131,
    "h": 120,
    "root": [
     65.5,
     116
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_23_L_fill.webp",
    "line": "parts/ears/ears_23_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_23_R.webp",
    "w": 131,
    "h": 122,
    "root": [
     65.5,
     118
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_23_R_fill.webp",
    "line": "parts/ears/ears_23_R_line.webp"
   },
   "w": 299,
   "h": 122,
   "fill": "parts/ears/ears_23_fill.webp",
   "line": "parts/ears/ears_23_line.webp"
  },
  {
   "id": "ears_24",
   "label": "크림 여우",
   "src": "parts/ears/ears_24.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_24_L.webp",
    "w": 114,
    "h": 139,
    "root": [
     57,
     135
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_24_L_fill.webp",
    "line": "parts/ears/ears_24_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_24_R.webp",
    "w": 115,
    "h": 140,
    "root": [
     57.5,
     136
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_24_R_fill.webp",
    "line": "parts/ears/ears_24_R_line.webp"
   },
   "w": 266,
   "h": 140,
   "fill": "parts/ears/ears_24_fill.webp",
   "line": "parts/ears/ears_24_line.webp"
  },
  {
   "id": "ears_25",
   "label": "동글 생쥐",
   "src": "parts/ears/ears_25.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_25_L.webp",
    "w": 123,
    "h": 120,
    "root": [
     61.5,
     116
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_25_L_fill.webp",
    "line": "parts/ears/ears_25_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_25_R.webp",
    "w": 122,
    "h": 122,
    "root": [
     61,
     118
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_25_R_fill.webp",
    "line": "parts/ears/ears_25_R_line.webp"
   },
   "w": 282,
   "h": 122,
   "fill": "parts/ears/ears_25_fill.webp",
   "line": "parts/ears/ears_25_line.webp"
  },
  {
   "id": "ears_26",
   "label": "복슬 알파카",
   "src": "parts/ears/ears_26.webp",
   "color": "#fbf3dd",
   "L": {
    "src": "parts/ears/ears_26_L.webp",
    "w": 112,
    "h": 147,
    "root": [
     56,
     143
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_26_L_fill.webp",
    "line": "parts/ears/ears_26_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_26_R.webp",
    "w": 114,
    "h": 147,
    "root": [
     57,
     143
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_26_R_fill.webp",
    "line": "parts/ears/ears_26_R_line.webp"
   },
   "w": 263,
   "h": 147,
   "fill": "parts/ears/ears_26_fill.webp",
   "line": "parts/ears/ears_26_line.webp"
  },
  {
   "id": "ears_27",
   "label": "꾸벅 토끼",
   "src": "parts/ears/ears_27.webp",
   "color": "#fbf3dd",
   "L": {
    "src": "parts/ears/ears_27_L.webp",
    "w": 94,
    "h": 173,
    "root": [
     47,
     169
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_27_L_fill.webp",
    "line": "parts/ears/ears_27_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_27_R.webp",
    "w": 115,
    "h": 144,
    "root": [
     57.5,
     140
    ],
    "color": "#fbf3dd",
    "fill": "parts/ears/ears_27_R_fill.webp",
    "line": "parts/ears/ears_27_R_line.webp"
   },
   "w": 246,
   "h": 173,
   "fill": "parts/ears/ears_27_fill.webp",
   "line": "parts/ears/ears_27_line.webp"
  },
  {
   "id": "ears_28",
   "label": "살구 고양이",
   "src": "parts/ears/ears_28.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_28_L.webp",
    "w": 118,
    "h": 120,
    "root": [
     59,
     116
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_28_L_fill.webp",
    "line": "parts/ears/ears_28_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_28_R.webp",
    "w": 118,
    "h": 120,
    "root": [
     59,
     116
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_28_R_fill.webp",
    "line": "parts/ears/ears_28_R_line.webp"
   },
   "w": 273,
   "h": 120,
   "fill": "parts/ears/ears_28_fill.webp",
   "line": "parts/ears/ears_28_line.webp"
  },
  {
   "id": "ears_29",
   "label": "아기 양",
   "src": "parts/ears/ears_29.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_29_L.webp",
    "w": 132,
    "h": 110,
    "root": [
     66,
     106
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_29_L_fill.webp",
    "line": "parts/ears/ears_29_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_29_R.webp",
    "w": 132,
    "h": 110,
    "root": [
     66,
     106
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_29_R_fill.webp",
    "line": "parts/ears/ears_29_R_line.webp"
   },
   "w": 301,
   "h": 110,
   "fill": "parts/ears/ears_29_fill.webp",
   "line": "parts/ears/ears_29_line.webp"
  },
  {
   "id": "ears_30",
   "label": "코코 스패니얼",
   "src": "parts/ears/ears_30.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_30_L.webp",
    "w": 126,
    "h": 160,
    "root": [
     113,
     53
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_30_L_fill.webp",
    "line": "parts/ears/ears_30_L_line.webp",
    "sink": 0,
    "rotation": 0,
    "offset": [
     8,
     6
    ]
   },
   "R": {
    "src": "parts/ears/ears_30_R.webp",
    "w": 124,
    "h": 160,
    "root": [
     12,
     53
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_30_R_fill.webp",
    "line": "parts/ears/ears_30_R_line.webp",
    "sink": 0,
    "rotation": 0,
    "offset": [
     -8,
     6
    ]
   },
   "w": 287,
   "h": 160,
   "fill": "parts/ears/ears_30_fill.webp",
   "line": "parts/ears/ears_30_line.webp"
  },
  {
   "id": "ears_31",
   "label": "밤톨 다람쥐",
   "src": "parts/ears/ears_31.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_31_L.webp",
    "w": 116,
    "h": 127,
    "root": [
     58,
     123
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_31_L_fill.webp",
    "line": "parts/ears/ears_31_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_31_R.webp",
    "w": 114,
    "h": 127,
    "root": [
     57,
     123
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_31_R_fill.webp",
    "line": "parts/ears/ears_31_R_line.webp"
   },
   "w": 267,
   "h": 127,
   "fill": "parts/ears/ears_31_fill.webp",
   "line": "parts/ears/ears_31_line.webp"
  },
  {
   "id": "ears_32",
   "label": "구름 코알라",
   "src": "parts/ears/ears_32.webp",
   "color": "#fbf3de",
   "L": {
    "src": "parts/ears/ears_32_L.webp",
    "w": 126,
    "h": 126,
    "root": [
     63,
     122
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_32_L_fill.webp",
    "line": "parts/ears/ears_32_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_32_R.webp",
    "w": 127,
    "h": 127,
    "root": [
     63.5,
     123
    ],
    "color": "#fbf3de",
    "fill": "parts/ears/ears_32_R_fill.webp",
    "line": "parts/ears/ears_32_R_line.webp"
   },
   "w": 290,
   "h": 127,
   "fill": "parts/ears/ears_32_fill.webp",
   "line": "parts/ears/ears_32_line.webp"
  },
  {
   "id": "ears_33",
   "label": "졸린 멍멍이",
   "src": "parts/ears/ears_33.webp",
   "color": "#fcf6e3",
   "L": {
    "src": "parts/ears/ears_33_L.webp",
    "w": 125,
    "h": 117,
    "root": [
     104,
     66
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_33_L_fill.webp",
    "line": "parts/ears/ears_33_L_line.webp",
    "sink": 0,
    "rotation": -25,
    "offset": [
     8,
     6
    ]
   },
   "R": {
    "src": "parts/ears/ears_33_R.webp",
    "w": 122,
    "h": 117,
    "root": [
     18,
     66
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_33_R_fill.webp",
    "line": "parts/ears/ears_33_R_line.webp",
    "sink": 0,
    "rotation": 25,
    "offset": [
     -8,
     6
    ]
   },
   "w": 284,
   "h": 117,
   "fill": "parts/ears/ears_33_fill.webp",
   "line": "parts/ears/ears_33_line.webp"
  },
  {
   "id": "ears_34",
   "label": "폭 접힌 토끼",
   "src": "parts/ears/ears_34.webp",
   "color": "#fcf6e3",
   "L": {
    "src": "parts/ears/ears_34_L.webp",
    "w": 129,
    "h": 156,
    "root": [
     64.5,
     152
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_34_L_fill.webp",
    "line": "parts/ears/ears_34_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_34_R.webp",
    "w": 128,
    "h": 158,
    "root": [
     64,
     154
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_34_R_fill.webp",
    "line": "parts/ears/ears_34_R_line.webp"
   },
   "w": 294,
   "h": 158,
   "fill": "parts/ears/ears_34_fill.webp",
   "line": "parts/ears/ears_34_line.webp"
  },
  {
   "id": "ears_35",
   "label": "아기 사슴",
   "src": "parts/ears/ears_35.webp",
   "color": "#fcf5e3",
   "L": {
    "src": "parts/ears/ears_35_L.webp",
    "w": 111,
    "h": 162,
    "root": [
     55.5,
     158
    ],
    "color": "#fcf5e3",
    "fill": "parts/ears/ears_35_L_fill.webp",
    "line": "parts/ears/ears_35_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_35_R.webp",
    "w": 111,
    "h": 161,
    "root": [
     55.5,
     157
    ],
    "color": "#fcf5e3",
    "fill": "parts/ears/ears_35_R_fill.webp",
    "line": "parts/ears/ears_35_R_line.webp"
   },
   "w": 259,
   "h": 162,
   "fill": "parts/ears/ears_35_fill.webp",
   "line": "parts/ears/ears_35_line.webp"
  },
  {
   "id": "ears_36",
   "label": "아기 돼지",
   "src": "parts/ears/ears_36.webp",
   "color": "#fcf6e3",
   "L": {
    "src": "parts/ears/ears_36_L.webp",
    "w": 130,
    "h": 113,
    "root": [
     65,
     109
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_36_L_fill.webp",
    "line": "parts/ears/ears_36_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_36_R.webp",
    "w": 130,
    "h": 114,
    "root": [
     65,
     110
    ],
    "color": "#fcf6e3",
    "fill": "parts/ears/ears_36_R_fill.webp",
    "line": "parts/ears/ears_36_R_line.webp"
   },
   "w": 297,
   "h": 114,
   "fill": "parts/ears/ears_36_fill.webp",
   "line": "parts/ears/ears_36_line.webp"
  }
 ],
 "deco": [
  {
   "id": "deco_01",
   "label": "새싹",
   "kind": "top",
   "sink": 0.25,
   "src": "parts/deco/deco_01.webp",
   "w": 244,
   "h": 171
  },
  {
   "id": "deco_02",
   "label": "양털",
   "kind": "hat",
   "fit": 0.62,
   "bot": 0.16,
   "src": "parts/deco/deco_02.webp",
   "w": 332,
   "h": 190
  },
  {
   "id": "deco_03",
   "label": "분홍 리본",
   "kind": "side",
   "src": "parts/deco/deco_03.webp",
   "w": 251,
   "h": 184
  },
  {
   "id": "deco_04",
   "label": "파랑 리본",
   "kind": "side",
   "src": "parts/deco/deco_04.webp",
   "w": 257,
   "h": 183
  },
  {
   "id": "deco_05",
   "label": "왕관",
   "kind": "top",
   "sink": 0.3,
   "src": "parts/deco/deco_05.webp",
   "w": 204,
   "h": 152
  },
  {
   "id": "deco_06",
   "label": "분홍 수면 모자",
   "kind": "hat",
   "fit": 0.85,
   "bot": 0.18,
   "src": "parts/deco/deco_06.webp",
   "w": 220,
   "h": 147
  },
  {
   "id": "deco_07",
   "label": "꽃",
   "kind": "side",
   "src": "parts/deco/deco_07.webp",
   "w": 223,
   "h": 211
  },
  {
   "id": "deco_08",
   "label": "양 뿔",
   "kind": "pair",
   "src": "parts/deco/deco_08.webp",
   "w": 366,
   "h": 146,
   "L": {
    "src": "parts/deco/deco_08_L.webp",
    "w": 153,
    "h": 146,
    "root": [
     76.5,
     140
    ]
   },
   "R": {
    "src": "parts/deco/deco_08_R.webp",
    "w": 151,
    "h": 145,
    "root": [
     74.5,
     139
    ]
   }
  },
  {
   "id": "deco_09",
   "label": "깃털",
   "kind": "top",
   "sink": 0.2,
   "src": "parts/deco/deco_09.webp",
   "w": 250,
   "h": 233
  },
  {
   "id": "deco_10",
   "label": "바보털",
   "kind": "top",
   "sink": 0.2,
   "src": "parts/deco/deco_10.webp",
   "w": 124,
   "h": 182
  },
  {
   "id": "deco_11",
   "label": "비니",
   "kind": "hat",
   "fit": 0.9,
   "bot": 0.24,
   "src": "parts/deco/deco_11.webp",
   "w": 243,
   "h": 244
  },
  {
   "id": "deco_12",
   "label": "밀짚모자",
   "kind": "hat",
   "fit": 1.15,
   "bot": 0.2,
   "src": "parts/deco/deco_12.webp",
   "w": 311,
   "h": 176
  },
  {
   "id": "deco_13",
   "label": "요리사 모자",
   "kind": "hat",
   "fit": 0.62,
   "bot": 0.12,
   "src": "parts/deco/deco_13.webp",
   "w": 261,
   "h": 243
  },
  {
   "id": "deco_14",
   "label": "버섯",
   "kind": "hat",
   "fit": 0.95,
   "bot": 0.2,
   "src": "parts/deco/deco_14.webp",
   "w": 274,
   "h": 176
  },
  {
   "id": "deco_15",
   "label": "체리",
   "kind": "side",
   "src": "parts/deco/deco_15.webp",
   "w": 233,
   "h": 226
  },
  {
   "id": "deco_16",
   "label": "별 핀",
   "kind": "side",
   "src": "parts/deco/deco_16.webp",
   "w": 179,
   "h": 179
  },
  {
   "id": "deco_17",
   "label": "천사 링",
   "kind": "halo",
   "src": "parts/deco/deco_17.webp",
   "w": 261,
   "h": 127
  },
  {
   "id": "deco_18",
   "label": "단풍잎",
   "kind": "side",
   "src": "parts/deco/deco_18.webp",
   "w": 211,
   "h": 221
  },
  {
   "id": "deco_19",
   "label": "딸기 모자",
   "src": "parts/deco/deco_19.webp",
   "w": 220,
   "h": 193,
   "kind": "hat",
   "fit": 0.76,
   "bot": 0.18
  },
  {
   "id": "deco_20",
   "label": "푸딩 모자",
   "src": "parts/deco/deco_20.webp",
   "w": 210,
   "h": 183,
   "kind": "hat",
   "fit": 0.7,
   "bot": 0.16
  },
  {
   "id": "deco_21",
   "label": "데이지 핀",
   "src": "parts/deco/deco_21.webp",
   "w": 160,
   "h": 152,
   "kind": "side"
  },
  {
   "id": "deco_22",
   "label": "체크 리본",
   "src": "parts/deco/deco_22.webp",
   "w": 185,
   "h": 135,
   "kind": "side"
  },
  {
   "id": "deco_23",
   "label": "별 리본",
   "src": "parts/deco/deco_23.webp",
   "w": 180,
   "h": 136,
   "kind": "side"
  },
  {
   "id": "deco_24",
   "label": "튤립",
   "src": "parts/deco/deco_24.webp",
   "w": 152,
   "h": 185,
   "kind": "top",
   "sink": 0.22
  },
  {
   "id": "deco_25",
   "label": "수련 모자",
   "src": "parts/deco/deco_25.webp",
   "w": 220,
   "h": 160,
   "kind": "hat",
   "fit": 0.82,
   "bot": 0.18
  },
  {
   "id": "deco_26",
   "label": "라벤더 베레모",
   "src": "parts/deco/deco_26.webp",
   "w": 220,
   "h": 168,
   "kind": "hat",
   "fit": 0.82,
   "bot": 0.17
  },
  {
   "id": "deco_27",
   "label": "만두 모자",
   "src": "parts/deco/deco_27.webp",
   "w": 210,
   "h": 151,
   "kind": "hat",
   "fit": 0.73,
   "bot": 0.15
  },
  {
   "id": "deco_28",
   "label": "네잎클로버",
   "src": "parts/deco/deco_28.webp",
   "w": 161,
   "h": 175,
   "kind": "side"
  },
  {
   "id": "deco_29",
   "label": "초승달 핀",
   "src": "parts/deco/deco_29.webp",
   "w": 170,
   "h": 158,
   "kind": "side"
  },
  {
   "id": "deco_30",
   "label": "구름 핀",
   "src": "parts/deco/deco_30.webp",
   "w": 180,
   "h": 125,
   "kind": "side"
  },
  {
   "id": "deco_31",
   "label": "병아리",
   "src": "parts/deco/deco_31.webp",
   "w": 190,
   "h": 138,
   "kind": "top",
   "sink": 0.18
  },
  {
   "id": "deco_32",
   "label": "조개 핀",
   "src": "parts/deco/deco_32.webp",
   "w": 170,
   "h": 141,
   "kind": "side"
  },
  {
   "id": "deco_33",
   "label": "종이배 모자",
   "src": "parts/deco/deco_33.webp",
   "w": 220,
   "h": 147,
   "kind": "hat",
   "fit": 0.83,
   "bot": 0.16
  },
  {
   "id": "deco_34",
   "label": "도토리 모자",
   "src": "parts/deco/deco_34.webp",
   "w": 179,
   "h": 205,
   "kind": "hat",
   "fit": 0.65,
   "bot": 0.18
  },
  {
   "id": "deco_35",
   "label": "하트 간호 모자",
   "src": "parts/deco/deco_35.webp",
   "w": 220,
   "h": 151,
   "kind": "hat",
   "fit": 0.78,
   "bot": 0.16
  },
  {
   "id": "deco_36",
   "label": "살구 나비 핀",
   "src": "parts/deco/deco_36.webp",
   "w": 180,
   "h": 144,
   "kind": "side"
  }
 ],
 "face": [
  {
   "id": "face_01",
   "label": "기본",
   "src": "parts/face/face_01.webp",
   "w": 335,
   "h": 120,
   "cheeks": [
    [
     52.3,
     81.9,
     33.3
    ],
    [
     285.5,
     82,
     32.2
    ]
   ]
  },
  {
   "id": "face_02",
   "label": "행복",
   "src": "parts/face/face_02.webp",
   "w": 317,
   "h": 116,
   "cheeks": [
    [
     53.5,
     77.6,
     32.4
    ],
    [
     260.8,
     77.8,
     33.2
    ]
   ]
  },
  {
   "id": "face_03",
   "label": "울먹",
   "src": "parts/face/face_03.webp",
   "w": 336,
   "h": 158,
   "cheeks": [
    [
     44.5,
     83.9,
     28
    ],
    [
     291.8,
     83.7,
     28.6
    ]
   ]
  },
  {
   "id": "face_04",
   "label": "엉엉",
   "src": "parts/face/face_04.webp",
   "w": 360,
   "h": 178,
   "cheeks": [
    [
     105.3,
     99.5,
     33.2
    ],
    [
     260.6,
     100.2,
     33.2
    ]
   ]
  },
  {
   "id": "face_05",
   "label": "놀람",
   "src": "parts/face/face_05.webp",
   "w": 321,
   "h": 115,
   "cheeks": [
    [
     50.9,
     78.5,
     31.2
    ],
    [
     266.9,
     78,
     31
    ]
   ]
  },
  {
   "id": "face_06",
   "label": "졸림",
   "src": "parts/face/face_06.webp",
   "w": 321,
   "h": 134,
   "cheeks": [
    [
     50.2,
     70.1,
     31.5
    ],
    [
     273,
     66.6,
     29.9
    ]
   ]
  },
  {
   "id": "face_07",
   "label": "화남",
   "src": "parts/face/face_07.webp",
   "w": 336,
   "h": 143,
   "cheeks": [
    [
     51.2,
     105.6,
     32.3
    ],
    [
     286,
     104.2,
     31.8
    ]
   ]
  },
  {
   "id": "face_08",
   "label": "반짝",
   "src": "parts/face/face_08.webp",
   "w": 342,
   "h": 139,
   "cheeks": [
    [
     54.2,
     101.2,
     32.8
    ],
    [
     285.1,
     101.6,
     33.4
    ]
   ]
  },
  {
   "id": "face_09",
   "label": "하트",
   "src": "parts/face/face_09.webp",
   "w": 334,
   "h": 140,
   "cheeks": [
    [
     67.9,
     81.3,
     39.7
    ],
    [
     263.4,
     79.3,
     42
    ]
   ]
  },
  {
   "id": "face_10",
   "label": "어지러움",
   "src": "parts/face/face_10.webp",
   "w": 323,
   "h": 125,
   "cheeks": [
    [
     44.1,
     92,
     28.4
    ],
    [
     277.2,
     90.4,
     29.4
    ]
   ]
  },
  {
   "id": "face_11",
   "label": "충격",
   "src": "parts/face/face_11.webp",
   "w": 304,
   "h": 190,
   "cheeks": [
    [
     51.2,
     152.8,
     29.7
    ],
    [
     251.1,
     151.7,
     31
    ]
   ]
  },
  {
   "id": "face_12",
   "label": "냠냠",
   "src": "parts/face/face_12.webp",
   "w": 321,
   "h": 121,
   "cheeks": [
    [
     45.7,
     59.2,
     29.7
    ],
    [
     273.4,
     52.7,
     30.9
    ]
   ]
  },
  {
   "id": "face_13",
   "label": "윙크",
   "src": "parts/face/face_13.webp",
   "w": 324,
   "h": 116,
   "cheeks": [
    [
     47.4,
     71.5,
     29.2
    ],
    [
     267.6,
     71.5,
     30.9
    ]
   ]
  },
  {
   "id": "face_14",
   "label": "걱정",
   "src": "parts/face/face_14.webp",
   "w": 307,
   "h": 148,
   "cheeks": [
    [
     45.4,
     113.5,
     29.5
    ],
    [
     259.8,
     111.4,
     30.8
    ]
   ]
  },
  {
   "id": "face_15",
   "label": "멍",
   "src": "parts/face/face_15.webp",
   "w": 318,
   "h": 96,
   "cheeks": [
    [
     45.7,
     61.4,
     29.6
    ],
    [
     270.9,
     57.6,
     30.4
    ]
   ]
  },
  {
   "id": "face_16",
   "label": "깔깔",
   "src": "parts/face/face_16.webp",
   "w": 327,
   "h": 114,
   "cheeks": [
    [
     58.7,
     74,
     30.4
    ],
    [
     273.6,
     71.9,
     30.6
    ]
   ]
  },
  {
   "id": "face_17",
   "label": "의기양양",
   "src": "parts/face/face_17.webp",
   "w": 308,
   "h": 103,
   "cheeks": [
    [
     44.2,
     69.1,
     28.5
    ],
    [
     259.2,
     66.1,
     31.7
    ]
   ]
  },
  {
   "id": "face_18",
   "label": "결의",
   "src": "parts/face/face_18.webp",
   "w": 323,
   "h": 148,
   "cheeks": [
    [
     46.4,
     112.9,
     30.1
    ],
    [
     274.2,
     109.3,
     31.6
    ]
   ]
  },
  {
   "id": "face_19",
   "label": "빙긋",
   "src": "parts/face/face_19.webp",
   "w": 323,
   "h": 133.389,
   "cheeks": [
    [
     50.1,
     95.65,
     40.28
    ],
    [
     274.24,
     96.66,
     38.89
    ]
   ]
  },
  {
   "id": "face_20",
   "label": "두근",
   "src": "parts/face/face_20.webp",
   "w": 323,
   "h": 137.133,
   "cheeks": [
    [
     49.22,
     98.92,
     40.46
    ],
    [
     273.22,
     99.45,
     40.46
    ]
   ]
  },
  {
   "id": "face_21",
   "label": "수줍",
   "src": "parts/face/face_21.webp",
   "w": 323,
   "h": 122.831,
   "cheeks": [
    [
     49.68,
     85.33,
     40.12
    ],
    [
     272.53,
     85.13,
     40.6
    ]
   ]
  },
  {
   "id": "face_22",
   "label": "눈웃음",
   "src": "parts/face/face_22.webp",
   "w": 323,
   "h": 116.928,
   "cheeks": [
    [
     52,
     75.76,
     41.33
    ],
    [
     269.55,
     76.07,
     41.82
    ]
   ]
  },
  {
   "id": "face_23",
   "label": "우쭐",
   "src": "parts/face/face_23.webp",
   "w": 323,
   "h": 105.469,
   "cheeks": [
    [
     50.33,
     66.83,
     40.14
    ],
    [
     271.83,
     67.44,
     40.14
    ]
   ]
  },
  {
   "id": "face_24",
   "label": "오물오물",
   "src": "parts/face/face_24.webp",
   "w": 323,
   "h": 128.3,
   "cheeks": [
    [
     50.12,
     88.87,
     40.65
    ],
    [
     271.8,
     89.3,
     41.12
    ]
   ]
  },
  {
   "id": "face_25",
   "label": "졸꾸",
   "src": "parts/face/face_25.webp",
   "w": 323,
   "h": 109.933,
   "cheeks": [
    [
     51.61,
     70.92,
     40.94
    ],
    [
     270.59,
     69.17,
     41.41
    ]
   ]
  },
  {
   "id": "face_26",
   "label": "볼콕",
   "src": "parts/face/face_26.webp",
   "w": 323,
   "h": 133.733,
   "cheeks": [
    [
     51.04,
     95.37,
     41.89
    ],
    [
     270.41,
     94.11,
     41.89
    ]
   ]
  },
  {
   "id": "face_27",
   "label": "설렘",
   "src": "parts/face/face_27.webp",
   "w": 323,
   "h": 130.067,
   "cheeks": [
    [
     48.9,
     90.18,
     40.06
    ],
    [
     272.74,
     92.15,
     39.61
    ]
   ]
  },
  {
   "id": "face_28",
   "label": "쿨쿨",
   "src": "parts/face/face_28.webp",
   "w": 323,
   "h": 110.293,
   "cheeks": [
    [
     50.98,
     70.24,
     40.65
    ],
    [
     270.91,
     69.04,
     40.65
    ]
   ]
  },
  {
   "id": "face_29",
   "label": "헤헤",
   "src": "parts/face/face_29.webp",
   "w": 323,
   "h": 126.049,
   "cheeks": [
    [
     51.39,
     87.02,
     41.12
    ],
    [
     271.56,
     87.51,
     41.6
    ]
   ]
  },
  {
   "id": "face_30",
   "label": "뽀뽀",
   "src": "parts/face/face_30.webp",
   "w": 323,
   "h": 130.574,
   "cheeks": [
    [
     50.94,
     91.71,
     40.89
    ],
    [
     270.68,
     89.91,
     41.85
    ]
   ]
  },
  {
   "id": "face_31",
   "label": "갸웃",
   "src": "parts/face/face_31.webp",
   "w": 323,
   "h": 135.883,
   "cheeks": [
    [
     51.27,
     96.57,
     41.17
    ],
    [
     270.2,
     96.78,
     41.63
    ]
   ]
  },
  {
   "id": "face_32",
   "label": "뿌듯",
   "src": "parts/face/face_32.webp",
   "w": 323,
   "h": 110.997,
   "cheeks": [
    [
     50.97,
     72.27,
     40.56
    ],
    [
     270.82,
     72.27,
     41.02
    ]
   ]
  },
  {
   "id": "face_33",
   "label": "까꿍",
   "src": "parts/face/face_33.webp",
   "w": 323,
   "h": 133.846,
   "cheeks": [
    [
     48.88,
     96.43,
     40.42
    ],
    [
     272.19,
     95.23,
     41.35
    ]
   ]
  },
  {
   "id": "face_34",
   "label": "찡긋",
   "src": "parts/face/face_34.webp",
   "w": 323,
   "h": 138.592,
   "cheeks": [
    [
     51,
     99.42,
     40.89
    ],
    [
     270.63,
     98.2,
     41.37
    ]
   ]
  },
  {
   "id": "face_35",
   "label": "하트 콩눈",
   "src": "parts/face/face_35.webp",
   "w": 323,
   "h": 159.193,
   "cheeks": [
    [
     66.38,
     93.67,
     48.93
    ],
    [
     256.1,
     90.86,
     48.45
    ]
   ]
  },
  {
   "id": "face_36",
   "label": "콩눈 미소",
   "src": "parts/face/face_36.webp",
   "w": 323,
   "h": 157.989,
   "cheeks": [
    [
     52.17,
     119.21,
     42.27
    ],
    [
     269.69,
     118.4,
     41.78
    ]
   ]
  }
 ],
 "prop": [
  {
   "id": "prop_01",
   "label": "주먹밥",
   "src": "parts/prop/prop_01.webp",
   "w": 208,
   "h": 182
  },
  {
   "id": "prop_02",
   "label": "찻잔",
   "src": "parts/prop/prop_02.webp",
   "w": 222,
   "h": 164
  },
  {
   "id": "prop_03",
   "label": "도토리",
   "src": "parts/prop/prop_03.webp",
   "w": 160,
   "h": 191
  },
  {
   "id": "prop_04",
   "label": "별 지팡이",
   "src": "parts/prop/prop_04.webp",
   "w": 165,
   "h": 229
  },
  {
   "id": "prop_05",
   "label": "꽃다발",
   "src": "parts/prop/prop_05.webp",
   "w": 222,
   "h": 228
  },
  {
   "id": "prop_06",
   "label": "아이스크림",
   "src": "parts/prop/prop_06.webp",
   "w": 171,
   "h": 230
  },
  {
   "id": "prop_07",
   "label": "탬버린",
   "src": "parts/prop/prop_07.webp",
   "w": 245,
   "h": 212
  },
  {
   "id": "prop_08",
   "label": "푸딩",
   "src": "parts/prop/prop_08.webp",
   "w": 248,
   "h": 165
  },
  {
   "id": "prop_09",
   "label": "라멘",
   "src": "parts/prop/prop_09.webp",
   "w": 242,
   "h": 213
  },
  {
   "id": "prop_10",
   "label": "책",
   "src": "parts/prop/prop_10.webp",
   "w": 250,
   "h": 180
  },
  {
   "id": "prop_11",
   "label": "막대사탕",
   "src": "parts/prop/prop_11.webp",
   "w": 159,
   "h": 216
  },
  {
   "id": "prop_12",
   "label": "물고기",
   "src": "parts/prop/prop_12.webp",
   "w": 230,
   "h": 176
  },
  {
   "id": "prop_13",
   "label": "모종삽",
   "src": "parts/prop/prop_13.webp",
   "w": 186,
   "h": 207
  },
  {
   "id": "prop_14",
   "label": "고무오리",
   "src": "parts/prop/prop_14.webp",
   "w": 216,
   "h": 201
  },
  {
   "id": "prop_15",
   "label": "도넛",
   "src": "parts/prop/prop_15.webp",
   "w": 213,
   "h": 185
  },
  {
   "id": "prop_16",
   "label": "당근",
   "src": "parts/prop/prop_16.webp",
   "w": 212,
   "h": 237
  },
  {
   "id": "prop_17",
   "label": "편지",
   "src": "parts/prop/prop_17.webp",
   "w": 214,
   "h": 167
  },
  {
   "id": "prop_18",
   "label": "음료캔",
   "src": "parts/prop/prop_18.webp",
   "w": 153,
   "h": 211
  },
  {
   "id": "prop_19",
   "label": "딸기우유",
   "src": "parts/prop/prop_19.webp",
   "w": 235,
   "h": 245
  },
  {
   "id": "prop_20",
   "label": "별 쿠키",
   "src": "parts/prop/prop_20.webp",
   "w": 246,
   "h": 240
  },
  {
   "id": "prop_21",
   "label": "마카롱",
   "src": "parts/prop/prop_21.webp",
   "w": 251,
   "h": 208
  },
  {
   "id": "prop_22",
   "label": "붕어빵",
   "src": "parts/prop/prop_22.webp",
   "w": 253,
   "h": 197
  },
  {
   "id": "prop_23",
   "label": "롤케이크",
   "src": "parts/prop/prop_23.webp",
   "w": 258,
   "h": 247
  },
  {
   "id": "prop_24",
   "label": "멜론빵",
   "src": "parts/prop/prop_24.webp",
   "w": 271,
   "h": 220
  },
  {
   "id": "prop_25",
   "label": "찐만두",
   "src": "parts/prop/prop_25.webp",
   "w": 262,
   "h": 213
  },
  {
   "id": "prop_26",
   "label": "수박 조각",
   "src": "parts/prop/prop_26.webp",
   "w": 240,
   "h": 229
  },
  {
   "id": "prop_27",
   "label": "딸기 케이크",
   "src": "parts/prop/prop_27.webp",
   "w": 249,
   "h": 248
  },
  {
   "id": "prop_28",
   "label": "꿀단지",
   "src": "parts/prop/prop_28.webp",
   "w": 243,
   "h": 242
  },
  {
   "id": "prop_29",
   "label": "체리",
   "src": "parts/prop/prop_29.webp",
   "w": 258,
   "h": 231
  },
  {
   "id": "prop_30",
   "label": "튤립",
   "src": "parts/prop/prop_30.webp",
   "w": 216,
   "h": 240
  },
  {
   "id": "prop_31",
   "label": "미니 카메라",
   "src": "parts/prop/prop_31.webp",
   "w": 262,
   "h": 205
  },
  {
   "id": "prop_32",
   "label": "조개 진주",
   "src": "parts/prop/prop_32.webp",
   "w": 260,
   "h": 243
  },
  {
   "id": "prop_33",
   "label": "리본 선물",
   "src": "parts/prop/prop_33.webp",
   "w": 250,
   "h": 242
  },
  {
   "id": "prop_34",
   "label": "곰 인형",
   "src": "parts/prop/prop_34.webp",
   "w": 229,
   "h": 258
  },
  {
   "id": "prop_35",
   "label": "레몬 에이드",
   "src": "parts/prop/prop_35.webp",
   "w": 202,
   "h": 264
  },
  {
   "id": "prop_36",
   "label": "딸기 샌드",
   "src": "parts/prop/prop_36.webp",
   "w": 243,
   "h": 244
  }
 ],
 "back": [
  {
   "id": "back_01",
   "label": "방울 꼬리",
   "kind": "tail",
   "src": "parts/back/back_01.webp",
   "w": 138,
   "h": 137,
   "color": "#fefdf7",
   "line": "parts/back/back_01_line.webp",
   "fill": "parts/back/back_01_fill.webp",
   "root": [
    41,
    75
   ]
  },
  {
   "id": "back_02",
   "label": "다람쥐 꼬리",
   "kind": "tail",
   "src": "parts/back/back_02.webp",
   "w": 257,
   "h": 263,
   "color": "#facfa2",
   "line": "parts/back/back_02_line.webp",
   "fill": "parts/back/back_02_fill.webp",
   "root": [
    31,
    231
   ]
  },
  {
   "id": "back_03",
   "label": "여우 꼬리",
   "kind": "tail",
   "src": "parts/back/back_03.webp",
   "w": 236,
   "h": 246,
   "color": "#fec38b",
   "line": "parts/back/back_03_line.webp",
   "fill": "parts/back/back_03_fill.webp",
   "root": [
    28,
    209
   ]
  },
  {
   "id": "back_04",
   "label": "너구리 꼬리",
   "kind": "tail",
   "src": "parts/back/back_04.webp",
   "w": 176,
   "h": 149,
   "color": "#e9c7a4",
   "line": "parts/back/back_04_line.webp",
   "fill": "parts/back/back_04_fill.webp",
   "root": [
    14,
    74
   ]
  },
  {
   "id": "back_05",
   "label": "악마 꼬리",
   "kind": "tail",
   "src": "parts/back/back_05.webp",
   "w": 151,
   "h": 143,
   "root": [
    8,
    122
   ]
  },
  {
   "id": "back_06",
   "label": "천사 날개",
   "kind": "wings",
   "src": "parts/back/back_06.webp",
   "w": 354,
   "h": 155,
   "L": {
    "src": "parts/back/back_06_L.webp",
    "w": 122,
    "h": 155,
    "root": [
     116,
     86
    ]
   },
   "R": {
    "src": "parts/back/back_06_R.webp",
    "w": 122,
    "h": 155,
    "root": [
     6,
     82
    ]
   }
  },
  {
   "id": "back_07",
   "label": "박쥐 날개",
   "kind": "wings",
   "src": "parts/back/back_07.webp",
   "w": 363,
   "h": 127,
   "L": {
    "src": "parts/back/back_07_L.webp",
    "w": 138,
    "h": 127,
    "root": [
     132,
     76
    ]
   },
   "R": {
    "src": "parts/back/back_07_R.webp",
    "w": 138,
    "h": 127,
    "root": [
     5,
     76
    ]
   }
  },
  {
   "id": "back_08",
   "label": "요정 날개",
   "kind": "wings",
   "src": "parts/back/back_08.webp",
   "w": 331,
   "h": 166,
   "L": {
    "src": "parts/back/back_08_L.webp",
    "w": 125,
    "h": 166,
    "root": [
     116,
     120
    ]
   },
   "R": {
    "src": "parts/back/back_08_R.webp",
    "w": 124,
    "h": 166,
    "root": [
     8,
     122
    ]
   }
  },
  {
   "id": "back_09",
   "label": "사자 갈기",
   "kind": "around",
   "fit": 1.35,
   "src": "parts/back/back_09.webp",
   "w": 350,
   "h": 330
  },
  {
   "id": "back_10",
   "label": "구름 갈기",
   "kind": "around",
   "fit": 1.35,
   "src": "parts/back/back_10.webp",
   "w": 356,
   "h": 336
  },
  {
   "id": "back_11",
   "label": "해바라기",
   "kind": "around",
   "fit": 1.35,
   "src": "parts/back/back_11.webp",
   "w": 362,
   "h": 347
  },
  {
   "id": "back_12",
   "label": "하트 쿠션",
   "kind": "around",
   "fit": 1.25,
   "fy": 0.16,
   "src": "parts/back/back_12.webp",
   "w": 280,
   "h": 223
  },
  {
   "id": "back_13",
   "label": "망토",
   "kind": "around",
   "fit": 1.17,
   "fy": 0.48,
   "src": "parts/back/back_13.webp",
   "w": 364,
   "h": 232
  },
  {
   "id": "back_14",
   "label": "벌 날개",
   "kind": "wings",
   "src": "parts/back/back_14.webp",
   "w": 336,
   "h": 207,
   "L": {
    "src": "parts/back/back_14_L.webp",
    "w": 168,
    "h": 207,
    "root": [
     152,
     76
    ]
   },
   "R": {
    "src": "parts/back/back_14_R.webp",
    "w": 168,
    "h": 207,
    "root": [
     14,
     79
    ]
   }
  },
  {
   "id": "back_15",
   "label": "고양이 꼬리",
   "kind": "tail",
   "src": "parts/back/back_15.webp",
   "w": 224,
   "h": 332,
   "color": "#ffffff",
   "line": "parts/back/back_15_line.webp",
   "fill": "parts/back/back_15_fill.webp",
   "root": [
    34,
    315
   ]
  },
  {
   "id": "back_17",
   "label": "물고기 꼬리",
   "kind": "tail",
   "src": "parts/back/back_17.webp",
   "w": 263,
   "h": 220,
   "color": "#d3ecfd",
   "line": "parts/back/back_17_line.webp",
   "fill": "parts/back/back_17_fill.webp",
   "root": [
    32,
    26
   ]
  },
  {
   "id": "back_18",
   "label": "양털 방울 꼬리",
   "kind": "tail",
   "root": [
    29.7,
    145.2
   ],
   "src": "parts/back/back_18.webp",
   "w": 198,
   "h": 191,
   "fill": "parts/back/back_18_fill.webp",
   "line": "parts/back/back_18_line.webp",
   "color": "#fcfaf3"
  },
  {
   "id": "back_19",
   "label": "하트 솜 꼬리",
   "kind": "tail",
   "root": [
    29.7,
    141.4
   ],
   "src": "parts/back/back_19.webp",
   "w": 198,
   "h": 186,
   "fill": "parts/back/back_19_fill.webp",
   "line": "parts/back/back_19_line.webp",
   "color": "#fcfbf8"
  },
  {
   "id": "back_20",
   "label": "물방울 꼬리",
   "kind": "tail",
   "root": [
    23.8,
    161
   ],
   "src": "parts/back/back_20.webp",
   "w": 198,
   "h": 194,
   "fill": "parts/back/back_20_fill.webp",
   "line": "parts/back/back_20_line.webp",
   "color": "#fcf5e4"
  },
  {
   "id": "back_21",
   "label": "솜사탕 말림 꼬리",
   "kind": "tail",
   "root": [
    28.8,
    151.2
   ],
   "src": "parts/back/back_21.webp",
   "w": 192,
   "h": 199,
   "fill": "parts/back/back_21_fill.webp",
   "line": "parts/back/back_21_line.webp",
   "color": "#fcfbf6"
  },
  {
   "id": "back_22",
   "label": "하트 끝 꼬리",
   "kind": "tail",
   "root": [
    23.8,
    140.3
   ],
   "src": "parts/back/back_22.webp",
   "w": 198,
   "h": 169,
   "fill": "parts/back/back_22_fill.webp",
   "line": "parts/back/back_22_line.webp",
   "color": "#fcfbf6"
  },
  {
   "id": "back_23",
   "label": "별 끝 꼬리",
   "kind": "tail",
   "root": [
    23.8,
    163.5
   ],
   "src": "parts/back/back_23.webp",
   "w": 198,
   "h": 197,
   "fill": "parts/back/back_23_fill.webp",
   "line": "parts/back/back_23_line.webp",
   "color": "#fcfbf7"
  },
  {
   "id": "back_24",
   "label": "포근 여우 꼬리",
   "kind": "tail",
   "root": [
    23.8,
    155.2
   ],
   "src": "parts/back/back_24.webp",
   "w": 198,
   "h": 187,
   "fill": "parts/back/back_24_fill.webp",
   "line": "parts/back/back_24_line.webp",
   "color": "#fcecd5"
  },
  {
   "id": "back_25",
   "label": "짧은 줄무늬 꼬리",
   "kind": "tail",
   "root": [
    23.8,
    163.5
   ],
   "src": "parts/back/back_25.webp",
   "w": 198,
   "h": 197,
   "fill": "parts/back/back_25_fill.webp",
   "line": "parts/back/back_25_line.webp",
   "color": "#fcedd7"
  },
  {
   "id": "back_26",
   "label": "작은 천사 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_26_L.webp",
    "w": 125,
    "h": 130,
    "root": [
     119,
     80.6
    ],
    "fill": "parts/back/back_26_L_fill.webp",
    "line": "parts/back/back_26_L_line.webp",
    "color": "#fcfaf6"
   },
   "R": {
    "src": "parts/back/back_26_R.webp",
    "w": 123,
    "h": 130,
    "root": [
     6,
     80.6
    ],
    "fill": "parts/back/back_26_R_fill.webp",
    "line": "parts/back/back_26_R_line.webp",
    "color": "#fcfbf6"
   },
   "src": "parts/back/back_26.webp",
   "w": 290,
   "h": 130,
   "fill": "parts/back/back_26_fill.webp",
   "line": "parts/back/back_26_line.webp",
   "color": "#fcfbf6"
  },
  {
   "id": "back_27",
   "label": "동글 나비 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_27_L.webp",
    "w": 122,
    "h": 157,
    "root": [
     116,
     87.9
    ]
   },
   "R": {
    "src": "parts/back/back_27_R.webp",
    "w": 125,
    "h": 157,
    "root": [
     6,
     87.9
    ]
   },
   "src": "parts/back/back_27.webp",
   "w": 289,
   "h": 157
  },
  {
   "id": "back_28",
   "label": "구름 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_28_L.webp",
    "w": 123,
    "h": 117,
    "root": [
     117,
     72.5
    ],
    "fill": "parts/back/back_28_L_fill.webp",
    "line": "parts/back/back_28_L_line.webp",
    "color": "#fcfaf5"
   },
   "R": {
    "src": "parts/back/back_28_R.webp",
    "w": 125,
    "h": 117,
    "root": [
     6,
     72.5
    ],
    "fill": "parts/back/back_28_R_fill.webp",
    "line": "parts/back/back_28_R_line.webp",
    "color": "#fcfaf5"
   },
   "src": "parts/back/back_28.webp",
   "w": 290,
   "h": 117,
   "fill": "parts/back/back_28_fill.webp",
   "line": "parts/back/back_28_line.webp",
   "color": "#fcfaf5"
  },
  {
   "id": "back_29",
   "label": "꽃잎 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_29_L.webp",
    "w": 122,
    "h": 162,
    "root": [
     116,
     100.4
    ]
   },
   "R": {
    "src": "parts/back/back_29_R.webp",
    "w": 122,
    "h": 163,
    "root": [
     6,
     101.1
    ]
   },
   "src": "parts/back/back_29.webp",
   "w": 286,
   "h": 163
  },
  {
   "id": "back_30",
   "label": "동그란 구름 후드",
   "kind": "around",
   "fit": 1.23,
   "fy": 0.45,
   "src": "parts/back/back_30.webp",
   "w": 284,
   "h": 258
  },
  {
   "id": "back_31",
   "label": "벚꽃 후드",
   "kind": "around",
   "fit": 1.25,
   "fy": 0.45,
   "src": "parts/back/back_31.webp",
   "w": 284,
   "h": 275
  },
  {
   "id": "back_32",
   "label": "별 쿠션",
   "kind": "around",
   "fit": 1.26,
   "fy": 0.49,
   "src": "parts/back/back_32.webp",
   "w": 284,
   "h": 261
  },
  {
   "id": "back_33",
   "label": "미니 담요 망토",
   "kind": "around",
   "fit": 1.26,
   "fy": 0.53,
   "src": "parts/back/back_33.webp",
   "w": 284,
   "h": 196
  }
 ]
};
window.PART_ADJUST = {};
