//Require una imágen y abajo un div con textos.
//iconos del menú es un listado de urls, nombres y tootip para los iconos que estarán visibles
 //arriba del elemento principal cuando el cursos pase por encima.
var Coverflow=function(elementos,elementoInicio,iconosMenu,funcionClickMenu,objetoPadre){	
	this.iconosMenu=iconosMenu;	
	this.funcionClickMenu=funcionClickMenu;
	this.objetoPadre=objetoPadre;
	this.cargarObjetos();	
	this.recargar(elementos,elementoInicio);
	this.cargarEventos();	
}
Coverflow.prototype.cargarCarrusel=function(posX,posZ,alto,centroCarrusel,anchoElemento,
				posY,separacionElementosX){
	for(var i=0;i<20;i++){
		this.carruselCss.push({"posZ":posZ,"alto": alto+"%","ancho": (i!=centroCarrusel?anchoElemento:anchoElemento*1.5)+"px","posX": posX+"px","posY":posY+"%"});
		posX+=separacionElementosX;
		if(i==centroCarrusel)
			posX+=separacionElementosX*0.5;
		if(i<centroCarrusel){
			posZ++;
			alto+=10;
			posY-=5;
		}
		else{
			alto-=10;
			posY+=5;
			posZ--;
		}				
	}		
}

Coverflow.prototype.recargar=function(elementos,elementoInicio){
	//Apagar eventos de lo previos.
	if(this.elementosGraficos)
		for(var i=0;i<this.elementosGraficos.length;i++){
			this.elementosGraficos[i].divPrincipal.off("click");
			this.elementosGraficos[i].divPrincipal.off("mouseover");
			this.elementosGraficos[i].divPrincipal.off("mouseout");
		}
	this.elementos=elementos;
	this.elementoInicio=elementoInicio;
	this.divCoverflow.html("");
	this.elementosGraficos=new Array();
	this.carruselCss=new Array();

	var anchoContenedor=this.divCoverflow.css("width");
	anchoContenedor=anchoContenedor.substr(0,anchoContenedor.length-2);
	anchoContenedor-=anchoContenedor*0.35;
	var centroCarrusel=9;
	var anchoElemento=200;	
	var separacionElementosX=150;		
	var posY=15;
	var alto=70-centroCarrusel*10;
	posY+=(centroCarrusel)*5;
	var posX=anchoContenedor/2-anchoElemento/2-centroCarrusel*separacionElementosX;	
	var posZ=15-centroCarrusel;
	//Se usa un 10 como el centro del carrusel.
	this.cargarCarrusel(posX,posZ,alto,centroCarrusel,anchoElemento,
				posY,separacionElementosX);

	var posCarrusel=parseInt(this.carruselCss.length/2)-1;	
	posCarrusel-=this.elementoInicio;

	for(var i=0;i<this.elementos.length;i++){
		var rotateY=10;
		if(posCarrusel>centroCarrusel)
			rotateY=-10;
		else if(posCarrusel==centroCarrusel)		
			rotateY=0;	

		var elemento=new ElementoCoverflow(this.elementos[i],rotateY,this.carruselCss,posCarrusel);	
		this.divCoverflow.append(elemento.divPrincipal);
		this.elementosGraficos.push(elemento);
		posCarrusel++;		
	}	
	//Cargar nuevos eventos de click
	for(var i=0;i<this.elementosGraficos.length;i++){
		this.elementosGraficos[i].divPrincipal.on("click",{"nuevaPosicion":i},$.proxy(this.recorrer,this));
		this.elementosGraficos[i].divPrincipal.on("mouseover",{"posicion":i},$.proxy(this.eventoEncimaElemento,this));
		this.elementosGraficos[i].divPrincipal.on("mouseout",{"posicion":i},$.proxy(this.eventoDejaElemento,this));
	}

	//Ver la posición del elemento inicio.
	if(this.elementosGraficos && this.elementosGraficos.length>0){		
		var ancho=parseInt(this.elementosGraficos[this.elementoInicio].divPrincipal.css("width"));				
		var posIzquierda=parseInt(this.elementosGraficos[this.elementoInicio].divPrincipal.css("left"));
		posIzquierda+=ancho;
		ancho=this.iconosMenu.length*40;		
		posIzquierda-=ancho;
		this.divIconosMenu.css({"top":this.elementosGraficos[this.elementoInicio].divPrincipal.css("top"),
								"left":posIzquierda+"px"});
		this.divCoverflow.append(this.divIconosMenu);
		for(var i=0;i<this.botonesMenu.length;i++){
			this.botonesMenu[i].off("click");
			this.botonesMenu[i].on("click",{"nombre":this.iconosMenu[i].nombre},$.proxy(function(event){
				//Aquí debe llamar a la función padre que procesará click en el menú.
				this.funcionClickMenu(event.data.nombre,this.objetoPadre,
								this.elementosGraficos[this.elementoInicio].elemento);	
			},this));
		}

		this.divIconosMenu.off("mouseover");
		this.divIconosMenu.off("mouseout");
		this.divIconosMenu.on("mouseover",$.proxy(function(){
			this.divIconosMenu.css("display","block");				
		},this));
		this.divIconosMenu.on("mouseout",$.proxy(function(){
			this.divIconosMenu.css("display","none");
		},this));
	}	
}
Coverflow.prototype.cargarObjetos=function(){		
	this.divCoverflow=$(".divCoverflow");	
	//Hacer el diseño de los iconos del menú.	
	this.botonesMenu=new Array();
	this.divIconosMenu=$("<div>");
	this.divIconosMenu.css({"position":"absolute","cursor":"pointer","overflow":"hidden",
						"background-color":"rgba(0,0,0,0.7)","z-index":"15","display":"none"});	
	for(var i=0;i<this.iconosMenu.length;i++){
		var icono=$("<div>");		
		icono.css({"width":"30px","height":"30px","background-image":"url("+this.iconosMenu[i].icono+")",
				"background-size":"100% 100%","background-repeat":"no-repeat","float":"left",
				"margin-left":"5px","margin-right":"5px"});		
		icono.attr({"data-toggle":"tooltip","title":this.iconosMenu[i].tooltip});
		this.divIconosMenu.append(icono);
		this.botonesMenu.push(icono);				
	}
	this.divCoverflow.append(this.divIconosMenu);		
}
Coverflow.prototype.cargarEventos=function(){	
}

Coverflow.prototype.eventoDejaElemento=function(event){
	var data=event.data;
	//Mostrar el menú si pasa por encima del de inicio.
	if(data.posicion==this.elementoInicio)
		this.divIconosMenu.css("display","none");
}
Coverflow.prototype.eventoEncimaElemento=function(event){
	var data=event.data;
	var target=$(event.target);
	//Mostrar el menú si pasa por encima del de inicio.
	if(data.posicion==this.elementoInicio)
		this.divIconosMenu.css("display","block");
}
Coverflow.prototype.recorrer=function(event){	
	var data=event.data;	
	var diferencia=this.elementoInicio-data.nuevaPosicion;	
	//Ir hacia adelante.		
	if(this.elementoInicio>data.nuevaPosicion){		
		this.elementoInicio=data.nuevaPosicion;		
		for(var i=0;i<this.elementosGraficos.length;i++){
			if(i<this.elementoInicio)
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(10deg)"});
			else if(i>this.elementoInicio)
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(-10deg)"});
			else
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(0deg)"});
			this.elementosGraficos[i].cambiarEstilos(this.carruselCss,diferencia);
		}
	}
	if(this.elementoInicio<data.nuevaPosicion){		
		this.elementoInicio=data.nuevaPosicion;	
		for(var i=this.elementosGraficos.length-1;i>=0;i--){			
			if(i<this.elementoInicio)
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(10deg)"});
			else if(i>this.elementoInicio)
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(-10deg)"});
			else
				this.elementosGraficos[i].divPrincipal2.css({"transform": "rotateY(0deg)"});
			this.elementosGraficos[i].cambiarEstilos(this.carruselCss,diferencia);
		}		
	}	
}

var ElementoCoverflow=function(elemento,rotateY,carruselCss,pos){	
	this.elemento=elemento;					
	this.rotateY=rotateY;
	this.pos=pos;
	this.cargarObjetos(carruselCss);	
}

ElementoCoverflow.prototype.cambiarEstilos=function(carruselCss,desplazamiento){		
	this.pos+=desplazamiento;		
	if(this.pos<carruselCss.length && this.pos>=0){
		var nuevosEstilos=carruselCss[this.pos];
		this.divPrincipal.css({"z-index":nuevosEstilos['posZ'],"display":"block"});			
		//Quitar y poner el css antes de dimensionar el css para conseguirlo en px.
		var actualAlto=this.divPrincipal.css("height");
		this.divPrincipal.css("height",nuevosEstilos['alto']);
		this.dimensionarImagen(500,parseInt(nuevosEstilos['ancho']));
		this.divPrincipal.css("height",actualAlto);
		this.divPrincipal.animate({"height": nuevosEstilos['alto'],
		    "width":nuevosEstilos['ancho'],"left": nuevosEstilos['posX'],
		    "top":nuevosEstilos['posY']},500,function(){		    	
		    });	
	}		
	else{
		this.divPrincipal.css({"display":"none"});		
	}

}


//El elemento es la url de la imagen y el div de abajo.
ElementoCoverflow.prototype.cargarObjetos=function(carruselCss){				
	this.divPrincipal=$("<div>");	
	if(this.pos>=0 && this.pos<carruselCss.length){ //Cargar css.				
		this.divPrincipal.css({"position": "absolute",	
			"z-index":carruselCss[this.pos].posZ,
		    "height": carruselCss[this.pos].alto,
		    "width": carruselCss[this.pos].ancho,
		    "left": carruselCss[this.pos].posX,
		    "top":carruselCss[this.pos].posY,       
		    "-webkit-perspective": "150px", /* Chrome, Safari, Opera  */
		    "perspective": "200px",
			"cursor":"pointer"});	
	}
	else{
		this.divPrincipal.css({"position": "absolute",	
			"z-index":"1",
		    "height": "100px",
		    "width": "100px",
		    "left": "100px",
		    "top":"100px",       
		    "-webkit-perspective": "150px", /* Chrome, Safari, Opera  */
		    "perspective": "200px",
			"cursor":"pointer","display":"none"});		
	}
		
	this.divPrincipal2=$("<div>")	
	this.divPrincipal.append(this.divPrincipal2);
	this.divPrincipal2.css({
		"width":"100%",
		"height":"100%",
    	"position": "absolute",
    	"border": "2px solid #555555",    	        
    	"background-color":"#eeeeee",
    	"transform": "rotateX(10deg)"
	});
	this.divPrincipal2.css({"transform": "rotateY("+this.rotateY+"deg)"});	

	/*
	this.divImagen=$("<div>");
	this.divImagen.css({"background-image":"url("+this.elemento.urlImagen+")","background-size":"100% 100%",
				"background-repeat":"no repeat","width":"100%","height":"91%","position":"absolute",
				"top":"0px","left":"0px"});
	this.divPrincipal2.append(this.divImagen);*/	
	this.divImagen=$("<img>");
	this.divPrincipal2.append(this.divImagen);
	this.imagen=new Image();	
	var objetoPropio=this;
	this.imagen.onload=function(){
		objetoPropio.dimensionarImagen(0,0);
	}	

	this.divAbajo=$("<div>");
	this.divAbajo.css({"background-color":"#aaaaaa","width":"100%","height":"10%","position":"absolute",
						"left":"0px","bottom":"0px","text-align":"center","color":"white"});
	this.divAbajo.html(this.elemento.contenidoAbajo);
	this.divPrincipal2.append(this.divAbajo);	
	this.imagen.src=this.elemento.urlImagen;
}


ElementoCoverflow.prototype.dimensionarImagen=function(tiempoAnimacion,anchoMarco){
	var altoCoverflow=parseInt($(".divCoverflow").css("height"));
	if(tiempoAnimacion==0)
		var anchoMarco=parseInt(this.divPrincipal.css("width"));   		
	var altoMarco=parseInt(this.divPrincipal.css("height"))-parseInt(this.divAbajo.css("height"));			
	

	var anchoNormal=anchoMarco-30;
	var altoNormal=altoMarco-30;	
	if(this.imagen.height<this.imagen.width){
        var escala=this.imagen.width/anchoNormal;
        var nuevoAlto=parseInt(this.imagen.height/escala);            
        if(nuevoAlto>altoNormal){                    
            escala=nuevoAlto/altoNormal;
            nuevoAncho=parseInt(anchoNormal/escala);
            nuevoAlto=altoNormal;
        }
        else
           	nuevoAncho=anchoNormal;                                
    }                
    else{                
        var escala=this.imagen.height/altoNormal;
        var nuevoAncho=parseInt(this.imagen.width/escala);
        if(nuevoAncho>anchoNormal){
        	escala=nuevoAncho/anchoNormal;
        	nuevoAlto=parseInt(altoNormal/escala);
        	nuevoAncho=anchoNormal;
        }
        else            
        	nuevoAlto=altoNormal;                
    }
    var posIzquierda=parseInt(anchoMarco/2-nuevoAncho/2);
    var posArriba=parseInt(altoMarco/2-nuevoAlto/2);        
        //Obtener el centro de la imagen.

    this.divImagen.attr({"src":this.imagen.src});    
    if(tiempoAnimacion==0)
    	this.divImagen.css({"position":"absolute","width":nuevoAncho+"px","height":nuevoAlto+"px","left":posIzquierda+"px",
                "top":posArriba+"px"});  
    else
    	this.divImagen.animate({"position":"absolute","width":nuevoAncho+"px","height":nuevoAlto+"px","left":posIzquierda+"px",
                "top":posArriba+"px"},tiempoAnimacion,function(){});
}

