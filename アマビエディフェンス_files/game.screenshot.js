'use strict'; nest(['com.crocro.game.screenshot', 'com.crocro.game'],
function(_t, game) {
	// データURL取得
	_t.getDtUrl = function() {
		const c = game.canvas.genCnvs(GD.w, GD.h);
		GD.cnvsArr.forEach(o => c.ctx.drawImage(o.cnvs, 0, 0));
		try { return c.cnvs.toDataURL(); } catch (e) {}
	};

	// データDL
	_t.dlDt = function(dt) {
		const a = document.createElement('a');
		a.href = dt || 'data:image/png;base64,';	// 不正なら空PNG
		a.download = 'download.png';
		a.click();
	};

	// スクリーンショット ダウンロード
	_t.dl = function() {
//		const c = game.canvas.genCnvs(GD.w, GD.h);
//		GD.cnvsArr.forEach(o => c.ctx.drawImage(o.cnvs, 0, 0));
//		const a = document.createElement('a');
//		a.href = c.cnvs.toDataURL();
//		a.download = 'download.png';
//		a.click();

		_t.dlDt(_t.getDtUrl());
	};

	// スクリーンショット（「^」キーで撮影）
	// ※ セキュリティに引っかかるのでローカルでは動作しない。
	_t.tap = function(x, y, t, e) {
		if (t === 'keydown' && e && e.key === KEYS.screenshot) { _t.dl() }
	}
});
