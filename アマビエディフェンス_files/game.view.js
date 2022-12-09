'use strict'; nest(['com.crocro.game.view'], function(_t) {
	// 変数の初期化
	_t.cnvsInf = null;	// キャンバス情報
	_t.eleApp  = null;	// id='app'の要素
	_t.appRct  = {};	// アプリ矩形
	_t.tapFnc  = null;	// タップ実行関数

	// ビューの初期化
	_t.init = function(cnvsInf) {
		_t.cnvsInf = cnvsInf;	// キャンバス情報
		_t.eleApp = document.querySelector('#app');	// id='app'の要素
		_t.initTap();			// タップの初期化
		_t.autoResize();		// 画面サイズの自動変更
	};

	//------------------------------------------------------------
	// アプリ矩形の計算
	_t.calcAppRct = function() {
		// ウィンドウ サイズ、キャンバス サイズ
		const winW = window.innerWidth,   cW = _t.cnvsInf.w;
		const winH = window.innerHeight,  cH = _t.cnvsInf.h;

		// アプリ矩形の計算
		_t.appRct.w = Math.min(winW, winH * cW / cH) | 0;
		_t.appRct.h = Math.min(winH, winW * cH / cW) | 0;
		_t.appRct.x = (winW - _t.appRct.w) / 2 | 0;
		_t.appRct.y = (winH - _t.appRct.h) / 2 | 0;
	};

	// アプリを画面にフィット（app内の全キャンバス）
	_t.fitApp = function() {
		_t.eleApp.querySelectorAll('canvas').forEach(o => {
			o.style.left   = _t.appRct.x + 'px';
			o.style.top    = _t.appRct.y + 'px';
			o.style.width  = _t.appRct.w + 'px';
			o.style.height = _t.appRct.h + 'px';
		});
	};

	// 画面サイズの自動変更
	_t.autoResize = function() {
		// 変数の初期化
		let tmrId = null;	// 遅延実行用のタイマーID
		const fncResize = () => {
			_t.calcAppRct();	// アプリ矩形の計算
			_t.fitApp();		// アプリを画面にフィット
		};
		fncResize();	// 初回実行

		// 遅延付き実行（短時間の連続実行を避ける）
		window.addEventListener('resize', function(e) {
			if (tmrId !== null) {clearTimeout(tmrId)}	// 遅延中なら処理を削除
			tmrId = setTimeout(fncResize, 50);			// 遅延実行
		});
	};

	//------------------------------------------------------------
	// タップの初期化
	_t.initTap = function() {
		// 使用イベント（押下、解放、移動、侵入、離脱）
		const useEvnt = {mousedown: 'down', mouseup: 'up', mousemove: 'move',
			mouseenter: 'enter', mouseleave: 'leave', touchstart: 'down',
			touchend: 'up', touchcancel: 'leave', touchmove: 'move'};
		let last = 0;	// モバイル タッチの連続誤動作対策

		// イベント処理関数
		const fnc = type => {
			return e => {
				// モバイル タッチの連続誤動作対策
				if (type === 'down') {
					const now = +new Date();
					if (now - last < 200) { return }
					last = now;
				}

				// 変数の初期化（クライアント位置、モバイルではタッチを利用）
				const eX = (e.changedTouches ? e.changedTouches[0] : e).clientX;
				const eY = (e.changedTouches ? e.changedTouches[0] : e).clientY;

				// イベント位置の計算（相対サイズからゲーム内位置を求める）
				let eCX = ((eX - _t.appRct.x) * _t.cnvsInf.w / _t.appRct.w) | 0;
				let eCY = ((eY - _t.appRct.y) * _t.cnvsInf.h / _t.appRct.h) | 0;

				// 実行（XY位置とイベント種類を渡す）
				if (typeof _t.tapFnc === 'function') {
					_t.tapFnc(eCX, eCY, type, e);
				}
			}
		};

		// イベントの登録
		Object.keys(useEvnt).forEach(x =>
			_t.eleApp.addEventListener(x, fnc(useEvnt[x])));

		// キーイベントの登録
		const useKeyEvnt = ['keydown', 'keyup'];
		useKeyEvnt.forEach(x => {
			document.body.addEventListener(x, e => {
				if (typeof _t.tapFnc === 'function') {
					_t.tapFnc(0, 0, x, e);
				}
			})
		});
	};

	// タップ実行関数の追加
	_t.add = fnc => _t.tapFnc = fnc;
});
