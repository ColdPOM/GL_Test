// ---------------------------------------------------------------------------------
/// 3Dモデルを扱うクラス
// ---------------------------------------------------------------------------------

class Model {

	// ------------------------------------------------------
	/// コンストラクタ
	/// [param] url モデルファイルのURL
	// ------------------------------------------------------
	constructor(url) {
		this.pos = new Vector3(0.0, 0.0, 0.0);    // 座標
		this.rot = new Vector3(0.0, 0.0, 0.0);  // 回転値
		this.scale = new Vector3(1.0, 1.0, 1.0);  // 拡大率
		
		this.url = url; // ファイル名
		this.path = ""; // モデルファイルのパス
		this.modelData; // モデル情報
		
		this.loadStep = 0; // ロードの進捗
		this.loaded = false;  // 読み込み完了フラグ
		
		this.textures = [];
		
		this.shader = new Shader();
				
		this.vertexLocation;
		this.normalLocation;
		this.coordLocation;
		
		this.p_vbo;
		this.n_vbo;
		this.c_vbo;
		this.ibo;

		// モデルファイルまでのpath計算
		let dir = url.split("/");
		for (let i = 0; i < dir.length - 1; i++) {
			this.path += dir[i] + "/";
		}
	}

	// ------------------------------------------------------
	/// 更新
	// ------------------------------------------------------
	update() {
		// 読み込み完了チェック
		if (!this.loaded) {
			switch(this.loadStep)
			{				
				// モデルの読み込み
				case 0:
				{
					this.loadStep = 1;
					
					// モデルの読み込み開始
					let callback = (modelData) => {
						this.modelData = modelData;
						this.loadStep = 2;
					}
					this.loadModel(this.url, callback);
				}
				break;
				
				// モデル読み込み待ち
				case 1:
				break;
				
				// テクスチャーの読み込み
				case 2:
				{
					this.loadStep = 3;
					for (let i = 0; i < this.modelData.BodyParts.length; i++) {
						this.textures[i] = (new Texture(this.path + this.modelData.BodyParts[i].TextureFile));
					}
				}
				break;
				
				// テクスチャー読み込み待ち
				case 3:
				{
					let textureLoaded = true;
					for (let i = 0; i < this.textures.length; i++) {
						if (this.textures[i] === null || !this.textures[i].loaded) {
							textureLoaded = false;
							break;
						}
					}
					if(textureLoaded)
					{
						this.loadStep = 4;
					}
				}
				break;
				
				// シェーダーの読み込み
				case 4:
				{
					this.loadStep = 5;
					
					this.shader.createProgram();
					let callback = () => {
						this.loadStep++;
					}
					this.shader.loadShader("shader/sample.vert", gl.VERTEX_SHADER, callback);
					this.shader.loadShader("shader/sample.frag", gl.FRAGMENT_SHADER, callback);
				}
				break;
				
				// シェーダー読み込み待ち
				case 5:
				case 6:
				break;
				
				case 7:
				{
					this.shader.linkShader();
					
					// ロケーションの取得
					this.vertexLocation = this.shader.getAttribLocation("Vertex");
					this.normalLocation = this.shader.getAttribLocation("Normal");
					this.coordLocation = this.shader.getAttribLocation("Coord");

					// attribute属性を有効にする
					gl.enableVertexAttribArray(this.vertexLocation);
					gl.enableVertexAttribArray(this.normalLocation);
					gl.enableVertexAttribArray(this.coordLocation);

					// VBOの生成
					this.p_vbo = BufferObject.createVBO(this.modelData.VertexPosition);
					this.n_vbo = BufferObject.createVBO(this.modelData.NormalVector);
					this.c_vbo = BufferObject.createVBO(this.modelData.TextureCoord);
					this.ibo = BufferObject.createIBO(this.modelData.Index);
					
					this.loadStep = -1;
					this.loaded = true;
				}
			}
		}
		
		console.log(this.loadStep);
	}

	// ------------------------------------------------------
	/// 描画
	// ------------------------------------------------------
	draw() {
		if (!this.loaded) return;

		// 行列の計算
		var mat = Matrix4x4.identity();
		mat = Matrix4x4.multiply(mat, camera.projectionMatrix);
		mat = Matrix4x4.multiply(mat, camera.viewMatrix);
		var modelMat = Matrix4x4.multiply(Matrix4x4.translate(this.pos), Matrix4x4.rotate(this.rot));
		modelMat = Matrix4x4.multiply(modelMat, Matrix4x4.scale(this.scale));

		mat = Matrix4x4.multiply(mat, modelMat);

		// シェーダーを有効化
		this.shader.begin();


		// vboを有効化
		gl.bindBuffer(gl.ARRAY_BUFFER, this.p_vbo);
		gl.vertexAttribPointer(this.vertexLocation, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.n_vbo);
		gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.c_vbo);
		gl.vertexAttribPointer(this.coordLocation, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);

		// パーツ毎に描画
		var beginIndex = 0;
		for (var i = 0; i < this.modelData.BodyParts.length; i++) {
			// テクスチャを有効化
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.textures[i].texObj);

			// ユニフォーム変数に値を送る
			this.shader.uniformMatrix4fv("mvpMatrix", mat.toArray());
			this.shader.uniformMatrix4fv("modelMatrix", modelMat.toArray());
			this.shader.uniform1i("Texture", 0);
			// モデルの描画
			gl.drawElements(gl.TRIANGLES, this.modelData.BodyParts[i].SampleNumber, gl.UNSIGNED_SHORT, beginIndex * 2);

			beginIndex += this.modelData.BodyParts[i].SampleNumber;
		}

	}
	
	/**
	 * モデルを非同期で読み込み、読み込んだモデルオブジェクトを引数としたcallback関数を実行する
	 * @param {string} url シェーダーファイルのURL
	 * @param {function(Object)} callback コールバック
	 */
	loadModel(url, callback) {
		var request = new XMLHttpRequest();

		request.open("GET", url, true);
		request.onload  = function (e) {
			if (request.readyState === 4) {
				if (request.status === 200) {
					callback(eval("(" + request.responseText + ")"));
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
