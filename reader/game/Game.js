//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
	vars[decodeURIComponent(key)] = decodeURIComponent(value);
	});
	return vars;
}	 

serialInclude([
	'../lib/CGF.js',
	'../game/GameScene.js',
	'../game/GameInterface.js',
	'../game/GameState.js',
	'../game/GameMove.js',
	'../common/Animation.js',
	'../common/Board.js',
	'../common/AuxiliaryBoard.js',
	'../common/Piece.js',
	'../common/Tile.js',
	'../common/Connection.js',
	'../primitives/Plane.js',
	'../primitives/Cylinder.js',
	'../primitives/Box.js',
	'../primitives/Quad.js',
	'../primitives/Cube.js',
	'../primitives/Torus.js',
	'../primitives/Patch.js',
	'../primitives/Sphere.js',
	'../primitives/SnowMan.js',
	'../primitives/Tree.js',
	'../common/Utilities.js',

main=function()
{
	
	// Standard application, scene and interface setup
	var app = new CGFapplication(document.getElementById("game"));
	
	var gameScene = new GameScene();
	var gameInterface = new GameInterface();

	gameScene.interface = gameInterface;

	app.init();
	
	app.setScene(gameScene);
	app.setInterface(gameInterface);

	// Load textures
	var filename=getUrlVars()['file'] || "texture.xml";
	// textureloader

	// start
	app.run();
	document.getElementById('loading').style.display = "none";
}

]);
