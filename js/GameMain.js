/**
 * ゲームシステム全体のトップとなるクラス
 */

class GameMain {
	
	constructor(){
		camera.lookAt(new Vector3(0, 5, 10), new Vector3(0.0, 3.0, 0.0), new Vector3(0.0, 1.0, 0.0));

		this.model = new Model("model/sample.json");
		this.model.scale = new Vector3(1.0, 1.0, 1.0);
	}
	
	// 更新
	update() {
		this.model.update();
		this.model.rot.y += 1;
	}

	// 描画
	draw() {
		this.model.draw();
	}
}
