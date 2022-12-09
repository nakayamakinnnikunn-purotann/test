'use strict'; nest(['resouce.image'], function(_t) {
	_t.imgs = {};	// 読み込んだ画像の配列

	// 読み込み
	_t.load = function(nm, url) {
		return new Promise((resolve, reject) => {	// プロミスを戻す
			const img = _t.imgs[nm] = new Image();	// イメージ
			img.onload = () => resolve('load img : ' + nm);	// 読み込み後処理
			img.src = url;	// URLを指定して読み込み開始
		});
	};

	// 部分描画
	_t.drawSlice = function(ctx, imgNm, refX, refY, rct) {
		_t.drawSliceRaw(ctx, imgNm, refX, refY, rct.x, rct.y, rct.w, rct.h);
	};
	_t.drawSliceRaw = function(ctx, imgNm, refX, refY, x, y, w, h) {
		const img = resouce.image.imgs[imgNm];
		ctx.drawImage(img, refX * w, refY * h, w, h, x, y, w, h);
	};
});
