function AnimationCamera(scene, start_camera, end_camera) {
	this.scene = scene;
	this.duration = 1;
	this.start_camera = start_camera;
	this.end_camera = end_camera;
	this.curr_time = 0;
	this.next_camera = (this.scene.active_camera + 1) % this.scene.cameras.length;
}

AnimationCamera.prototype.update = function() {
	this.curr_time += this.scene.updatePeriod/1000;

	// Change camera when current animation time is equal to duration
	if (this.curr_time >= this.duration) {
		this.scene.active_camera = this.next_camera;
		this.scene.camera = this.scene.cameras[this.scene.active_camera];
		//this.scene.interface.setActiveCamera(this.scene.camera);
		this.scene.changing_camera = false;
		this.scene.camera_animation = null;
	}
	else {
		var x = this.start_camera.position[0] + ((this.end_camera.position[0] - this.start_camera.position[0])/this.duration * this.curr_time);
		var y = this.start_camera.position[1] + ((this.end_camera.position[1] - this.start_camera.position[1])/this.duration * this.curr_time);
		var z = this.start_camera.position[2] + ((this.end_camera.position[2] - this.start_camera.position[2])/this.duration * this.curr_time);
		
		this.scene.camera = new CGFcamera(this.start_camera.fov, this.start_camera.near, this.start_camera.far, vec3.fromValues(x, y, z), this.start_camera.target);
	}
}

// Animation to move a piece within the board
function AnimationPiece(scene, move, piece, from_x, from_y, to_x, to_y) {
	this.scene = scene;
	this.move = move;
	this.duration = 0.2;
	this.curr_time = 0;
	this.piece = piece;
	this.from_x = from_x;
	this.from_y = from_y;
	this.to_x = to_x;
	this.to_y = to_y;
	this.ang = piece.ang;
	if (this.from_x < 10 && this.from_x >= 0 && this.from_y < 10 && this.from_y >= 0) {
		this.n = this.move.game_state.piece_positions[this.from_y][this.from_x];
		this.move.game_state.piece_positions[this.from_y][this.from_x] = 0;
	}
	this.length = Math.sqrt(Math.pow(to_x-from_x, 2) + Math.pow(to_y-from_y, 2)); 
}

AnimationPiece.prototype.update = function() {
	this.curr_time += this.scene.updatePeriod/1000;

	if (this.curr_time >= this.duration) {
		this.piece.ang = 0;
		this.move.finishMove(this.piece, this.to_x, this.to_y);
	}
	else {
		var dx = (this.to_x - this.from_x)/this.duration * this.curr_time;
		var dy = (this.to_y - this.from_y)/this.duration * this.curr_time;
		var dang = this.ang - (0-this.ang)/this.duration * this.curr_time;
		var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - this.length/2;
	
		this.piece.x = this.from_x + dx;
		this.piece.y = this.from_y + dy;
		this.piece.z = Math.sqrt((1-Math.pow(2*d/this.length,2))/4);
		this.piece.ang = dang;
	}
}

// Animation to remove a piece from the board to an auxiliar board
function AnimationRemove(scene, move, piece, from_x, from_y) {
	this.scene = scene;
	this.move = move;
	this.piece = piece;
	this.from_x = from_x;
	this.from_y = from_y;
	this.duration = 0.2;
	this.curr_time = 0;
	this.piece.id = -1;
	if (this.piece.player == 1) {
		this.to_x = 11.5;
		this.to_y = this.move.game_state.auxiliar_board1.current_y;
		this.move.game_state.auxiliar_board1.addPiece();
	}
	else if (this.piece.player == 2) {
		this.to_x = -2.5;
		this.to_y = this.move.game_state.auxiliar_board2.current_y;
		this.move.game_state.auxiliar_board2.addPiece();
	}
	this.length = Math.sqrt(Math.pow(this.to_x-this.from_x, 2) + Math.pow(this.to_y-this.from_y, 2)); 
}

AnimationRemove.prototype.update = function() {
	this.curr_time += this.scene.updatePeriod/1000;

	if (this.curr_time >= this.duration) {
		this.piece.ang = Math.PI/2;
		this.move.finishRemoval(this.piece, this.to_x, this.to_y);
	}
	else {
		var dx = (this.to_x - this.from_x)/this.duration * this.curr_time;
		var dy = (this.to_y - this.from_y)/this.duration * this.curr_time;
		var dang = (Math.PI/2)/this.duration * this.curr_time;
		var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - this.length/2;
	
		this.piece.x = this.from_x + dx;
		this.piece.y = this.from_y + dy;
		this.piece.z = Math.sqrt((1-Math.pow(2*d/this.length,2))/4);
		this.piece.ang = dang;
	}
}

			














