// main.js

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// ノーツの種類
var noteTypes = ["circle", "square", "triangle"];

// ノーツの位置
var notes = [];

// スコア
var score = 0;

// レベル
var level = 1;

// ゲームの開始
function startGame() {
  // ノーツを生成
  for (var i = 0; i < 10; i++) {
    var noteType = noteTypes[Math.floor(Math.random() * noteTypes.length)];
    var noteY = Math.floor(Math.random() * canvas.height);
    notes.push({
      type: noteType,
      y: noteY,
    });
  }

  // タイマーを開始
  window.setInterval(update, 1000 / 60);
}

// タイマーの処理
function update() {
  // ノーツを移動
  for (var i = 0; i < notes.length; i++) {
    notes[i].y += 10;
  }

  // ノーツを描画
  for (var i = 0; i < notes.length; i++) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    switch (notes[i].type) {
      case "circle":
        ctx.arc(notes[i].y, notes[i].y, 20, 0, 2 * Math.PI);
        break;
      case "square":
        ctx.rect(notes[i].y - 20, notes[i].y - 20, 40, 40);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(notes[i].y, notes[i].y + 20);
        ctx.lineTo(notes[i].y - 20, notes[i].y - 20);
        ctx.lineTo(notes[i].y + 20, notes[i].y - 20);
        ctx.closePath();
        break;
    }
    ctx.fill();
  }

  // ノーツの判定
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].y >= canvas.height) {
      // ノーツを消去
      notes.splice(i, 1);
    } else if (notes[i].y >= canvas.height / 2) {
      // ノーツをタップ
      if (isKeyPressed(notes[i].type)) {
        score
