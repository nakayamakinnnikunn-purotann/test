'use strict'; nest(['enemy', 'com.crocro.game'], function(_t, game) {
	// 変数の初期化
	_t.costMap = {walk: [], fly: []};

	// コスト地図の生成  type: walk, fly
	_t.genCostMap = function(type) {
		// 変数の初期化
		const w = GD.brd.w, h = GD.brd.h, sz = w * h;
		const costMap = Array(sz).fill(GD.brd.costMax);
		costMap[GD.goal.x + GD.goal.y * w] = 0;
		const arr = [[GD.goal.x, GD.goal.y - 1, 1]];

		// コストの計算
		for (let n = 0; arr.length > 0 && n < sz * 100; n ++) {
			// 変数の初期化
			const [x, y, p] = arr.shift(), i = x + y * w;
			if (p >= costMap[i]) { continue }
			if (type === 'walk' && UD.brd[i] !== GD.n.blank) { continue }
			costMap[i] = p;

			// 移動
			if (inRng(x - 1, y, 0, 0, w, h)) { arr.push([x - 1, y, p + 1]) }
			if (inRng(x + 1, y, 0, 0, w, h)) { arr.push([x + 1, y, p + 1]) }
			if (inRng(x, y - 1, 0, 0, w, h)) { arr.push([x, y - 1, p + 1]) }
			if (inRng(x, y + 1, 0, 0, w, h)) { arr.push([x, y + 1, p + 1]) }
		}
		return costMap;
	};

	// コスト地図が有効か確認
	_t.checkCostMap = function(costMap) {
		let isOK = true;
		GD.start.forEach(o => {
			const i = o.x + (o.y + 1) * GD.brd.w;
			if (costMap[i] === GD.brd.costMax) { isOK = false }
		});
		return isOK;
	};

	// コスト地図の設定
	_t.setCostMap = function(type, costMap) {
		_t.costMap[type] = costMap;
	};
});
