'use strict'; nest(['draw', 'com.crocro.game'], function(_t, game) {
	// 情報描画
	_t.drawInfo = function(ctx) {
		// 変数の初期化
		let t;
		ctx.save();		// 設定保存
		ctx.translate(GD.lInf.x, GD.lInf.y);	// 座標の移動

		// 土台描画
		Object.assign(ctx, {globalAlpha: 0.8, fillStyle: '#123'});
		ctx.fillRect(0, 0, GD.lInf.w, GD.lInf.h);

		// 文字列作成
		if (UD.selPos !== -1 && typeof UD.brd[UD.selPos] === 'object') {
			// 情報表示
			const uT = UD.brd[UD.selPos];
			const gT = GD.tower[uT.type];
			const price = tower.calcNextPrice(uT);
			t = `${gT.name} - Pow:${uT.pow} Sec:${uT.interval}`
				+ ` Rng:${uT.range} Lv:${uT.lv} `
				+ ((price !== null) ? `Next:${price}` : 'Max');
		} else {
			// 塔配置情報
			const gT = GD.tower[UD.selBtn];
			t = `${gT.name} - Pow:${gT.bs.pow} Sec:${gT.bs.interval}`
				+ ` Rng:${gT.bs.range}, Coin:${gT.price}`;
		}

		// 文字描画
		Object.assign(ctx, {globalAlpha: 1, fillStyle: '#fff',
			font: '40px ' + GD.fonDflt,
			textAlign: 'center', textBaseline: 'middle'});
		ctx.fillText(t, GD.lInf.w / 2, GD.lInf.h / 2);
		ctx.restore();	// 設定戻し
	};

	// コイン描画
	_t.drawCoin = function(ctx) {
		// 変数の初期化
		const t = 'Coin:' + (UD.coin | 0);
		const bX = GD.lUI.x + GD.btn.w * 5 + GD.dU * 0.25, bY = GD.lUI.y,
			bW = GD.w - bX - GD.dU / 2, bH = GD.lUI.h * 0.45;
		ctx.save();		// 設定保存

		// 土台描画
		Object.assign(ctx, {globalAlpha: 0.8, fillStyle: '#123'});
		ctx.fillRect(bX, bY, bW, bH);

		// 文字描画
		Object.assign(ctx, {font: '35px ' + GD.fonDflt, globalAlpha: 1,
			textAlign: 'right', textBaseline: 'middle', fillStyle: '#fff'});
		ctx.fillText(t, bX + bW - GD.dU * 0.25, bY + bH / 2);
		ctx.restore();	// 設定戻し
	};

	// 得点描画
	_t.drawPoint = function(ctx) {
		// 変数の初期化
		let t = 'Point:' + UD.pnt;
//		if (GD.pntMax) { t += ' / ' + GD.pntMax; }
		const bX = GD.lUI.x + GD.btn.w * 5 + GD.dU * 0.25,
			bW = GD.w - bX - GD.dU / 2, bH = GD.lUI.h * 0.45;
		const bY = GD.lUI.y + GD.lUI.h - bH;
		ctx.save();		// 設定保存

		// 土台描画
		Object.assign(ctx, {globalAlpha: 0.8, fillStyle: '#123'});
		ctx.fillRect(bX, bY, bW, bH);

		// 文字描画
		Object.assign(ctx, {font: '35px ' + GD.fonDflt, globalAlpha: 1,
			textAlign: 'right', textBaseline: 'middle', fillStyle: '#fff'});
		ctx.fillText(t, bX + bW - GD.dU * 0.25, bY + bH / 2);
		ctx.restore();	// 設定戻し
	};
});
