'use strict'; nest(['com.crocro.game.anim'], function(_t) {
	// アニメーション実行/停止用関数（ブラウザ依存を吸収）
	_t.rqstAnmFrm = function(cb) {	// 実行
		return (
	 		window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			(cb => window.setTimeout(cb, 1000 / 60))
		)(cb);
	};
	_t.cnclAnmFrm = function(id) {	// 停止
		(window.cancelAnimationFrame              ||
		 window.webkitCancelRequestAnimationFrame ||
		 window.mozCancelRequestAnimationFrame    ||
		 window.oCancelRequestAnimationFrame      ||
		 window.msCancelRequestAnimationFrame     ||
		 window.clearTimeout)(id)
	};

	// アニメーション用変数
	_t.anmId = null;		// ループ用ID
	_t.updateFnc = null;	// 更新実行関数（アニメ更新の度に呼び出される）
	_t.tm = {sum: 0, old: null, now: 0, dif: 0};	// 時間オブジェクト
	_t.flgStop = false;		// 停止フラグ

	//------------------------------------------------------------
	// アニメーションの開始
	_t.start = function() {
		_t.flgStop = false;		// 停止フラグを偽に
		_t.tm.old = new Date();	// 時間 旧の初期化

		// アニメーション ループ
		const anmFnc = () => {	// 更新→実行
			_t.update();
			if (! _t.flgStop) { _t.anmId = _t.rqstAnmFrm(anmFnc) }
		};
		anmFnc();	// 初回実行
	};

	// アニメーションの停止
	_t.stop = function() {
		if (_t.anmId === null) { return }	// アニメ未実行時は無視
		_t.cnclAnmFrm(_t.anmId);			// アニメ停止
		_t.flgStop = true;					// 停止フラグを真に
	};

	// アニメーションの更新
	_t.update = function() {
		// 差分時間と経過時間を計算
		_t.tm.now = +new Date();	// 新
		_t.tm.dif =  _t.tm.old == null ? 0 : _t.tm.now - _t.tm.old;	// 差分
		_t.tm.sum += _t.tm.dif;		// 合計
		_t.tm.old =  _t.tm.now;		// 旧更新

		// 更新実行関数の実行
		if (typeof _t.updateFnc === 'function') { _t.updateFnc(_t.tm) }
	};

	// 更新実行関数を設定
	_t.add = fnc => _t.updateFnc = fnc;
});
