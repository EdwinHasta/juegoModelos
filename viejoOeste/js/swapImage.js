function swapImage() {
    image = document.getElementById('image')
    switch (imageNo) {
        case 1:
            image.src = "imagenes/vaquero/vaquero01.jpeg"
            imageNo = 2
            document.getElementById('content').style.display = 'none'
            return(false);
        case 2:
            image.src = "imagenes/vaquero/vaquero02.jpeg"
            imageNo = 1
            document.getElementById('content').style.display = 'block'
            return(false);
    }
}
