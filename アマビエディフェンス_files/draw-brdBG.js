'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 盤面背景描画
	_t.drawBrdBG = function(ctx) {
		// 変数の初期化
		const dU = GD.dU, w = GD.brd.w, h = GD.brd.h, m = 2, n = GD.n;
		const col = {[n.wall]: ['#024', '#048'], [n.hole]: ['#012', '#000'],
			[n.blank]: [['#bcc', '#eff'], ['#69a', '#8ab']]};

		ctx.save();		// 設定保存
		ctx.translate(GD.lBrd.x, GD.lBrd.y);	// 座標の移動

		// 各マス描画
		for (let y = 0; y < h; y ++) {
			for (let x = 0; x < w; x ++) {
				// 変数の初期化
				const b = UD.brd[x + y * w];
				const col2 = b != n.blank ? col[b] : col[b][(x + y) % 2];
				const dX = x * dU, dY = y * dU;

				// 描画
				ctx.fillStyle = col2[0];
				ctx.fillRect(dX, dY, dU, dU);
				ctx.fillStyle = col2[1];
				ctx.fillRect(dX + m, dY + m, dU - m * 2, dU - m * 2);
			}
		}
		ctx.restore();	// 設定戻し
	};
});
