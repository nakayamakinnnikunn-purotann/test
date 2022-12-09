'use strict'; nest(['enemy', 'com.crocro.game'], function(_t, game) {
	// ルートの設定
	_t.setRoute = function(o) {
		// 変数の初期化
		const w = GD.brd.w, h = GD.brd.h;
		let [x, y] = o.rootArr[o.rootPos];		// 現在位置を取り出し
		o.rootRate = o.rootRate - o.rootPos;	// マス間移動比率の小数点部分
		o.rootArr = [];  o.rootPos =  0;		// 配列を空に、位置を0に
		const costMap = _t.costMap[GD.enemy[o.type].move];	// コストマップ

		// ルートの探索
		for (let n = 0; n < costMap.length; n ++) {
			// 変数の初期化
			o.rootArr.push([x, y]);
			let c = costMap[x + y * w];
			if (c === 0) { break }

			// 最小コストに移動
			let x2, y2;
			const mvArr = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
			for (let i = 0; i < 4; i ++) {
				const xMv = mvArr[i][0], yMv = mvArr[i][1];
				if (! inRng(xMv, yMv, 0, 0, w, h)) { continue }
				const cMv = costMap[xMv + yMv * w];
				if (cMv < c) { c = cMv;  x2 = xMv;  y2 = yMv }
			}
			x = x2;  y = y2;
		}
	};

	// ルートの再計算
	_t.resetRoute = function() {
		UD.wave.forEach(o => _t.setRoute(o));
	};
});
