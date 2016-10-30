/**
 * Crea el objeto Drawable el cual será la clase base para todos los objetos
 * dibujables en el juego. Configura variables por default que todos los
 * objetos hijo pueden heredar, también declara las funciones por default.
 */
function Drawable() {
    this.init = function (x, y) {
        // Variables por defecto.
        this.x = x;
        this.y = y;
    }

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    // Define funciones abstractas para ser implementadas en los objetos hijo.
    this.draw = function () {
    };
}