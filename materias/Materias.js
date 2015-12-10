var Materias=function(funcionObtenerMaterias,padreFuncionObtenerMaterias){
	this.cargarObjetos();
	this.cargarEventos();
	this.funcionObtenerMaterias=funcionObtenerMaterias;
	this.padreFuncionObtenerMaterias=padreFuncionObtenerMaterias;
	this.idMateriaSeleccionada=-1;	
}

Materias.prototype.cargarObjetos=function(){
	this.ventana=new Ventana(null,this.agregarNuevaMateria,this);
    this.botonAgregarMateria=$(".botonAgregarMateria");
}
Materias.prototype.agregarNuevaMateria=function(objetoPropio){	
	if(objetoPropio.validarFormulario()){		
		var nombre=objetoPropio.campoNombre.val();
		var descripcion=objetoPropio.campoDescripcion.val();
		var creditos=objetoPropio.campoCreditos.val();
		var matricula=objetoPropio.campoMatricula.val();
		var areaConocimiento=objetoPropio.campoAreaConocimiento.val();
		//Enviar la nueva materia a la base de datos.
		$.ajax({
			datatype:"json",
			url:"../servidor/Servidor.php",
			data:{
				"accion":"materias,guardar",
				"variables":{"idMateria":-1,"nombre":nombre,"descripcion":descripcion,
						"creditos":creditos,"matricula":matricula,"idArea":areaConocimiento}
			},
			success:$.proxy(objetoPropio.terminoAgregarNuevaMateria,objetoPropio)
		});	
	}	

}

Materias.prototype.terminoAgregarNuevaMateria=function(data){
	var respuesta=JSON.parse(data);
	if(respuesta.idMateria<0)		
		this.etiquetaError.html(respuesta.error);
	else{
		//Informar que todo quedó bien.
		this.ventana.ocultar();
		//Mostrar la nueva ventana.
		this.ventana2=new Ventana(null,this.ocultarVentana2,this);
		this.ventana2.establecerDimensiones("30%","170px");
		this.ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>Materia guardada satisfactoriamente.</div>");		
		this.ventana2.botonCancelar.css("display","none");
		this.ventana2.mostrar("Guardado");

	}
}


Materias.prototype.ocultarVentana2=function(objetoPropio){
	objetoPropio.ventana2.ocultar();
	objetoPropio.obtenerMateriasPorArea();
}

Materias.prototype.obtenerMateriasPorArea=function(){					
	//this.idMateriaSeleccionada=-1; //No hay materia seleccionada.
	$.ajax({
		datatype:"json",
		url:"../servidor/Servidor.php",
		data:{
			"accion":"materias,obtenerMaterias",
			"variables":{"idMateria":-1,"nombre":"","descripcion":"","creditos":"","matricula":"",
							"idArea":""}
		},
		success:$.proxy((this.funcionObtenerMaterias==null)?this.terminoObtenerMaterias:this.funcionObtenerMaterias,
					(this.funcionObtenerMaterias==null)?this:this.padreFuncionObtenerMaterias)
	});
}

Materias.prototype.terminoObtenerMaterias=function(data){

}

Materias.prototype.validarFormulario=function(){
	var nombre=this.campoNombre.val();
	var descripcion=this.campoDescripcion.val();
	var creditos=this.campoCreditos.val();
	var matricula=this.campoMatricula.val();
	var areaConocimiento=this.campoAreaConocimiento.val();
	if(nombre.match(/^\s*$/)){
		this.campoNombre.attr("title","El nombre es inválido");
		this.campoNombre.css("border","solid 2px #ff0000");
		this.campoNombre.focus();
		return false;
	}
	else{
		this.campoNombre.attr("title","Capture un nombre");
		this.campoNombre.css("border",this.bordeActual);
	}	
	if(!areaConocimiento){
		this.campoAreaConocimiento.attr("title","El área de conocimiento es inválida");
		this.campoAreaConocimiento.css("border","solid 2px #ff0000");
		this.campoAreaConocimiento.focus();
		return false;	
	}
	else{
		this.campoAreaConocimiento.attr("title","Elija un área de conocimiento");
		this.campoAreaConocimiento.css("border",this.bordeActual);
	}

	//Validar los créditos.
	if(!creditos.match(/^\s*$/) && !creditos.match(/^\d*$/)){
		this.campoCreditos.attr("title","Escriba solo enteros positivos para los créditos");
		this.campoCreditos.css("border","solid 2px #ff0000");
		this.campoCreditos.focus();
		return false;	
	}
	else{
		this.campoCreditos.attr("title","Capture los créditos");
		this.campoCreditos.css("border",this.bordeActual);
	}
	return true;
}

Materias.prototype.cargarEventos=function(){			
	this.botonAgregarMateria.off("click",$.proxy(this.abrirVentana,this));
	this.botonAgregarMateria.on("click",$.proxy(this.abrirVentana,this));
}

Materias.prototype.recargarEventos=function(){
	this.botonAgregarMateria=$(".botonAgregarMateria");
	this.botonAgregarMateria.off("click");
	this.botonAgregarMateria.on("click",$.proxy(this.abrirVentana,this));		
	this.elementoMateria=$(".elementoMateria");
	this.elementoMateria.off("click");
	this.elementoMateria.on("click",$.proxy(this.seleccionarMateria,this));
}
//Marca una materia como seleccionada de la lista de materias.
Materias.prototype.seleccionarMateria=function(event){	
	var objetoSeleccionado=$(event.target);
	//Quitar selección del último.
	this.elementoMateria.css({"background-color":"white","color":"black","border":"none"});
	//Seleccionar al que se le dió click
	objetoSeleccionado.css({"background-color":"#7777ff","color":"white","border":"solid 1px #333333"});
	this.idMateriaSeleccionada=objetoSeleccionado.attr("idMateria");
}

Materias.prototype.abrirVentana=function(event){
	//Imprimir el id del padre.
	var target=$(event.target);
	var idAreaPadre=target.attr("area_padre");

	this.ventana.establecerDimensiones("60%","400px");
	
	this.ventana.cargarContenidoCentral(
        "<div class='container-fluid'>"+
            "<div class='row'>"+
                "<div class='col-md-2'>Nombre*:</div>"+
                "<div class='col-md-3'><input data-toggle='tooltip' title='Capture el nombre' style='width:100%; height:30px' type='text' id='campoNombreMateria'></input></div>"+
				"<div class='col-md-3'>Area de Conocimiento*: </div>" +
				"<div class='col-md-4'><select  data-toggle='tooltip' title='Elija un área de conocimiento' style='width:100%; height:30px' type='text' id='listaAreasConocimiento'></select></div>"+
            "</div>"+
            "<div class='row'>"+            
            	"<div class='col-md-2'>Descripción:</div>"+
                "<div class='col-md-10'><textArea data-toggle='tooltip' title='Capture la descripción' id='campoDescripcionMateria' rows='7'"+
                "style='width:100%;'/></div>"+
            "</div>"+
            "<div class='row'>"+
                "<div class='col-md-2'>Créditos:</div>"+
                "<div class='col-md-3'><input data-toggle='tooltip' title='Capture los créditos' style='width:100%; height:30px' type='text' id='campoCreditosMateria'></input></div>"+
				"<div class='col-md-3'>Matrícula: </div>" +
				"<div class='col-md-3'><input data-toggle='tooltip' title='Capture la matrícula' style='width:100%; height:30px' type='text' id='campoMatriculaMateria'></input></div>"+
            "</div>"+            
            "<div class='row'>"+            
            	"<div class='col-md-12' id='etiquetaErrorMateria' style='text-align:center; color:red; font-size:15px; font-weight:bold;'></div>"+
            "</div>"+
        "</div>");    

	this.ventana.mostrar("Agregar materia");
	this.campoNombre=$("#campoNombreMateria");
    this.bordeActual=this.campoNombre.css("border");
    this.campoDescripcion=$("#campoDescripcionMateria");
    this.campoCreditos=$("#campoCreditosMateria");
    this.campoMatricula=$("#campoMatriculaMateria");
    this.etiquetaError=$("#etiquetaErrorMateria");
    this.campoAreaConocimiento=$("#listaAreasConocimiento");

    //Obtener las áreas de conocimiento.
    $.ajax({
		datatype:"json",
		url:"../servidor/Servidor.php",
		data:{
			"accion":"areaConocimiento,obtenerAreasConocimiento",
			"variables":{"idArea":-1,"nombre":"","descripcion":""}
		},
		success:$.proxy(function(data){
			data=JSON.parse(data);
			salida="";
			for(var i=0;i<data.length;i++){
				salida+="<option value='"+data[i]['id_area']+"'>"+data[i]['nombre']+"</option>";
			}
			this.campoAreaConocimiento.html(salida);
			this.campoAreaConocimiento.val(idAreaPadre);
		},this)
	});

}



