/*
$(function(){		
	var acordion=new Acordion();
	$("body").append(acordion.cargarObjetos("500px","200px"));
	acordion.agregarNodo("Elemento 1",
		"<div style='width:100%; text-align:center;'>Hola elemento 1<br> genial verdad?</div>");
	acordion.agregarNodo("Elemento 2",
		"<div style='width:100%; text-align:center;'>Hola elemento 2<br> genial verdad? <br> super genial</div>");
	acordion.agregarNodo("Elemento 3",
		"<div style='width:100%; text-align:center;'>Hola elemento 3<br> genial verdad? <br> super super genial</div>");
	acordion.agregarNodo("Elemento 4",
		"<div style='width:100%; text-align:center;'>Hola elemento 4<br> genial verdad? <br> super super genial</div>");
	acordion.agregarNodo("Elemento 5",
		"<div style='width:100%; text-align:center;'>Hola elemento 5<br> genial verdad? <br> super super genial</div>");
	acordion.cargarEventos();

});*/

var Acordion=function(){	
	this.ultimaPosicion=0;
}

Acordion.prototype.limpiar=function(titulo,contenido){
	for(var i=0;i<this.listaHijosTitulos.length;i++)
		this.listaHijosTitulos[i].off("click");
	this.listaHijosTitulos=[];
	this.listaHijos=[];
	this.divNodos.html("");
}
Acordion.prototype.agregarNodo=function(titulo,contenido){
	var divHijoTitulo=$("<div class='divHijoTitulo'>");	
	divHijoTitulo.html(titulo);	
	divHijoTitulo.on("click",{posicion:this.listaHijosTitulos.length},
		$.proxy(this.deslizarAcordion,this));
	this.listaHijosTitulos.push(divHijoTitulo);	
	divHijoTitulo.css("cursor","pointer");
	this.divNodos.append(divHijoTitulo);
	var divHijoContenido=$("<div class='divHijoContenido'>");
	if(this.listaHijos.length!=this.ultimaPosicion)
		divHijoContenido.css("display","none");
	divHijoContenido.append(contenido);
	this.listaHijos.push(divHijoContenido);
	this.divNodos.append(divHijoContenido);	
}

Acordion.prototype.cargarObjetos=function(){
	this.divAcordion=$("<div class='divAcordion'>");	
	this.divNodos=$("<div class='divNodos'>");
	this.divAcordion.append(this.divNodos);
	this.listaHijos=[];	
	this.listaHijosTitulos=[];
	return this.divAcordion;
}
Acordion.prototype.cargarEventos=function(){		
}	

Acordion.prototype.deslizarAcordion=function(event){	
	var posicion=event.data.posicion;
	if(posicion!=this.ultimaPosicion){
		this.listaHijos[this.ultimaPosicion].slideToggle(100,function(){});
		this.listaHijos[posicion].slideToggle(100,function(){});
		this.ultimaPosicion=posicion;
	}

}