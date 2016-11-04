/***************
 * Código generado siguiendo el tutorial publicado en:
 * http://blog.sklambert.com/galaxian-html5-game/
 *
 ***************/

/**
 * Inicializar el Juego y empezar
 */
var game = new Game();

function init() {
	game.init();
}

/**
 * requestAnim creado por Paul Irish
 * Primero busca la API que optimiza el ciclo de animación
 * de otro modo asigna un valor por default a setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* funcion */ callback, /* Elemento DOM */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();