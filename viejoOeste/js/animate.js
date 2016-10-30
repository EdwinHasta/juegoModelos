/**
 * Ciclo de animación. Llama a requestAnimationFrame para optimizar el ciclo del juego y dibujar todos los objetos.
 * Esta función debe ser una función global y no puede estar dentro de un objeto.
 */
function animate() {
    requestAnimFrame(animate);
    game.background.draw();
}


/**
 * requestAnim crea un layer (by Paul Irish)
 * Busca la prmera API que trabaja para optimizar los ciclos de animación
 * de otro modo por defecto se ejecuta setTimeout().
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* funcion */ callback, /* Elemento DOM */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();