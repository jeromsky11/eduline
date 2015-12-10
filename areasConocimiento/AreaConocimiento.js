var AreaConocimiento=function(funcionObtenerMaterias,padreFuncionObtenerMaterias,
		botonAgregarAreaConocimiento){
	this.botonAgregarAreaConocimiento=botonAgregarAreaConocimiento;
	this.funcionObtenerMaterias=funcionObtenerMaterias;
	this.padreFuncionObtenerMaterias=padreFuncionObtenerMaterias;	
	this.cargarObjetos();
	this.cargarEventos();		
}
//Recibe como parámetro una función que recibirá los datos.
//Si no hay función receptora, está misma clase recibe los datos.
AreaConocimiento.prototype.obtenerAreas=function(funcionReceptora,padreFuncionReceptora){
	$.ajax({
		datatype:"json",
		url:"../servidor/Servidor.php",
		data:{
			"accion":"areaConocimiento,obtenerAreasConocimiento",
			"variables":{"idArea":-1,"nombre":"","descripcion":""}
		},
		success:$.proxy((funcionReceptora==null)?this.terminoObtenerAreas:funcionReceptora,
					(funcionReceptora==null)?this:padreFuncionReceptora)
	});
}

AreaConocimiento.prototype.terminoObtenerAreas=function(data){
	
}

AreaConocimiento.prototype.cargarObjetos=function(){	
	this.ventana=new Ventana(null,this.agregarNuevaArea,this);    
}

AreaConocimiento.prototype.cargarEventos=function(){		
	this.botonAgregarAreaConocimiento.on("click",$.proxy(this.abrirVentana,this));
}
//Es cuando da click en  aceptar en la ventana.
AreaConocimiento.prototype.agregarNuevaArea=function(objetoPropio){	
	if(objetoPropio.validarFormulario()){
		var nombre=objetoPropio.campoNombre.val();
		var descripcion=objetoPropio.campoDescripcion.val();
		//Enviar la nueva área de conocimiento a la base de datos.	
		$.ajax({
			datatype:"json",
			url:"../servidor/Servidor.php",
			data:{
				"accion":"areaConocimiento,guardar",
				"variables":{"idArea":-1,"nombre":nombre,"descripcion":descripcion}
			},
			success:$.proxy(objetoPropio.terminoAgregarNuevaArea,objetoPropio)
		});	
	}
}

AreaConocimiento.prototype.validarFormulario=function(){
	var nombre=this.campoNombre.val();
	var descripcion=this.campoDescripcion.val();
	//Validar el área y el nombre.
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
	return true;
}

AreaConocimiento.prototype.terminoAgregarNuevaArea=function(data){
	var respuesta=JSON.parse(data);
	if(respuesta.idArea<0)		
		this.etiquetaError.html(respuesta.error);
	else{
		//Informar que todo quedó bien.
		this.ventana.ocultar();
		
		//Mostrar la nueva ventana.		
		this.ventana2=new Ventana(null,this.ocultarVentana2,this);
		this.ventana2.establecerDimensiones("30%","170px");
		this.ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>Area de Conocimiento guardada satisfactoriamente.</div>");
		this.ventana2.botonCancelar.css("display","none");
		this.ventana2.mostrar("Guardado");
	}
}

AreaConocimiento.prototype.ocultarVentana2=function(objetoPropio){
	objetoPropio.ventana2.ocultar();
	objetoPropio.funcionObtenerMaterias();
}

AreaConocimiento.prototype.abrirVentana=function(event){      		
    this.ventana.establecerDimensiones("50%","300px");
    this.ventana.cargarContenidoCentral(
        "<div class='container-fluid'>"+
            "<div class='row'>"+
                "<div class='col-md-2'>Nombre*:</div>"+
                "<div class='col-md-3'><input data-toggle='tooltip' title='Capture el nombre' style='width:100%; height:30px' type='text' id='campoNombreAreaConocimiento'></input></div>"+
                "<div class='col-md-2'>Descripción:</div>"+
                "<div class='col-md-3'><textArea data-toggle='tooltip' title='Capture la descripción' id='campoDescripcionAreaConocimiento' rows='7'/></div>"+
            "</div>"+
            "<div class='row'>"+            
            	"<div class='col-md-12' id='etiquetaErrorAreaConocimiento' style='text-align:center; color:red; font-size:15px; font-weight:bold;'></div>"+
            "</div>"+
        "</div>");    
    this.ventana.mostrar("Agregar area de conocimiento");
    this.campoNombre=$("#campoNombreAreaConocimiento");
    this.bordeActual=this.campoNombre.css("border");    
    this.campoDescripcion=$("#campoDescripcionAreaConocimiento");
    this.etiquetaError=$("#etiquetaErrorAreaConocimiento");
}

