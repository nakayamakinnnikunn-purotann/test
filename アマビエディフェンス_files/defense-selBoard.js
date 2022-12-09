'use strict'; nest(['defense', 'com.crocro.game'], function(_t, game) {
	// 盤面選択
	_t.selBoard = function(x, y, t) {
		// 有効な入力か確認
		if (t !== 'down' || ! inRngRct(x, y, GD.lBrd)) { return }	// 無効

		// 変数の初期化
		const uX = (x - GD.lBrd.x) / GD.dU | 0;	// 単位X位置
		const uY = (y - GD.lBrd.y) / GD.dU | 0;	// 単位Y位置
		const uI = uX + uY * GD.brd.w;			// 単位配列位置
		const o = UD.brd[uI];					// タップ対象
		if (o === GD.n.wall || o === GD.n.hole) { return }	//	無効マス
		UD.selPos = uI;							// 選択位置

		// 以降は、塔配置の処理
		if (o !== GD.n.blank) { return }	//	空きマスでないので置けない

		// 仮置き判定（敵がゴールまで行けるか確認）
		UD.brd[uI] = {};							// 仮配置
		const costMap = enemy.genCostMap('walk');	// コスト地図の生成
		UD.brd[uI] = GD.n.blank;					// 仮配置を戻す
		if (! enemy.checkCostMap(costMap)) {		// コスト地図が有効か確認
			UD.selPos = -1;		// 選択解除
			return;				// 道を塞ぐので置けない
		}

		// 変数の初期化
		const type = UD.selBtn;
		const gT = GD.tower[type];

		// お金が足りるなら塔配置
		if (UD.coin >= gT.price) {
			UD.brd[uI] = tower.gen(uX, uY, type);	// 配置
			UD.coin -= gT.price;					// 金消費
			enemy.setCostMap('walk', costMap);		// コスト地図の設定
			enemy.resetRoute();						// ルートの再計算
		}
	};
});
