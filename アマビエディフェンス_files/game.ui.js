'use strict'; nest(['com.crocro.game.ui'], function(_t) {
	// ボタン オブジェクト
	// prms: {x, y, w, h, isKeep, noWait, draw, act, tmWait1st, tmWaitKeep}
	_t.Btn = function(prms) {
		// 変数の初期化
		let tmWait1st  = prms.tmWait1st  || 50,		// 押下から実行までの時間
			tmWaitKeep = prms.tmWaitKeep || 200,	// 押しっぱなし時のウェイト
			tmAct, keepDown, cntAct,
			keyBind = prms.key !== undefined ? prms.key : null;

		// 初期化
		this.init = function() {
			tmAct = cntAct = 0;
			keepDown = false;
			prms.stat = 'none';
		};
		this.init();

		// 描画
		this.draw = ctx => prms.draw(ctx, prms);	// 描画

		// 実行
		this.act = () => {
			// 有効判定
			if (prms.noWait) { return }
			if (prms.stat !== 'tap' || +new Date() < tmAct) { return }

			// 有効時処理
			if (prms.isKeep && keepDown) {			// 保持の場合
				tmAct = +new Date() + tmWaitKeep;	// 時間を置き再実行
			} else {			// 保持でない or 終了時
				this.init();	// 初期化
			}
			prms.act();		// 実行
			cntAct ++;
		};

		// タップ
		this.tap = (tX, tY, tTyp, e) => {
			// 有効判定
			if (tTyp !== 'down' && tTyp !== 'keydown') { return }
			if (tTyp === 'down' && ! inRngRct(tX, tY, prms)) { return }
			if (tTyp === 'keydown' && e.key !== keyBind) { return }

			if (prms.noWait) {
				// 一時停止無視時
				if (prms.stat === 'none') {
					prms.stat = 'tap';
					setTimeout(() => {
						prms.act();		// 実行
						prms.stat = 'none';
					}, 200);
				}
			} else {
				// 通常時
				if (prms.stat === 'none') {
					prms.stat = 'tap';
					tmAct = +new Date() + tmWait1st;
				}
				keepDown = true;
			}
		};

		// リリース
		this.release = (tX, tY, tTyp, e) => {
			if (tTyp === 'up' || tTyp === 'leave'			// タップ解放時
			 || (tTyp === 'keyup' && e.key === keyBind)) {	// キー解放時
				keepDown = false;
				if (cntAct >= 1) { this.init() }
			}
		}
	};

	// ボタン描画 画像
	_t.drawBtnImg = function(ctx, imgNm, refX, refY, prms) {
		// 通常の描画
		resouce.image.drawSlice(ctx, imgNm, refX, refY, prms);	// 部分描画

		// タップ時の効果
		if (prms.stat !== 'none') {
			Object.assign(ctx, {globalAlpha: 0.5, fillStyle: '#ffa'});
			ctx.fillRect(prms.x, prms.y, prms.w, prms.h);
			Object.assign(ctx, {globalAlpha: 1});
		}
	};
});
