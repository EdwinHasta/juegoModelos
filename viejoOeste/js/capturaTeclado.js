function capturaTeclado(event){
    if(event.which==38 || event.which==87)
        quica.actualizar('arriba');
    if(event.which==40 || event.which==83)
        quica.actualizar('abajo');
    if(event.which==39 || event.which==68)
        quica.actualizar('derecha');
    if(event.which==37 || event.which==65)
        quica.actualizar('izquierda');

}