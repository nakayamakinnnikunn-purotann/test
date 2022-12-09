'use strict'; nest(['enemy', 'com.crocro.game'], function(_t, game) {
	// 移動
	_t.move = function() {
		// 各敵の処理
		UD.wave.forEach(o => {
			// 飛ばし判定
			if (UD.phase === 'end') { return }
			if (o.tmLast >= UD.tmSum) { return }

			// 変数の初期化
			const gE = GD.enemy[o.type];
			let mvTm = 1000 * gE.mvTm;
			if (o.isFrozen) { mvTm *= 4 }

			// 移動位置の計算
			o.rootRate += (UD.tmSum - o.tmLast) / mvTm;
			o.rootPos = o.rootRate | 0;
			o.tmLast = UD.tmSum;

			// ゲーム終了確認
			if (o.rootPos + 1 >= o.rootArr.length) {
				defense.prgrssEnd('LOSE');	// 進行終了
				UD.ss = game.screenshot.getDtUrl();	// データURL取得

				const [x, y] = o.rootArr[o.rootArr.length - 1];
				o.cX = x * GD.dU + GD.dU * 0.5;
				o.cY = y * GD.dU + GD.dU * 0.5;
				return;
			}

			// 現在位置の計算
			const [x1, y1] = o.rootArr[o.rootPos];
			const [x2, y2] = o.rootArr[o.rootPos + 1];
			const rate = o.rootRate - o.rootPos;
			o.cX = (x1 * (1 - rate) + x2 * rate) * GD.dU + GD.dU * 0.5;
			o.cY = (y1 * (1 - rate) + y2 * rate) * GD.dU + GD.dU * 0.5;
		});
	};
});
