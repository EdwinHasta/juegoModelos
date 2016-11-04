
 /**
 * Crea el objeto Game que contendrá todos los objetos y datos para el juego.
 */
function Game() {
	/*
	 * Obiene la información del canvas y del contexto, luego configura todos los objetos del juego.
	 * Devuelve true si el canvas es soportado y falso si no lo es.
	 * Esto se hace con el fin de detener la animación si el navegador no soporta el canvas.
	 */
	this.init = function() {
		// Obtiene los elementos del canvas
		this.bgCanvas = document.getElementById('background');
		this.shipCanvas = document.getElementById('vaquero');
		this.mainCanvas = document.getElementById('main');

		// Prueba si el canvas es soportado por el navegador
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');

			// Inicializa los objetos del contexto y del background.
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

			Vaquero.prototype.context = this.shipContext;
			Vaquero.prototype.canvasWidth = this.shipCanvas.width;
			Vaquero.prototype.canvasHeight = this.shipCanvas.height;

			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;

			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;

			// Inicializa el objeto backgroudn
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0

			// Inicializa el objeto vaquero.
			this.ship = new Vaquero();
			// Set the ship to start near the bottom middle of the canvas
			this.shipStartX = this.shipCanvas.width/2 - repoImagenes.vaquero.width;
			//this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
			this.shipStartY = this.shipCanvas.height - (repoImagenes.vaquero.height);
			this.ship.init(this.shipStartX, this.shipStartY,
			               repoImagenes.vaquero.width, repoImagenes.vaquero.height);

			// Inicializa el pool de barriles
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");
			this.spawnWave();

			this.enemyBulletPool = new Pool(50);
			this.enemyBulletPool.init("enemyBullet");

			// Inicia árbol de cuadrantes.
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});

			this.playerScore = 0;

			// Archivos de audio
			this.laser = new SoundPool(10);
			this.laser.init("laser");

			this.explosion = new SoundPool(20);
			this.explosion.init("explosion");

			this.backgroundAudio = new Audio("sounds/audiojuego.mp3");
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = .25;
			this.backgroundAudio.load();

			this.gameOverAudio = new Audio("sounds/muerto.mp3");
			this.gameOverAudio.loop = true;
			this.gameOverAudio.volume = .25;
			this.gameOverAudio.load();

			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
		}
	};

	// Numero de barriles que se mostraran en el juego.
	this.spawnWave = function() {
		var height = repoImagenes.enemy.height;
		var width = repoImagenes.enemy.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;
	    for (var i = 1; i <= 6; i++) {
			this.enemyPool.get(x,y,2);
			x += width + 25;
			if (i % 6 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	// Inicia el ciclo de animación
	this.start = function() {
		this.ship.draw();
		this.backgroundAudio.play();
		animate();
	};

	// Reinicio del juego
	this.restart = function() {
		this.gameOverAudio.pause();

		document.getElementById('finjuego').style.display = "none";
		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY,
		               repoImagenes.vaquero.width, repoImagenes.vaquero.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.enemyBulletPool.init("enemyBullet");

		this.playerScore = 0;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		this.start();
	};

	// Fin del juego
	this.gameOver = function() {
		this.backgroundAudio.pause();
		this.gameOverAudio.currentTime = 0;
		this.gameOverAudio.play();
		document.getElementById('finjuego').style.display = "block";
	};
}
