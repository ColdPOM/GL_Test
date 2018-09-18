// ---------------------------------------------------------------------------------
/// ３次元ベクトルを扱うクラス
// ---------------------------------------------------------------------------------

// ------------------------------------------------------
/// コンストラクタ
/// [param] x X座標の値
/// [param] y Y座標の値
/// [param] z Z座標の値
// ------------------------------------------------------
function Vector3(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}


// ------------------------------------------------------
/// ベクトルを配列として取得
/// [return] array 配列化されたベクトル
// ------------------------------------------------------
Vector3.prototype.toArray = function()
{
    var array = [this.x, this.y, this.z];
    
    return array;
}


// ------------------------------------------------------
/// ベクトルの長さ
/// [return] length ベクトルの長さ
// ------------------------------------------------------
Vector3.prototype.length = function()
{
    var length = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    
    return length;
}

// ------------------------------------------------------
/// 正規化する
// ------------------------------------------------------
Vector3.prototype.normalize = function()
{
    if(this.length() == 0) return;
    
    this.x /= this.length();
    this.y /= this.length();
    this.z /= this.length();
}


// ------------------------------------------------------
/// 正規化ベクトルを返す関数 ※元の値は変わらない
/// [return] vec 正規化済ベクトル
// ------------------------------------------------------
Vector3.prototype.normalized = function()
{
    if(this.length() == 0) return;
    
    var vec = new Vector3();
    
    vec.x = this.x / this.length();
    vec.y = this.y / this.length();
    vec.z = this.z / this.length();
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの足し算
/// [param] vec1 ベクトル１
/// [param] vec2 ベクトル２
/// [return] vec 計算済みベクトル
// ------------------------------------------------------
Vector3.add = function(vec1, vec2)
{
    var vec = new Vector3;
    
    vec.x = vec1.x + vec2.x;
    vec.y = vec1.y + vec2.y;
    vec.z = vec1.z + vec2.z;
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの引き算
/// [param] vec1 ベクトル１
/// [param] vec2 ベクトル２
/// [return] vec 計算済みベクトル
// ------------------------------------------------------
Vector3.subtract = function(vec1, vec2)
{
    var vec = new Vector3;
    
    vec.x = vec1.x - vec2.x;
    vec.y = vec1.y - vec2.y;
    vec.z = vec1.z - vec2.z;
    
    return vec;
}


// ------------------------------------------------------
/// ベクトルの内積
/// [param] vec1 ベクトル１
/// [param] vec2 ベクトル２
/// [return] value スカラー値
// ------------------------------------------------------
Vector3.dot = function(vec1, vec2)
{
    var value = vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    
    return value;
}


// ------------------------------------------------------
/// ベクトルの外積
/// [param] vec1 ベクトル１
/// [param] vec2 ベクトル２
/// [return] normal ２つのベクトルに垂直なベクトル
// ------------------------------------------------------
Vector3.cross = function(vec1, vec2)
{
    var normal = new Vector3;
    
    normal.x = vec1.y * vec2.z - vec1.z * vec2.y;
    normal.y = vec1.z * vec2.x - vec1.x * vec2.z;
    normal.z = vec1.x * vec2.y - vec1.y * vec2.x;
    
    return normal;
}
