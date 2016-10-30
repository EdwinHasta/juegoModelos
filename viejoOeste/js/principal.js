/***************
 * Código generado a partir de las contribuciones de:
 * https://github.com/straker/galaxian-canvas-game/tree/master/part1
 *
 ***************/

/**
 * Inicializa el juego y lo inicia
 */
var game = new Game();
//var jugando;

//$(document).ready(inicio);
//$(document).keydown(capturaTeclado);

function init() {
    //jugando = true;
    if (game.init())
        game.start();
}

/**
 * Define un objeto para contener todas las imágenes del juego.
 * De este modo las imágenes son creadas una sola vez.
 * Este tipo de objetos son conocidos como Singleton.
 */
var imageRepository = new function () {
    // Define las imágenes.
    this.empty = null;
    this.background = new Image();
    this.cowboy = new Image();

    // Define la fuente de las imágenes.
    this.background.src = "imagenes/bg.png";
    this.cowboy.src = "imagenes/vaquero01.jpeg";
}

// Define el Background para heredar las propiedades desde Drawable
Background.prototype = new Drawable();
// Define el Vaquero para heredar las propiedades desde Drawable
Vaquero.prototype = new Drawable();