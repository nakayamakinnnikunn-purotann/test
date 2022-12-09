'use strict'; nest(['scn.title', 'com.crocro.game'], function(_t, game) {
	let btnStrt;	// ボタン開始

	// 開始
	_t.start = function() {
		game.view.add(_t.tap);		// タップの登録
		game.anim.add(_t.update);	// 更新の登録

		// ボタン開始
		const btnW = GD.w / 2, btnH = GD.dU * 1.5;	// ボタン
		btnStrt = new game.ui.Btn({
			x: (GD.w - btnW) / 2, y: GD.h * 0.875 | 0,
			w: btnW, h: btnH, isKeep: false, key: KEYS.start,
			draw: (ctx, p) => {	// 文字ボタンの描画
				ctx.save();
				Object.assign(ctx, {fillStyle: '#fff', globalAlpha: 0.5});
				ctx.fillRect(p.x, p.y, p.w, p.h);
				Object.assign(ctx, {fillStyle: '#a00', globalAlpha: 1,
					font: GD.dU * 1.3 + 'px ' + GD.fonTtl,
					strokeStyle: '#fff', lineWidth: 8, 
					textAlign: 'center', textBaseline: 'middle'});
				ctx.strokeText('START', p.x + p.w / 2, p.y + p.h * 0.45);
				ctx.fillText(  'START', p.x + p.w / 2, p.y + p.h * 0.45);
				ctx.restore();
			},
			act: () => {
				scn.defense.start();		// 開始
			}
		});

		// 背景描画
		const ctx = GD.cnvsArr[GD.lyrBg].ctx;	// 描画対象
		ctx.clearRect(0, 0, GD.w, GD.h);		// 描画領域をクリア
		draw.drawBG(ctx);						// 背景描画
		ctx.drawImage(resouce.image.imgs['logo'], 30, 190);	// ロゴ描画

		// タイトルの描画
		const ttl = 'アマビエディフェンス';
		Object.assign(ctx, {font: '115px ' + GD.fonTtl,
			strokeStyle: '#fff', lineWidth: 8, fillStyle: '#a00'});
		ctx.strokeText(ttl, GD.w / 2, 110);
		ctx.fillText(  ttl, GD.w / 2, 110);

		// コピーライトの描画
		const txt = '(c) 2020 Masakazu Yanai';
		Object.assign(ctx, {font: '40px ' + GD.fonDflt, fillStyle: '#a00'});
		ctx.fillText(txt, GD.w / 2, GD.h - 32);
	};

	// タップ
	_t.tap = function(x, y, t, e) {
		btnStrt.tap(x, y, t, e);			// ボタン開始 タップ
		btnStrt.release(x, y, t, e);		// ボタン開始 解放
		game.screenshot.tap(x, y, t, e);	// スクリーンショット
	};

	// 更新
	_t.update = function(tm) {
		// 変数の初期化と画面のクリア
		const ctx = GD.cnvsArr[GD.lyrMdl].ctx;	// 描画対象
		ctx.clearRect(0, 0, GD.w, GD.h);		// 描画領域をクリア
		btnStrt.draw(ctx);	// ボタン開始 描画
		btnStrt.act();		// ボタン開始 実行
	};
});
