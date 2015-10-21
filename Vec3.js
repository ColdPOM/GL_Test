// ---------------------------------------------------------------------------------
/// ３次元ベクトルを扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
/// [in] x X座標の値
/// [in] y Y座標の値
/// [in] z Z座標の値
// ------------------------------------------------------
function Vec3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}


// ------------------------------------------------------
/// ベクトルを配列として取得
/// [out] array 配列化されたベクトル
// ------------------------------------------------------
Vec3.prototype.toArray = function() {
    var array = [this.x, this.y, this.z];
    
    return array;
}


// ------------------------------------------------------
/// ベクトルの長さ
/// [out] length ベクトルの長さ
// ------------------------------------------------------
Vec3.prototype.length = function() {
    var length = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    
    return length;
}

// ------------------------------------------------------
/// 正規化する
// ------------------------------------------------------
Vec3.prototype.normalize = function() {
    if(this.length() == 0) return;
    
    this.x /= this.length();
    this.y /= this.length();
    this.z /= this.length();
}


// ------------------------------------------------------
/// 正規化ベクトルを返す関数 ※元の値は変わらない
/// [out] vec 正規化済ベクトル
// ------------------------------------------------------
Vec3.prototype.normalized = function() {
    if(this.length() == 0) return;
    
    var vec = new Vec3();
    
    vec.x = this.x / this.length();
    vec.y = this.y / this.length();
    vec.z = this.z / this.length();
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの足し算
/// [in] vec1 ベクトル１
/// [in] vec2 ベクトル２
/// [out] vec 計算済みベクトル
// ------------------------------------------------------
Vec3.add = function(vec1, vec2) {
    var vec = new Vec3;
    
    vec.x = vec1.x + vec2.x;
    vec.y = vec1.y + vec2.y;
    vec.z = vec1.z + vec2.z;
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの引き算
/// [in] vec1 ベクトル１
/// [in] vec2 ベクトル２
/// [out] vec 計算済みベクトル
// ------------------------------------------------------
Vec3.subtract = function(vec1, vec2) {
    var vec = new Vec3;
    
    vec.x = vec1.x - vec2.x;
    vec.y = vec1.y - vec2.y;
    vec.z = vec1.z - vec2.z;
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの内積
/// [in] vec1 ベクトル１
/// [in] vec2 ベクトル２
/// [out] value スカラー値
// ------------------------------------------------------
Vec3.dot = function(vec1, vec2) {
    var value = vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    
    return value;
}


// ------------------------------------------------------
/// ベクトルの外積
/// [in] vec1 ベクトル１
/// [in] vec2 ベクトル２
/// [out] normal ２つのベクトルに垂直なベクトル
// ------------------------------------------------------
Vec3.cross = function(vec1, vec2) {
    var normal = new Vec3;
    
    normal.x = vec1.y * vec2.z - vec1.z * vec2.y;
    normal.y = vec1.z * vec2.x - vec1.x * vec2.z;
    normal.z = vec1.x * vec2.y - vec1.y * vec2.x;
    
    return normal;
}