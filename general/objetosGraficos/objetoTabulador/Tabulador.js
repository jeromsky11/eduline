var Tabulador=function(funcionCambioFicha,objetoPadre){
	this.tituloFichaX=0;
	this.ultimaFicha=null;	
	this.funcionCambioFicha=funcionCambioFicha;
	this.objetoPadre=objetoPadre;
}
Tabulador.prototype.cargarObjetos=function(){
	var divTabulador=$("<div class='divTabulador'>");
	this.divFichas=$("<div class='divFichasTabulador'>");
	divTabulador.append(this.divFichas);
	this.divPaneles=$("<div class='divPanelesTabulador'>");
	divTabulador.append(this.divPaneles);
	return divTabulador;
}

Tabulador.prototype.agregarFicha=function(nombre,etiqueta,divContenido){
	var ficha=$("<div class='divFichaTabulador' nombre='"+nombre+"'>");	
	var textoFicha=$("<p style='display:table-cell; vertical-align:middle; cursor:pointer'>");
	ficha.append(textoFicha);	
	textoFicha.html(etiqueta);
	var ancho=etiqueta.length*10;

	ficha.css({"left":this.tituloFichaX+"px","width":ancho+"px","height":"103%"});
	this.divFichas.append(ficha);
	this.tituloFichaX+=ancho;

	//divContenido.css({"display":"none"});
	if(this.ultimaFicha){
		this.ultimaFicha.ficha.css({"border":"none","font-weight":"normal","height":"100%"});
		this.ultimaFicha.divContenido.css({"display":"none"});
	}
	this.divPaneles.append(divContenido);
	this.ultimaFicha={"ficha":ficha,"divContenido":divContenido};

	divContenido.attr("nombre",nombre);
	textoFicha.on("click",{divContenido:divContenido,ficha:ficha},$.proxy(function(event){	
		//var target=$(event.target);		
		var divMostrar=$(event.data.divContenido);
		var ficha=$(event.data.ficha);
		this.cambiarFicha(ficha.attr("nombre"),ficha,divMostrar);		
	},this));	
}

Tabulador.prototype.cambiarFicha=function(nombre,ficha,divMostrar){
	//Está seleccionando la ficha que está activa.
	if(this.ultimaFicha && nombre==this.ultimaFicha.ficha.attr("nombre"))
		return; 
	if(divMostrar==null){
		//Buscar el div a mostrar y la ficha en base al atributo de los hijos de
		//divPaneles.		
		this.divFichas.children().each(function(index){
			var actual=$(this);			
			if(actual.attr("nombre")==nombre){				
				ficha=actual;
				return;
			}
		});		
		if(!ficha)
			return;				
		this.divPaneles.children().each(function(index){
			var actual=$(this);
			if(actual.attr("nombre")==nombre){				
				divMostrar=actual;
				return;
			}
		});		
	}	
	//Quitar la ficha previa.
	if(this.ultimaFicha){
		this.ultimaFicha.ficha.css({"border":"none","font-weight":"normal","height":"100%"});
		this.ultimaFicha.divContenido.css({"display":"none"});
	}	
	ficha.css({"height":"103%","border-top":"solid 1px #aaaaaa","border-left":"solid 1px #aaaaaa",
				"border-right":"solid 1px #aaaaaa","font-weight":"bold"});
	divMostrar.css("display","block");
	this.ultimaFicha={"ficha":ficha,"divContenido":divMostrar};	
	
	this.funcionCambioFicha(nombre,this.objetoPadre);
}
