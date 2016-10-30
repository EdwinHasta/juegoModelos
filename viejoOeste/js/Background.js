/**
 * Crea el objeto Background el cual será hijo del objeto Drawable.
 * El fondo es dibujado en el canvas "background"
 * creando la ilusión de movimmiento por desplazamiento de la imagen.
 */
function Background() {
    this.speed = 1; // Redefine la velocidad de desplazamiento del fondo.

    // Implementa la función abstracta.
    this.draw = function () {
        // Desplaza el fondo.
        this.x -= this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

        // Dibuja otra imagen en el límite supero de la primera imagen
        this.context.drawImage(imageRepository.background, this.x - this.canvasWidth, this.y - this.canvasHeight);

        if (this.x <= 0)
            this.x = this.canvasWidth;
    };
}


