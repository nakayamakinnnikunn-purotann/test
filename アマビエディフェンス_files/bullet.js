'use strict'; nest(['bullet', 'com.crocro.game'], function(_t, game) {
	// 移動　弾は、移動→到着→消滅で推移
	_t.move = function() {
		UD.bullet.forEach(o => {
			if (! o.e.enable) { o.enable = false; return }	// 無視

			// 変数の初期化
			const tmDiff = UD.tmSum - o.tmGen;
			const mv = tmDiff / 200;

			if (mv > o.distance + 0.5) {
				// 消滅
				o.enable = false;	// 無効

				if (o.name === 'Frozen') {
					// 凍結
					o.e.isFrozen = true;
					o.e.tmFrozen = UD.tmSum + 1000 * o.pow;
				} else {
					// ダメージ
					o.e.hp -= o.pow;
					if (o.e.hp <= 0) {
						o.e.enable = false;			// 無効
						UD.coin += o.e.hpMax / 10;	// 報酬
						UD.pnt += o.e.hpMax / 10 | 0;	// 得点
					}
				}
			} else if (mv > o.distance) {
				[o.cX, o.cY] = o.to;	// 到着
			} else {
				// 移動
				o.to = [o.e.cX, o.e.cY];
				const rate = mv / o.distance;
				o.cX = o.from[0] * (1 - rate) + o.to[0] * rate;
				o.cY = o.from[1] * (1 - rate) + o.to[1] * rate;
			}
		});

		// 無効を削除
		UD.bullet = UD.bullet.filter(o => o.enable);
		UD.wave   = UD.wave.filter(o => o.enable);

		// 凍結の解除
		UD.wave.forEach(o => {
			if (UD.tmSum >= o.tmFrozen) { o.isFrozen = false }
		});
	};
});
