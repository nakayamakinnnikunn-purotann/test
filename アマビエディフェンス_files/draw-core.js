'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 背景描画
	_t.drawBG = function(ctx) {
		const c = [145, 236, 253];
		const w = GD.w, h = GD.h, uW = 32, uH = 12;
		for (let y = 0; y < h; y += uH) {
			for (let x = - GD.xors.rnd() % uW; x < w; x += uW) {
				const r = -8 + GD.xors.rnd() % 16;
				const c0 = minMax(0, c[0] + r, 255);
				const c1 = minMax(0, c[1] + r, 255);
				const c2 = minMax(0, c[2] + r, 255);
				ctx.fillStyle = `rgb(${c0}, ${c1}, ${c2})`;
				ctx.fillRect(x, y, uW, uH);
			}
		}
	};

	// 選択描画
	_t.drawSel = function(ctx, p, isSel, isBG) {
		if (isSel) {
			ctx.fillStyle = '#ffa';
			ctx.fillRect(p.x, p.y, p.w, p.h);
		} else if (isBG) {
			ctx.fillStyle = '#246';
			ctx.fillRect(p.x, p.y, p.w, p.h);
		}
	};
});
