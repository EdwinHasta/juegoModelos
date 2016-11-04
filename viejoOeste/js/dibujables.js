/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions.
 */
function Drawable() {
	this.init = function(x, y, width, height) {
		// Variables por defecto
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	// Define las funciones abstractas a ser implementadas en los objetos hijo.
	this.draw = function() {
	};
	this.move = function() {
	};
	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}


/**
 * Crea el objeto Background el cual sería un hijo del objeto Drawable
 * El background es dibujado en el canvas "background" y crea la ilusión 
 * de movimiento por desplazamiento de la imagen.
 */
function Background() {
	this.speed = 1; // Redefina la velocidad del desplazamiento del fondo

	// Implementa la función abstracta
	this.draw = function() {
		// Desplazamiento horizontal del fondo
		this.x -= this.speed;
		//this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
		this.context.drawImage(repoImagenes.background, this.x, this.y - this.canvasHeight);

		// Dibuja otra imagen en el límite superior de la primera imagen
		this.context.drawImage(repoImagenes.background, this.x - this.canvasWidth, this.y - this.canvasHeight);

		// Si la imagen es desplazada por la pantalla, reinicie.
		if (this.x <= 0)
            this.x = this.canvasWidth;
	};
}
// Configura el Background para heredar las propiedades desde Drawable
Background.prototype = new Drawable();


/**
 * Crea el objeto Bullet que es disparado por el vaquero. Las balas son
 * dibujadas en el canvas "main".
 */
function Bullet(object) {
	this.alive = false; // Es true si la bala esta actualmente en uso
	var self = object;
	/*
	 * Configura los valores de la bala
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	/*
	 * Usa un rectángulo especial para borrar la bala y moverla.
	 * Retorna true si la bala es movida a la pantalla, indicando que 
	 * la bala esta lista para ser limpiada por el pool, mientras
	 * dibuja la bala.
	 */
	this.draw = function() {
		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.y -= this.speed;

		if (this.isColliding) {
			return true;
		}
		else if (self === "bullet" && this.y <= 0 - this.height) {
			return true;
		}
		else if (self === "bullet" && this.x <= 0 - this.width) {
			return true;
		}
		else if (self === "enemyBullet" && this.y >= this.canvasHeight) {
			return true;
		}
		else {
			if (self === "bullet") {
				this.context.drawImage(repoImagenes.bullet, this.x, this.y);
			}
			else if (self === "enemyBullet") {
				this.context.drawImage(repoImagenes.enemyBullet, this.x, this.y);
			}

			return false;
		}
	};

	/*
	 * Reinicia los valores de la bala.
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();


/**
 * Crea el objeto Vaquero que controla el jugador. 
 * El vaquero es dibujado en el cavas "vaquero" y usa un rectángulo 
 * para moverse a través de la pantalla.
 */
function Vaquero() {
	this.speed = 3;
	this.bulletPool = new Pool(30);
	var fireRate = 15;
	var counter = 0;
	this.collidableWith = "enemyBullet";
	this.type = "ship";

	this.init = function(x, y, width, height) {
		// Variables por defecto
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.alive = true;
		this.isColliding = false;
		this.bulletPool.init("bullet");
	}

	this.draw = function() {
		this.context.drawImage(repoImagenes.vaquero, this.x, this.y);
	};
	this.move = function() {
		counter++;
		// Determinfa si la acción es de movimiento
		if (KEY_STATUS.left || KEY_STATUS.right ||
				KEY_STATUS.down || KEY_STATUS.up) {
			// El vaquero se mueve, para borrar su actual imagen para ser 
			// dibujada en la nueva ubicación
			this.context.clearRect(this.x, this.y, this.width, this.height);

			// Actualiza x and y de acuerdo a la dirección a mover y redibujar el vaquero.
			if (KEY_STATUS.left) {
				this.x -= this.speed;
				if (this.x <= 0) // Mantener jugador dentro de la pantalla
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= (this.canvasHeight-this.height*2))
					this.y = (this.canvasHeight-this.height*2);
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
		}

		// Redibuja el vaquero.
		if (!this.isColliding) {
			this.draw();
		}
		else {
			this.alive = false;
			game.gameOver();
		}

		if (KEY_STATUS.space && counter >= fireRate && !this.isColliding) {
			this.fire();
			counter = 0;
		}
	};

	/*
	 * Dispara dos balas
	 */
	this.fire = function() {
		this.bulletPool.getTwo(this.x+6, this.y, 3,
		                       this.x+33, this.y, 3);
		game.laser.get();
	};
}
Vaquero.prototype = new Drawable();


/**
 * Crea el objeto enemigo, en este caso un barril.
 */
function Enemy() {
	var percentFire = .01;
	var chance = 0;
	this.alive = false;
	this.collidableWith = "ship";
	this.type = "enemy";

	/*
	 * Configura los valores enemigos
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};

	/*
	 * Mover al enemigo
	 */
	this.draw = function() {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width) {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge) {
			this.speed = 1.5;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}

		if (!this.isColliding) {
			this.context.drawImage(repoImagenes.enemy, this.x, this.y);

			// Enemy has a chance to shoot every movement
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire) {
				this.fire();
			}

			return false;
		}
		else {
			game.playerScore += 10;
			game.explosion.get();
			return true;
		}
	};

	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	};

	/*
	 * Reinicia los valores del enemigo.
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Enemy.prototype = new Drawable();

