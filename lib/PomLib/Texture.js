// ---------------------------------------------------------------------------------
/// テクスチャーの読み込みを行うクラス
// ---------------------------------------------------------------------------------

class Texture {
	
	/**
	 * 設定したurlのテクスチャを読み込み初期化
	 * @param {string} url テクスチャファイルのURL 
	 */
	constructor(url) {
		if(Texture.textureList === undefined || Texture.imageList === undefined) {
			Texture.textureList = new Object(); // 読み込んだテクスチャーリスト
			Texture.imageList = new Object();   // イメージオブジェクトリスト
		}
		
		this.texObj = null; // GL用テクスチャーオブジェクト
		this.imgObj = null; // イメージオブジェクト
		
		this.loaded = false;
		
		this.load(url);
	}

	// ------------------------------------------------------
	/// テクスチャを読み込みリストに格納する関数
	/// [param] url テクスチャファイルのURL
	// ------------------------------------------------------
	/**
	 * テクスチャを読み込みリストに格納する関数
	 * @param {string} url テクスチャファイルのURL
	 */
	load(url) {
		// TODO:一旦多重読み込みする形式にしておく
		/*
		// テクスチャーリストに登録済み
		if (Texture.textureList[url] !== undefined) {
			this.texObj = Texture.textureList[url];
			this.imgObj = Texture.imageList[url];
			this.loaded = true;
			return;
		}
		*/
		
		var tex = gl.createTexture();  // テクスチャーオブジェクト
		var img = new Image();         // イメージオブジェクト

		this.texObj = tex;
		this.imgObj = img;
		
		Texture.textureList[url] = tex;
		Texture.imageList[url] = img;

		// 読み込み完了時
		img.onload = () => {
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
			gl.generateMipmap(gl.TEXTURE_2D);

			//　拡大・縮小する方法の指定
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

			// テクスチャの繰り返し
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);

			gl.bindTexture(gl.TEXTURE_2D, null);
			this.loaded = true;
		}

		// 読み込み失敗時
		img.onerror = function() {
			this.texObj = null;
			this.imgObj = null;			
			Texture.textureList[url] = tex;
			Texture.imageList[url] = img;
			console.log(url + "：画像の読み込みに失敗しました");
		}
		
		// 読み込み開始
		img.src = url;
	}


	// ------------------------------------------------------
	/// テクスチャーリストを空にする
	// ------------------------------------------------------
	static clearTextreList() {
		textureList = new Object();
		imageList = new Object();
	}
}