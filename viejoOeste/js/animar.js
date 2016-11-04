/**
 * El ciclo de animación. Llama a la función requestAnimationFrame para optimizar el ciclo del juego
 * y dibuja todos los objetos del juego.
 * Esta función debe ser una función global y no puede estar dentro de un objeto.
 */
function animate() {
	document.getElementById('puntaje').innerHTML = game.playerScore;

	// Inserta los objetos al arbol de cuadrantes.
	game.quadTree.clear();
	game.quadTree.insert(game.ship);
	game.quadTree.insert(game.ship.bulletPool.getPool());
	game.quadTree.insert(game.enemyPool.getPool());
	game.quadTree.insert(game.enemyBulletPool.getPool());

	detectCollision();

	// No mas enemigos
	if (game.enemyPool.getPool().length === 0) {
		game.spawnWave();
	}

	// Anima los objetos del juego
	if (game.ship.alive) {
		requestAnimFrame( animate );

		game.background.draw();
		game.ship.move();
		game.ship.bulletPool.animate();
		game.enemyPool.animate();
		game.enemyBulletPool.animate();
	}
}
