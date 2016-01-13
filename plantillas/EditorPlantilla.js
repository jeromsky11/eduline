var EditorPlantilla=function(contenedor,idPlantilla,nombre,descripcion){
	this.idPlantilla=idPlantilla;
	this.nombre=nombre;
	this.descripcion=descripcion;
	this.contenedor=contenedor;	
	this.misComponentes=[];
	this.valorX=130;
	this.valorY=120;	
	this.tipoElementoArrastrando="";
	this.elementosAgregados=0;
	this.contadores={botones:0,bloquesTexto:0,camposSeleccion:0,imagenes:0,selectorFechas:0};
	this.selectorFechas;
}
//Retorna un div con un nuevo editor de plantilla.
EditorPlantilla.prototype.cargarObjetos=function(){
	//La parte general.
	this.divGeneral=$("<div class='editorPlantilla'>");
	this.divContenido=$("<div class='divContenidoPlantilla'>");
	this.divContenido.droppable({
		drop:$.proxy(function(event,ui){
			if(this.tipoElementoArrastrando){
			  var anchoDivComponentes=parseInt(this.divSelectorComponentes.css("width"));                            
			  this.valorX=ui.position.left-anchoDivComponentes;
			  this.valorY=ui.position.top;
			  switch(this.tipoElementoArrastrando){
			  	case "etiqueta":
			  		this.etiqueta.trigger("dblclick");				  		
			  	break;
			  	case "boton":
			  		this.boton.trigger("dblclick");
			  	break;
			  	case "campoSeleccion":
			  		this.campoSeleccion.trigger("dblclick");
			  	break;
			  	case "imagen":
			  		this.campoImagen.trigger("dblclick");
			  	break;
			  	case "selectorFechas":
			  		this.selectorFechas.trigger("dblclick");
			  	break;
			  }			  
			  this.tipoElementoArrastrando="";			  
			}
		},this)

	});
	this.divGeneral.append(this.divContenido);
	var divEncabezadoGeneral=$("<div class='divEncabezadoPlantillaGeneral'>");
	this.divGeneral.append(divEncabezadoGeneral);

	this.cargarSelectorComponentesAgregar();
	this.cargarSelectorComponentesAgregados();	

	return this.divGeneral;
}
EditorPlantilla.prototype.cargarEventos=function(){
	this.etiqueta.on("dblclick",{ancho:250,alto:100,tipo:"etiqueta"},$.proxy(this.agregarNuevoComponente,this));
	this.campoSeleccion.on("dblclick",{ancho:200,alto:30,tipo:"campoSeleccion"},$.proxy(this.agregarNuevoComponente,this));
	this.boton.on("dblclick",{ancho:150,alto:30,tipo:"boton"},$.proxy(this.agregarNuevoComponente,this));
	this.campoImagen.on("dblclick",{ancho:300,alto:200,tipo:"imagen"},$.proxy(this.agregarNuevoComponente,this));
	this.selectorFechas.on("dblclick",{ancho:200,alto:230,tipo:"selectorFechas"},$.proxy(this.agregarNuevoComponente,this));
}

EditorPlantilla.prototype.agregarNuevoComponente=function(event){
	//var nuevoComponente=$(event.target);
	var nuevoComponente=null;
	var data=event.data;
	switch(data.tipo){
		case "etiqueta":
			this.contadores.bloquesTexto++;
			nuevoComponente=new Etiqueta("Bloque de texto "+this.contadores.bloquesTexto);
			nuevoComponente.nombre="bloqueTexto"+this.contadores.bloquesTexto;
		break;
		case "campoSeleccion":
			this.contadores.camposSeleccion++;
			nuevoComponente=new CampoSeleccion();
			nuevoComponente.nombre="campoSeleccion"+this.contadores.camposSeleccion;
		break;
		case "boton":
			this.contadores.botones++;
			nuevoComponente=new Boton("Botón "+this.contadores.botones);
			nuevoComponente.nombre="boton"+this.contadores.botones;
		break;
		case "imagen":
			this.contadores.imagenes++;
			nuevoComponente=new SubirImagen();
			nuevoComponente.nombre="imagen"+this.contadores.imagenes;
		break;
		case "selectorFechas":
			this.contadores.selectorFechas++;
			nuevoComponente=new SelectorFechas();  //Aquí continuar..
			nuevoComponente.nombre=" selectorFechas"+this.contadores.selectorFechas;					
		break;
	}	
	nuevoComponente.objetoPadre=this;
	nuevoComponente.idComponente=this.elementosAgregados;
	this.elementosAgregados++;
	nuevoComponente.crearEditable();
	nuevoComponente.setAncho(data.ancho);
	nuevoComponente.setAlto(data.alto);	 
	nuevoComponente.setX(this.valorX);
	nuevoComponente.setY(this.valorY);	
	nuevoComponente.funcionCambioAtributos=this.cambioAtributosComponentes;
	nuevoComponente.funcionValidarComponente=this.validarComponente;

	this.divContenido.append(nuevoComponente.divContenedor);	
	nuevoComponente.cargarEventos();
	this.misComponentes.push(nuevoComponente);
	
	this.actualizarListaComponentesAgregados();

}

//Los parámetros deben contener el nombre del nuevo componente que se quiere agregar
//No debe venir dentro de la variable componente porque no se ha guardado aún.
EditorPlantilla.prototype.validarComponente=function(parametros,componente,objetoPropio){	
	//Buscar si algún componente con otro id tiene los el mismo nombre.
	for(var i=0;i<objetoPropio.misComponentes.length;i++){		
		if(objetoPropio.misComponentes[i].idComponente!=componente.idComponente && 
			objetoPropio.misComponentes[i].nombre==parametros.nombre){				
				return false;
		}
	}
	return true;
}

//El parámetro componente podría usarse en cualquier momento.
//En el futuro esta función podría regresar un true y false si el cambio en el nombre es vóalido.
EditorPlantilla.prototype.cambioAtributosComponentes=function(componente,objetoPropio){
	objetoPropio.actualizarListaComponentesAgregados();		
}

EditorPlantilla.prototype.actualizarListaComponentesAgregados=function(){
	this.divListaComponentesAgregados.html("");	
	for(var i=0;i<this.misComponentes.length;i++){
		var miColor=(i%2==0)?"#ccccff":"#ddddff";
		var div=$("<div style='width:100%; background-color:"+miColor+"; margin-top:3px;'>");
		div.html(this.misComponentes[i].nombre);
		this.divListaComponentesAgregados.append(div);
	}
}

EditorPlantilla.prototype.eliminarComponente=function(idComponente){
	for(var i=0;i<this.misComponentes.length;i++){
		if(this.misComponentes[i].idComponente==idComponente){
			this.misComponentes.splice(i,1);
			break;
		}
	}	
}

EditorPlantilla.prototype.cargarSelectorComponentesAgregados=function(){
	this.divSelectorComponentesAgregados=$("<div class='divSelectorComponentesAgregados'>");
	this.divGeneral.append(this.divSelectorComponentesAgregados);

	this.divSelectorComponentesAgregados.append("<label style='font-weight:bold; width:100%; text-align:center; background-color:#bbbbbb; padding-top:5px; padding-bottom:5px;'>Agregados</label>");

	this.divListaComponentesAgregados=$("<div style='width:100%;'></div>");
	this.divSelectorComponentesAgregados.append(this.divListaComponentesAgregados);

}


EditorPlantilla.prototype.cargarSelectorComponentesAgregar=function(){
	this.divSelectorComponentes=$("<div class='divSelectorComponentes'>");
	this.divGeneral.append(this.divSelectorComponentes);

	var fila=$("<div style=' height:40px; width:100%; margin-top:10px;'>");
    this.divSelectorComponentes.append(fila);

	this.etiqueta=$("<img style='cursor:pointer; width:40px;  height:40px; float:left; margin-left:15%' src='../general/objetosGraficos/iconos/parrafo.png' title='Bloque de texto'>");	
	fila.append(this.etiqueta);		
	this.etiqueta.draggable({
		cursor:'move',
		helper:this.copiaEtiqueta,			
		drag: $.proxy(function (event, ui) {            
            this.tipoElementoArrastrando="etiqueta";
        },this),
	});

	this.boton=$("<img style='cursor:pointer; width:40px;  height:40px; float:left; margin-left:15%' src='../general/objetosGraficos/iconos/boton.png' title='Botón'>");
	fila.append(this.boton);
	this.boton.draggable({
		cursor:'move',
		helper:this.copiaBoton,
		drag: $.proxy(function (event, ui){
            this.tipoElementoArrastrando="boton";
        },this),
	});


	var fila2=$("<div style=' height:40px; width:100%; margin-top:20px;'>");
    this.divSelectorComponentes.append(fila2);    

    this.campoSeleccion=$("<img style='cursor:pointer; width:40px;  height:40px; float:left; margin-left:15%' src='../general/objetosGraficos/iconos/campoSeleccion.png' title='Campo de selección'>");
	fila2.append(this.campoSeleccion);   
	
	this.campoSeleccion.draggable({
		cursor:'move',
		helper:this.copiaCampoSeleccion,
		drag: $.proxy(function (event, ui){
            this.tipoElementoArrastrando="campoSeleccion";
        },this),
	});	

	this.campoImagen=$("<img style='cursor:pointer; width:40px;  height:40px; float:left; margin-left:15%' src='../general/objetosGraficos/objetoSubirImagenes/subirFoto.png' title='Imagen'>");
	fila2.append(this.campoImagen);    
	this.campoImagen.draggable({
		cursor:'move',
		helper:this.copiaCampoImagen,
		drag: $.proxy(function (event, ui){
            this.tipoElementoArrastrando="imagen";
        },this)
	});		

	var fila3=$("<div style='height:40px; width:100%; margin-top:20px;'>");
	this.divSelectorComponentes.append(fila3);
	
	this.selectorFechas=$("<img style='cursor:pointer; width:40px;  height:40px; float:left; margin-left:15%' src='../general/objetosGraficos/iconos/selectorFechas.png' title='Selector de fechas'>");
	fila3.append(this.selectorFechas);

	this.selectorFechas.draggable({
		cursor:"move",
		helper:this.copiaSelectorFechas,

		drag: $.proxy(function (event,ui){
			this.tipoElementoArrastrando="selectorFechas";
		},this)
	});

}
EditorPlantilla.prototype.copiaEtiqueta=function(event){	
  	return "<img style='opacity:0.7; width:40px;  height:40px;' src='../general/objetosGraficos/iconos/parrafo.png'>";	
}
EditorPlantilla.prototype.copiaBoton=function(event){	
  	return "<img style='opacity:0.7; width:40px;  height:40px;' src='../general/objetosGraficos/iconos/boton.png'>";	
}

EditorPlantilla.prototype.copiaCampoSeleccion=function(event){	
  	return "<img style='opacity:0.7; width:40px;  height:40px;' src='../general/objetosGraficos/iconos/campoSeleccion.png'>";	
}

EditorPlantilla.prototype.copiaSelectorFechas=function(event){	
  	return "<img style='opacity:0.7; width:40px;  height:40px;' src='../general/objetosGraficos/iconos/selectorFechas.png'>";	
}

EditorPlantilla.prototype.copiaCampoImagen=function(event){	
  	return "<img style='opacity:0.7; width:40px;  height:40px;' src='../general/objetosGraficos/objetoSubirImagenes/subirFoto.png'>";	
}

EditorPlantilla.prototype.cargarContenido=function(){
	//Obtener el json con el contenido del template.
	//var contenido=file_get_contents("");
}