var Cursos=function(){	
	this.cargarObjetos();
	this.cargarEventos();
    this.obtenerCursos();
    this.cursosModificando=[];  //Por las primeras tres fichas.
}


Cursos.prototype.obtenerCursos=function(){
    this.idCursoSeleccionado=-1; //No hay curso seleccionado.
    $.ajax({
        datatype:"json",
        url:"../servidor/Servidor.php",
        data:{
            "accion":"cursos,obtenerCursos",
            "variables":{"idCurso":-1,"nombre":"","propios":"true","cursando":"","fechaInicio":"",
                            "fechaCierre":"","idMateria":"","estado":"editando"}
        },
        success:$.proxy(this.terminoObtenerCursos,this)
    });
}

Cursos.prototype.terminoObtenerCursos=function(data){
    data=JSON.parse(data);    
    var elementosMostrar=new Array();
    for(var i=0;i<data.length;i++)
        elementosMostrar.push({"urlImagen":data[i].imagen_portada,"contenidoAbajo":data[i].nombre,"id":data[i].id_curso,"nombreCurso":data[i].nombre});
    
    //Si ya tenía una seleccionado.
    if(this.coverflow.elementoInicio<elementosMostrar.length)            
        this.coverflow.recargar(elementosMostrar,this.coverflow.elementoInicio); 
    else
        this.coverflow.recargar(elementosMostrar,parseInt(elementosMostrar.length/2));    
}
Cursos.prototype.cargarObjetos=function(){        
    this.listaFichasCursos=$("#listaFichasCursos");
    this.panelFichasCursos=$("#panelFichasCursos");	
    this.botonDesplegarPanelCursos=$("#botonDesplegarPanelCursos");
    this.panelCursos=$("#panelCursos");

    this.coverflow=new Coverflow([],0,
        [{"nombre":"eliminarCurso","icono":"../general/iconos/borrar.png","tooltip":"Eliminar"},
         {"nombre":"editarCurso","icono":"../general/iconos/editar.png","tooltip":"Editar"},
         {"nombre":"editarContenido","icono":"../general/iconos/contenido.png","tooltip":"Editar Contenido"}],
            this.clickMenuCurso,this);
    this.nuevoCurso=new NuevoCurso("#tab3");
    this.nuevoCurso.cargarObjetos();
    this.nuevoCurso.cargarEventos();    
}

Cursos.prototype.clickMenuCurso=function(nombreBoton,objetoPropio,elementoCurso){    
    switch(nombreBoton){
        case "eliminarCurso":
            objetoPropio.confirmarEliminarCurso(elementoCurso);
        break;
        case "editarCurso":
            objetoPropio.abrirFichaModificarCurso(elementoCurso.id);
        break;
        case "editarContenido":

        break;
    }
}

//Primero preguntar si desea eliminar el curso.
Cursos.prototype.confirmarEliminarCurso=function(elementoCurso){
    this.idEliminar=elementoCurso.id;
    this.ventana=new Ventana(null,this.eliminarCurso,this);
    this.ventana.establecerDimensiones("30%","170px");
    this.ventana.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>¿Confirma que desea eliminar el curso: <br> \""+elementoCurso.nombreCurso+"\" ?</div>");
    this.ventana.mostrar("Eliminar Curso");
}

Cursos.prototype.eliminarCurso=function(objetoPropio){
    objetoPropio.ventana.ocultar();
    $.ajax({
        datatype:"json",
        url:"../servidor/Servidor.php",
        data:{
            "accion":"cursos,eliminar",
            "variables":{"idCurso":objetoPropio.idEliminar}
        },
        success:function(data){
            var miCurso=JSON.parse(data);                
            //Informar el resultado  en una ventana.
            objetoPropio.ventana=new Ventana(null,function(miObjeto){                
                miObjeto.ventana.ocultar();
                miObjeto.fichaMisCursos.trigger("click");
            },objetoPropio);
            objetoPropio.ventana.establecerDimensiones("30%","170px");
            objetoPropio.ventana.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>"+miCurso.error+"</div>"); 
            objetoPropio.ventana.mostrar(miCurso.idCurso<0?"Error":"Eliminado");
            objetoPropio.ventana.botonCancelar.css("display","none");           
        }
    });      

}
//Agregar
Cursos.prototype.abrirFichaModificarCurso=function(idCurso){    
//Obtener la información de este curso.
    $.ajax({
        datatype:"json",
        url:"../servidor/Servidor.php",
        data:{
            "accion":"cursos,obtenerCursos",
            "variables":{"idCurso":idCurso,"nombre":"","propios":"true","cursando":"","fechaInicio":"",
                            "fechaCierre":"","idMateria":"","estado":"editando"}
        },
        success:$.proxy(function(data){            
            var miCurso=JSON.parse(data);
            if(miCurso.length>0){                
                for(var i=0;i<this.cursosModificando.length;i++){
                    if(this.cursosModificando[i].idCurso==idCurso)                        
                        break;                    
                }
                if(i>=this.cursosModificando.length){
                    var totalCursos=this.cursosModificando.length+4;
                    this.listaFichasCursos.append($("<li><a href='#tab"+totalCursos+"' data-toggle='tab' >Modificar</a></li>"));
                    this.panelFichasCursos.append($("<div class='tab-pane' id='tab"+totalCursos+"'></div> "));
                    var modificarCurso=new ModificarCurso("#tab"+totalCursos);
                    modificarCurso.cargarObjetos();
                    modificarCurso.llenarFormulario(miCurso[0]);
                    modificarCurso.cargarEventos();
                    modificarCurso.ocultarVentana2Padre=this.terminoModificarCurso;
                    modificarCurso.objetoPadre=this;                    
                    //Se pone en ambos lados por lo de la ventana
                    //$('#listaFichasCursos a:last').tab('show');  
                    $("#listaFichasCursos li:eq("+(totalCursos-1)+") a").tab('show')
                    this.cursosModificando.push({"tab":"#tab"+totalCursos,"idCurso":idCurso});
                }
                else //Ya existe, ponerlo.                    
                    $("#listaFichasCursos li:eq("+(i+3)+") a").tab('show');
            }
            else{ //Cargar una ventana para informar que el curso no existe.
                this.ventana=new Ventana(null,this.ocultarVentanaNoExisteCurso,this);
                this.ventana.establecerDimensiones("30%","170px");
                this.ventana.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>El curso no existe</div>"); 
                this.ventana.mostrar(titulo);
                this.ventana.botonCancelar.css("display","none");           
            }

        },this)
    });
}
Cursos.prototype.ocultarVentanaNoExisteCurso=function(objetoPropio){
    objetoPropio.ventana.ocultar();    
    //Recargar todos los cursos.
    objetoPropio.fichaMisCursos.trigger("click");
}

//this va a apuntar al objeto modificado
//objetoPropio va a apuntar a este mismo, es decir, Cursos.
Cursos.prototype.terminoModificarCurso=function(objetoPropio){
    //A borrar de.
    objetoModificado=this;    
    objetoPropio.listaFichasCursos.children().each(function(index){
        var ficha=$(this);        
        var nombreFicha=ficha.children().eq(0).attr("href");
        if(nombreFicha==objetoModificado.objetoPasos.nombreContenedor){
            ficha.remove();
            return;
        }
    });    
    objetoPropio.panelFichasCursos.children().each(function(index){
        var ficha=$(this);        
        var nombreFicha=ficha.attr("id");        
        var nombreContenedor=objetoModificado.objetoPasos.nombreContenedor;
        nombreContenedor=nombreContenedor.substr(1,nombreContenedor.length);    
        if(nombreFicha==nombreContenedor){
            ficha.remove();
            return;
        }
    });
    for(var i=0;i<objetoPropio.cursosModificando.length;i++){
        if(objetoPropio.cursosModificando[i].idCurso==objetoModificado.idModificar){
            objetoPropio.cursosModificando.splice(i,1);
            break;
        }
    }
    objetoPropio.fichaMisCursos.trigger("click");

}

Cursos.prototype.cargarEventos=function(){    
    this.botonDesplegarPanelCursos.on("click",$.proxy(this.desplegarPanel,this));
    this.fichaMisCursos=$("#fichaMisCursos");
    this.fichaMisCursos.on("click",$.proxy(function(){
        //Aquí debe recargar los cursos
        this.obtenerCursos();        
    },this));
}



Cursos.prototype.desplegarPanel=function(event){
    var posicionActual=this.panelCursos.css("top");
    if(posicionActual=="0px"){        
        this.panelCursos.animate({"top":"-433px"},400);        
    }
    else{        
        this.panelCursos.animate({"top":"0px"},400);        
    }
}



