'use strict'; nest(['com.crocro.game.core'], function(_t) {
	// 変数の初期化
	_t.ua = {};
	_t.ua.pc = ! window.navigator.userAgent.match(	// PCか否かのフラグ
		/iphone|ipod|ipad|android|windows Phone/i);

	// Xorshift
	_t.Xors = function(n) {
		let x, y, z, w;

		this.seed = n => {	// シード
			x = 123456789; y = 362436069; z = 521288629; w = 88675123;
			if (typeof n === 'number') {w = n}
		}

		this.rnd = () => {		// ランダム
			const t = x ^ (x << 11);
			x = y; y = z; z = w;
			return w = (w^(w>>19))^(t^(t>>8));
		}
		this.seed(n);	// 初回実行
	};
});
