/**
 * Asegura que el sonido del juego se ha cargado antes de empesar el juego.
 */
function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		document.getElementById('cargando').style.display = "none";
		game.start();
	}
}

/**
 * Un pool de sonidos para usarlos como efectos de sonidos.
 */
function SoundPool(maxSize) {
	var size = maxSize; // Máximo de balas permitidos en el pool
	var pool = [];
	this.pool = pool;
	var currSound = 0;

	/*
	 * Llena el pool con los objetos dados.
	 */
	this.init = function(object) {
		if (object == "laser") {
			for (var i = 0; i < size; i++) {
				// Inicializa el objeto que contiene el disparo.
				laser = new Audio("sounds/disparo.mp3");
				laser.volume = .12;
				laser.load();
				pool[i] = laser;
			}
		}
		else if (object == "explosion") {
			for (var i = 0; i < size; i++) {
				var explosion = new Audio("sounds/disparo.mp3");
				explosion.volume = .1;
				explosion.load();
				pool[i] = explosion;
			}
		}
	};

	/*
	 * Reproduce el sonido
	 */
	this.get = function() {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}
