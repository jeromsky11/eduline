var Boton=function(texto){
	//Atributos propios.
	this.texto=texto;	
	this.campoTexto; //El campo para capturar el texto donde  aparecerá en el botón.	
	this.divBoton;
	this.botonSubirImagenEdicion;

	//Atributos heredados.
	this.ancho=150;
	this.alto=30;
	this.tipo="boton";
	this.tipoTextual="Botón";
	

}

Boton.prototype=new Componente();

Boton.prototype.crearEditable=function(){
	Componente.prototype.crearEditable.call(this);	
	this.divBoton=$("<div>");

  	this.divBoton.css({"position":"absolute","top":"0px","width":"100%","height":"98%"
  					,"text-align":"center","padding-top":"5px","background-color":"#aaaaff"});
	this.divBoton.html(this.texto);
	this.divContenedor.append(this.divBoton);	
}

Boton.prototype.obtenerFichaGeneral=function(){
	Componente.prototype.obtenerFichaGeneral.call(this);

	var fila=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
    fila.insertBefore(this.tituloAnimaciones);

    var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:200px; height:30px;'>");
    fila.append(filaCentro);

    filaCentro.append("<p style='float:left; margin-top:3px;'>Texto</p>");

	this.campoTexto=$("<input style='width:150px; float:left; margin-left:10px; height:30px;'>");
	filaCentro.append(this.campoTexto);

	var p=$("<p style='margin-bottom:0px; width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:15px; text-align:center;'>Imágen de fondo</p>");
	p.insertBefore(this.tituloAnimaciones);	

	var fila2=$("<div style=' height:100px; width:100%; margin-top:10px;'>");
    fila2.insertBefore(this.tituloAnimaciones);

    var filaCentro2=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:150px; height:100px;'>");
    fila2.append(filaCentro2);

	this.botonSubirImagenEdicion=new BotonSubirImagen();
    this.botonSubirImagenEdicion.ancho=150
    this.botonSubirImagenEdicion.alto=100;
    filaCentro2.append(this.botonSubirImagenEdicion.cargarObjetos());

    this.obtenerFichaGeneral2(new Array("lectura"));
}

Boton.prototype.obtenerTituloEdicion=function(){
	return "Propiedades del botón";
}

Boton.prototype.guardarAtributosEditados=function(){
	
	Componente.prototype.guardarAtributosEditados.call(this);
	this.atributos.hijo={
			texto:this.campoTexto.val(),
			deshabilitado:this.botonSoloLectura.attr("marcado")
	};
	this.divBoton.prop("disabled",this.atributos.hijo.deshabilitado==1);
	this.divBoton.html(this.atributos.hijo.texto);
	
	this.actualizarVistaDiseno2(this.divBoton);
	this.actualizarVistaDiseno(this.divBoton);
}


//Debe cargar los atributos ya seleccionados previamente.
Boton.prototype.cargarAtributosEdicion=function(){
	Componente.prototype.cargarAtributosEdicion.call(this);	
	if(this.atributos){//Si ya hubo atributos previos.			
		this.botonSoloLectura.attr("marcado",this.atributos.hijo.deshabilitado);
		this.marcarSeleccionBotones([this.botonSoloLectura]);		
	}
	else{
		this.atributos={hijo:{texto:this.texto}};
		this.botonColorFondoCuadro.val("#aaaaff");		
	}
	this.campoTexto.val(this.atributos.hijo.texto);	
}