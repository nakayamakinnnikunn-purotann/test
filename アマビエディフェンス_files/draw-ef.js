'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 終了描画
	_t.drawEnd = function(ctx) {
		if (UD.phase !== 'end') { return }

		// 全体を塗り潰し
		Object.assign(ctx, {globalAlpha: 0.5, fillStyle: '#fff'});
		ctx.fillRect(0, 0, GD.w, GD.h);
		Object.assign(ctx, {globalAlpha: 1});

		// 文字の描画
		if (game.anim.tm.sum >= UD.tmWaitStart + 250) {
			Object.assign(ctx, {font: '250px ' + GD.fonTtl,
				strokeStyle: '#fff', lineWidth: 16, fillStyle: '#a00'});
			ctx.strokeText(UD.endMsg, GD.w / 2, GD.h / 2);
			ctx.fillText(  UD.endMsg, GD.w / 2, GD.h / 2);
		}
	};
});
