// ---------------------------------------------------------------------------------
/// テクスチャーの読み込みを行うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function Texture() {
    this.texObj; // GL用テクスチャーオブジェクト
    this.imgObj; // イメージオブジェクト
}


// 読み込んだテクスチャーを格納する変数
Texture.textureList = new Object();

// イメージオブジェクトを格納する変数
Texture.imageList = new Object();

// ------------------------------------------------------
/// テクスチャを読み込みリストに格納する関数
/// [in] url テクスチャファイルのURL
// ------------------------------------------------------
Texture.prototype.load = function (url) {
    // テクスチャーリストに登録済み
    if(Texture.textureList[url] != undefined) {
        this.texObj = Texture.textureList[url];
        this.imgObj = Texture.imageList[url];
        return;
    }
    
    var tex = gl.createTexture();  // テクスチャーオブジェクト
    var img = new Image();         // イメージオブジェクト
    
    this.texObj = tex;
    this.imgObj = img;
    
    // 読み込み完了時
    img.onload = function(){
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
        
        // テクスチャーリストに登録
        Texture.textureList[url] = tex;
        
        // イメージオブジェクトリストに登録
        Texture.imageList[url] = img;
    }
    
    // 読み込み失敗時
    img.onerror = function() {
        console.log(url + "：画像の読み込みに失敗しました");
    }
    
    img.src = url;
}


// ------------------------------------------------------
/// テクスチャーリストを空にする
// ------------------------------------------------------
Texture.clearTextreList = function() {
    for(var element in Texture.textureList){
        delete element;
    }
}
