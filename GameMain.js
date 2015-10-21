// ---------------------------------------------------------------------------------
/// ゲームメインクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function GameMain() {
    camera.lookAt(new Vec3(0, 5, 10), new Vec3(0.0, 3.0, 0.0), new Vec3(0.0, 1.0, 0.0));
    
    this.model = new Model("model/Flareon/Flareon.json");
    this.model.scale = new Vec3(0.1, 0.1, 0.1);
}


// ------------------------------------------------------
/// 更新
// ------------------------------------------------------
GameMain.prototype.update = function() {
    this.model.update();
    this.model.rot.y += 2;
}


// ------------------------------------------------------
/// 描画
// ------------------------------------------------------
GameMain.prototype.draw = function() {
    this.model.draw();
}