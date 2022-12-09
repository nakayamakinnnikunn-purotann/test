'use strict'; nest(['scn.defense', 'com.crocro.game'], function(_t, game) {
	// 変数の初期化
	_t.btn = [];
	_t.isPause = false;

	// 開始
	_t.start = function() {
		// 初期化
		_t.btn = [];
		_t.isPause = false;

		// 初期化
		game.view.add(_t.tap);		// タップの登録
		game.anim.add(_t.update);	// 更新の登録
		defense.init();				// タワーディフェンス初期化
		_t.initBtn();				// ボタンの初期化

		// 背景描画
		const ctx = GD.cnvsArr[GD.lyrBg].ctx;	// 描画対象
		ctx.clearRect(0, 0, GD.w, GD.h);		// 描画領域をクリア
		draw.drawBG(ctx);		// 背景描画
		draw.drawBrdBG(ctx);	// 盤面背景描画
	};

	// タップ
	_t.tap = function(x, y, t, e) {
		// 変数の初期化
		const btn = _t.btn;

		// フェイズによる処理の分岐
		if (UD.phase === 'play') {		// プレイ時操作
			Object.keys(btn).forEach(k => btn[k].tap(x, y, t, e));	// タップ
			if (_t.isPause) { return }	// 一時停止時は飛ばす
			defense.selBoard(x, y, t);	// 盤面選択
		} else
		if (UD.phase === 'end') {		// 終了時操作
			if (game.anim.tm.sum >= UD.tmWaitStart + 1000 && t === 'down') {
				defense.dlgEnd_open();
			}
		}

		Object.keys(btn).forEach(k => btn[k].release(x, y, t, e));	// 解放
		game.screenshot.tap(x, y, t, e);	// スクリーンショット
	};

	// 更新
	_t.update = function(tm) {
		// 変数の初期化と画面のクリア
		const w = GD.w, h = GD.h, btn = _t.btn;
		const ctx = GD.cnvsArr[GD.lyrMdl].ctx;	// 描画対象
		ctx.clearRect(0, 0, w, h);				// 描画領域をクリア

		// 描画
		Object.keys(btn).forEach(k => btn[k].draw(ctx));	// 描画
		draw.drawInfo(ctx);		// 情報描画
		draw.drawCoin(ctx);		// コイン描画
		draw.drawPoint(ctx);	// 特典描画
		draw.drawTower(ctx);	// 塔描画
		draw.drawEnemy(ctx);	// 敵描画
		draw.drawBullet(ctx);	// 弾描画
		draw.drawEnd(ctx);		// 終了描画

		//------------------------------------------------------------
		// 操作の反映とゲームの更新
		Object.keys(btn).forEach(k => btn[k].act());	// 実行
		defense.prgrssTm();		// 時間進行
		enemy.move();			// 敵移動
		bullet.move();			// 弾移動
		tower.atack();			// 塔攻撃
	};
});
