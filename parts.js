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
   "label": "솜털 인사",
   "w": 254,
   "h": 260,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     131,
     4
    ],
    "headW": 188.16,
    "earL": [
     71.53,
     22,
     -9
    ],
    "earR": [
     191.82,
     23,
     21
    ],
    "face": [
     124.5,
     96.2,
     127.68,
     6
    ],
    "prop": [
     23,
     148.5,
     76.16,
     -12
    ],
    "tail": [
     170.67,
     218.4
    ],
    "sideL": [
     76.8,
     174.2
    ],
    "sideR": [
     166.2,
     174.2
    ],
    "center": [
     121.5,
     130
    ],
    "H": 252,
    "W": 246,
    "head": {
     "center": [
      124.5,
      89.8
     ],
     "w": 224,
     "h": 171.6,
     "rotation": 6,
     "crown": [
      131,
      4
     ]
    },
    "earScale": 0.93088,
    "propOffsets": {
     "prop_01": [
      -36,
      -22.32
     ],
     "prop_02": [
      -24,
      -14.88
     ],
     "prop_03": [
      -28,
      -17.36
     ],
     "prop_04": [
      -0.91,
      -35.45
     ],
     "prop_05": [
      -14.18,
      -31.87
     ],
     "prop_06": [
      -14.33,
      -32.6
     ],
     "prop_07": [
      -28,
      -17.36
     ],
     "prop_08": [
      -32,
      -19.84
     ],
     "prop_09": [
      -28,
      -17.36
     ],
     "prop_10": [
      -28,
      -17.36
     ],
     "prop_11": [
      1.96,
      -35.15
     ],
     "prop_12": [
      -28,
      -17.36
     ],
     "prop_13": [
      3.14,
      -34.63
     ],
     "prop_14": [
      -32,
      -19.84
     ],
     "prop_15": [
      -32,
      -19.84
     ],
     "prop_16": [
      -2.14,
      -30.16
     ],
     "prop_17": [
      -32,
      -19.84
     ],
     "prop_18": [
      -32,
      -19.84
     ],
     "prop_19": [
      -32,
      -19.84
     ],
     "prop_20": [
      -32,
      -19.84
     ],
     "prop_21": [
      -32,
      -19.84
     ],
     "prop_22": [
      -32,
      -19.84
     ],
     "prop_23": [
      -36,
      -22.32
     ],
     "prop_24": [
      -32,
      -19.84
     ],
     "prop_25": [
      -32,
      -19.84
     ],
     "prop_26": [
      -36,
      -22.32
     ],
     "prop_27": [
      -36,
      -22.32
     ],
     "prop_28": [
      -32,
      -19.84
     ],
     "prop_29": [
      -36,
      -22.32
     ],
     "prop_30": [
      -13.98,
      -30.94
     ],
     "prop_31": [
      -32,
      -19.84
     ],
     "prop_32": [
      -32,
      -19.84
     ],
     "prop_33": [
      -36,
      -22.32
     ],
     "prop_34": [
      -36,
      -22.32
     ],
     "prop_35": [
      -32,
      -19.84
     ],
     "prop_36": [
      -36,
      -22.32
     ]
    }
   },
   "sourceCell": 6,
   "gripRegions": [
    [
     4,
     126,
     42,
     171
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     124.5,
     89.8
    ],
    "width": 224,
    "height": 171.6,
    "angle": 6,
    "crown": [
     131,
     4
    ]
   },
   "src": "parts/body/body_17.webp",
   "line": "parts/body/body_17_line.webp",
   "fill": "parts/body/body_17_fill.webp",
   "arms": "parts/body/body_17_arms.webp",
   "gripSide": "left",
   "raisedHand": {
    "side": "left",
    "palm": [
     23,
     148.5
    ],
    "inkCenter": [
     20.83,
     148.06
    ]
   },
   "sourceEdit": "raised-hand-body17-fixed-source.png"
  },
  {
   "id": "body_19",
   "label": "살랑 인사",
   "w": 247,
   "h": 262,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     126,
     6
    ],
    "headW": 181.02,
    "earL": [
     48.57,
     33,
     -22
    ],
    "earR": [
     164.07,
     15,
     8
    ],
    "face": [
     114.75,
     94.32,
     122.83,
     -7
    ],
    "prop": [
     227,
     132,
     73.27,
     12
    ],
    "tail": [
     168.16,
     220.08
    ],
    "sideL": [
     69.48,
     175.54
    ],
    "sideR": [
     163.46,
     175.54
    ],
    "center": [
     116.47,
     131
    ],
    "H": 251,
    "W": 236,
    "head": {
     "center": [
      114.75,
      92.46
     ],
     "w": 215.5,
     "h": 172.92,
     "rotation": -7,
     "crown": [
      126,
      6
     ]
    },
    "earScale": 0.92094,
    "propOffsets": {
     "prop_01": [
      32,
      -19.84
     ],
     "prop_02": [
      28,
      -17.36
     ],
     "prop_03": [
      32,
      -19.84
     ],
     "prop_04": [
      27,
      -28.72
     ],
     "prop_05": [
      9.95,
      -29.37
     ],
     "prop_06": [
      14.09,
      -31.47
     ],
     "prop_07": [
      28,
      -17.36
     ],
     "prop_08": [
      28,
      -17.36
     ],
     "prop_09": [
      24,
      -14.88
     ],
     "prop_10": [
      28,
      -17.36
     ],
     "prop_11": [
      8.51,
      -31.52
     ],
     "prop_12": [
      28,
      -17.36
     ],
     "prop_13": [
      30.25,
      -26.41
     ],
     "prop_14": [
      28,
      -17.36
     ],
     "prop_15": [
      28,
      -17.36
     ],
     "prop_16": [
      23.86,
      -24.55
     ],
     "prop_17": [
      28,
      -17.36
     ],
     "prop_18": [
      28,
      -17.36
     ],
     "prop_19": [
      32,
      -19.84
     ],
     "prop_20": [
      28,
      -17.36
     ],
     "prop_21": [
      28,
      -17.36
     ],
     "prop_22": [
      28,
      -17.36
     ],
     "prop_23": [
      32,
      -19.84
     ],
     "prop_24": [
      28,
      -17.36
     ],
     "prop_25": [
      28,
      -17.36
     ],
     "prop_26": [
      32,
      -19.84
     ],
     "prop_27": [
      36,
      -22.32
     ],
     "prop_28": [
      32,
      -19.84
     ],
     "prop_29": [
      32,
      -19.84
     ],
     "prop_30": [
      13.75,
      -29.87
     ],
     "prop_31": [
      32,
      -19.84
     ],
     "prop_32": [
      28,
      -17.36
     ],
     "prop_33": [
      28,
      -17.36
     ],
     "prop_34": [
      28,
      -17.36
     ],
     "prop_35": [
      32,
      -19.84
     ],
     "prop_36": [
      32,
      -19.84
     ]
    }
   },
   "sourceCell": 1,
   "gripRegions": [
    [
     211,
     113,
     243,
     151
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     114.75,
     92.46
    ],
    "width": 215.5,
    "height": 172.92,
    "angle": -7,
    "crown": [
     126,
     6
    ]
   },
   "src": "parts/body/body_19.webp",
   "line": "parts/body/body_19_line.webp",
   "fill": "parts/body/body_19_fill.webp",
   "arms": "parts/body/body_19_arms.webp",
   "gripSide": "right",
   "raisedHand": {
    "side": "right",
    "palm": [
     227,
     132
    ],
    "inkCenter": [
     227.55,
     129.99
    ]
   },
   "sourceEdit": "raised-hand-source-sheet.png"
  },
  {
   "id": "body_20",
   "label": "동글 앉기",
   "w": 239,
   "h": 223,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     126,
     6
    ],
    "headW": 189,
    "earL": [
     58.25,
     26,
     -15
    ],
    "earR": [
     179.75,
     20,
     15
    ],
    "face": [
     119,
     93.66,
     128.25,
     0
    ],
    "prop": [
     120.15,
     150.81,
     73.69,
     -1.03
    ],
    "tail": [
     183.5,
     187.32
    ],
    "sideL": [
     57.5,
     149.41
    ],
    "sideR": [
     177.5,
     149.41
    ],
    "center": [
     117.5,
     111.5
    ],
    "H": 211,
    "W": 228,
    "head": {
     "center": [
      119,
      87.39
     ],
     "w": 225,
     "h": 162.79,
     "rotation": 0,
     "crown": [
      126,
      6
     ]
    },
    "earScale": 0.99372
   },
   "sourceCell": 3,
   "gripRegions": [
    [
     70,
     134,
     102,
     170
    ],
    [
     139,
     133,
     171,
     169
    ]
   ],
   "gripCount": 2,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     119,
     87.39
    ],
    "width": 225,
    "height": 162.79,
    "angle": 0,
    "crown": [
     126,
     6
    ]
   },
   "src": "parts/body/body_20.webp",
   "line": "parts/body/body_20_line.webp",
   "fill": "parts/body/body_20_fill.webp",
   "arms": "parts/body/body_20_arms.webp"
  },
  {
   "id": "body_21",
   "label": "반짝 인사",
   "w": 244,
   "h": 250,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     131,
     6
    ],
    "headW": 176.4,
    "earL": [
     83.01,
     18,
     -9
    ],
    "earR": [
     195.79,
     26,
     21
    ],
    "face": [
     132.5,
     92.5,
     119.7,
     6
    ],
    "prop": [
     22.5,
     120.5,
     71.4,
     -12
    ],
    "tail": [
     172.99,
     210
    ],
    "sideL": [
     82.41,
     167.5
    ],
    "sideR": [
     168.67,
     167.5
    ],
    "center": [
     125.54,
     125
    ],
    "H": 239,
    "W": 234,
    "head": {
     "center": [
      132.5,
      88.5
     ],
     "w": 210,
     "h": 165,
     "rotation": 6,
     "crown": [
      131,
      6
     ]
    },
    "earScale": 0.90847,
    "propOffsets": {
     "prop_01": [
      -32,
      -19.84
     ],
     "prop_02": [
      -24,
      -14.88
     ],
     "prop_03": [
      -28,
      -17.36
     ],
     "prop_04": [
      -1.36,
      -33.41
     ],
     "prop_05": [
      -13.79,
      -30.06
     ],
     "prop_06": [
      -13.94,
      -30.74
     ],
     "prop_07": [
      -28,
      -17.36
     ],
     "prop_08": [
      -32,
      -19.84
     ],
     "prop_09": [
      -28,
      -17.36
     ],
     "prop_10": [
      -28,
      -17.36
     ],
     "prop_11": [
      -5.91,
      -35.67
     ],
     "prop_12": [
      -28,
      -17.36
     ],
     "prop_13": [
      2.45,
      -32.64
     ],
     "prop_14": [
      -32,
      -19.84
     ],
     "prop_15": [
      -32,
      -19.84
     ],
     "prop_16": [
      -2.5,
      -28.45
     ],
     "prop_17": [
      -32,
      -19.84
     ],
     "prop_18": [
      -32,
      -19.84
     ],
     "prop_19": [
      -32,
      -19.84
     ],
     "prop_20": [
      -32,
      -19.84
     ],
     "prop_21": [
      -32,
      -19.84
     ],
     "prop_22": [
      -28,
      -17.36
     ],
     "prop_23": [
      -36,
      -22.32
     ],
     "prop_24": [
      -32,
      -19.84
     ],
     "prop_25": [
      -32,
      -19.84
     ],
     "prop_26": [
      -36,
      -22.32
     ],
     "prop_27": [
      -36,
      -22.32
     ],
     "prop_28": [
      -32,
      -19.84
     ],
     "prop_29": [
      -36,
      -22.32
     ],
     "prop_30": [
      -13.61,
      -29.18
     ],
     "prop_31": [
      -32,
      -19.84
     ],
     "prop_32": [
      -32,
      -19.84
     ],
     "prop_33": [
      -32,
      -19.84
     ],
     "prop_34": [
      -32,
      -19.84
     ],
     "prop_35": [
      -32,
      -19.84
     ],
     "prop_36": [
      -36,
      -22.32
     ]
    }
   },
   "sourceCell": 2,
   "gripRegions": [
    [
     4,
     99,
     41,
     142
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     132.5,
     88.5
    ],
    "width": 210,
    "height": 165,
    "angle": 6,
    "crown": [
     131,
     6
    ]
   },
   "src": "parts/body/body_21.webp",
   "line": "parts/body/body_21_line.webp",
   "fill": "parts/body/body_21_fill.webp",
   "arms": "parts/body/body_21_arms.webp",
   "gripSide": "left",
   "raisedHand": {
    "side": "left",
    "palm": [
     22.5,
     120.5
    ],
    "inkCenter": [
     22.22,
     118.71
    ]
   },
   "sourceEdit": "raised-hand-source-sheet.png"
  },
  {
   "id": "body_23",
   "label": "통통 햄스터",
   "w": 252,
   "h": 232,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     129.5,
     6
    ],
    "headW": 196.56,
    "earL": [
     61.57,
     25,
     -15
    ],
    "earR": [
     187.93,
     22,
     15
    ],
    "face": [
     124.75,
     95.12,
     133.38,
     0
    ],
    "prop": [
     124.03,
     159.9,
     63.14,
     0.29
    ],
    "tail": [
     199.42,
     194.88
    ],
    "sideL": [
     58.3,
     155.44
    ],
    "sideR": [
     192.7,
     155.44
    ],
    "center": [
     125.5,
     116
    ],
    "H": 220,
    "W": 240,
    "head": {
     "center": [
      124.75,
      90.68
     ],
     "w": 234,
     "h": 169.36,
     "rotation": 0,
     "crown": [
      129.5,
      6
     ]
    },
    "earScale": 0.98016
   },
   "sourceCell": 9,
   "gripRegions": [
    [
     78,
     143,
     111,
     179
    ],
    [
     138,
     143,
     171,
     179
    ]
   ],
   "gripCount": 2,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     124.75,
     90.68
    ],
    "width": 234,
    "height": 169.36,
    "angle": 0,
    "crown": [
     129.5,
     6
    ]
   },
   "src": "parts/body/body_23.webp",
   "line": "parts/body/body_23_line.webp",
   "fill": "parts/body/body_23_fill.webp",
   "arms": "parts/body/body_23_arms.webp"
  },
  {
   "id": "body_24",
   "label": "가슴 점 친구",
   "w": 242,
   "h": 252,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     116.5,
     6
    ],
    "headW": 175.56,
    "earL": [
     49.07,
     27,
     -19
    ],
    "earR": [
     161.65,
     18,
     11
    ],
    "face": [
     110,
     93.24,
     119.13,
     -4
    ],
    "prop": [
     221.5,
     125,
     71.06,
     12
    ],
    "tail": [
     162.68,
     211.68
    ],
    "sideL": [
     65.71,
     168.84
    ],
    "sideR": [
     158.06,
     168.84
    ],
    "center": [
     111.89,
     126
    ],
    "H": 240,
    "W": 230,
    "head": {
     "center": [
      110,
      89.16
     ],
     "w": 209,
     "h": 166.32,
     "rotation": -4,
     "crown": [
      116.5,
      6
     ]
    },
    "earScale": 0.91162,
    "propOffsets": {
     "prop_01": [
      32,
      -19.84
     ],
     "prop_02": [
      28,
      -17.36
     ],
     "prop_03": [
      32,
      -19.84
     ],
     "prop_04": [
      26.43,
      -27.94
     ],
     "prop_05": [
      9.77,
      -28.53
     ],
     "prop_06": [
      13.91,
      -30.6
     ],
     "prop_07": [
      28,
      -17.36
     ],
     "prop_08": [
      28,
      -17.36
     ],
     "prop_09": [
      24,
      -14.88
     ],
     "prop_10": [
      28,
      -17.36
     ],
     "prop_11": [
      8.13,
      -30.53
     ],
     "prop_12": [
      28,
      -17.36
     ],
     "prop_13": [
      29.58,
      -25.7
     ],
     "prop_14": [
      28,
      -17.36
     ],
     "prop_15": [
      28,
      -17.36
     ],
     "prop_16": [
      23.38,
      -23.89
     ],
     "prop_17": [
      28,
      -17.36
     ],
     "prop_18": [
      28,
      -17.36
     ],
     "prop_19": [
      32,
      -19.84
     ],
     "prop_20": [
      28,
      -17.36
     ],
     "prop_21": [
      28,
      -17.36
     ],
     "prop_22": [
      28,
      -17.36
     ],
     "prop_23": [
      32,
      -19.84
     ],
     "prop_24": [
      28,
      -17.36
     ],
     "prop_25": [
      28,
      -17.36
     ],
     "prop_26": [
      32,
      -19.84
     ],
     "prop_27": [
      36,
      -22.32
     ],
     "prop_28": [
      32,
      -19.84
     ],
     "prop_29": [
      32,
      -19.84
     ],
     "prop_30": [
      13.58,
      -29.06
     ],
     "prop_31": [
      28,
      -17.36
     ],
     "prop_32": [
      28,
      -17.36
     ],
     "prop_33": [
      28,
      -17.36
     ],
     "prop_34": [
      28,
      -17.36
     ],
     "prop_35": [
      28,
      -17.36
     ],
     "prop_36": [
      32,
      -19.84
     ]
    }
   },
   "sourceCell": 12,
   "gripRegions": [
    [
     205,
     104,
     238,
     146
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 1327,
   "headFrame": {
    "center": [
     110,
     89.16
    ],
    "width": 209,
    "height": 166.32,
    "angle": -4,
    "crown": [
     116.5,
     6
    ]
   },
   "src": "parts/body/body_24.webp",
   "line": "parts/body/body_24_line.webp",
   "fill": "parts/body/body_24_fill.webp",
   "arms": "parts/body/body_24_arms.webp",
   "gripSide": "right",
   "raisedHand": {
    "side": "right",
    "palm": [
     221.5,
     125
    ],
    "inkCenter": [
     220.85,
     123.5
    ]
   },
   "sourceEdit": "raised-hand-source-sheet.png"
  },
  {
   "id": "body_25",
   "label": "이마 점 햄스터",
   "w": 252,
   "h": 255,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     134,
     4
    ],
    "headW": 178.47529411764705,
    "earL": [
     87.15247058823529,
     15,
     -9
    ],
    "earR": [
     201.264,
     24,
     21
    ],
    "face": [
     137.36470588235295,
     94.35000000000001,
     121.10823529411765,
     6
    ],
    "prop": [
     37,
     117,
     72.24,
     -12
    ],
    "tail": [
     177.83,
     214.2
    ],
    "sideL": [
     82.7,
     170.85
    ],
    "sideR": [
     173.3,
     170.85
    ],
    "center": [
     128,
     127.5
    ],
    "H": 247,
    "W": 244,
    "head": {
     "center": [
      137.36470588235295,
      90.24561752988048
     ],
     "w": 212.47058823529412,
     "h": 168.29999999999998,
     "rotation": 6,
     "crown": [
      134,
      4
     ]
    },
    "earScale": 0.88998,
    "propOffsets": {
     "prop_01": [
      -44,
      -27.28
     ],
     "prop_02": [
      -32,
      -19.84
     ],
     "prop_03": [
      -40,
      -24.8
     ],
     "prop_04": [
      -18.78,
      -31.27
     ],
     "prop_05": [
      -31.36,
      -27.88
     ],
     "prop_06": [
      -27.51,
      -27.16
     ],
     "prop_07": [
      -36,
      -22.32
     ],
     "prop_08": [
      -36,
      -22.32
     ],
     "prop_09": [
      -40,
      -24.8
     ],
     "prop_10": [
      -36,
      -22.32
     ],
     "prop_11": [
      -19.43,
      -32.17
     ],
     "prop_12": [
      -36,
      -22.32
     ],
     "prop_13": [
      -14.93,
      -30.49
     ],
     "prop_14": [
      -44,
      -27.28
     ],
     "prop_15": [
      -39,
      -24
     ],
     "prop_16": [
      -19.94,
      -26.25
     ],
     "prop_17": [
      -40,
      -24.8
     ],
     "prop_18": [
      -44,
      -27.28
     ],
     "prop_19": [
      -44,
      -27.28
     ],
     "prop_20": [
      -44,
      -27.28
     ],
     "prop_21": [
      -40,
      -24.8
     ],
     "prop_22": [
      -36,
      -22.32
     ],
     "prop_23": [
      -44,
      -27.28
     ],
     "prop_24": [
      -40,
      -24.8
     ],
     "prop_25": [
      -40,
      -24.8
     ],
     "prop_26": [
      -44,
      -27.28
     ],
     "prop_27": [
      -44,
      -27.28
     ],
     "prop_28": [
      -44,
      -27.28
     ],
     "prop_29": [
      -44,
      -27.28
     ],
     "prop_30": [
      -31.17,
      -26.99
     ],
     "prop_31": [
      -40,
      -24.8
     ],
     "prop_32": [
      -40,
      -24.8
     ],
     "prop_33": [
      -44,
      -27.28
     ],
     "prop_34": [
      -44,
      -27.28
     ],
     "prop_35": [
      -44,
      -27.28
     ],
     "prop_36": [
      -44,
      -27.28
     ]
    }
   },
   "sourceCell": 10,
   "gripRegions": [
    [
     2,
     100,
     37,
     139
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 1188,
   "headFrame": {
    "center": [
     137.36470588235295,
     90.24561752988048
    ],
    "width": 212.47058823529412,
    "height": 168.29999999999998,
    "angle": 6,
    "crown": [
     134,
     4
    ]
   },
   "sourceEdit": "body25-hand-switch-source.png",
   "src": "parts/body/body_25.webp",
   "line": "parts/body/body_25_line.webp",
   "fill": "parts/body/body_25_fill.webp",
   "arms": "parts/body/body_25_arms.webp"
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
   "label": "잔털 수달",
   "w": 245,
   "h": 256,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     126,
     6
    ],
    "headW": 178.5,
    "earL": [
     80.25,
     18,
     -9
    ],
    "earR": [
     194.38,
     30,
     21
    ],
    "face": [
     130.25,
     97.28,
     121.12,
     6
    ],
    "prop": [
     22.5,
     131,
     72.25,
     -12
    ],
    "tail": [
     173.18,
     215.04
    ],
    "sideL": [
     81.2,
     171.52
    ],
    "sideR": [
     168.8,
     171.52
    ],
    "center": [
     125,
     128
    ],
    "H": 244,
    "W": 234,
    "head": {
     "center": [
      130.25,
      90.48
     ],
     "w": 212.5,
     "h": 168.96,
     "rotation": 6,
     "crown": [
      126,
      6
     ]
    },
    "earScale": 0.91553,
    "propOffsets": {
     "prop_01": [
      -36,
      -22.32
     ],
     "prop_02": [
      -28,
      -17.36
     ],
     "prop_03": [
      -28,
      -17.36
     ],
     "prop_04": [
      -1.28,
      -33.77
     ],
     "prop_05": [
      -13.86,
      -30.38
     ],
     "prop_06": [
      -14.01,
      -31.07
     ],
     "prop_07": [
      -28,
      -17.36
     ],
     "prop_08": [
      -32,
      -19.84
     ],
     "prop_09": [
      -32,
      -19.84
     ],
     "prop_10": [
      -32,
      -19.84
     ],
     "prop_11": [
      -5.93,
      -36.07
     ],
     "prop_12": [
      -32,
      -19.84
     ],
     "prop_13": [
      2.57,
      -33
     ],
     "prop_14": [
      -36,
      -22.32
     ],
     "prop_15": [
      -32,
      -19.84
     ],
     "prop_16": [
      -2.44,
      -28.75
     ],
     "prop_17": [
      -32,
      -19.84
     ],
     "prop_18": [
      -32,
      -19.84
     ],
     "prop_19": [
      -36,
      -22.32
     ],
     "prop_20": [
      -32,
      -19.84
     ],
     "prop_21": [
      -32,
      -19.84
     ],
     "prop_22": [
      -32,
      -19.84
     ],
     "prop_23": [
      -36,
      -22.32
     ],
     "prop_24": [
      -32,
      -19.84
     ],
     "prop_25": [
      -32,
      -19.84
     ],
     "prop_26": [
      -36,
      -22.32
     ],
     "prop_27": [
      -36,
      -22.32
     ],
     "prop_28": [
      -36,
      -22.32
     ],
     "prop_29": [
      -36,
      -22.32
     ],
     "prop_30": [
      -13.67,
      -29.5
     ],
     "prop_31": [
      -32,
      -19.84
     ],
     "prop_32": [
      -32,
      -19.84
     ],
     "prop_33": [
      -36,
      -22.32
     ],
     "prop_34": [
      -36,
      -22.32
     ],
     "prop_35": [
      -32,
      -19.84
     ],
     "prop_36": [
      -36,
      -22.32
     ]
    }
   },
   "sourceCell": 14,
   "gripRegions": [
    [
     4,
     109,
     41,
     153
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     130.25,
     90.48
    ],
    "width": 212.5,
    "height": 168.96,
    "angle": 6,
    "crown": [
     126,
     6
    ]
   },
   "src": "parts/body/body_28.webp",
   "line": "parts/body/body_28_line.webp",
   "fill": "parts/body/body_28_fill.webp",
   "arms": "parts/body/body_28_arms.webp",
   "gripSide": "left",
   "raisedHand": {
    "side": "left",
    "palm": [
     22.5,
     131
    ],
    "inkCenter": [
     22.5,
     128.17
    ]
   },
   "sourceEdit": "raised-hand-source-sheet.png"
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
   "label": "동동 모찌",
   "w": 237,
   "h": 247,
   "color": "#fffaf0",
   "anchors": {
    "top": [
     114.5,
     5
    ],
    "headW": 169.68,
    "earL": [
     42.92,
     32,
     -23
    ],
    "earR": [
     150.93,
     14,
     7
    ],
    "face": [
     106,
     96.33,
     115.14,
     -8
    ],
    "prop": [
     216,
     114,
     68.68,
     12
    ],
    "tail": [
     163.23,
     207.48
    ],
    "sideL": [
     71.1,
     165.49
    ],
    "sideR": [
     158.84,
     165.49
    ],
    "center": [
     114.97,
     123.5
    ],
    "H": 236,
    "W": 227,
    "head": {
     "center": [
      106,
      86.51
     ],
     "w": 202,
     "h": 163.02,
     "rotation": -8,
     "crown": [
      114.5,
      5
     ]
    },
    "earScale": 0.89967,
    "propOffsets": {
     "prop_01": [
      28,
      -17.36
     ],
     "prop_02": [
      28,
      -17.36
     ],
     "prop_03": [
      32,
      -19.84
     ],
     "prop_04": [
      25.81,
      -27.1
     ],
     "prop_05": [
      9.57,
      -27.62
     ],
     "prop_06": [
      13.71,
      -29.67
     ],
     "prop_07": [
      28,
      -17.36
     ],
     "prop_08": [
      28,
      -17.36
     ],
     "prop_09": [
      24,
      -14.88
     ],
     "prop_10": [
      28,
      -17.36
     ],
     "prop_11": [
      3.73,
      -28.06
     ],
     "prop_12": [
      24,
      -14.88
     ],
     "prop_13": [
      28.85,
      -24.94
     ],
     "prop_14": [
      28,
      -17.36
     ],
     "prop_15": [
      28,
      -17.36
     ],
     "prop_16": [
      22.87,
      -23.19
     ],
     "prop_17": [
      28,
      -17.36
     ],
     "prop_18": [
      28,
      -17.36
     ],
     "prop_19": [
      28,
      -17.36
     ],
     "prop_20": [
      28,
      -17.36
     ],
     "prop_21": [
      28,
      -17.36
     ],
     "prop_22": [
      28,
      -17.36
     ],
     "prop_23": [
      32,
      -19.84
     ],
     "prop_24": [
      28,
      -17.36
     ],
     "prop_25": [
      28,
      -17.36
     ],
     "prop_26": [
      32,
      -19.84
     ],
     "prop_27": [
      32,
      -19.84
     ],
     "prop_28": [
      28,
      -17.36
     ],
     "prop_29": [
      32,
      -19.84
     ],
     "prop_30": [
      13.39,
      -28.18
     ],
     "prop_31": [
      28,
      -17.36
     ],
     "prop_32": [
      28,
      -17.36
     ],
     "prop_33": [
      28,
      -17.36
     ],
     "prop_34": [
      28,
      -17.36
     ],
     "prop_35": [
      28,
      -17.36
     ],
     "prop_36": [
      32,
      -19.84
     ]
    }
   },
   "sourceCell": 16,
   "gripRegions": [
    [
     199,
     92,
     233,
     136
    ]
   ],
   "gripCount": 1,
   "fixedPatternPixels": 0,
   "headFrame": {
    "center": [
     106,
     86.51
    ],
    "width": 202,
    "height": 163.02,
    "angle": -8,
    "crown": [
     114.5,
     5
    ]
   },
   "src": "parts/body/body_30.webp",
   "line": "parts/body/body_30_line.webp",
   "fill": "parts/body/body_30_fill.webp",
   "arms": "parts/body/body_30_arms.webp",
   "gripSide": "right",
   "raisedHand": {
    "side": "right",
    "palm": [
     216,
     114
    ],
    "inkCenter": [
     214.56,
     113.24
    ]
   },
   "sourceEdit": "raised-hand-source-sheet.png"
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
   "label": "아기 햄스터",
   "color": "#fbf5eb",
   "L": {
    "src": "parts/ears/ears_13_L.webp",
    "w": 107,
    "h": 103,
    "root": [
     53.5,
     99
    ],
    "color": "#fbf5eb",
    "fill": "parts/ears/ears_13_L_fill.webp",
    "line": "parts/ears/ears_13_L_line.webp"
   },
   "R": {
    "src": "parts/ears/ears_13_R.webp",
    "w": 108,
    "h": 103,
    "root": [
     54,
     99
    ],
    "color": "#fbf5eb",
    "fill": "parts/ears/ears_13_R_fill.webp",
    "line": "parts/ears/ears_13_R_line.webp"
   },
   "src": "parts/ears/ears_13.webp",
   "w": 253,
   "h": 103,
   "fill": "parts/ears/ears_13_fill.webp",
   "line": "parts/ears/ears_13_line.webp"
  },
  {
   "id": "ears_14",
   "label": "사막여우",
   "src": "parts/ears/ears_14.webp",
   "w": 263.52,
   "h": 204.48,
   "color": "#fef6df",
   "line": "parts/ears/ears_14_line.webp",
   "fill": "parts/ears/ears_14_fill.webp",
   "L": {
    "src": "parts/ears/ears_14_L.webp",
    "w": 120.96,
    "h": 204.48,
    "color": "#fef6df",
    "line": "parts/ears/ears_14_L_line.webp",
    "fill": "parts/ears/ears_14_L_fill.webp",
    "root": [
     60.48,
     200.16
    ]
   },
   "R": {
    "src": "parts/ears/ears_14_R.webp",
    "w": 120.24,
    "h": 203.76,
    "color": "#fef6df",
    "line": "parts/ears/ears_14_R_line.webp",
    "fill": "parts/ears/ears_14_R_fill.webp",
    "root": [
     60.12,
     200.16
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
   "label": "우유빛 매듭 리본",
   "kind": "side",
   "src": "parts/deco/deco_08.webp",
   "w": 144,
   "h": 98
  },
  {
   "id": "deco_09",
   "label": "깃털",
   "kind": "top",
   "sink": 0.2,
   "src": "parts/deco/deco_09.webp",
   "w": 162.5,
   "h": 151.45
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
   "label": "잔잔한 미소",
   "src": "parts/face/face_19.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     75.37,
     131.61,
     30.14
    ],
    [
     247.63,
     131.26,
     29.08
    ]
   ]
  },
  {
   "id": "face_20",
   "label": "반가워",
   "src": "parts/face/face_20.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     73.22,
     131.17,
     29.61
    ],
    [
     249.78,
     131.7,
     29.08
    ]
   ]
  },
  {
   "id": "face_21",
   "label": "갸우뚱",
   "src": "parts/face/face_21.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     73.77,
     131.42,
     30.14
    ],
    [
     249.23,
     131.45,
     29.08
    ]
   ]
  },
  {
   "id": "face_22",
   "label": "눈웃음",
   "src": "parts/face/face_22.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     65.23,
     131.18,
     34.75
    ],
    [
     257.77,
     131.68,
     35.84
    ]
   ]
  },
  {
   "id": "face_23",
   "label": "나른해",
   "src": "parts/face/face_23.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     61.36,
     132.8,
     34.21
    ],
    [
     261.64,
     130.07,
     34.75
    ]
   ]
  },
  {
   "id": "face_24",
   "label": "궁금해",
   "src": "parts/face/face_24.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     64.74,
     131.88,
     36.93
    ],
    [
     258.26,
     130.99,
     37.47
    ]
   ]
  },
  {
   "id": "face_25",
   "label": "조심조심",
   "src": "parts/face/face_25.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     65.58,
     133.27,
     36.38
    ],
    [
     257.42,
     129.6,
     37.47
    ]
   ]
  },
  {
   "id": "face_26",
   "label": "수줍은 미소",
   "src": "parts/face/face_26.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     68.03,
     131.14,
     34.21
    ],
    [
     254.97,
     131.73,
     36.38
    ]
   ]
  },
  {
   "id": "face_27",
   "label": "만족해",
   "src": "parts/face/face_27.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     73.89,
     131.49,
     30.14
    ],
    [
     249.11,
     131.38,
     29.08
    ]
   ]
  },
  {
   "id": "face_28",
   "label": "쪽",
   "src": "parts/face/face_28.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     73.61,
     131.06,
     30.14
    ],
    [
     249.39,
     131.81,
     29.61
    ]
   ]
  },
  {
   "id": "face_29",
   "label": "소곤소곤 웃음",
   "src": "parts/face/face_29.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     74.7,
     131.57,
     30.14
    ],
    [
     248.3,
     131.29,
     29.61
    ]
   ]
  },
  {
   "id": "face_30",
   "label": "시무룩",
   "src": "parts/face/face_30.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     74,
     131.12,
     30.67
    ],
    [
     249,
     131.74,
     29.61
    ]
   ]
  },
  {
   "id": "face_31",
   "label": "어라",
   "src": "parts/face/face_31.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     65.61,
     133.18,
     36.38
    ],
    [
     257.39,
     129.69,
     38.01
    ]
   ]
  },
  {
   "id": "face_32",
   "label": "살짝 윙크",
   "src": "parts/face/face_32.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     62.68,
     132.59,
     35.3
    ],
    [
     260.32,
     130.28,
     36.93
    ]
   ]
  },
  {
   "id": "face_33",
   "label": "훌쩍",
   "src": "parts/face/face_33.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     61.37,
     131.91,
     34.75
    ],
    [
     261.63,
     130.96,
     34.75
    ]
   ]
  },
  {
   "id": "face_34",
   "label": "당황했어",
   "src": "parts/face/face_34.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     64.78,
     134.25,
     34.75
    ],
    [
     258.22,
     128.61,
     37.47
    ]
   ]
  },
  {
   "id": "face_35",
   "label": "장난스러운 윙크",
   "src": "parts/face/face_35.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     72.71,
     131.7,
     30.14
    ],
    [
     250.29,
     131.17,
     29.61
    ]
   ]
  },
  {
   "id": "face_36",
   "label": "메롱",
   "src": "parts/face/face_36.webp",
   "w": 323,
   "h": 230,
   "cheeks": [
    [
     72.86,
     131.38,
     30.14
    ],
    [
     250.14,
     131.48,
     29.61
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
   "label": "작은 하트 꼬리",
   "kind": "tail",
   "src": "parts/back/back_05.webp",
   "w": 144,
   "h": 134,
   "root": [
    17.3,
    111.2
   ],
   "fill": "parts/back/back_05_fill.webp",
   "line": "parts/back/back_05_line.webp",
   "color": "#fbf8f0"
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
   "label": "동글 보라 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_07_L.webp",
    "w": 88,
    "h": 76,
    "root": [
     82,
     47.1
    ]
   },
   "R": {
    "src": "parts/back/back_07_R.webp",
    "w": 88,
    "h": 79,
    "root": [
     6,
     49
    ]
   },
   "src": "parts/back/back_07.webp",
   "w": 208,
   "h": 79
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
   },
   "scale": 0.72
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
   "label": "우유빛 작은 날개",
   "kind": "wings",
   "L": {
    "src": "parts/back/back_14_L.webp",
    "w": 98,
    "h": 94,
    "root": [
     92,
     58.3
    ],
    "fill": "parts/back/back_14_L_fill.webp",
    "line": "parts/back/back_14_L_line.webp",
    "color": "#fbf5e3"
   },
   "R": {
    "src": "parts/back/back_14_R.webp",
    "w": 100,
    "h": 94,
    "root": [
     6,
     58.3
    ],
    "fill": "parts/back/back_14_R_fill.webp",
    "line": "parts/back/back_14_R_line.webp",
    "color": "#fbf5e3"
   },
   "src": "parts/back/back_14.webp",
   "w": 230,
   "h": 94,
   "fill": "parts/back/back_14_fill.webp",
   "line": "parts/back/back_14_line.webp",
   "color": "#fbf5e3"
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
   ],
   "scale": 0.62
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
