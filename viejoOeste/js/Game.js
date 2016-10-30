/**
 * Crea the objeto Game el cual contendrá todos los objetos y los datos para el juego
 */
function Game() {
    /*
     * Obtiene la información del canvas y del contexto y configura los objetos del juego.
     * objects.
     * Retorna true si el canvas es soportado y false si no lo es.
     * Esto detiene el script de animación de constantes ejecuciones en viejos navegadores.
     */
    this.init = function () {

        // Obtiene los elementos del canvas
        this.bgCanvas = document.getElementById('background');

        // Prueba para verl si el canvas es soportado
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            // Inicializa los objectos para contener su contexto la información del canvas.
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;

            // Inicializar el objeto del fondo
            this.background = new Background();
            this.background.init(this.bgCanvas.width, 0);

            Vaquero.prototype.context = this.bgContext;
            Vaquero.prototype.canvasWidth = this.bgCanvas.width;
            Vaquero.prototype.canvasHeight = this.bgCanvas.height;
            this.vaquero = new Vaquero();
            this.vaquero.init(0, this.bgCanvas.height);

            return true;
        } else {
            return false;
        }
    };

    // Inicia la animación
    this.start = function () {
        animate();
    };
}
