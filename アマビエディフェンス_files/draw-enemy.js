'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 敵描画
	_t.drawEnemy = function(ctx) {
		// 変数の初期化
		ctx.save();		// 設定保存
		ctx.translate(GD.lBrd.x - GD.dU * 0.5, GD.lBrd.y - GD.dU * 0.5);
		const hpX = GD.dU * 0.2,  hpW = GD.dU * 0.6,
			  hpY = GD.dU * 0.93, hpH = GD.dU * 0.07;

		// 描画 敵、HP
		for (let i = UD.wave.length - 1; i >= 0; i --) {
			const e = UD.wave[i];
			resouce.image.drawSliceRaw(ctx, 'ene', e.type, 0,	// 敵
				e.cX, e.cY, GD.dU, GD.dU);
			ctx.fillStyle = '#a00';		// HP土台
			ctx.fillRect(e.cX + hpX, e.cY + hpY, hpW, hpH);
			ctx.fillStyle = '#0d0';		// HP残り
			ctx.fillRect(e.cX + hpX, e.cY + hpY, hpW * e.hp / e.hpMax, hpH);
		}
		ctx.restore();	// 設定戻し
	};
});
