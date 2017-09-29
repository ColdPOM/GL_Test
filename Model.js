// ---------------------------------------------------------------------------------
/// 3Dモデルを扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
/// [in] url モデルファイルのURL
// ------------------------------------------------------
function Model(url) {
    this.pos = new Vec3(0.0, 0.0, 0.0);    // 座標
    this.rot = new Vec3(0.0, 0.0, 180.0);  // 回転値
    this.scale = new Vec3(1.0, 1.0, 1.0);  // 拡大率
    
    this.loadComp = 0;  // 読み込み完了フラグ
    
    // モデルファイルまでのpath計算
    var dir = url.split("/");
    this.path = "";
    for(var i = 0; i < dir.length -1; i++){
        this.path += dir[i] + "/";
    }
    
    // モデル(頂点)データ
    this.modelData = ModelLoader.loadModel(url);
    
    // シェーダーの生成
    this.shader = new Shader();
    this.shader.createProgram();
    this.shader.loadShader("shader/sample.vert", gl.VERTEX_SHADER);
    this.shader.loadShader("shader/sample.frag", gl.FRAGMENT_SHADER);
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
    
    // テクスチャー読み込み
    this.texture = new Array(this.modelData.BodyParts.length);
    for(var i = 0; i < this.modelData.BodyParts.length; i++){
        this.texture[i] = new Texture();
        this.texture[i].load(this.path + this.modelData.BodyParts[i].TextureFile);
    }

}


// ------------------------------------------------------
/// 更新
// ------------------------------------------------------
Model.prototype.update = function() {
    // 読み込み完了チェック
    if(!this.loadComp){
        // テクスチャーの読み込み完了チェック
        this.loadComp = true;
        for(var i = 0; i < this.texture.length; i++){
            if(!this.texture[i].imgObj.complete){
                this.loadComp = false;
                break;
            }
        }
        return;
    }
}

// ------------------------------------------------------
/// 描画
// ------------------------------------------------------
Model.prototype.draw = function() {
    if(!this.loadComp) return;
    
    // 行列の計算
    var mat = Mat4.identity();
    mat = Mat4.multiply(mat, camera.projectionMatrix);
    mat = Mat4.multiply(mat, camera.viewMatrix);
    var modelMat = Mat4.multiply(Mat4.translate(this.pos), Mat4.rotate(this.rot));
    modelMat = Mat4.multiply(modelMat, Mat4.scale(this.scale));
    
    mat = Mat4.multiply(mat, modelMat);
    
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
    
    // マテリアル毎に描画
    var beginIndex = 0;
    for(var i = 0; i < this.texture.length; i++) {
        // テクスチャを有効化
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture[i].texObj);
        
        // ユニフォーム変数に値を送る
        this.shader.uniformMatrix4fv("mvpMatrix", mat.toArray());
        this.shader.uniformMatrix4fv("modelMatrix", modelMat.toArray());
        this.shader.uniform1f("Texture", 0);
        // モデルの描画
        gl.drawElements(gl.TRIANGLES, this.modelData.BodyParts[i].SampleNumber, gl.UNSIGNED_SHORT, beginIndex*2);
        
        beginIndex += this.modelData.BodyParts[i].SampleNumber;
    }

}
