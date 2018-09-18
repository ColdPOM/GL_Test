// ---------------------------------------------------------------------------------
/// シェーダーを扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function Shader() {
	this.shaderProgram;
}


// ------------------------------------------------------
/// シェーダープログラムの生成
// ------------------------------------------------------
Shader.prototype.createProgram = function() {
	this.shaderProgram = gl.createProgram();
}


// ------------------------------------------------------
/// シェーダーを読み込みアタッチする
/// [param] url シェーダーファイルのURL
/// [param] type シェーダーの種類
// ------------------------------------------------------
Shader.prototype.loadShader = function(url, type) {
	var shaderObj;
	
	// シェーダーオブジェクトの生成
	switch(type){
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
	gl.shaderSource(shaderObj, this.readShaderFile(url));

	// シェーダーをコンパイル
	gl.compileShader(shaderObj);
	
	// コンパイル失敗
	if(!gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)){
		console.log(url + "：シェーダーのコンパイルに失敗しました");
        console.log(gl.getShaderInfoLog(shaderObj));
        
		return;
	}
	
	// シェーダーをアタッチ
	gl.attachShader(this.shaderProgram, shaderObj);
	
	// シェーダーオブジェクトの削除
	gl.deleteShader(shaderObj);
}


// ------------------------------------------------------
/// シェーダーのリンク
// ------------------------------------------------------
Shader.prototype.linkShader = function() {
	gl.linkProgram(this.shaderProgram);
    
    // リンク失敗
    if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)){
        console.log("シェーダーのリンクに失敗しました");
        console.log(gl.getProgramInfoLog(this.shaderProgram));
    }
}



// ------------------------------------------------------
/// シェーダーを有効にする
// ------------------------------------------------------
Shader.prototype.begin = function() {
	gl.useProgram(this.shaderProgram);	
}


// attribute変数のロケーションを返す
Shader.prototype.getAttribLocation = function(variableName) { return gl.getAttribLocation(this.shaderProgram, variableName); }

// Uniform変数にint型の値を送る
Shader.prototype.uniform1i = function(variableName, value) { gl.uniform1i(gl.getUniformLocation(this.shaderProgram, variableName), value); }
// Uniform変数にfloat型の値を送る
Shader.prototype.uniform1f = function(variableName, value) { gl.uniform1f(gl.getUniformLocation(this.shaderProgram, variableName), value); }
// Uniform変数にMatrix4x4型の値を送る
Shader.prototype.uniformMatrix4fv = function(variableName, value) { gl.uniformMatrix4fv(gl.getUniformLocation(this.shaderProgram, variableName), false, value); }



// private

// ------------------------------------------------------
/// シェーダーファイルの読み込み
// ------------------------------------------------------
Shader.prototype.readShaderFile = function(url) {
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return (xmlHttp.status == 200) ? xmlHttp.responseText : null;
};