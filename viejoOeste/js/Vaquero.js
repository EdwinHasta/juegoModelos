function Vaquero () {
    this.speed = 1;
    this.draw = function () {
        this.context.drawImage(imageRepository.cowboy, this.x, this.y - this.canvasHeight);
    };
}
