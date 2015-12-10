$(function(){	
	inicio=new Inicio();			
	cursos=new Cursos();  //Iniciar el objeto cursos.	
});



var Inicio=function(){
	this.establecerEstilos();
	this.cargarObjetos();
	this.cargarEventos();		
}

Inicio.prototype.establecerEstilos=function(){	
	$(".listaMenuPrincipal  li").hover(function(){
		$(this).css({"background-color":"white"});
		$(this).children("a").css({"color":"#225599"});
	});

	$(".listaMenuPrincipal  li").mouseleave(function(){
		$(this).css({"background-color":"transparent"});
		$(this).children("a").css({"color":"white"});
	});

	$('[data-toggle="tooltip"]').tooltip();
}

Inicio.prototype.cargarObjetos=function(){

}
Inicio.prototype.cargarEventos=function(){

}