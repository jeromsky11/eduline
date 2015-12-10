var ModificarCurso=function(nombreContenedor){
    this.objetoPasos={"nombreContenedor":nombreContenedor,"encabezado":"Modificando un curso"};
}
ModificarCurso.prototype=new NuevoCurso();

//Obtener los datos del curso.
ModificarCurso.prototype.cargarEventos=function(){	
	NuevoCurso.prototype.cargarEventos.call(this);
}

ModificarCurso.prototype.llenarFormulario=function(miCurso){
	this.campoNombreCurso.val(miCurso.nombre);
	this.campoFechaInicioCurso.establecerFecha(miCurso.fecha_inicio);
	this.campoFechaCierreCurso.establecerFecha(miCurso.fecha_cierre);
	this.campoDescripcion.val(miCurso.descripcion);		
	this.materias.idMateriaSeleccionada=miCurso.id_materia;
	this.subirImagen.cargarImagenManual(miCurso.imagen_portada);

	this.idModificar=parseInt(miCurso.id_curso);
}
