// ---------------------------------------------------------------------------------
/// カメラの操作とかまとめたクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
// ------------------------------------------------------
function Camera() {
    this.pos = new Vec3(0.0, 0.0, 0.0);   // カメラの座標
    this.viewMatrix = new Mat4();         // ビュー変換行列
    this.projectionMatrix = new Mat4();   // プロジェクション変換行列
}


// ------------------------------------------------------
/// ビュー変換行列の生成
/// [in] eye カメラの座標
/// [in] target 注視点
/// [in] up カメラのアッパーベクトル
// ------------------------------------------------------
Camera.prototype.lookAt = function(eye, target, up) {
    if(eye.x == target.x && eye.y == target.y && eye.z == target.z){
        this.viewMatrix = Mat4.identity();
        return;
    }
    
    this.pos = eye;
    
    var Z = (Vec3.subtract(eye, target)).normalized();
    var X = (Vec3.cross(up, Z)).normalized();
    var Y = (Vec3.cross(Z, X));
    
    var mat = this.viewMatrix;
    mat.m11 = X.x; mat.m12 = X.y; mat.m13 = X.z; mat.m14 = -Vec3.dot(eye, X);
    mat.m21 = Y.x; mat.m22 = Y.y; mat.m23 = Y.z; mat.m24 = -Vec3.dot(eye, Y);
    mat.m31 = Z.x; mat.m32 = Z.y; mat.m33 = Z.z; mat.m34 = -Vec3.dot(eye, Z);
    mat.m41 = 0;   mat.m42 = 0;   mat.m43 = 0;   mat.m44 = 1;
}


// ------------------------------------------------------
/// プロジェクション変換行列の生成
/// [in] fovy カメラの座標
/// [in] aspect 画面のアスペクト比
/// [in] near ニアクリップ
/// [in] far ファークリップ
// ------------------------------------------------------
Camera.prototype.perspective = function(fovy, aspect, near, far) {
    var mat = this.projectionMatrix;
    var l, r, t, b;
    var n = near;
    var f = far;
    
    t = n * Math.tan(Math.PI * (fovy / 2.0) / 180.0);
    b = -t;
    r = t * aspect;
    l = -r;
    
    mat.m11 = (2 * n) / (r - l);
    mat.m12 = 0;
    mat.m13 = (r + l) / (r - l);
    mat.m14 = 0;
    
    mat.m21 = 0;
    mat.m22 = (2 * n) / (t - b);
    mat.m23 = (t + b) / (t - b);
    mat.m24 = 0;
    
    mat.m31 = 0;
    mat.m32 = 0;
    mat.m33 = -(f + n) / (f - n);
    mat.m34 = -(2 * n * f) / (f - n);
    
    mat.m41 = 0;
    mat.m42 = 0;
    mat.m43 = -1;
    mat.m44 = 0;
}
