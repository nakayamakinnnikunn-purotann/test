'use strict'; nest(['defense', 'com.crocro.game'], function(_t, game) {
	// 初期化
	_t.init = function() {
		globalData.initUD();	// ユーザー データの初期化

		// コスト地図の生成と設定
		enemy.setCostMap('walk', enemy.genCostMap('walk'));
		enemy.setCostMap('fly',  enemy.genCostMap('fly'));
	};

	// 時間進行
	_t.prgrssTm = function() {
		if (UD.phase !== 'play') { return }	// プレイ中でなければ飛ばす

		// 変数の更新
		UD.tmSum += game.anim.tm.dif;		// 合計経過時間
		UD.coin  += game.anim.tm.dif / 100;	// 収入

		// 移動時間の判定
		if (UD.tmSum - UD.tmWaveLast >= GD.waveInterval) {
			UD.tmWaveLast += GD.waveInterval;	// 時間の更新
			const bs = GD.enemyPerWave.base, up = GD.enemyPerWave.up;
			const eMax = bs + (UD.waveCnt / GD.wave.length | 0) * up;	// 敵数
			const eInterval = (GD.waveInterval * 0.5 / eMax) | 0;	// 敵間隔

			// 出現ポイントの設定
			const pos = GD.start[GD.xors.rnd() % GD.start.length];
			const type = GD.wave[UD.waveCnt % GD.wave.length];
			UD.waveCnt ++;

			// 次の敵を生成
			for (let i = 0; i < eMax; i ++) {
				const ene = enemy.gen(pos.x, pos.y, type);
				ene.tmGen  += i * eInterval;	// 時間をずらす
				ene.tmLast += i * eInterval;	// 時間をずらす
				UD.wave.push(ene);
			}
		}
	};

	// 進行終了
	_t.prgrssEnd = function(type) {
		if (UD.phase === 'end') { return }

		// 終了処理
		UD.phase = 'end';	// ゲーム終了
		UD.endMsg = 'END';
		UD.tmWaitStart = game.anim.tm.sum;	// 待機
	};

	// 終了ダイアログ：開く
	_t.dlgEnd_open = function() {
		if (UD.endDlg) { return; }
		UD.endDlg = true;

		const url = encodeURIComponent(GD.urlThis);
		const txt = encodeURIComponent(`『アマビエディフェンス』で遊びました。得点は${UD.pnt}点！`);
		const hashtags = encodeURIComponent(`AmabieDefense`);

		const app = document.querySelector('#app');
		const div = document.createElement('div');
		app.appendChild(div);
		div.classList.add('dlgEndOut');

		div.innerHTML = `
<div class="dlgEndIn">
  <div class="dlgEndBtnOut">
    <a href="https://twitter.com/share?url=${url}&text=${txt}&hashtags=${hashtags}" target="_blank" class="dlgEndBtn">Twitter でつぶやく</a> 
  </div>
  <div class="dlgEndBtnOut">
    <a href="javascript: defense.dlgEnd_ss();" class="dlgEndBtn">スクリーンショットを保存</a>
  </div>
  <div class="dlgEndBtnOut">
    <a href="javascript: defense.dlgEnd_end();" class="dlgEndBtn">終了</a>
  </div>
</div>
		`;
	};

	// 終了ダイアログ：終了
	_t.dlgEnd_end = function(type) {
		const msg = '終了してよいですか？';
		if (window.confirm(msg)) {
			UD.endDlg = false;
			scn.title.start();		// タイトルに移動
			const app = document.querySelector('.dlgEndOut');
			app.parentNode.removeChild(app);
		}
	};

	// 終了ダイアログ：スクリーンショットを保存
	_t.dlgEnd_ss = function(type) {
		game.screenshot.dlDt(UD.ss || '');
	};
});
