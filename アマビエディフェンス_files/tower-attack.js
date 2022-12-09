'use strict'; nest(['tower', 'com.crocro.game'], function(_t, game) {
	// 攻撃（配列の先頭ほど古いので「古い＝ゴールに近い」敵を優先的に攻撃）
	_t.atack = function() {
		// 変数の初期化
		const pow = Math.pow;

		// 塔の処理
		UD.brd.forEach(o => {
			if (typeof o !== 'object') { return }	// 無視

			// 攻撃間隔
			if (UD.tmSum < o.tmLast + o.interval * 1000) { return }
			o.tmLast += o.interval * 1000;

			// 変数の初期化
			const r = pow(o.range * GD.dU, 2);
			const name = GD.tower[o.type].name;

			// 射程の探索
			for (let i = 0; i < UD.wave.length; i ++) {
				// 変数の初期化
				const e = UD.wave[i];

				// 凍結済みの敵は凍結対象としない
				if (name === 'Frozen' && e.isFrozen) { continue }

				// 距離の計算
				const d = pow(o.cX - e.cX, 2) + pow(o.cY - e.cY, 2);
				if (d > r) { continue }

				// 弾の生成
				UD.bullet.push({from: [o.cX, o.cY], to: [e.cX, e.cY],
					tmGen: UD.tmSum, distance: Math.sqrt(d) / GD.dU,
					cX: o.cX, cY: o.cY, pow: o.pow, enable: true,
					e: e, type: o.type, name: name});
				break;
			}
		});
	};
});
