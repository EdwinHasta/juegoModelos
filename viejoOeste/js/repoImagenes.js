/**
 * Se define un objeto para contener todas las imagenes del juego de modo que solo se crean una vez.
 */
var repoImagenes = new function() {
	// Define las imagenes.
	this.background = new Image();
	this.vaquero = new Image();
	this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();

	// Procedimiento para asegurar la carga de las imagenes
	var numImages = 5;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
	this.background.onload = function() {
		imageLoaded();
	}
	this.vaquero.onload = function() {
		imageLoaded();
	}
	this.bullet.onload = function() {
		imageLoaded();
	}
	this.enemy.onload = function() {
		imageLoaded();
	}
	this.enemyBullet.onload = function() {
		imageLoaded();
	}

	// Origen de las imagenes
	this.background.src = "imagenes/bg.png";
	this.vaquero.src = "imagenes/vaquero/vaquero02.png";
	this.bullet.src = "imagenes/bullet.png";
	this.enemy.src = "imagenes/barril.gif";
	this.enemyBullet.src = "imagenes/bullet_enemy.png";
}