var Ventana=function(funcionCancelar,funcionAceptar,objetoPadre){	
	this.cargarObjetos();
	this.funcionCancelar=funcionCancelar;
	this.funcionAceptar=funcionAceptar;	
	this.objetoPadre=objetoPadre;
	this.cargarEventos();
}

//El contenido central es un objeto div con todo el contenido.
Ventana.prototype.cargarContenidoCentral=function(divContenidoCentral){
	this.divVentanaCentro.html("");
	this.divVentanaCentro.html(divContenidoCentral);

	this.divVentanaBotones.html("");
	//Cargar los botoncitos.
	this.botonAceptar=$("<div>");
	this.botonAceptar.addClass("ventanaBotonAceptar");
	this.botonAceptar.attr({"data-toggle":"tooltip","title":"Aceptar"});
	this.divVentanaBotones.append(this.botonAceptar);

	this.botonCancelar=$("<div>");
	this.botonCancelar.addClass("ventanaBotonCancelar");
	this.botonCancelar.attr({"data-toggle":"tooltip","title":"Cancelar"});	
	this.divVentanaBotones.append(this.botonCancelar);

	this.botonCerrar.off("click");
	this.botonCerrar.on("click",{funcionLlamar:this.funcionCancelar},$.proxy(this.eventoOcultar,this));	
	this.botonCancelar.off("click");
	this.botonCancelar.on("click",{funcionLlamar:this.funcionCancelar},$.proxy(this.eventoOcultar,this));
	this.botonAceptar.off("click");			
	this.botonAceptar.on("click",{funcionLlamar:this.funcionAceptar},$.proxy(this.eventoOcultar,this));	

}

Ventana.prototype.cargarObjetos=function(){	
	this.divVentanaFondo=$("#divVentanaFondo");
	this.divVentanaCentro=$("#divVentanaCentro");
	this.divVentanaTextoTitulo=$("#divVentanaTextoTitulo");
	this.divVentanaPrincipal=$("#divVentanaPrincipal");
	this.botonCerrar=$("#ventanaBotonCerrar");	
	this.divVentanaBotones=$("#divVentanaBotones");
}

Ventana.prototype.cargarEventos=function(){		
}

Ventana.prototype.eventoOcultar=function(event){		
	if(event.data.funcionLlamar==null){		
		this.ocultar();
	}
	else	//Enviar la referencia al objeto que creo esta ventana.
		event.data.funcionLlamar(this.objetoPadre);  //Esta función se encargará de ocultar la ventana.
}
Ventana.prototype.ocultar=function(){
	this.divVentanaFondo.css("display","none");	
}

Ventana.prototype.mostrar=function(titulo){
	this.divVentanaTextoTitulo.html(titulo);
	this.divVentanaFondo.css("display","block");
}

Ventana.prototype.establecerDimensiones=function(ancho,alto){
	this.divVentanaPrincipal.css({"width":ancho,"height":alto});
}