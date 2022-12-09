'use strict'; nest(['scn.defense', 'com.crocro.game'], function(_t, game) {
	// ボタンの初期化
	_t.initBtn = function() {
		// ボタンの初期化
		for (let i = 0; i < GD.btnId.size; i ++) {
			(function(i) {
				// 設定
				const arg = {x: GD.lUI.x + GD.btn.w * i, y: GD.lUI.y,
					w: GD.btn.w, h: GD.btn.h, noWait: true,
					draw: (ctx, p) => {
						draw.drawSel(ctx, p, UD.selBtn === i, true);
						game.ui.drawBtnImg(ctx, 'btn', i, 0, p); },
					act: () => {
						if (_t.isPause) { return }
						UD.selBtn = i;
						UD.selPos = -1; }
				};

				// レベル上げ
				if (i === GD.btnId.lv) { arg.act = () => tower.lvUp() }

				// 一時停止
				if (i === GD.btnId.pause) {
					arg.act = () => {
						if (!_t.isPause) { game.anim.stop()  }	// 停止
						else             { game.anim.start() }	// 開始
						_t.isPause = !_t.isPause; };
				}

				_t.btn.push(new game.ui.Btn(arg));	// ボタン追加
			})(i);
		}
	};
});
