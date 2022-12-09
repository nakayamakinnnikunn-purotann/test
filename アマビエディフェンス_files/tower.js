'use strict'; nest(['tower', 'com.crocro.game'], function(_t, game) {
	// 生成
	_t.gen = function(x, y, type) {
		const o = {type: type, lv: 1, tmLast: UD.tmSum, x: x, y: y,
			cX: x * GD.dU + GD.dU * 0.5, cY: y * GD.dU + GD.dU * 0.5};
		_t.calcPrm(o);
		return o;
	};

	// 値計算
	_t.calcPrm = function(o) {
		const gT = GD.tower[o.type];
		['pow', 'interval', 'range'].forEach(k => {
			o[k] = ((gT.bs[k] + gT.up[k] * o.lv) * 10 | 0) / 10;
		});
	};

	// 次価格計算
	_t.calcNextPrice = function(o) {
		const gT = GD.tower[o.type];
		if (o.lv < gT.lvMax) { return gT.price * (o.lv + 1) }
		return null;
	};

	// レベル上げ
	_t.lvUp = function() {
		// 塔存在確認
		const o = UD.brd[UD.selPos];
		if (typeof o !== 'object') { return }

		// 価格の確認
		const price = _t.calcNextPrice(o);
		if (price === null || UD.coin < price) { return }

		// レベル上昇
		o.lv ++;			// レベル上昇
		_t.calcPrm(o);		// 値計算
		UD.coin -= price;	// 金消費
	};
});
