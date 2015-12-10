var NuevoCurso=function(nombreContenedor){
	this.nombreContenedor=nombreContenedor; 
    if(nombreContenedor)
        this.objetoPasos={"nombreContenedor":this.nombreContenedor,"encabezado":"Registrando un curso"};	
    this.idModificar=-1;    
    this.ocultarVentana2Padre=null;         //Es una function
    this.objetoPadre=null;          //Es un object
}

//Devuelve un array de divs con todos los elementos del paso1.
NuevoCurso.prototype.obtenerContenidoPaso1=function(){    
    var divs=new Array();    
    var div1=$("<div>");    
    div1.addClass("hijoPaso");
    this.campoNombreCurso=$("<input type='text' class='form-control campoNombreCurso'"+
                                            "data-toggle='tooltip' title='Capture un nombre'></input>");
    

    this.campoFechaInicioCurso=new SelectorFechas();
    this.campoFechaCierreCurso=new SelectorFechas();    
    

    this.campoDescripcion=$("<textarea>");
    this.campoDescripcion.addClass("form-control campoDescripcionCurso");
    this.campoDescripcion.attr("rows","5");


    var table=$("<table>");
    div1.append(table);
    var body=$("<body>");
    table.append(body);
    body.append(obtenerFila(["Nombre*",this.campoNombreCurso]),false);    
    body.append(obtenerFila(["Fecha de inicio *",this.campoFechaInicioCurso.cargarObjetos(0,"235px")]),false);
    body.append($("<tr><td style='height:20px'></td></tr>"));
    body.append(obtenerFila(["Fecha de cierre *",this.campoFechaCierreCurso.cargarObjetos(0,"235px")]),false);

    divs.push(div1);

    var div2=$("<div>");
    div2.addClass("hijoPaso");
    div2.css("margin-left","50px");
    table=$("<table>");
    div2.append(table);
    body=$("<body>");
    table.append(body);
    body.append(obtenerFila(["Descripción",this.campoDescripcion],true));
    divs.push(div2);

    this.fechaInicio=null;
    this.fechaCierre=null;    
    this.bordeActual=this.campoFechaInicioCurso.divCampoFecha.css("border");
    this.bordeActual2=this.campoFechaInicioCurso.divCampoFecha.css("border");

    return divs;
}

//Devuelve un array con todos los divs de los elementos del paso 2
NuevoCurso.prototype.obtenerContenidoPaso2=function(){
    var divs=new Array();    
    this.acordionAreasConocimiento=new Acordion();
    divs.push(this.acordionAreasConocimiento.cargarObjetos());

    this.acordionAreasConocimiento.divAcordion.addClass("divAcordion2 hijoPaso");
    
    var div2=$("<div>");
    div2.addClass("hijoPaso");
    divs.push(div2);
    div2.addClass("divBotonAgregarAreaConocimiento");
    div2.append("¿No encuentras tu area de conocimiento?");    
    var botonAgregarAreaConocimiento=$("<a>");
    botonAgregarAreaConocimiento.attr("href","#");    
    botonAgregarAreaConocimiento.html("Agregala aquí");
    div2.append(botonAgregarAreaConocimiento);
    this.materias=new Materias(this.cargarMateriasPorArea,this);
    this.areaConocimiento=new AreaConocimiento(this.materias.obtenerMateriasPorArea,this.materias,
                    botonAgregarAreaConocimiento);
    return divs;
}

NuevoCurso.prototype.obtenerContenidoPaso3=function(){
    this.subirImagen=new BotonSubirImagen();  //Este hace la subida de la imágen. 
    this.subirImagen.ancho=400;
    this.subirImagen.alto=268;    
    var objetos=this.subirImagen.cargarObjetos();    
    this.subirImagen.divBotonSubirImagen.css("margin","auto");    
    return objetos;
}

NuevoCurso.prototype.cargarObjetos=function(){    
    this.pasos=new Pasos(this,this.cambiarPasoRegistrarCurso,this.objetoPasos);    
    this.pasos.agregarPaso("Paso 1: Introduce los datos del curso.",
            this.obtenerContenidoPaso1());
    this.pasos.agregarPaso("Paso 2: Elija la materia a la que pertenece el curso.",
            this.obtenerContenidoPaso2());
    this.pasos.agregarPaso("Paso 3: Elija imagen de portada para su curso.",
                this.obtenerContenidoPaso3());
    this.pasos.cambiarPaso();      //Para que oculte los divs que no debe mostrar

}

NuevoCurso.prototype.cargarEventos=function(){
    this.campoFechaInicioCurso.cargarEventos();
    this.campoFechaCierreCurso.cargarEventos();    
}


//objetoPropio es la referencia a este mismo objeto , se usa para poder hacer referencia
//A el mismo desde el objeto de pasos.
NuevoCurso.prototype.cambiarPasoRegistrarCurso=function(pasoActual,avance,objetoPropio){
    if(avance==1){        
        switch(pasoActual){
            case 0:                            
                //Está capturando los datos del curso.                
                objetoPropio.validarFormularioCurso(avance);                
            break;
            case 1:                   
            
                //Validar que hay una materia seleccionada.
                if(objetoPropio.materias.idMateriaSeleccionada==-1){
                    var ventana2=new Ventana();
                    ventana2.establecerDimensiones("30%","170px");
                    ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>Debe seleccionar una materia</div>");
                    ventana2.botonCancelar.css("display","none");
                    ventana2.mostrar("Error");
                }
                else                    
                    //Cambiar para elegir la imagen.
                    objetoPropio.pasos.hacerCambioPaso(avance);
            break;
            case 2: 
                //validar que exista una imagen.
                //si no hay imagen, pedir que agrege.
                if(!objetoPropio.subirImagen.imagenExiste){
                    var ventana2=new Ventana();
                    ventana2.establecerDimensiones("30%","170px");
                    ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>Debe seleccionar una imagen para su portada</div>");
                    ventana2.botonCancelar.css("display","none");
                    ventana2.mostrar("Error");
                }
                else
                    objetoPropio.guardarCurso();                                    
            break;
        }
    }
    else
        objetoPropio.pasos.hacerCambioPaso(avance);
}


NuevoCurso.prototype.guardarCurso=function(){        
    //Enviar la imagen y recibir la url.
    $.ajax({
        datatype:"json",
        url:"../servidor/Servidor.php",
        data:{
            "accion":"cursos,guardar",            
            "variables":{"idCurso":this.idModificar,"nombre":this.campoNombreCurso.val(),
                        "descripcion":this.campoDescripcion.val(),
                        "fechaInicio":obtenerFechaCadena(this.fechaInicio),
                        "fechaCierre":obtenerFechaCadena(this.fechaCierre),
                        "idMateria":this.materias.idMateriaSeleccionada}
        },
        success:$.proxy(this.terminoGuardarCurso,this)
    });
}

NuevoCurso.prototype.terminoGuardarCurso=function(data){
    var respuesta=JSON.parse(data);
    if(respuesta.idCurso<0)
        this.mostrarVentana2("Error",respuesta.error);            
    else if(this.subirImagen.esNuevaImagen)
        this.subirImagen.subirImagen({"tabla":"cursos","campoSrc":"imagen_portada","campoID":"id_curso",
                                "id":respuesta.idCurso,"ruta":"../servidor/imagenes/cursos/portadas/"},this.terminoGuardarCurso2,this);
    else
        this.mostrarVentana2("Guardado","Curso guardado satisfactoriamente");            
}

NuevoCurso.prototype.mostrarVentana2=function(titulo,mensaje){
    this.ventana2=new Ventana(null,this.ocultarVentana2,this);                
    this.ventana2.establecerDimensiones("30%","170px");
    this.ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>"+mensaje+"</div>"); 
    this.ventana2.mostrar(titulo);
    this.ventana2.botonCancelar.css("display","none");           
}
NuevoCurso.prototype.terminoGuardarCurso2=function(data,objetoPropio){            
    var respuesta=JSON.parse(data);      
    objetoPropio.ventana2=new Ventana(null,objetoPropio.ocultarVentana2,objetoPropio); 
    //this.ventana2=new Ventana();
    objetoPropio.ventana2.establecerDimensiones("30%","170px");
    if(respuesta.idCurso<0){
        objetoPropio.ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>"+respuesta.error+"</div>");
        objetoPropio.ventana2.mostrar("Error");
    }
    else{
        objetoPropio.ventana2.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>Curso guardado satisfactoriamente.</div>");
        objetoPropio.ventana2.mostrar("Guardado");
    }
    objetoPropio.ventana2.botonCancelar.css("display","none");           
}

NuevoCurso.prototype.ocultarVentana2=function(objetoPropio){
    objetoPropio.ventana2.ocultar();    
    //Regresar al paso 0.
    if(this.idModificar<0){
        objetoPropio.subirImagen.limpiar();
        objetoPropio.limpiarFormulario();
        objetoPropio.pasos.pasoActual=0;
        objetoPropio.pasos.cambiarPaso();    
    }
    else
        //Quitar el nodo.                
        objetoPropio.ocultarVentana2Padre(objetoPropio.objetoPadre);
}

NuevoCurso.prototype.limpiarFormulario=function(){
    this.campoNombreCurso.val("");
    this.campoDescripcion.val("");
    this.campoFechaCierreCurso.limpiar();
    this.campoFechaInicioCurso.limpiar();
    this.fechaInicio=null;
    this.fechaCierre=null;
}

//Esta función es llamada una vez que la clase materia ha llamado al servidor.
NuevoCurso.prototype.cargarMateriasPorArea=function(data){        
    data=JSON.parse(data);    
    this.acordionAreasConocimiento.limpiar();
    for(var i=0;i<data.length;i++){
        var area=data[i];        

        var contenido="<div style='padding-top:5px;'> "+
                    "¿No encuentras tu materia? "+
                    "<a href='#' area_padre='"+area.idArea+"' "+ 
                            "class='botonAgregarMateria'"+
                            "style='color:blue'>Agregala aquí</a>"+
                    "</div>";
        contenido+="<table style='width:100%; text-align:left; margin-top:15px;'>";
        for(var j=0;j<area.materias.length;j++){                                    
            if(area.materias[j].id_materia==this.materias.idMateriaSeleccionada){
                contenido+="<tr><td style='cursor:pointer; background-color:#7777ff; color:white; border:solid 1px #333333' class='elementoMateria' idMateria='"+
                       +area.materias[j].id_materia+"'>"+
                        area.materias[j].nombre_materia +"</td></tr>";    
            }
            else
                contenido+="<tr><td style='cursor:pointer' class='elementoMateria' idMateria='"+
                       +area.materias[j].id_materia+"'>"+
                        area.materias[j].nombre_materia +"</td></tr>";
        }
        contenido+="</table>"         
        this.acordionAreasConocimiento.agregarNodo(area.nombre,$(contenido));
    }
    this.materias.recargarEventos();    
}

NuevoCurso.prototype.validarFormularioCurso=function(avance){        
    
    this.fechaInicio=this.campoFechaInicioCurso.fechaActual;
    this.fechaCierre=this.campoFechaCierreCurso.fechaActual;
    if(this.campoNombreCurso.val().match(/^\s*$/)){ //El nombre está vacío.
        this.campoNombreCurso.css("border","1px solid #ff0000");
        this.campoNombreCurso.attr("title","Nombre inválido");
        this.campoNombreCurso.focus();            
        return;
    }
    else{                        
        this.campoNombreCurso.css("border",this.bordeActual);
        this.campoNombreCurso.attr("title","Capture un nombre");               
    }                
    if(!this.fechaInicio){
        this.campoFechaInicioCurso.divCampoFecha.css("border","1px solid #ff0000");
        this.campoFechaInicioCurso.divCampoFecha.attr("title","Fecha inválida");             
        this.campoFechaInicioCurso.mostrar();            
        return;
    }
    else{   
        this.campoFechaInicioCurso.divCampoFecha.css("border",this.bordeActual);
        this.campoFechaInicioCurso.divCampoFecha.attr("title","Elija una fecha");   
    }   
    if(!this.fechaCierre){        

        this.campoFechaCierreCurso.divCampoFecha.css("border","1px solid #ff0000");
        this.campoFechaCierreCurso.divCampoFecha.attr("title","Fecha inválida");  
        this.campoFechaCierreCurso.mostrar();
        return;
    }
    else{
        this.campoFechaCierreCurso.divCampoFecha.css("border",this.bordeActual2);
        this.campoFechaCierreCurso.divCampoFecha.attr("title","Elija una fecha");   
    }    
    //Obtener la fecha actual.
    $.ajax({
        datatype:"json",
        url:"../servidor/Servidor.php",
        data:{
            "accion":"funcionesGlobales,obtenerFechaActual", 
            "variables":{"zona":"America/Mexico_City"}
        },
        success:$.proxy(function(data){            
            var fechaActual=new Date(data);      
            if(this.fechaInicio<fechaActual && this.objetoPasos.encabezado=="Registrando un curso"){                
                this.campoFechaInicioCurso.divCampoFecha.css("border","1px solid #ff0000");
                this.campoFechaInicioCurso.divCampoFecha.attr("title","La fecha de inicio debe ser mayor a la actual");
                this.campoFechaInicioCurso.mostrar();                                                          
                return;
            }
            else{
                this.campoFechaInicioCurso.divCampoFecha.css("border",this.bordeActual2);
                this.campoFechaInicioCurso.divCampoFecha.attr("title","Elija una fecha");   
            }

            if(this.fechaCierre<=this.fechaInicio){
                this.campoFechaCierreCurso.divCampoFecha.css("border","1px solid #ff0000");
                this.campoFechaCierreCurso.divCampoFecha.attr("title","La fecha de cierre debe ser mayor a la fecha de inicio");
                this.campoFechaCierreCurso.mostrar();          
                return;
            }
            else{
                this.campoFechaCierreCurso.divCampoFecha.css("border",this.bordeActual2);
                this.campoFechaCierreCurso.divCampoFecha.attr("title","Elija una fecha");   
            }
            
            this.materias.obtenerMateriasPorArea(this.cargarMateriasPorArea,this);
            this.pasos.hacerCambioPaso(avance);
        },this)
    });    
}
