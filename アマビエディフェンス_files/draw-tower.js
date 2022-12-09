'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 塔描画
	_t.drawTower = function(ctx) {
		// 変数の初期化
		ctx.save();		// 設定保存
		ctx.translate(GD.lBrd.x, GD.lBrd.y);	// 座標の移動

		// 塔描画
		Object.assign(ctx, {textAlign: 'right', textBaseline: 'bottom',
			font: (GD.dU / 2) + 'px ' + GD.fonDflt,
			lineWidth: 5, strokeStyle: '#000', fillStyle: '#fff'});

		for (let i = 0; i < UD.brd.length; i ++) {
			// 変数の初期化
			const o = UD.brd[i];
			if (typeof o === 'number') { continue }	// 塔でないなら無視
			const x = i % GD.brd.w, y = i / GD.brd.w | 0,
				d = {x: x * GD.dU, y: y * GD.dU, w: GD.dU, h: GD.dU};

			// 描画
			if (i === UD.selPos) { draw.drawSel(ctx, d, true) }	// 選択
			resouce.image.drawSlice(ctx, 'twr', o.type, 0, d);	// 塔
			ctx.strokeText(o.lv, d.x + d.w, d.y + d.h);			// レベル
			ctx.fillText(  o.lv, d.x + d.w, d.y + d.h);
		} 

		// 攻撃範囲描画
		if (UD.selPos !== -1) {
			const o = UD.brd[UD.selPos];
			const x = UD.selPos % GD.brd.w, y = UD.selPos / GD.brd.w | 0,
				cX = x * GD.dU + GD.dU * 0.5, cY = y * GD.dU + GD.dU * 0.5;
			Object.assign(ctx, {lineWidth: 3, strokeStyle: '#ffa'});
			ctx.beginPath();
			ctx.arc(cX, cY, o.range * GD.dU, 0, Math.PI * 2);
			ctx.stroke();
		}
		ctx.restore();	// 設定戻し
	};
});
