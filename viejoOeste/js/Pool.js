/**
 * Objeto Personalizado Pool. Almacena los objetos Bala que serán 
 * administrados para prevenir el paso del Garbage Colector.
 * El pool trabaja de la siguiente manera:
 * - Cuando el pool es inicializado, se llena el arrglo con los objetos Bala (Bullet).
 * - Cuando el pool necesita crear un nuevo objeto para usar, 
 *   busca el último item en el arreglo y verifica si esta en uso o no.
 *   Si esta en uso, el pool esta lleno. 
 *   Si no esta en uso, el pool "siembra" el último item en el arreglo y 
 *   entonces lo extrae desde el final y lo adiciona el último al principio del arreglo.
 *   Esto hace que el pool tenga los objetos libres al final y los objetos usados al principio.
 * - Cuando el pool anima su objeto, chequea si el objeto esta en uso (no necesita dibujar objetos sin usar)
 *   si lo esta entonces lo dibuja.
 *   Si la función draw() retorna true, el objeto esta listo para ser borrado 
 *   usando la función splice() para removerlo y colocarlo al final de la cola.
 * Se crean y se destruyen objetos en el pool constantemente.
 */
function Pool(maxSize) {
	var size = maxSize; // Maximo de balas permitidas en el pool
	var pool = [];

	this.getPool = function() {
		var obj = [];
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				obj.push(pool[i]);
			}
		}
		return obj;
	}

	/*
	 * Llena el arreglo pool con los objetos dados.
	 */
	this.init = function(object) {
		if (object == "bullet") {
			for (var i = 0; i < size; i++) {
				// Inicializa los objetos
				var bullet = new Bullet("bullet");
				bullet.init(0,0, repoImagenes.bullet.width,
										repoImagenes.bullet.height);
				bullet.collidableWith = "enemy";
				bullet.type = "bullet";
				pool[i] = bullet;
			}
		}
		else if (object == "enemy") {
			for (var i = 0; i < size; i++) {
				var enemy = new Enemy();
				enemy.init(0,0, repoImagenes.enemy.width,
									 repoImagenes.enemy.height);
				pool[i] = enemy;
			}
		}
		else if (object == "enemyBullet") {
			for (var i = 0; i < size; i++) {
				var bullet = new Bullet("enemyBullet");
				bullet.init(0,0, repoImagenes.enemyBullet.width,
										repoImagenes.enemyBullet.height);
				bullet.collidableWith = "ship";
				bullet.type = "enemyBullet";
				pool[i] = bullet;
			}
		}
	};

	/*
	 * Toma el último item en la lista, lo inicializa y lo lo envía al frente del arreglo
	 */
	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	/*
	 * Usado por el vaquero para habilitar 2 balas en un disparo.
	 * Si solo se usara la función get() dos veces, el vaquero solo 
	 * podría disparar una vala en lugar de dos.
	 */
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
		if(!pool[size - 1].alive && !pool[size - 2].alive) {
			this.get(x1, y1, speed1);
			this.get(x2, y2, speed2);
		}
	};

	/*
	 * Dibuja cualquier bala en uso. Si una bala sale de la pantalla,
	 * la limpia y la pone al frene del arreglo.
	 */
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// Solo dibuja hasta que se encuentra la bala que esta activa.
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}
