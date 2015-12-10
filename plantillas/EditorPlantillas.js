$(function(){	
	new EditorPlantillas();
});

var EditorPlantillas=function(){
	this.plantillasModificando=[];
	this.cargarObjetos();
	this.cargarEventos();		
}

EditorPlantillas.prototype.cargarObjetos=function(){
	this.panelPrincipal=$(".panelPrincipal");
	this.divContenido=$("#divContenido");
	this.tabulador=new Tabulador(this.cambioFicha,this);
	this.divContenido.append(this.tabulador.cargarObjetos());

	this.divConcentrado=$("<div style='width:100%; height:100%;'>");	
	//Hacer todo el resto del diseño  para divContentrado.	

	this.tabulador.agregarFicha("tabConcentrado","Plantillas",this.divConcentrado);

	this.crearFichaPlantilla("Plantilla1","Esta es mi primer plantilla",{idPlantilla:1});

	this.barraMenu=new BarraMenu(
		[
			{nombre:"cuenta_usuario", texto:"Mi cuenta", posicion:"10px",ancho:"120px",submenus:[{nombre:"configuracion_cuenta",texto:"Configuración"},{nombre:"cerrar_sesion",texto:"Salir"}]},
			{nombre:"acciones", texto:"Acciones",posicion:"130px",ancho:"100px", submenus:[{nombre:"copiar",texto:"Copiar"},{nombre:"pegar",texto:"Pegar"},{nombre:"eliminar",texto:"Eliminar"}]},
			{nombre:"plantillas", texto:"Plantillas",posicion:"230px",ancho:"120px",submenus:[{nombre:"crear_plantilla",texto:"Crear"},{nombre:"guardar_plantilla",texto:"Guardar"},{nombre:"editar_encabezado",texto:"Encabezado"},{nombre:"editar_pied",texto:"Pie de Página"},{nombre:"cerrar_plantilla",texto:"Cerrar"}]},		
		],this.clickMenuGeneral,this);
	this.panelPrincipal.append(this.barraMenu.cargarObjetos());
	this.barraMenu.cargarEventos();
}

EditorPlantillas.prototype.cambioFicha=function(nombre,objetoPropio){	
}

EditorPlantillas.prototype.clickMenuGeneral=function(nombreMenu,objetoPropio){
	switch(nombreMenu){
		case "crear_plantilla":							
			objetoPropio.ventana=new Ventana(null,objetoPropio.crearNuevaPlantilla,objetoPropio);
			objetoPropio.ventana.establecerDimensiones("40%","325px");

			objetoPropio.ventana.cargarContenidoCentral("<table style='width:100%; height:100%;'><tr>"+
				"<td style='width:30%; text-align:right; padding-right:20px;'>Nombre: </td>"+
				"<td><input id='campoNombrePlantillaVentana' style='width:80%; height:30px;'></input></td> </tr>"+				
				"<tr><td colspan='2' style='text-align:center;  padding-bottom:10px; padding-top:10px;'> "+
				"<p id='campoErrorNombrePlantillaVentana' style='color:red; font-weight:bold'></p>"+
				"</td></tr><tr>  "+
				"<td style='width:30%; text-align:right; padding-right:20px;'>Descripción: </td>"+
				"<td><textarea rows='5' style='width:80%;' id='campoDescripcionPlantillaVentana'></textarea></td>"+
				"</tr></table>");
			objetoPropio.ventana.mostrar("Nueva plantilla");
		break;
		case "abrir_plantilla":
		break;
		case "guardar_plantilla":
		break;
		case "cerrar_plantilla":
		break;
		case "copiar":
		break;
		case "pegar":
		break;
		case "eliminar":
		break;
		case "configuracion_cuenta":
		break;
		case "cerrar_sesion":
		break;

	}
}
EditorPlantillas.prototype.crearNuevaPlantilla=function(objetoPropio){	
	objetoPropio.ventana.ocultar();
	objetoPropio.crearFichaPlantilla("Plantilla1","Esta es mi primer plantilla",{idPlantilla:1});
	/*

	var nombre=$("#campoNombrePlantillaVentana").val();
	var descripcion=$("#campoDescripcionPlantillaVentana").val();
	if(cadenaVacia(nombre))
		$("#campoErrorNombrePlantillaVentana").html("Debe capturar un nombre");
	else{		
		//Llamar al server par registrar la nueva plantilla.
		$.ajax({
			datatype:"json",
			url:"../servidor/Servidor.php",
			data:{
				accion:"plantillas,guardar",
				variables:{idPlantilla:-1,"nombre":nombre,"descripcion":descripcion}	
			},
			success:$.proxy(function(data){
				//Recibir el id para crear el nuevo tab que editará la nueva plantilla.
				data=JSON.parse(data);			
				if(data.idPlantilla>0){					
					this.ventana.ocultar();
					this.crearFichaPlantilla(nombre,data);
				}
				else
					$("#campoErrorNombrePlantillaVentana").html(data.error);					
			},objetoPropio)
		});
	}*/
}

EditorPlantillas.prototype.crearFichaPlantilla=function(nombrePlantilla,descripcion,data){
	var totalPlantillas=this.plantillasModificando.length+1;	
    var editorPlantilla=new EditorPlantilla("#tab"+totalPlantillas,
    			data.idPlantilla,nombrePlantilla,descripcion);    
    this.tabulador.agregarFicha("plantilla"+totalPlantillas,"Plantilla "+totalPlantillas,editorPlantilla.cargarObjetos());	
    editorPlantilla.cargarContenido();
    editorPlantilla.cargarEventos();
    this.plantillasModificando.push(EditorPlantilla);
}

EditorPlantillas.prototype.cargarEventos=function(){	
	
}