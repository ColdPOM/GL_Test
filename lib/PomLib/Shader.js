// ---------------------------------------------------------------------------------
/// シェーダーを扱うクラス
// ---------------------------------------------------------------------------------

class Shader {

	constructor() {
		this.shaderProgram;
	}

	// ------------------------------------------------------
	/// シェーダープログラムの生成
	// ------------------------------------------------------
	createProgram() {
		this.shaderProgram = gl.createProgram();
	}


	// ------------------------------------------------------
	/// シェーダーを読み込みアタッチする
	/// [param] url シェーダーファイルのURL
	/// [param] type シェーダーの種類
	// ------------------------------------------------------
	/**
	 * 
	 * @param {string} url 
	 * @param {gl.shaderType} type 
	 * @param {function} callback 
	 */
	loadShader(url, type, callback) {
		
		var shaderObj;

		// シェーダーオブジェクトの生成
		switch (type) {
			case gl.VERTEX_SHADER:
				shaderObj = gl.createShader(gl.VERTEX_SHADER);
				break;

			case gl.FRAGMENT_SHADER:
				shaderObj = gl.createShader(gl.FRAGMENT_SHADER);
				break;

			default:
				console.log("シェーダーの種類が正しくありません");
				return;
		}

		// シェーダーソースをシェーダーオブジェクトに読み込む
		var readCallback = (shaderText) => {
			
			gl.shaderSource(shaderObj, shaderText);

			// シェーダーをコンパイル
			gl.compileShader(shaderObj);

			// コンパイル失敗
			if (!gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)) {
				console.log(url + "：シェーダーのコンパイルに失敗しました");
				console.log(gl.getShaderInfoLog(shaderObj));

				return;
			}

			// シェーダーをアタッチ
			gl.attachShader(this.shaderProgram, shaderObj);

			// シェーダーオブジェクトの削除
			gl.deleteShader(shaderObj);
			
			callback();
		}
		this.readShaderFile(url, readCallback);
	}


	// ------------------------------------------------------
	/// シェーダーのリンク
	// ------------------------------------------------------
	linkShader() {
		gl.linkProgram(this.shaderProgram);

		// リンク失敗
		if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
			console.log("シェーダーのリンクに失敗しました");
			console.log(gl.getProgramInfoLog(this.shaderProgram));
		}
	}
	
	// ------------------------------------------------------
	/// シェーダーを有効にする
	// ------------------------------------------------------
	begin() {
		gl.useProgram(this.shaderProgram);
	}


	// attribute変数のロケーションを返す
	getAttribLocation(variableName) { return gl.getAttribLocation(this.shaderProgram, variableName); }

	// Uniform変数にint型の値を送る
	uniform1i(variableName, value) { gl.uniform1i(gl.getUniformLocation(this.shaderProgram, variableName), value); }
	// Uniform変数にfloat型の値を送る
	uniform1f(variableName, value) { gl.uniform1f(gl.getUniformLocation(this.shaderProgram, variableName), value); }
	// Uniform変数にMatrix4x4型の値を送る
	uniformMatrix4fv(variableName, value) { gl.uniformMatrix4fv(gl.getUniformLocation(this.shaderProgram, variableName), false, value); }



	// private
	
	/**
	 * シェーダーを非同期で読み込み、読み込んだシェーダーテキストを引数としたcallback関数を実行する
	 * @param {string} url シェーダーファイルのURL
	 * @param {function(string)} callback コールバック
	 */
	readShaderFile(url, callback) {
		var request = new XMLHttpRequest();

		request.open("GET", url, true);
		request.onload  = function (e) {
			if (request.readyState === 4) {
			  if (request.status === 200) {
				callback(request.responseText);
			  } 
			  else {
				console.error(request.statusText);
			  }
			}
		}
		
		request.onerror = function(e) {
			console.error(request.statusText);
		}
		
		request.send(null);
	}
}