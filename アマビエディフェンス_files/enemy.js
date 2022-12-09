'use strict'; nest(['enemy', 'com.crocro.game'], function(_t, game) {
	// 生成
	_t.gen = function(x, y, type) {
		const o = {type: type, rootArr: [[x, y]], rootPos: 0, rootRate: 0,
			cX: x * GD.dU + GD.dU * 0.5, cY: y * GD.dU + GD.dU * 0.5,
			enable: true, isFrozen: false, tmFrozen: null};
		o.tmGen = o.tmLast = UD.tmSum;		// 時間
		o.hp = o.hpMax = GD.enemy[type].hp;	// HP
		_t.setRoute(o);						// ルートの設定
		return o;
	};
});
