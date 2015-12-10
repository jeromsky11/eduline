var SubirImagen=function(){	    
    this.ancho=300;
    this.alto=200;
    this.existeDiseno=false;
    this.restablecerDimensiones=true; 
    //esta variable sirve para controlar si un usuairo cambia la imagen
    //Valor a poner valores de ancho y alto, si se pone a mano cuando abrimos la edición, no volver
    //A poner el ancho y el alto.
}

SubirImagen.prototype=new Componente;

SubirImagen.prototype.crearEditable=function(){
    this.imagenExiste=false;    
    Componente.prototype.crearEditable.call(this);

    this.botonSubirImagen=new BotonSubirImagen();
    this.botonSubirImagen.ancho=this.ancho
    this.botonSubirImagen.alto=this.alto;
    this.botonSubirImagen.debeAjustar=true;
    this.divContenedor.append(this.botonSubirImagen.cargarObjetos());

}

//Esto cambia automáticamente los valores del ancho y del alto.
SubirImagen.prototype.cambioImagenEdicion=function(ancho,alto,objetoPropio){

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
        
        /*this.divBotonSubirImagen.css({"width":objetoPropio.ancho+"px","height":objetoPropio.alto+"px",
                                "border":"none"});*/        
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
    
//    console.log(this.atributos.hijo.urlImagen+urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png"));
    if(this.atributos.hijo.urlImagen!=(urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png")){
        this.restablecerDimensiones=false;
        this.botonSubirImagenEdicion.cargarImagenManual(this.atributos.hijo.urlImagen);        
    }
}



/*
//Regresa un array con los div del objeto para subir imagen.
SubirImagen.prototype.cargarObjetos=function(){		
	this.imagenExiste=false;    
    var divPadre=$("<div class='divBotonSubirImagen'>");
    divPadre.css({"width":"400px","height":"268px"});
    this.formularioSubirImagen=$("<form enctype='multipart/form-data'  method='post'> ");
    divPadre.append(this.formularioSubirImagen);

    this.botonSubirImagen=$("<input name='botonSubirImagen' type='file' accept='image/*'"+
                "style='display:none' />");
    this.formularioSubirImagen.append(this.botonSubirImagen);
    
    this.iconoSubirImagen=$("<img  src='../general/objetoSubirImagenes/subirFoto.png' "+
                        " class='iconoSubirImagen' />");

    this.iconoSubirImagen.css({"width":"360px","height":"240px","left":"20px","top":"19px"});
    this.formularioSubirImagen.append(this.iconoSubirImagen);

    this.anchoNormal=parseInt(this.iconoSubirImagen.css("width"));
    this.altoNormal=parseInt(this.iconoSubirImagen.css("height"));
    this.posIzquierda=this.iconoSubirImagen.css("left");
    this.posArriba=this.iconoSubirImagen.css("top");    
    this.anchoMarco=parseInt(divPadre.css("width"));           
    this.altoMarco=parseInt(divPadre.css("height"));    
    return new Array(divPadre);

}

*/

