function inicio(){
    jugando = true;
    miCanvas = $("#mi_canvas")[0];
    contexto = miCanvas.getContext("2d");
    buffer = document.createElement("canvas");
    quica = new Quica();
    calacas = [new Calaca(), new Calaca(),
        new Calaca(), new Calaca(),
        new Calaca()];
    run();

    $('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });

    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });

    $("#iniciar").click(function(){
        if(jugando==false)
            inicio();
    });
}