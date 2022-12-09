'use strict'; nest(['globalData', 'com.crocro.game'], function(_t, game) {
	// 一般データの初期化
	_t.initGD = function() {
		// 変数の初期化
		const w = 960, h = 1280, dU = 64;	// 横幅、高さ、描画単位

		// グローバル変数 - 一般データ（固定）
		window.GD = {
			w: w, h: h, layerMax: 3, bg: '#000',	// 横縦/レイヤー/背景色
			lyrBg: 0, lyrMdl: 1, lyrFrnt: 2,		// レイヤー番号
			dU: dU,
			btn: {w: dU * 1.5, h: dU * 1.5},		// ボタン
			// レイアウト（盤面、情報部分、UI部分）
			lBrd: {x: dU * 1, y: dU / 2, w: w - dU * 2, h: h - dU * 4},
			lInf: {x: dU / 2, y: h - dU * 3.25, w: w - dU, h: dU},
			lUI:  {x: dU / 2, y: h - dU * 2.0, w: w - dU, h: dU * 1.5},
			// 設定
			enemy: [	// 敵
				{name: 'Pawn',   hp:  100, mvTm: 2.0, move: 'walk'},
				{name: 'Knignt', hp:  200, mvTm: 1.5, move: 'walk'},
				{name: 'Eagle',  hp:  300, mvTm: 3.0, move: 'fly'},
				{name: 'Angel',  hp:  500, mvTm: 2.0, move: 'fly'},
				{name: 'King',   hp: 2000, mvTm: 5.0, move: 'walk'}
			],
			wave: [0,0,1,2,  0,1,2,3,  1,2,3,4],	// 敵登場順
			waveStart:     5 * 1000,	// ウェーブ開始
			waveInterval: 30 * 1000,	// ウェーブ間隔
			enemyPerWave: {base: 8, up: 8},	// ウェーブ当たりの敵数
			tower: [	// 塔
				{name: 'Normal', lvMax: 5, price: 30,
					bs: {pow: 10,   interval:  0.5,  range: 1},
					up: {pow:  2,   interval: -0.04, range: 0.2}},
				{name: 'Fire', lvMax: 5, price: 100,
					bs: {pow: 10,   interval:  1.0,  range: 3},
					up: {pow:  2,   interval: -0.06, range: 0.2}},
				{name: 'Frozen',  lvMax: 5, price: 200,
					bs: {pow:  3,   interval:  1.0,  range: 2},
					up: {pow:  0.5, interval: -0.06, range: 0.2}}
			],
			startCoin: 100,	// 開始時コイン
			// その他
			n: {blank: -1, wall: -2, hole: -3},		// 盤面用数値
			btnId: {lv: 3, pause: 4, size: 5},		// ボタンID
			xors: new game.core.Xors(+new Date()),	// 乱数
			fonDflt: 'VT323',			// フォント デフォルト
			fonTtl:  '"Nico Moji"'		// フォント タイトル
			,
			// その他2
			urlThis: 'https://crocro.com/shop/item/dat/all_code_tower_defense/amabie/index.html'
		};

		// 盤面
		GD.brd = {w: GD.lBrd.w / dU | 0, h: GD.lBrd.h / dU | 0};
		GD.brd.costMax = (GD.brd.w * GD.brd.h) << 2;

		// ゴール位置、スタート位置
		GD.goal = {x: GD.brd.w / 2 | 0, y: GD.brd.h - 1};
		GD.start = [];
		GD.start.push({x: 2,                y: 0});
		GD.start.push({x: GD.brd.w / 2 | 0, y: 0});
		GD.start.push({x: GD.brd.w - 3,     y: 0});
	};
});

