var SubirImagen=function(){	    

    //Sirve para saber si debe poner nuevos valores para los campos ancho y alto (si vale true)
    //o respetar valores previos. (si vale false).   Todo esto desde la ventana de edición.

    this.restablecerDimensiones=true; 
    //Es el que hace el trabajo independiente de los componentes con una imagen, la carga del explorador 
    //de archivosm la redimensiona la envía al server, etc cuando está visible en la plantilla.
    this.botonSubirImagen;
    //Es el que hace el trabajo independiente de los componentes con una imagen, la carga del explorador
    //de archivos, la redimensiona, etc cuando está en la ventana de edición.
    this.botonSubirImagenEdicion;


    
    //Atributos heredados.
    this.ancho=300;
    this.alto=200;
    this.existeDiseno=false;
}

SubirImagen.prototype=new Componente;

//Funciones propias.
//Esto cambia automáticamente los valores del ancho y del alto.
SubirImagen.prototype.cambioImagenEdicion=function(ancho,alto,objetoPropio){    
    console.log("Vale "+objetoPropio.restablecerDimensiones);
    if(objetoPropio.restablecerDimensiones){
        objetoPropio.campoAncho.val(ancho);
        objetoPropio.campoAlto.val(alto);
        objetoPropio.tabulador.cambiarFicha("tamanoPosicion");
        objetoPropio.campoAncho.focus();
        objetoPropio.campoAncho.select();
    }
    //Ya subió una imagen, respetar las dimensiones.
    else if(objetoPropio.botonSubirImagen.imagenExiste){
        objetoPropio.campoAncho.val(objetoPropio.botonSubirImagen.ancho);
        objetoPropio.campoAlto.val(objetoPropio.botonSubirImagen.alto);
        objetoPropio.tabulador.cambiarFicha("tamanoPosicion");
        objetoPropio.campoAncho.focus();
        objetoPropio.campoAncho.select();   
    }
    objetoPropio.restablecerDimensiones=true;
}


//Funciones heredadas.
SubirImagen.prototype.crearEditable=function(){
    Componente.prototype.crearEditable.call(this);
    this.botonSubirImagen=new BotonSubirImagen();
    this.botonSubirImagen.ancho=this.ancho
    this.botonSubirImagen.alto=this.alto;
    this.botonSubirImagen.debeAjustar=true;

    
    this.divContenedor.append(this.botonSubirImagen.cargarObjetos());

}


SubirImagen.prototype.obtenerFichaGeneral=function(){
    Componente.prototype.obtenerFichaGeneral.call(this);
 
    var p=$("<p style='margin-bottom:0px; width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:15px; text-align:center;'>Seleccione una imagen</p>");
    p.insertBefore(this.tituloAnimaciones);     

    var fila=$("<div style=' height:100px; width:100%; margin-top:10px;'>");
    fila.insertBefore(this.tituloAnimaciones);


    var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:150px; height:100px; background-color:red'>");
    fila.append(filaCentro);
   
    this.botonSubirImagenEdicion=new BotonSubirImagen();
    this.botonSubirImagenEdicion.funcionCambioImagen=this.cambioImagenEdicion;
    this.botonSubirImagenEdicion.objetoPadre=this;
    this.botonSubirImagenEdicion.ancho=150
    this.botonSubirImagenEdicion.alto=100;
    filaCentro.append(this.botonSubirImagenEdicion.cargarObjetos());
    this.obtenerFichaGeneral2(new Array("lectura"));
}

SubirImagen.prototype.obtenerTituloEdicion=function(){
    return "Propiedades de la imagen";
}


SubirImagen.prototype.guardarAtributosEditados=function(){    
    Componente.prototype.guardarAtributosEditados.call(this);
    this.atributos.hijo={
            urlImagen:this.botonSubirImagenEdicion.iconoSubirImagen.attr("src"),
            deshabilitado:this.botonSoloLectura.attr("marcado")
    };

    if(this.atributos.hijo.deshabilitado==1)    
        this.botonSubirImagen.activar(false);
    else
        this.botonSubirImagen.activar(true);    

     if(this.atributos.hijo.urlImagen!=(urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png")){
        this.botonSubirImagen.cargarImagenManual(this.atributos.hijo.urlImagen,
                    this.atributos.tamano_posicion.ancho,this.atributos.tamano_posicion.alto);
    }
        
}


SubirImagen.prototype.cargarAtributosEdicion=function(){
    Componente.prototype.cargarAtributosEdicion.call(this);    
    if(this.atributos){//Si ya hubo atributos previos.          
        this.botonSoloLectura.attr("marcado",this.atributos.hijo.deshabilitado);
        this.marcarSeleccionBotones([this.botonSoloLectura]);
        this.atributos.hijo.urlImagen=this.botonSubirImagen.iconoSubirImagen.attr("src");
    }
    else
        this.atributos={hijo:{urlImagen:this.botonSubirImagen.iconoSubirImagen.attr("src")}};

    if(this.atributos.hijo.urlImagen!=(urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png")){
        this.restablecerDimensiones=false;
        this.botonSubirImagenEdicion.cargarImagenManual(this.atributos.hijo.urlImagen);        
    }
}

