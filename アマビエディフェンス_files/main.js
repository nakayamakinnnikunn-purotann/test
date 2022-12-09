'use strict';
document.addEventListener('DOMContentLoaded', function() {	// 読み込み後開始
	// データの初期化
	globalData.initGD();	// 一般データの初期化
	globalData.initUD();	// ユーザー データの初期化

	// 画面の初期化
	const game = window.com.crocro.game;		// ショートカットの作成
	GD.cnvsInf = game.canvas.genCnvsInf(GD);			// CnvsInf生成
	GD.cnvsArr = game.canvas.initCnvsArr(GD.cnvsInf);	// CnvsArrの初期化
	game.view.init(GD.cnvsInf);							// 表示の初期化

	// キー設定
	window.KEYS = {start: ' ', screenshot: '^'};

	//------------------------------------------------------------
	// リソース
	const r = [];

	// フォントの読み込み
	r.push(resouce.font.load(GD.fonDflt));
	r.push(resouce.font.load(GD.fonTtl));

	// 画像の読み込み
	r.push(resouce.image.load('logo', 'img/logo.png'));
	r.push(resouce.image.load('btn',  'img/button.png'));
	r.push(resouce.image.load('ene',  'img/enemy.png'));
	r.push(resouce.image.load('twr',  'img/tower.png'));
	r.push(resouce.image.load('blt',  'img/bullet.png'));

	// リソース読み込み後開始
	Promise.all(r).then(arg => {
		scn.title.start();	// タイトル開始
		game.anim.start();	// アニメーション開始
	});
});
