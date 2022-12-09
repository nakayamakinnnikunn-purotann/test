'use strict'; nest(['globalData', 'com.crocro.game'], function(_t, game) {
	// ユーザー データの初期化
	_t.initUD = function() {
		// 変数初期化
		const now = game.anim.tm.sum;
		window.UD = {brd: [], wave: [], bullet: [],
			phase: 'play', waveCnt: 0, coin: GD.startCoin, pnt: 0,
			selBtn: 0, selPos: -1, tmSum: 0, tmWaitStart: 0};
		UD.tmWaveLast = UD.tmSum - GD.waveInterval + GD.waveStart;

		// 外周を壁に
		UD.brd = Array(GD.brd.w * GD.brd.h).fill(GD.n.blank);
		for (let y = 0; y < GD.brd.h; y ++) {
			for (let x = 0; x < GD.brd.w; x ++) {
				if (y === 0 || y === GD.brd.h - 1	
				 || x === 0 || x === GD.brd.w - 1) {
					UD.brd[x + y * GD.brd.w] = GD.n.wall;
				}
			}
		}

		// ゴールとスタートを穴に
		UD.brd[GD.goal.x + GD.goal.y * GD.brd.w] = GD.n.hole;
		GD.start.forEach(o => UD.brd[o.x + o.y * GD.brd.w] = GD.n.hole);

		// ランダム障害物追加
		for (let i = 0; i < GD.brd.w * 2; i ++) {
			const x = 1 + GD.xors.rnd() % (GD.brd.w - 2);
			const y = 2 + GD.xors.rnd() % (GD.brd.h - 4);
			UD.brd[x + y * GD.brd.w] = GD.n.wall;		// 壁を置く

			const costMap = enemy.genCostMap('walk');	// コスト地図の生成
			if (! enemy.checkCostMap(costMap)) {		// 道が通れない
				UD.brd[x + y * GD.brd.w] = GD.n.blank;	// 空白に戻す
			}
		}
	};
});

