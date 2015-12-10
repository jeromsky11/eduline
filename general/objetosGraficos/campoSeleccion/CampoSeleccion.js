var CampoSeleccion=function(){
	this.ancho=200;
	this.alto=30;	
	this.tipo="campo_seleccion";
	this.tipoTextual="Campo de selección";
	this.contadorElementosAgregados=0;
}
CampoSeleccion.prototype=new Componente();

CampoSeleccion.prototype.crearEditable=function(){
	Componente.prototype.crearEditable.call(this);	
	this.campoLista=$("<select>");
	this.campoLista.css({"position":"absolute","top":"0px","width":"100%","height":"auto"
  					,"text-align":"center"});	
	this.divContenedor.append(this.campoLista);

	this.divBotones.css({"right":"25px"});
}


CampoSeleccion.prototype.obtenerFichaGeneral=function(){
	Componente.prototype.obtenerFichaGeneral.call(this);

	var fila=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
    fila.insertBefore(this.tituloAnimaciones);

    var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:310px; height:30px;'>");
    fila.append(filaCentro);

	filaCentro.append("<p style='float:left; margin-top:3px;'>Agregar</p>");
	this.campoAgregarElemento=$("<input style='width:170px; float:left; margin-left:10px; height:30px;'>");
	this.campoAgregarElemento.keyup($.proxy(function(event){
		if(event.keyCode==13)
			this.botonAgregarElemento.trigger("click");
	},this));	
	filaCentro.append(this.campoAgregarElemento);

	this.botonAgregarElemento=$("<img style='float:left; margin-left:10px; width:30px; height:30px; cursor:pointer;' title='click para agregar' src='"+urlServidor+"/general/objetosGraficos/iconos/agregar.png'> </img>");
	filaCentro.append(this.botonAgregarElemento);
	this.botonAgregarElemento.attr("title","Agrega el elemento capturado");
	this.botonAgregarElemento.on("click",$.proxy(this.agregarElementoLista,this));

	
	this.botonQuitarElemento=$("<img style='float:left; margin-left:10px; width:30px; height:30px; cursor:pointer;' title='click para agregar' src='"+urlServidor+"/general/objetosGraficos/iconos/quitar.png'> </img>");	
	filaCentro.append(this.botonQuitarElemento);	
	this.botonQuitarElemento.attr("title","Quita el elemento seleccionado");
	this.botonQuitarElemento.on("click",$.proxy(this.quitarElementoLista,this));

	var fila2=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
    fila2.insertBefore(this.tituloAnimaciones);

    var filaCentro2=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:365px; height:30px;'>");
    fila2.append(filaCentro2);

    filaCentro2.append("<p style='float:left; margin-top:3px;'>Elementos</p>");

    this.campoListaEdicion=$("<select style='width:180px; float:left; margin-left:5px; height:30px;'>");
	filaCentro2.append(this.campoListaEdicion);

	filaCentro2.append("<p style='float:left; margin-left:10px; margin-top:3px;'>Visibles</p>");

	this.campoVisibles=$("<input disabled='true' style='width:50px; float:left; margin-left:5px; height:30px;'>");
	filaCentro2.append(this.campoVisibles);


	this.obtenerFichaGeneral2(new Array("multilinea"));
	this.botonMultilinea.on("click",$.proxy(function(){				
		this.campoVisibles.attr("disabled",this.botonMultilinea.attr("marcado")=="0");
		this.campoVisibles.focus();
		this.campoVisibles.val("");
	},this));

}

CampoSeleccion.prototype.agregarElementoLista=function(event){
	var valor=this.campoAgregarElemento.val();
	if(!cadenaVacia(valor)){
		this.campoListaEdicion.append("<option value='"+this.contadorElementosAgregados+"'>"+valor+"</option>");
		this.campoListaEdicion.val(this.contadorElementosAgregados);
		this.contadorElementosAgregados++;
	}
	this.campoAgregarElemento.val("");	
	this.campoAgregarElemento.focus();
}

CampoSeleccion.prototype.quitarElementoLista=function(event){
	var valorQuitar=this.campoListaEdicion.val();
	this.campoListaEdicion.children().each(function(){
		if($(this).attr("value")==valorQuitar){
			$(this).remove();  //Quitar este option.
			return;
		}			
	});
}
CampoSeleccion.prototype.obtenerTituloEdicion=function(){
	return "Propiedades campo de selección";
}


CampoSeleccion.prototype.guardarAtributosEditados=function(){	
	Componente.prototype.guardarAtributosEditados.call(this);
	var elementos=[];
	this.campoListaEdicion.children().each(function(){
		elementos.push({valor:$(this).attr("value"),texto:$(this).html()});
	});

	this.atributos.hijo={
			elementos:elementos,			
			multilinea:this.botonMultilinea.attr("marcado"),
			visibles:(this.botonMultilinea.attr("marcado")=="1")?this.campoVisibles.val():"1",
	};


	//Agregar todos los elementos.	
	this.campoLista.html("");
	for(var i=0;i<this.atributos.hijo.elementos.length;i++){
		var option=this.atributos.hijo.elementos[i];
		this.campoLista.append("<option value='"+option.valor+"'>"+option.texto+"</option>");
	}	
	this.actualizarVistaDiseno2(this.campoLista);
	this.actualizarVistaDiseno(this.campoLista);

	this.campoLista.attr("size",this.atributos.hijo.visibles);
	var visibles=parseInt(this.campoLista.css("height"));		
	this.divContenedor.css("height",(visibles+2)+"px");

}

//Debe cargar los atributos ya seleccionados previamente.
CampoSeleccion.prototype.cargarAtributosEdicion=function(){
	Componente.prototype.cargarAtributosEdicion.call(this);
	if(this.atributos){//Si ya hubo atributos previos.
		this.botonMultilinea.attr("marcado",this.atributos.hijo.multilinea);

		if(this.atributos.hijo.multilinea=="1"){
			this.campoVisibles.attr("disabled",false);
			this.campoVisibles.val(this.atributos.hijo.visibles);
		}
		this.marcarSeleccionBotones([this.botonMultilinea]);	
		//Cargar los elementos listados.		
		//Agregar todos los elementos.	
		this.campoListaEdicion.html("");
		for(var i=0;i<this.atributos.hijo.elementos.length;i++){
			var option=this.atributos.hijo.elementos[i];
			this.campoListaEdicion.append("<option value='"+option.valor+"'>"+option.texto+"</option>");
		}
	}	
}


CampoSeleccion.prototype.validarCambiosEdicion=function(){
	var valido=Componente.prototype.validarCambiosEdicion.call(this);
	//Validar los visibles.
	if(this.botonMultilinea.attr("marcado")=="1"){
		var visibles=this.campoVisibles.val();
		if(!cadenaVacia(visibles) && isNaN(visibles)){
			this.campoVisibles.attr("title","Los valores deben ser números enteros");
			this.campoVisibles.css("border","solid 1px red");
			this.campoVisibles.focus();
			valido=false;
		}
		else{
			this.campoVisibles.attr("title","Introduza los registros que deben quedar visibles");
			this.campoVisibles.css("border",this.bordeInicialCampos);
		}
	}
	return valido;
}
