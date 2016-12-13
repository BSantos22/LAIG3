function Board(scene) {
	this.scene = scene;

	// Board settings
	var du = 10; // number of divisions
	var dv = 10;
	this.height = 0.075;
	var color1 = [1, 1, 1]; // colors
	var color2 = [0.8, 0.4, 0.4];
	this.shader = new CGFshader(scene.gl, "shaders/board.vert", "shaders/board.frag"); // shader
	this.shader.setUniformsValues({du:du, dv:dv, color1:color1, color2:color2});

	this.material = new CGFappearance(this.scene);
	this.material.loadTexture('resources/wood.jpg');
	
	// Board primitives
	this.top = new Plane(scene, 1.0, 1.0, du, dv);
	this.side = new Plane(scene, 1.0, this.height, du, 1);

	// Tiles
	this.tiles = [];
	var id = 0;
	for (var line = 0; line < 10; line++) {
		for (column = 0; column < 10; column++) {
			this.tiles[id] = new Tile(scene, id+1, column*0.1, line*0.1, false);
			id++;
		}
	}
}

Board.prototype.display = function() {
	this.scene.pushMatrix();	
		this.material.apply();
		this.scene.setActiveShader(this.shader);
		this.scene.translate(0, 0, this.height/2);
		this.top.display();		
		this.scene.setActiveShader(this.scene.defaultShader);
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -this.height/2);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.side.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.side.display();
	this.scene.popMatrix();

	for (var tiles = 0; tiles < this.tiles.length; tiles++) {
		this.scene.pushMatrix();
			this.scene.translate(-0.45, -0.45, this.height/2);
			this.tiles[tiles].display();
		this.scene.popMatrix();
	}
}
