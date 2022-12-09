'use strict'; nest(['resouce.font', 'com.crocro.game'], function(_t, game) {
	// フォントの読み込み
	_t.load = function(fntNm, pth) {
		// 読み込み確認
		return new Promise((resolve, reject) => {
			const f1 = 'serif', f2 = fntNm + ', serif', chckTxt = 'abcdefg',
				  c = game.canvas.genCnvs(1, 1);
			let tryCnt = 0, tryMax = 30;
			document.body.appendChild(c.cnvs);

			const fnc = function() {
				if (tryCnt ++ >= tryMax) {
					const msg = 'err fnt : ' + fntNm;
					console.log(msg);
					resolve(msg);
					c.cnvs.parentNode.removeChild(c.cnvs);
					return;
				}

				c.ctx.font = '32px ' + f1;
				const mt1 = c.ctx.measureText(chckTxt).width;

				c.ctx.font = '32px ' + f2;
				const mt2 = c.ctx.measureText(chckTxt).width;

				if (mt1 != mt2) {
					const msg = 'load fnt : ' + fntNm;
					resolve(msg);
					c.cnvs.parentNode.removeChild(c.cnvs);
					return;
				}
				setTimeout(fnc, 100);
			};
			fnc();
		});
	};
});
