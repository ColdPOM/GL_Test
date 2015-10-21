// ---------------------------------------------------------------------------------
/// バッファーオブジェクトを扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function BufferObject() {
}

// ------------------------------------------------------
/// VBOの生成
/// [in] data 頂点座標配列
/// [out] vbo 生成されたVBOを返す
// ------------------------------------------------------
BufferObject.createVBO = function(data){
   var vbo = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
   gl.bindBuffer(gl.ARRAY_BUFFER, null);

   return vbo;
}


// ------------------------------------------------------
/// IBOの生成
/// [in] data インデックス配列
/// [out] ibo 生成されたIBOを返す
// ------------------------------------------------------
BufferObject.createIBO = function(data){
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
}