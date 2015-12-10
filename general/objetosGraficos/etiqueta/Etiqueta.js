var Etiqueta=function(texto){
	this.texto=texto;
	//Son los predeterminados de un label.
	this.ancho=250; 
	this.alto=100;
	this.tipo="bloque_texto";
	this.tipoTextual="Bloque de texto";
	this.campoContenido;
	this.campoContenidoEdicion;
}
Etiqueta.prototype=new Componente();


Etiqueta.prototype.crearEditable=function(){
	Componente.prototype.crearEditable.call(this);

  	this.campoContenido=$("<textarea>");
  	this.campoContenido.css({"position":"absolute","top":"0px","width":"100%","height":"100%",
  					"text-align":"left","padding-top":"5px","resize":"none"});
	this.campoContenido.val(this.texto);
	this.divContenedor.append(this.campoContenido);
}

Etiqueta.prototype.obtenerFichaGeneral=function(){
	Componente.prototype.obtenerFichaGeneral.call(this);

	var p=$("<p style='margin-bottom:0px; width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:15px; text-align:center;'>Texto del área</p>");
	p.insertBefore(this.tituloAnimaciones);	

	this.campoContenidoEdicion=$("<textarea style='width:90%; resize:none; margin-left:5%; height:100px; border:solid 1px #aaaaaa'></textarea>");
	this.campoContenidoEdicion.insertBefore(this.tituloAnimaciones);

	this.obtenerFichaGeneral2(new Array("lectura"));

}

Etiqueta.prototype.obtenerTituloEdicion=function(){
	return "Propiedades de bloque de texto";
}


Etiqueta.prototype.guardarAtributosEditados=function(){
	Componente.prototype.guardarAtributosEditados.call(this);
	this.atributos.hijo={
			contenido:this.campoContenidoEdicion.val(),
			deshabilitado:this.botonSoloLectura.attr("marcado")
	};

	this.campoContenido.prop("readonly",this.atributos.hijo.deshabilitado==1);	
	this.campoContenido.val(this.atributos.hijo.contenido);
	
	this.actualizarVistaDiseno2(this.campoContenido);
	this.actualizarVistaDiseno(this.campoContenido);	
}

//Debe cargar los atributos ya seleccionados previamente.
Etiqueta.prototype.cargarAtributosEdicion=function(){
	Componente.prototype.cargarAtributosEdicion.call(this);				
	if(this.atributos){//Si ya hubo atributos previos.	
		this.atributos.hijo.contenido=this.campoContenido.val();		
		this.botonSoloLectura.attr("marcado",this.atributos.hijo.deshabilitado);
		this.marcarSeleccionBotones([this.botonSoloLectura]);
	}
	else
		this.atributos={hijo:{contenido:this.campoContenido.val()}};		

	this.campoContenidoEdicion.val(this.atributos.hijo.contenido);	
}