// ---------------------------------------------------------------------------------
/// 自作のゲームライブラリのファイルリンク
// ---------------------------------------------------------------------------------
{
	let currentPath = document.currentScript.src;
	currentPath = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
	document.write(
		'<script type="text/javascript" src="' + currentPath + 'Shader.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'BufferObject.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'ModelLoader.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Camera.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Timer.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Matrix4x4.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Vector3.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Model.js"></script>',
		'<script type="text/javascript" src="' + currentPath + 'Texture.js"></script>'
	);
}
