/**
 * 3Dモデルの読み込みを行うクラス
 * JSONによる独自形式のみに対応
 */

class ModelLoader {
	
	/**
	 * JSONで記述された3Dモデルを読み込む
	 * @param {string} url モデルのURL
	 * @return {Object}
	 */
	static loadModel(url) {
		var xmlHttp = new XMLHttpRequest();

		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		return eval("(" + xmlHttp.responseText + ")");
	}
}
