function main() {
	// Canvas要素の取得
	canvas = document.getElementById('canvas');
	canvas.width = 800;
	canvas.height = 400;
	
	// WebGLコンテキストの取得
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	
	// ポリゴンの表裏の設定
	gl.frontFace(gl.CW);
	
	// カリングを有効
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);
	
	// 深度テストを有効
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	// ピクセルブレンディングを有効化
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

	// 背景色の設定
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	// カメラの設定
	camera = new Camera();
	camera.perspective(45, canvas.width / canvas.height, 0.1, 1000.0);
	
	var scene = new GameMain();
	
	// FPS管理用
	var dateObj = new Date();
	var time;             // 時間格納用
	timer = new Timer();
	
	// メインループスタート
	loop();
   
   // メインループ
   function loop() {
	   time = dateObj.getTime();
	   
		gl.clear(gl.DEPTH_BUFFR_BIT || gl.COLOR_BUFFER_BIT);
		
		scene.update();
		scene.draw();
		
		gl.flush();
		
		timer.deltaTime = dateObj.getTime() - time;
		window.requestAnimationFrame(loop);
	}
}
