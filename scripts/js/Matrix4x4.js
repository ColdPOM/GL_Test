// ---------------------------------------------------------------------------------
/// 4x4の行列を扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function Matrix4x4() {
    this.m11; this.m12; this.m13; this.m14;
    this.m21; this.m22; this.m23; this.m24;
    this.m31; this.m32; this.m33; this.m34;
    this.m41; this.m42; this.m43; this.m44;
}

// ------------------------------------------------------
/// 行列を配列として取得
/// [out] array 配列に変換された行列
// ------------------------------------------------------
Matrix4x4.prototype.toArray = function() {
    var array =
    [
        this.m11, this.m21, this.m31, this.m41,
        this.m12, this.m22, this.m32, this.m42,
        this.m13, this.m23, this.m33, this.m43,
        this.m14, this.m24, this.m34, this.m44
    ]
    
    return array;
}


// ------------------------------------------------------
/// 行列の足し算
/// [param] mat1 行列１
/// [param] mat2 行列２
/// [out] mat 計算済み行列
// ------------------------------------------------------
Matrix4x4.add = function(mat1, mat2) {
    var mat = new Matrix4x4;
    
    mat.m11 = mat1.m11 + mat2.m11; mat.m12 = mat1.m12 + mat2.m12; mat.m13 = mat1.m13 + mat2.m13; mat.m14 = mat1.m14 + mat2.m14;
    mat.m21 = mat1.m21 + mat2.m21; mat.m22 = mat1.m22 + mat2.m22; mat.m23 = mat1.m23 + mat2.m23; mat.m24 = mat1.m24 + mat2.m24;
    mat.m31 = mat1.m31 + mat2.m31; mat.m32 = mat1.m32 + mat2.m32; mat.m33 = mat1.m33 + mat2.m33; mat.m34 = mat1.m34 + mat2.m34;
    mat.m41 = mat1.m41 + mat2.m41; mat.m42 = mat1.m42 + mat2.m42; mat.m43 = mat1.m43 + mat2.m43; mat.m44 = mat1.m44 + mat2.m44;
    
    return mat;
}


// ------------------------------------------------------
/// 行列の引き算
/// [param] mat1 行列１
/// [param] mat2 行列２
/// [out] mat 計算済み行列
// ------------------------------------------------------
Matrix4x4.subtract = function(mat1, mat2) {
    var mat = new Matrix4x4;
    
    mat.m11 = mat1.m11 - mat2.m11; mat.m12 = mat1.m12 - mat2.m12; mat.m13 = mat1.m13 - mat2.m13; mat.m14 = mat1.m14 - mat2.m14;
    mat.m21 = mat1.m21 - mat2.m21; mat.m22 = mat1.m22 - mat2.m22; mat.m23 = mat1.m23 - mat2.m23; mat.m24 = mat1.m24 - mat2.m24;
    mat.m31 = mat1.m31 - mat2.m31; mat.m32 = mat1.m32 - mat2.m32; mat.m33 = mat1.m33 - mat2.m33; mat.m34 = mat1.m34 - mat2.m34;
    mat.m41 = mat1.m41 - mat2.m41; mat.m42 = mat1.m42 - mat2.m42; mat.m43 = mat1.m43 - mat2.m43; mat.m44 = mat1.m44 - mat2.m44;
    
    return mat;
}


// ------------------------------------------------------
/// 行列のかけ算
/// [param] mat1 行列１
/// [param] mat2 行列２
/// [out] mat 計算済み行列
// ------------------------------------------------------
Matrix4x4.multiply = function(mat1, mat2) {
    var mat = new Matrix4x4;
    
    mat.m11 = mat1.m11 * mat2.m11 + mat1.m12 * mat2.m21 + mat1.m13 * mat2.m31 + mat1.m14 * mat2.m41;
    mat.m12 = mat1.m11 * mat2.m12 + mat1.m12 * mat2.m22 + mat1.m13 * mat2.m32 + mat1.m14 * mat2.m42;
    mat.m13 = mat1.m11 * mat2.m13 + mat1.m12 * mat2.m23 + mat1.m13 * mat2.m33 + mat1.m14 * mat2.m43;
    mat.m14 = mat1.m11 * mat2.m14 + mat1.m12 * mat2.m24 + mat1.m13 * mat2.m34 + mat1.m14 * mat2.m44;
    
    mat.m21 = mat1.m21 * mat2.m11 + mat1.m22 * mat2.m21 + mat1.m23 * mat2.m31 + mat1.m24 * mat2.m41;
    mat.m22 = mat1.m21 * mat2.m12 + mat1.m22 * mat2.m22 + mat1.m23 * mat2.m32 + mat1.m24 * mat2.m42;
    mat.m23 = mat1.m21 * mat2.m13 + mat1.m22 * mat2.m23 + mat1.m23 * mat2.m33 + mat1.m24 * mat2.m43;
    mat.m24 = mat1.m21 * mat2.m14 + mat1.m22 * mat2.m24 + mat1.m23 * mat2.m34 + mat1.m24 * mat2.m44;
    
    mat.m31 = mat1.m31 * mat2.m11 + mat1.m32 * mat2.m21 + mat1.m33 * mat2.m31 + mat1.m34 * mat2.m41;
    mat.m32 = mat1.m31 * mat2.m12 + mat1.m32 * mat2.m22 + mat1.m33 * mat2.m32 + mat1.m34 * mat2.m42;
    mat.m33 = mat1.m31 * mat2.m13 + mat1.m32 * mat2.m23 + mat1.m33 * mat2.m33 + mat1.m34 * mat2.m43;
    mat.m34 = mat1.m31 * mat2.m14 + mat1.m32 * mat2.m24 + mat1.m33 * mat2.m34 + mat1.m34 * mat2.m44;
    
    mat.m41 = mat1.m41 * mat2.m11 + mat1.m42 * mat2.m21 + mat1.m43 * mat2.m31 + mat1.m44 * mat2.m41;
    mat.m42 = mat1.m41 * mat2.m12 + mat1.m42 * mat2.m22 + mat1.m43 * mat2.m32 + mat1.m44 * mat2.m42;
    mat.m43 = mat1.m41 * mat2.m13 + mat1.m42 * mat2.m23 + mat1.m43 * mat2.m33 + mat1.m44 * mat2.m43;
    mat.m44 = mat1.m41 * mat2.m14 + mat1.m42 * mat2.m24 + mat1.m43 * mat2.m34 + mat1.m44 * mat2.m44;
    
    return mat;
}


// ------------------------------------------------------
/// 単位行列を返す関数
/// [out] mat 単位行列
// ------------------------------------------------------
Matrix4x4.identity = function(){
    var mat = new Matrix4x4;
    
    mat.m11 = 1; mat.m12 = 0; mat.m13 = 0; mat.m14 = 0;
    mat.m21 = 0; mat.m22 = 1; mat.m23 = 0; mat.m24 = 0;
    mat.m31 = 0; mat.m32 = 0; mat.m33 = 1; mat.m34 = 0;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}


// ------------------------------------------------------
/// 移動行列を返す関数
/// [out] mat 移動行列
// ------------------------------------------------------
Matrix4x4.translate = function(vec){
    var mat = new Matrix4x4;
    
    mat.m11 = 1; mat.m12 = 0; mat.m13 = 0; mat.m14 = vec.x;
    mat.m21 = 0; mat.m22 = 1; mat.m23 = 0; mat.m24 = vec.y;
    mat.m31 = 0; mat.m32 = 0; mat.m33 = 1; mat.m34 = vec.z;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}


// ------------------------------------------------------
/// X軸の回転行列を返す関数
/// [param] value 回転角度
/// [out] mat 回転行列
// ------------------------------------------------------
Matrix4x4.rotateX = function(value) {
    var mat = new Matrix4x4;
    var rad = value / 180 * Math.PI;
    
    mat.m11 = 1; mat.m12 = 0; mat.m13 = 0; mat.m14 = 0;
    mat.m21 = 0; mat.m22 = Math.cos(rad); mat.m23 = -Math.sin(rad); mat.m24 = 0;
    mat.m31 = 0; mat.m32 = Math.sin(rad); mat.m33 = Math.cos(rad); mat.m34 = 0;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}


// ------------------------------------------------------
/// Y軸の回転行列を返す関数
/// [param] value 回転角度
/// [out] mat 回転行列
// ------------------------------------------------------
Matrix4x4.rotateY = function(value) {
    var mat = new Matrix4x4;
    var rad = value / 180 * Math.PI;
    
    mat.m11 = Math.cos(rad); mat.m12 = 0; mat.m13 = Math.sin(rad); mat.m14 = 0;
    mat.m21 = 0; mat.m22 = 1; mat.m23 = 0; mat.m24 = 0;
    mat.m31 = -Math.sin(rad); mat.m32 = 0; mat.m33 = Math.cos(rad); mat.m34 = 0;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}


// ------------------------------------------------------
/// Z軸の回転行列を返す関数
/// [param] value 回転角度
/// [out] mat 回転行列
// ------------------------------------------------------
Matrix4x4.rotateZ = function(value) {
    var mat = new Matrix4x4;
    var rad = value / 180 * Math.PI;
    
    mat.m11 = Math.cos(rad); mat.m12 = -Math.sin(rad); mat.m13 = 0; mat.m14 = 0;
    mat.m21 = Math.sin(rad); mat.m22 = Math.cos(rad); mat.m23 = 0; mat.m24 = 0;
    mat.m31 = 0; mat.m32 = 0; mat.m33 = 1; mat.m34 = 0;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}


// ------------------------------------------------------
/// 回転行列を返す関数
/// [param] rotAxis 軸ごとの回転角度
/// [out] mat 回転行列
// ------------------------------------------------------
Matrix4x4.rotate = function(axis) {

    var mat = Matrix4x4.rotateX(axis.x);
    mat = Matrix4x4.multiply(mat, Matrix4x4.rotateY(axis.y));
    mat = Matrix4x4.multiply(mat, Matrix4x4.rotateZ(axis.z));
    
    return mat;
}


// ------------------------------------------------------
/// スケール行列を返す関数
/// [param] scale 拡大率（Vector3オブジェクトかnumberオブジェクト）
/// [out] mat スケーリング後の行列
// ------------------------------------------------------
Matrix4x4.scale = function(scale) {
    var mat = new Matrix4x4;
    
    mat.m11 = scale.x; mat.m12 = 0; mat.m13 = 0; mat.m14 = 0;
    mat.m21 = 0; mat.m22 = scale.y; mat.m23 = 0; mat.m24 = 0;
    mat.m31 = 0; mat.m32 = 0; mat.m33 = scale.z; mat.m34 = 0;
    mat.m41 = 0; mat.m42 = 0; mat.m43 = 0; mat.m44 = 1;
    
    return mat;
}
