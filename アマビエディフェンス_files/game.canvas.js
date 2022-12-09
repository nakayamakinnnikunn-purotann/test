'use strict'; nest(['com.crocro.game.canvas'], function(_t) {
	// キャンバスの生成
	_t.genCnvs = function(w, h) {
		const cnvs = document.createElement('canvas');	// キャンバス生成
		cnvs.setAttribute('width', w);					// 横幅設定
		cnvs.setAttribute('height', h);					// 高さ設定
		const ctx = cnvs.getContext('2d');				// 2Dコンテキスト
		ctx.textAlign = 'center';						// 文字横を中央
		ctx.textBaseline = 'middle';					// 文字縦を中央
		return {cnvs: cnvs, ctx: ctx, w: w, h: h};		// 戻り値
	};

	// キャンバス情報生成
	_t.genCnvsInf = function(arg) {
		const o = {w: 320, h: 240, layerMax: 2, bg: '#000'};	// 初期設定
		for (let k in arg) {				// 初期設定にある要素のみ反映
			if (o[k] !== undefined) { o[k] = arg[k] }	// 引数の反映
		}
		return o;	// 反映済みオブジェクトを戻す
	};

	// キャンバス配列の初期化
	_t.initCnvsArr = function(cnvsInf) {
		// 変数の初期化
		const cnvsArr = [];		// キャンバス用配列
		const app = document.querySelector('#app');	// id="app"を選択

		// レイヤー枚数のキャンバスを初期化
		for (let i = 0; i < cnvsInf.layerMax; i ++) {
			const c = _t.genCnvs(cnvsInf.w, cnvsInf.h);		// キャンバス生成
			c.ctx.fillStyle = c.bg = cnvsInf.bg;			// 背景色を追加
			if (i === 0) { c.ctx.fillRect(0, 0, c.w, c.h) }	// 一番下塗り潰し
			app.appendChild(c.cnvs);	// DOMに追加
			cnvsArr.push(c);			// 配列に追加
		}
		return cnvsArr;		// キャンバス用配列を戻す
	};
});
