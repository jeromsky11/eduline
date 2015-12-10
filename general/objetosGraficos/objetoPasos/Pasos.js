//nombreContenedor es el id del padre que contendrá a estos pasos.
var Pasos=function(objetoPadre,funcionCambioPasoPadre,objetoPasos){	
	this.pasoActual=0;
	this.objetoPasos=objetoPasos;
	this.funcionCambioPasoPadre=funcionCambioPasoPadre;	
	this.objetoPadre=objetoPadre;
	this.cargarObjetos();	
	
	this.cargarEventos();					
}


Pasos.prototype.cargarObjetos=function(){	
	this.contenedor=$(this.objetoPasos.nombreContenedor);
	var encabezadoPasos=$("<div>");
	encabezadoPasos.addClass("encabezadoPasos");
	encabezadoPasos.html(this.objetoPasos.encabezado);
	this.contenedor.append(encabezadoPasos);

	this.divPasos=$("<div>");
	this.divPasos.addClass("divPasos");
	this.contenedor.append(this.divPasos);	

	var navegacionPasos=$("<div>");
	navegacionPasos.addClass("navegacionPasos");
	this.contenedor.append(navegacionPasos);
	
	this.botonFlechaIzquierda=$("<div>");
	this.botonFlechaIzquierda.addClass("botonFlechaIzquierdaPasos");
	this.botonFlechaIzquierda.append("<div class='botonFlechaIzquierdaPasosImagen'></div>"+
		"<div class='botonFlechaIzquierdaPasosTexto'>Anterior</div>");
	this.botonFlechaDerecha=$("<div>");
	this.botonFlechaDerecha.addClass("botonFlechaDerechaPasos");
	this.botonFlechaDerecha.append("<div>Siguiente</div>"+
		"<div class='botonFlechaDerechaPasosImagen'></div>");

	navegacionPasos.append(this.botonFlechaIzquierda);
	navegacionPasos.append(this.botonFlechaDerecha);
	this.totalPasos=0;

}
//Contenido es un array de elementos a agregar.
Pasos.prototype.agregarPaso=function(descripcion,contenido){
	this.totalPasos++;
	var nuevoPaso=$("<div>");
	nuevoPaso.addClass("divPaso"+this.totalPasos);
	this.divPasos.append(nuevoPaso);
	
	var descripcionPaso=$("<div>");
	descripcionPaso.addClass("descripcionPaso");
	descripcionPaso.html(descripcion);
	nuevoPaso.append(descripcionPaso);

	var divContenidoPaso=$("<div>");
	divContenidoPaso.addClass("divContenidoPaso");
	nuevoPaso.append(divContenidoPaso);

	var divContenidoPaso2=$("<div>");
	divContenidoPaso2.addClass("divContenidoPaso2");
	divContenidoPaso.append(divContenidoPaso2);

	for(var i=0;i<contenido.length;i++)
		divContenidoPaso2.append(contenido[i]);
	
}


Pasos.prototype.cambiarPaso=function(){							
	//Ocultar todos los que no sean el hijo 1
	for(var i=0;i<this.divPasos.children().length;i++){
		if(i!=this.pasoActual){			
			this.divPasos.children().eq(i).css("display","none");
		}
		else{					
			this.divPasos.children().eq(i).css("display","block");
		}
	}				
	if(this.pasoActual==0){
		this.botonFlechaIzquierda.off("click");
		this.botonFlechaIzquierda.attr("disabled","disabled");
		this.botonFlechaIzquierda.css({"cursor":"none","opacity":"0.5"});
	}	
	else if(this.botonFlechaIzquierda.css("opacity")==0.5){
		this.botonFlechaIzquierda.on("click",{cambioPaso:-1},$.proxy(this.eventoCambiarPasos,this));
		this.botonFlechaIzquierda.attr("disabled",false);		
		this.botonFlechaIzquierda.css({"cursor":"pointer","opacity":"1"});
	}


	if(this.pasoActual==this.divPasos.children().length-1){
		this.botonFlechaDerecha.children().eq(0).html("Finalizar");
		/*
		this.botonFlechaDerecha.off("click");
		this.botonFlechaDerecha.attr("disabled","disabled");
		this.botonFlechaDerecha.css({"cursor":"none","opacity":"0.5"});*/
	}
	else if(this.botonFlechaDerecha.children().eq(0).html()=="Finalizar"){
		this.botonFlechaDerecha.children().eq(0).html("Siguiente");		
		/*
		this.botonFlechaDerecha.on("click",{cambioPaso:1},$.proxy(this.eventoCambiarPasos,this));
		this.botonFlechaDerecha.attr("disabled",false);		
		this.botonFlechaDerecha.css({"cursor":"pointer","opacity":"1"});	*/
	}	
}

Pasos.prototype.cargarEventos=function(){
	this.botonFlechaIzquierda.on("click",{cambioPaso:-1},$.proxy(this.eventoCambiarPasos,this));
	this.botonFlechaDerecha.on("click",{cambioPaso:1},$.proxy(this.eventoCambiarPasos,this));
}

Pasos.prototype.eventoCambiarPasos=function(event){		
	this.funcionCambioPasoPadre(this.pasoActual,event.data.cambioPaso,this.objetoPadre);
}

Pasos.prototype.hacerCambioPaso=function(cambioPaso){
	this.pasoActual+=cambioPaso;
	this.cambiarPaso();
}

