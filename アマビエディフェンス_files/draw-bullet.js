'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 弾描画
	_t.drawBullet = function(ctx) {
		ctx.save();		// 設定保存
		ctx.translate(GD.lBrd.x, GD.lBrd.y);	// 座標の移動

		// 描画
		UD.bullet.forEach(o => {
			resouce.image.drawSliceRaw(ctx, 'blt', o.type, 0,
				o.cX - GD.dU / 2, o.cY - GD.dU / 2, GD.dU, GD.dU);
		});
		ctx.restore();	// 設定戻し
	};
});
