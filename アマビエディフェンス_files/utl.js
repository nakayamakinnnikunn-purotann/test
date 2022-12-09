'use strict';
// JavaScriptをロードする
window.loadJS = function(dir, arg) {
	arg.forEach(x => document.write(`<script src="${dir}${x}"></script>`));
};

// CSSをロードする
window.loadCSS = function(arg) {
	arg.forEach(x => document.write(`<link rel="stylesheet" href="${x}">`));
};

// ネスト作成
// 「.」区切りのpath配列から、ネストしたオブジェクトを作り、関数の引数にする。
// （存在するオブジェクトは再利用）
window.nest = function(pathArr, fnc) {
	const args = pathArr.map(path => {
		let o = window;
		path.split('.').forEach(k => o = !o[k] ? o[k]={} : o[k]);	// 構築
		return o;
	});
	fnc.apply(null, args);	// 作成オブジェクトを関数に渡す
};

// 範囲内か判定
//   cX, cY - check X、check Y  /  x, y, w, h - 矩形領域 / rct - 矩形
window.inRng = (cX,cY,x,y,w,h) => x <= cX && cX < x+w && y <= cY && cY < y+h;
window.inRngRct = (cX,cY,rct) => inRng(cX, cY, rct.x, rct.y, rct.w, rct.h);

// 最小～最大の範囲にnを収める
window.minMax = (min, n, max) => Math.max(min, Math.min(n, max));
