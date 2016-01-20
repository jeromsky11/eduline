//Constructor.

var Componente=function(){
	this.posX=0; //Es la distancia horizontal en pixeles del lado izquierdo  del contenedor.
	this.posY=0; //Es la distancia vertical en pixeles del lado derecho del contenedor.
	this.ancho=0;  //Es el tamaño en pixeles a lo ancho 
	this.alto=0;  //Es el tamaño en pixeles a lo alto.
	this.botonSoloLectura;  //El botón que decide si un componente puede editarse o no.
	this.botonMultilinea;  //El botón decide si un componente es de múltiple líneas.
	this.atributos=null;  //El json que guarda todas las propiedades de este componente.
	this.campoNombre;  //Durante la edición cuando el usuario escribe el nombre del componente.
	this.tipo="";  //Este lo establecen las subclases para saber el tipo del componente.
	//Es equivalente al tipo solo que un texto que debe ser mostrado cuando se desea eliminar el componente
	this.tipoTextual=""; 
	this.botonEditar;  //Para abrir la ventana de edición de las propiedades del componente.
	this.alineadoTexto="left"; //Guarda la actual selección del alineado del texto.
	//Se usa para recuperar el borde inicial de un campo cuando este pasó de ser inválido (con borde rojo)
	//a válido.
	this.bordeInicialCampos="solid 1px rgb(170, 170, 170)"; 
	//Es una referencia a la instancia de la clase que creó este componente y se usa para llamar a 
	//funciones de clase padre o enviarlo como parámetro en funciones usadas como un objeto y así 
	//las clases padres recuperen las referencias a ellos mismos.
	this.objetoPadre=null;	
	//Los componentes llevan un id que lo identifican como únicos en una lista, con idComponente 
	//este componente puede solicitarse a su padre que trabaje sobre ellos mismo buscando en 
	//base al id.
	this.idComponente=-1;
	//Es el nombre que un usuario de la a un componente y así referenciarlo durante el diseño.
	this.nombre=""; 
	//Las subclases establecen esta variable en false si requieren ocultar la ficha de diseño.
	this.existeDiseno=true; 
	//Es llamada cuando algunos atributos en la edición cambian.
	this.funcionCambioAtributos=null; 
	//Valida que un nombre que se le da a este componente no se repita con algún otro de un grupo.
	this.funcionValidarComponente=null; 			
 	
	this.divContenedor;	//Es el div que contiene todo el diseño gráfico de este componente.
	this.divBotones;//Un div que contiene un grupo de botones con acciones arealidar sobre el componente.
	this.botonClonar; //Botón que sirve para crear un componente igualito a esto.
	this.botonBorrar; //Botón que sirve para borrar este componente de un panel.
	//Es el div que permite que la ventana de edición aparezca como modal ya que abarca toda la pantalla
	//y tiene un fondo negro transparente.
	this.fondoVentanaEdicion; 		
	//El botón para cerrar la ventana de edición.
	this.botonCerrarEdicion;
	this.tabulador;//Un componente gráfico que maneja las fichas de la ventana de edición.
	this.botonAceptarEdicion; //El botón para guardar los cambios de la ventana de edición.
	this.botonCancelarEdicion; //El botón para cancelar los cambios de la ventana de edición.
	this.divFichaGeneral; //Es el div que contiene la ficha general del panel de edicion.
	//Es un párrafo que tiene el título "animaciones" debe ser atributo porque despues se le cambia 
	//su ubicación en la ficha general.
	this.tituloAnimaciones; 
	//Un input donde se establece en milisegundos el tiempo que tardará el componente al entrar.
	this.campoDuracionAnimacionEntrada;	
	//Un comboBox en donde se establece el tipo de animación de salida.
	this.campoAnimacionSalida;
	//Un input donde se establece en milisegundos el tiempo que tardará el componente al salir.
	this.campoDuracionAnimacionSalida;
	//Un input donde se establece en pixeles la distancia del componente del margen izquierdo.
	this.campoPosicionIzquierda;
	//Un input donde se establece en pixeles la distancia del componente del margen derecho.
	this.campoPosicionDerecha;
	//Un input donde se establece en pixeles la distancia del componente del margen superior.
	this.campoPosicionArriba;
	//Un input donde se establece en pixeles la distancia del componente del margen inferior.
	this.campoPosicionAbajo;
	//Un input donde se establece en pixeles el ancho del componente.
	this.campoAncho;	
	//Un input donde se establece en pixeles el alto del componente.
	this.campoAlto;

	this.divFichaEventos;//Es el div que contiene la ficha de eventos del panel de edicion.
	//Un input donde se elige el tipo de evento a procesar.
	this.campoTipoEvento;
	//Un area de texto donde el usuario escribirá el código a escribir cuando se de el evento que 
	//esté seleccionado con la variable campoTipoEvento.
	this.areaCodigo;	
	this.divFichaDiseno;//Es el div que contiene la ficha de diseño del panel de edición.
	//Un select donde se elije el estilo de la letra a usar dentro del componente.
	this.campoEstiloLetra; 
	//Un select donde se elije el tamaño de la letra a usar dentro del componente.
	this.campoTamanoLetra;
	//Un div donde se marca si letra a usar dentro del componente debe estar en negritas o no.
	this.botonNegrita;
	//Un div donde se marca si letra a usar dentro del componente debe estar en cursivas o no.
	this.botonCursiva;
	//Un div donde se marca si letra a usar dentro del componente debe estar subrayada o no.
	this.botonSubrayado;
	//Un input de tipo color en donde se elije el color del texto componente.
	this.botonColorLetraCuadro;
	//Un botón para agregar una listado. //Va a haber cambio.
	this.botonVinetas; 
	//Un botón para agregar una listado numero //Va a haber cambio.
	this.botonVinetasNumeros;
	//Un div donde se marca si el texto del componente debe estar alineado a la izquierda.
	this.botonAlinearIzquierda;
	//Un div donde se marca si el texto del componente debe estar alineado al centro.
	this.botonAlinearCentro;
	//Un div donde se marca si el texto del componente debe estar alineado a la derecha.
	this.botonAlinearDerecha;
	//Un div donde se marca si el texto del componente debe estar justificado.
	this.botonJustificar;
	//Está pendiente para cambio.
	this.botonInterlineado;
	//Un input de tipo color en donde se elije el color de fondo del texto componente.
	this.botonColorFondoCuadro;
	//Un img para elegir el borde del componente (Faltan cambios) 
	this.botonBorde;
	//Un div en donde se previsualiza el diseño del componente antes de ser guardado.
	this.divVistaPrevia;
	//Un objeto tipo Ventana para confirmar eliminar un componente.
    this.ventana;
}

/****************************************************************************************************/
/****Elementos de inicialización..*************/
/****************************************************************************************************/
Componente.prototype.setX=function(x){
	this.posX=x;
	this.divContenedor.css("left",this.posX+"px");
}
Componente.prototype.setY=function(y){
	this.posY=y;
	this.divContenedor.css("top",this.posY+"px");
}

Componente.prototype.setAncho=function(ancho){
	this.ancho=ancho;
	this.divContenedor.css("width",this.ancho+"px");
}
Componente.prototype.setAlto=function(alto){
	this.alto=alto;
	this.divContenedor.css("height",this.alto+"px");
}

//Nuevos atributos es un json con todos los atributos.
Componente.prototype.cargarAtributos=function(nuevosAtributos)
{	
 	this.atributos=nuevosAtributos;
}

/****************************************************************************************************/
/****Elementos de diseño propio..*************/
/****************************************************************************************************/
Componente.prototype.crearEditable=function(){	
	this.divContenedor=$("<div>");	
	this.divContenedor.draggable({
		cursor:'move',
		containment:'document',
	});
	this.divContenedor.attr("class","divContenedor");
	this.divContenedor.css({"left":this.posX+"px","top":this.posY+"px","position":"absolute","width":this.ancho+"px",
					"height":this.alto+"px","border":"solid 1px #777777"});
	
	this.divBotones=$("<div>");
	this.divBotones.css({"position":"absolute","right":"0px","width":"120px","height":"30px","border":"solid 1px #aaaaaa","background-color":"#eeeeee",
							"display":"none","z-index":"1"});

	this.botonClonar=$("<img style='width:30px; height:30px; position:absolute; right:0px; cursor:pointer; border:solid 1px #cccccc;' title='Clonar'>");
	this.botonClonar.attr("src","../general/objetosGraficos/iconos/clonar.png");
	this.divBotones.append(this.botonClonar);

	this.botonBorrar=$("<img style='width:30px; height:30px; position:absolute; right:30px; cursor:pointer; border:solid 1px #cccccc;' title='Eliminar'>");
	this.botonBorrar.attr("src","../general/objetosGraficos/iconos/borrar.png");
	this.divBotones.append(this.botonBorrar);

	this.botonEditar=$("<img style='width:30px; height:30px; position:absolute; right:60px; cursor:pointer; border:solid 1px #cccccc;' title='Editar'>");
	this.botonEditar.attr("src",urlServidor+"/general/objetosGraficos/iconos/editar.png");
	this.divBotones.append(this.botonEditar);

	this.divBotones.append("<img src='"+urlServidor+"/general/objetosGraficos/iconos/mover.png' style='width:30px; height:30px; position:absolute; right:90px; cursor:pointer; border:solid 1px #cccccc;' title='Mover'>");


	this.divContenedor.append(this.divBotones);	

	this.divContenedor.on("hover",$.proxy(function(){		
		this.divBotones.css("display","block");
	},this));

	this.divContenedor.on("mouseleave",$.proxy(function(){
		this.divBotones.css("display","none");
	},this));	
}

Componente.prototype.abrirVentanaEdicion=function(){		
	this.fondoVentanaEdicion=$("<div>");
	$("body").append(this.fondoVentanaEdicion);
	this.fondoVentanaEdicion.css({"background-color":"rgba(0,0,0,0.5)","position":"absolute",
		"width":"100%","height":"100%","z-index":2});	
	var divVentanaEdicion=$("<div class='divVentanaEdicion'>");
	this.fondoVentanaEdicion.append(divVentanaEdicion);

	var divTituloEdicion=$("<div class='divTituloEdicion'>");
	divVentanaEdicion.append(divTituloEdicion);

	var divTituloTextoEdicion=$("<div class='divTituloTextoEdicion'>");
	divTituloTextoEdicion.html(this.obtenerTituloEdicion());
	divTituloEdicion.append(divTituloTextoEdicion);	
	
	if(this.botonCerrarEdicion)
		this.botonCerrarEdicion.off("click");
	this.botonCerrarEdicion=$("<div class='botonCerrarEdicion'>");	
	divTituloEdicion.append(this.botonCerrarEdicion);
	this.botonCerrarEdicion.css("background-image","url("+urlServidor+"/general/objetosGraficos/objetoVentanas/botonCerrar.png)");
	
	this.botonCerrarEdicion.on("click",$.proxy(function(){
		this.fondoVentanaEdicion.remove();
	},this));	

	this.tabulador=new Tabulador(this.cambioFichaEdicion,this);
	var divTabulador=$("<div>");
	divTabulador.css({"position":"absolute","width":"100%","height":"305px","top":"41px"});
	divVentanaEdicion.append(divTabulador);		
	divTabulador.append(this.tabulador.cargarObjetos());	
	this.obtenerFichaGeneral();
	if(this.existeDiseno)
		this.obtenerFichaDiseno();
	this.obtenerFichaTamanoPosicion();
	this.obtenerFichaEventos();	
	this.tabulador.cambiarFicha("general");


    var divBotonesEdicion=$("<div style='background-color: #aaaaff; width: 100%; height: 35px; bottom:0px; position: absolute; padding-top: 3px;	'>");
    divVentanaEdicion.append(divBotonesEdicion);

    //Cargar los botoncitos.
    if(this.botonAceptarEdicion)
    	this.botonAceptarEdicion.off("click");
	this.botonAceptarEdicion=$("<div>");
	this.botonAceptarEdicion.addClass("ventanaBotonAceptar");
	this.botonAceptarEdicion.attr({"data-toggle":"tooltip","title":"Aceptar"});
	divBotonesEdicion.append(this.botonAceptarEdicion);	
	this.botonAceptarEdicion.on("click",$.proxy(this.clickAceptarEdicion,this));

	if(this.botonCancelarEdicion)
		this.botonCancelarEdicion.off("click");
	this.botonCancelarEdicion=$("<div>");
	this.botonCancelarEdicion.addClass("ventanaBotonCancelar");
	this.botonCancelarEdicion.attr({"data-toggle":"tooltip","title":"Cancelar"});	
	divBotonesEdicion.append(this.botonCancelarEdicion);
	this.botonCancelarEdicion.on("click",$.proxy(function(){
		this.fondoVentanaEdicion.remove();
	},this));		

	this.cargarAtributosEdicion();
}

//Debe retornar un div con la ficha general.
Componente.prototype.obtenerFichaGeneral=function(){
	//Mandar una elemento para la animación.
	this.divFichaGeneral=$("<div>");
	this.divFichaGeneral.css({"position":"absolute","width":"100%","height":"100%","overflow-y":"scroll"});

	var fila3=$("<div style=' height:30px; width:100%; margin-top:20px;'>");
	this.divFichaGeneral.append(fila3);

	var filaCentro3=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:275px; height:30px;'>");
	fila3.append(filaCentro3);

	filaCentro3.append("<p style='float:left; margin-top:3px; margin-left:10px;  text-align:right;'>Nombre</p>");

	this.campoNombre=$("<input style='width:200px; float:left; margin-left:10px; height:30px;'>");
	filaCentro3.append(this.campoNombre);

	this.tituloAnimaciones=$("<p style='width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:20px; text-align:center;'>Animaciones</p>");
	this.divFichaGeneral.append(this.tituloAnimaciones);

	var fila=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaGeneral.append(fila);

	var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:355px; height:30px;'>");
	fila.append(filaCentro);

	filaCentro.append("<p style='float:left; margin-top:3px;  text-align:right; width:70px;'>Entrada</p>");

	this.campoAnimacionEntrada=$("<select style='margin-left:10px; float:left; width:100px;'>");
	this.campoAnimacionEntrada.html("<option value='no'>No</option> "+
							 "<option value='arriba_abajo'>Arriba-abajo</option> "+
							 "<option value='abajo_arriba'>Abajo-arriba</option> "+
							 "<option value='izquierda_derecha'>Izquierda a derecha</option> "+
							 "<option value='derecha_izquierda'>Derecha a izquierda</option> "+
							 "<option value='aparecer'>Aparecer</option>");	

	filaCentro.append(this.campoAnimacionEntrada);

	filaCentro.append("<p style='float:left; margin-top:3px; margin-left:10px;  text-align:right;'>duración (mseg)</p>");

	this.campoDuracionAnimacionEntrada=$("<input style='width:50px; float:left; margin-left:10px; height:30px;'>");
	filaCentro.append(this.campoDuracionAnimacionEntrada);

	var fila2=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaGeneral.append(fila2);

	var filaCentro2=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:355px; height:30px;'>");
	fila2.append(filaCentro2);

	filaCentro2.append("<p style='float:left; margin-top:3px;  text-align:right; width:70px;'>Salida</p>");

	this.campoAnimacionSalida=$("<select style='margin-left:10px; float:left; width:100px;'>");	
	this.campoAnimacionSalida.html("<option value='no'>No</option> "+
							 "<option value='arriba_abajo'>Arriba-abajo</option> "+
							 "<option value='abajo_arriba'>Abajo-arriba</option> "+
							 "<option value='izquierda_derecha'>Izquierda a derecha</option> "+
							 "<option value='derecha_izquierda'>Derecha a izquierda</option> "+
							 "<option value='desaparecer'>Desaparecer</option>");	

	filaCentro2.append(this.campoAnimacionSalida);

	filaCentro2.append("<p style='float:left; margin-top:3px; margin-left:10px;  text-align:right;'>duración (mseg)</p>");

	this.campoDuracionAnimacionSalida=$("<input style='width:50px; float:left; margin-left:10px; height:30px;'>");
	filaCentro2.append(this.campoDuracionAnimacionSalida);

	this.tabulador.agregarFicha("general","General",this.divFichaGeneral);

}

//Algunas subclases pueden requerir o no este componente,
Componente.prototype.obtenerFichaGeneral2=function(camposMostrar){
	var fila=$("<div style=' height:30px; width:100%; margin-top:5px;'>");
	fila.insertBefore(this.tituloAnimaciones); //Se agrega en el divFichaGeneral

	var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; height:30px;'>");
	fila.append(filaCentro);	
	var anchoCentro=0;
	if(camposMostrar.indexOf("lectura")>=0){		
		if(this.botonSoloLectura)
			this.botonSoloLectura.off("click");
		this.botonSoloLectura=$("<img marcado='0' title='deshabilitar edición' src='../general/objetosGraficos/iconos/soloLectura.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer;'>");
		filaCentro.append(this.botonSoloLectura);
		this.botonSoloLectura.on("click",$.proxy(this.marcarSeleccionBoton,this));
		anchoCentro+=40;
	}
	if(camposMostrar.indexOf("multilinea")>=0){		
		if(this.botonMultilinea)
			this.botonMultilinea.off("click");
		this.botonMultilinea=$("<img  title='multilinea' marcado='0' src='../general/objetosGraficos/iconos/multilinea.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:20px;'>");
		filaCentro.append(this.botonMultilinea);
		this.botonMultilinea.on("click",$.proxy(this.marcarSeleccionBoton,this));
		anchoCentro+=40;
	}
	filaCentro.css("width",anchoCentro+"px");	
}

Componente.prototype.obtenerFichaTamanoPosicion=function(){
	this.divFichaTamanoPosicion=$("<div>");
	this.divFichaTamanoPosicion.css({"position":"absolute","width":"100%","height":"100%","overflow-y":"scroll"});
	this.tabulador.agregarFicha("tamanoPosicion","Tamaño y Posición",this.divFichaTamanoPosicion);

	this.divFichaTamanoPosicion.append("<p style='width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:20px; text-align:center;'>Posición</p>");

	var fila=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaTamanoPosicion.append(fila);

	var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:320px; height:30px;'>");
	fila.append(filaCentro);

	filaCentro.append("<p style='float:left; margin-top:3px;  width:70px; text-align:right;'>Izquierda</p>");

	this.campoPosicionIzquierda=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	this.campoPosicionIzquierda.attr("title","Capture la posición respecto al margen izquierdo");
	filaCentro.append(this.campoPosicionIzquierda);	

	filaCentro.append("<p style='float:left;  width:70px; text-align:right; margin-top:3px;'>Derecha</p>");

	this.campoPosicionDerecha=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	filaCentro.append(this.campoPosicionDerecha);

	
	var fila2=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaTamanoPosicion.append(fila2);


	var filaCentro2=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:320px; height:30px;'>");
	fila2.append(filaCentro2);

	filaCentro2.append("<p style='float:left; margin-top:3px; width:70px; text-align:right;'>Arriba</p>");

	this.campoPosicionArriba=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	filaCentro2.append(this.campoPosicionArriba);

	filaCentro2.append("<p style='float:left; width:70px; text-align:right; margin-top:3px;'>Abajo</p>");

	this.campoPosicionAbajo=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	filaCentro2.append(this.campoPosicionAbajo);

	var fila3=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaTamanoPosicion.append(fila3);


	var filaCentro3=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:320px; height:30px;'>");
	fila3.append(filaCentro3);

	filaCentro3.append("<p style='float:left; margin-top:3px; width:70px; text-align:right;'>Ancho</p>");

	this.campoAncho=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	filaCentro3.append(this.campoAncho);

	filaCentro3.append("<p style='float:left; width:70px; text-align:right; margin-top:3px;'>Alto</p>");

	this.campoAlto=$("<input style='width:80px; float:left; margin-left:10px; height:30px;'>");
	filaCentro3.append(this.campoAlto);
}

Componente.prototype.obtenerFichaEventos=function(){
	this.divFichaEventos=$("<div>");	
	this.tabulador.agregarFicha("eventos","Eventos",this.divFichaEventos);	

	var fila=$("<div style=' height:30px; width:100%; margin-top:20px;'>");
	this.divFichaEventos.append(fila);

	var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:300px; height:30px;'>");
	fila.append(filaCentro);

	
	filaCentro.append("<p style='float:left; margin-top:3px; text-align:right;'>Tipo de Evento</p>");

	this.campoTipoEvento=$("<select style='width:180px; float:left; margin-left:20px;'>");
	this.campoTipoEvento.html("<option value='click'>Click</option>"+
							  "<option value='encima'>Mouse Flotando</option>"+
							  "<option value='afuera'>Mouse afuera</option>"+
							  "<option value='doble click'>Doble click</option>"+
							  "<option value='click derecho'>Click derecho</option>");
	filaCentro.append(this.campoTipoEvento);

	this.divFichaEventos.append("<p style='width:100%; height:30px; margin-top:20px; font-size:20px; text-align:center;'>Código a ejecutar</p>");

	this.areaCodigo=$("<textarea style='width:90%; resize:none; margin-left:5%; margin-bottom:20px; height:150px; border:solid 1px #aaaaaa'></textarea>");
	this.divFichaEventos.append(this.areaCodigo);
}


Componente.prototype.obtenerFichaDiseno=function(){
	this.divFichaDiseno=$("<div>");		
	this.divFichaDiseno.css({"position":"absolute","width":"100%","height":"100%","overflow-y":"scroll"});
	

	this.divFichaDiseno.append("<p style='width:100%; height:30px; margin-top:20px; font-weight:bold; font-size:20px; text-align:center;'>Fuente</p>");
	var fila=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaDiseno.append(fila);

	var filaCentro=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:340px; height:30px;'>");
	fila.append(filaCentro);

	/*filaCentro.append("<span style='font-weight:bold; float:left; '>Tipo de letra</span>");*/

	this.campoEstiloLetra=$("<select style='width:250px; float:left; height:30px;'>");
	this.campoEstiloLetra.html("<option value='Arial'>Arial</option> "+
							 "<option value='Times New Roman'>Times New Roman</option> "+
							 "<option value='Agency FB'>Agency FB</option> "+
							 "<option value='Calibri'>Calibri</option> "+
							 "<option value='Comic Sans'>Comic Sans</option> "+
							 "<option value='Helvética'>Helvética</option>"+
							 "<option value='Impact'>Impact</option>");	
	filaCentro.append(this.campoEstiloLetra);
	this.campoEstiloLetra.on("change",$.proxy(function(){
		this.divVistaPrevia.css("font-family",this.campoEstiloLetra.val());
	},this));

	this.campoTamanoLetra=$("<select style='float:left;width:60px; margin-left:30px; text-align:center'>");
	this.campoTamanoLetra.html("<option value='8'>8</option><option value='9' >9</option>"+
							"<option value='10'>10</option><option value='11'>11</option>"+
							"<option value='12'>12</option><option value='14'  selected='true'>14</option>"+
							"<option value='16' >16</option><option value='18'>18</option>"+
							"<option value='20'>20</option><option value='22'>22</option>");
	filaCentro.append(this.campoTamanoLetra);
	this.campoTamanoLetra.on("change",$.proxy(function(){		
		this.divVistaPrevia.css("font-size",this.campoTamanoLetra.val()+"px");
	},this));

	var fila2=$("<div style=' height:30px; width:100%; margin-top:10px; margin-bottom:20px;'>");
	this.divFichaDiseno.append(fila2);

	var filaCentro2=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:270px; height:30px;'>");
	fila2.append(filaCentro2);

	if(this.botonNegrita) //Quitar el evento previo.
		this.botonNegrita.off("click");
	this.botonNegrita=$("<div marcado='0' style='background-color:#eeeeee; height:30px; width:30px; text-align:center; font-size:18px; font-weight:bold; cursor:pointer; float:left; border:solid 1px #aaaaaa; padding-top:4px; '>N</div>");
	filaCentro2.append(this.botonNegrita);			
	this.botonNegrita.on("click",$.proxy(this.marcarSeleccionBoton,this));

	if(this.botonCursiva)
		this.botonCursiva.off("click");
	this.botonCursiva=$("<div marcado='0' style='background-color:#eeeeee; height:30px; width:30px; text-align:center; font-size:18px; font-style:italic; cursor:pointer; float:left; margin-left:20px; border:solid 1px #aaaaaa; padding-top:4px;'>K</div>");
	filaCentro2.append(this.botonCursiva);	
	this.botonCursiva.on("click",$.proxy(this.marcarSeleccionBoton,this));
	
	if(this.botonSubrayado)
		this.botonSubrayado.off("click");
	this.botonSubrayado=$("<div marcado='0' style='background-color:#eeeeee; height:30px; width:30px; text-align:center; font-size:18px; text-decoration:underline; cursor:pointer; float:left; margin-left:20px; border:solid 1px #aaaaaa; padding-top:5px;'>S</div>");
	filaCentro2.append(this.botonSubrayado);		
	this.botonSubrayado.on("click",$.proxy(this.marcarSeleccionBoton,this));


	var botonColorLetra=$("<div style=' width:100px; height:30px; border:solid 2px #eeeeee; float:left; margin-left:40px;'>");
	filaCentro2.append(botonColorLetra);
	this.botonColorLetraCuadro=$("<input type='color' value='#000000' style='width:60px; height:27px;  margin-left:5px; float:left; border:none; cursor:pointer'>");
	botonColorLetra.append(this.botonColorLetraCuadro);
	botonColorLetra.append("<span style='float:left; margin-left:5px; font-size:20px; margin-top:3px;'>A</span>");	
	this.botonColorLetraCuadro.on("change",$.proxy(function(){		
		this.divVistaPrevia.css("color",this.botonColorLetraCuadro.val());
	},this));
	

	this.divFichaDiseno.append("<p style='width:100%; height:30px; margin-top:30px; font-weight:bold; font-size:20px; text-align:center;'>Párrafo</p>");
	
	var fila3=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaDiseno.append(fila3);

	var filaCentro3=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:300px; height:30px;'>");
	fila3.append(filaCentro3);

	this.botonVinetas=$("<img src='../general/objetosGraficos/iconos/vinetas.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer'>");
	filaCentro3.append(this.botonVinetas);

	this.botonVinetasNumeros=$("<img src='../general/objetosGraficos/iconos/vinetasNumeros.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:20px;'>");
	filaCentro3.append(this.botonVinetasNumeros);

	if(this.botonAlinearIzquierda)
		this.botonAlinearIzquierda.off("click");
	this.botonAlinearIzquierda=$("<img  alineado='left' src='../general/objetosGraficos/iconos/alinearIzquierda.png' style='background-color:#aaaaff;  border:solid 1px black; width:30px; height:30px; float:left; cursor:pointer; margin-left:40px;'>");
	filaCentro3.append(this.botonAlinearIzquierda);
	this.botonAlinearIzquierda.on("click",$.proxy(this.marcarSeleccionBotonAlineado,this));

	if(this.botonAlinearCentro)
		this.botonAlinearCentro.off("click");
	this.botonAlinearCentro=$("<img  alineado='center' src='../general/objetosGraficos/iconos/alinearCentro.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:20px;'>");
	filaCentro3.append(this.botonAlinearCentro);
	this.botonAlinearCentro.on("click",$.proxy(this.marcarSeleccionBotonAlineado,this));

	if(this.botonAlinearDerecha)
		this.botonAlinearDerecha.off("click");
	this.botonAlinearDerecha=$("<img  alineado='right' src='../general/objetosGraficos/iconos/alinearDerecha.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:20px;'>");
	filaCentro3.append(this.botonAlinearDerecha);
	this.botonAlinearDerecha.on("click",$.proxy(this.marcarSeleccionBotonAlineado,this));	

	if(this.botonJustificar)
		this.botonJustificar.off("click");
	this.botonJustificar=$("<img  alineado='justify' src='../general/objetosGraficos/iconos/justificar.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:20px;'>");
	filaCentro3.append(this.botonJustificar);
	this.botonJustificar.on("click",$.proxy(this.marcarSeleccionBotonAlineado,this));

	var fila4=$("<div style=' height:30px; width:100%; margin-top:10px;'>");
	this.divFichaDiseno.append(fila4);

	var filaCentro4=$("<div style='margin:auto; position:absolute; left:0px; right:0px; width:240px; height:30px;'>");
	fila4.append(filaCentro4);

	this.botonInterlineado=$("<img src='../general/objetosGraficos/iconos/interlineado.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:10px;'>");
	filaCentro4.append(this.botonInterlineado);


	var botonColorFondo=$("<div style=' width:110px; height:30px; border:solid 2px #eeeeee; float:left; margin-left:30px;'>");
	filaCentro4.append(botonColorFondo);
	this.botonColorFondoCuadro=$("<input type='color' value='#ffffff' style='width:60px; height:27px; margin-left:5px; float:left; border:none'>");
	botonColorFondo.append(this.botonColorFondoCuadro);
	botonColorFondo.append("<img style='float:left; margin-left:5px; width:25px;'  src='../general/objetosGraficos/iconos/colorFondo.png'></img>");
 	this.botonColorFondoCuadro.on("change",$.proxy(function(){		
		this.divVistaPrevia.css("background-color",this.botonColorFondoCuadro.val());
	},this));

	this.botonBorde=$("<img src='../general/objetosGraficos/iconos/bordeIzquierdo.png' style='width:30px; height:30px; border:solid 1px #aaaaaa; float:left; cursor:pointer; margin-left:30px;'>");
	filaCentro4.append(this.botonBorde);

	this.divFichaDiseno.append("<p style='width:100%; height:30px; margin-top:30px; font-weight:bold; font-size:20px; text-align:center;'>Vista Previa</p>");

	this.divVistaPrevia=$("<div style='width:90%; margin-left:5%; margin-bottom:20px; height:200px; border:solid 1px #aaaaaa; overflow-y:hidden;'>");
	this.divVistaPrevia.html("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo");
	this.divFichaDiseno.append(this.divVistaPrevia);

	this.tabulador.agregarFicha("diseno","Diseño",this.divFichaDiseno);
}


/****************************************************************************************************/
/****Eventos..*************/
/****************************************************************************************************/

Componente.prototype.cargarEventos=function(){
	this.botonEditar.on("click",$.proxy(this.abrirVentanaEdicion,this));
	this.botonBorrar.on("click",$.proxy(this.confirmarEliminar,this));
	this.botonClonar.on("click",$.proxy(this.clonar,this));
}

Componente.prototype.confirmarEliminar=function(){	
    this.ventana=new Ventana(null,this.eliminar,this);
    this.ventana.establecerDimensiones("30%","170px");
    this.ventana.cargarContenidoCentral("<div style='width:100%; height:100%; text-align:center;'>¿Confirma que desea eliminar este elemento?</div>");
    this.ventana.mostrar("Eliminar "+this.tipoTextual);
}

Componente.prototype.eliminar=function(objetoPropio){
	objetoPropio.ventana.ocultar();
	objetoPropio.divContenedor.remove();
	//Pedirle al parent que lo elimina de la lista.	
	objetoPropio.objetoPadre.eliminarComponente(objetoPropio.idComponente);
}

Componente.prototype.clickAceptarEdicion=function(){	
	//Por el momento solo quitar la ventana.
	if(this.validarCambiosEdicion()){  //Validar los cambios en la edición.
		this.fondoVentanaEdicion.remove();
		this.guardarAtributosEditados();
	}
}

Componente.prototype.cambioFichaEdicion=function(){}


//Solo selecciona un botón, no hace nada.
Componente.prototype.marcarSeleccionBoton=function(event){	
	var boton=$(event.target);		
	if(boton.attr("marcado")==0){ //Se marca
		boton.css({"background-color":"#aaaaff","border":"solid 1px black"});
		boton.attr("marcado",1);
	}
	else{
		boton.css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});
		boton.attr("marcado",0);
	}
	//Si la ficha de diseno está visible.
	if(this.existeDiseno)
		this.actualizarVistaDiseno(this.divVistaPrevia);
}
Componente.prototype.marcarSeleccionBotonAlineado=function(event){	
	//Desmarcar todos.
	this.botonAlinearIzquierda.css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});
	this.botonAlinearDerecha.css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});
	this.botonAlinearCentro.css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});
	this.botonJustificar.css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});

	var boton=$(event.target);			
	boton.css({"background-color":"#aaaaff","border":"solid 1px black"});	
	this.alineadoTexto=boton.attr("alineado");
	
	this.actualizarVistaDiseno(this.divVistaPrevia);
}


/****************************************************************************************************/
/****Funciones importantes que deben sobreescribir en las subclases*************/
/****************************************************************************************************/

//Guarda los atributos después de editarlos.
Componente.prototype.guardarAtributosEditados=function(){	
	this.nombre=this.campoNombre.val();
	if(this.funcionCambioAtributos)
		this.funcionCambioAtributos(this,this.objetoPadre);
	
	var nuevoDiseno={};
	if(this.existeDiseno)
		nuevoDiseno={
			fuente:this.campoEstiloLetra.val(),
		  	tamano:this.campoTamanoLetra.val(),
		  	negrita:this.botonNegrita.attr("marcado"),
		  	cursiva:this.botonCursiva.attr("marcado"),
		  	subrayado:this.botonSubrayado.attr("marcado"),
		  	color:this.botonColorLetraCuadro.val(),
		  	alineado:this.alineadoTexto,
		  	colorFondo:this.botonColorFondoCuadro.val()
		}	
	this.atributos={
		  tipo:this.tipo,
		  nombre:this.campoNombre.val(),		  
		  animacionEntrada:{entrada:this.campoAnimacionEntrada.val(),duracion:this.campoDuracionAnimacionEntrada.val()},
		  animacionSalida:{salida:this.campoAnimacionSalida.val(),duracion:this.campoDuracionAnimacionSalida.val()},
		  diseno:nuevoDiseno,
		  tamano_posicion:{
		  	izquierda:this.campoPosicionIzquierda.val(),
		  	derecha:this.campoPosicionDerecha.val(),
		  	arriba:this.campoPosicionArriba.val(),
		  	abajo:this.campoPosicionAbajo.val(),
		  	ancho:this.campoAncho.val(),
		  	alto:this.campoAlto.val()
		  },
		  hijo:{
		  }};		

    //Acomodar el componente de acuerdo a los cambios en el tamaño y la posición.
    if(!cadenaVacia(this.atributos.tamano_posicion.izquierda))
    	this.divContenedor.css("left",this.atributos.tamano_posicion.izquierda+"px");
    else
    	this.divContenedor.css("left","");

    if(!cadenaVacia(this.atributos.tamano_posicion.derecha))
    	this.divContenedor.css("right",this.atributos.tamano_posicion.derecha+"px");
    else
		this.divContenedor.css("right","");

	if(!cadenaVacia(this.atributos.tamano_posicion.arriba))
    	this.divContenedor.css("top",this.atributos.tamano_posicion.arriba+"px");
    else
		this.divContenedor.css("top","");

	if(!cadenaVacia(this.atributos.tamano_posicion.abajo))
    	this.divContenedor.css("bottom",this.atributos.tamano_posicion.arriba+"px");
    else
		this.divContenedor.css("bottom","");

	if(!cadenaVacia(this.atributos.tamano_posicion.ancho))
    	this.divContenedor.css("width",this.atributos.tamano_posicion.ancho+"px");
    else
		this.divContenedor.css("width","");

	if(!cadenaVacia(this.atributos.tamano_posicion.alto))
    	this.divContenedor.css("height",this.atributos.tamano_posicion.alto+"px");
    else
		this.divContenedor.css("height","");
	
}


//Debe cargar los atributos ya seleccionados previamente.
Componente.prototype.cargarAtributosEdicion=function(){		
	//Si ya hubo una edición previa en la ventana de Edición.
	//Se evalúan las dos porque primero debemos garantizar que this.atributos exista y así poder evaluar
	//this.atributos.diseno, si this.atributos.diseno existe significa que ya hizo cambios.
	if(this.atributos && this.atributos.diseno){				
		this.campoNombre.val(this.atributos.nombre);

		this.campoAnimacionEntrada.val(this.atributos.animacionEntrada.entrada);
		this.campoDuracionAnimacionEntrada.val(this.atributos.animacionEntrada.duracion);

		this.campoAnimacionSalida.val(this.atributos.animacionSalida.salida);
		this.campoDuracionAnimacionSalida.val(this.atributos.animacionSalida.duracion);		
		
		if(this.existeDiseno){
			this.campoEstiloLetra.val(this.atributos.diseno.fuente);		
			

			this.campoTamanoLetra.val(this.atributos.diseno.tamano);

			this.botonNegrita.attr("marcado",this.atributos.diseno.negrita);
			this.botonCursiva.attr("marcado",this.atributos.diseno.cursiva);
			this.botonSubrayado.attr("marcado",this.atributos.diseno.subrayado);
			this.marcarSeleccionBotones([this.botonNegrita,this.botonCursiva,this.botonSubrayado]);		

			this.botonColorLetraCuadro.val(this.atributos.diseno.color);
			this.botonColorFondoCuadro.val(this.atributos.diseno.colorFondo);			

			switch(this.atributos.diseno.alineado){
				case "left": this.botonAlinearIzquierda.trigger("click"); break;
				case "right": this.botonAlinearDerecha.trigger("click"); break;
				case "center": this.botonAlinearCentro.trigger("click"); break;
				case "justify": this.botonJustificar.trigger("click"); break;
			}
		}

		this.campoPosicionIzquierda.val(this.atributos.tamano_posicion.izquierda);
		this.campoPosicionDerecha.val(this.atributos.tamano_posicion.derecha);
		this.campoPosicionArriba.val(this.atributos.tamano_posicion.arriba);
		this.campoPosicionAbajo.val(this.atributos.tamano_posicion.abajo);
		this.campoAncho.val(this.atributos.tamano_posicion.ancho);
		this.campoAlto.val(this.atributos.tamano_posicion.alto);
	}
	else{ //Cargar los valores por default.		
		this.campoNombre.val(this.nombre);
		if(parseInt(this.divContenedor.css("left")))
			this.campoPosicionIzquierda.val(parseInt(this.divContenedor.css("left")));
		if(parseInt(this.divContenedor.css("right")))
			this.campoPosicionDerecha.val(parseInt(this.divContenedor.css("right")));
		if(parseInt(this.divContenedor.css("top")))
			this.campoPosicionArriba.val(parseInt(this.divContenedor.css("top")));
		if(parseInt(this.divContenedor.css("bottom")))
			this.campoPosicionAbajo.val(parseInt(this.divContenedor.css("bottom")));
		if(parseInt(this.divContenedor.css("width")))
			this.campoAncho.val(parseInt(this.divContenedor.css("width")));
		if(parseInt(this.divContenedor.css("height")))
			this.campoAlto.val(parseInt(this.divContenedor.css("height")));
	}
}

Componente.prototype.obtenerTituloEdicion=function(){return "";}


/****************************************************************************************************/
/****Funciones privadas de ayuda.*************/
/****************************************************************************************************/

Componente.prototype.validarCambiosEdicion=function(){
	var valido=true;
	//Validar que el nombre no esté vacío.
	var nombre=this.campoNombre.val();
	if(cadenaVacia(nombre)){
		this.campoNombre.attr("title","Debe darle un nombre al componente");
		this.campoNombre.css("border","solid 1px red");
		this.tabulador.cambiarFicha("general");
		this.campoNombre.focus();
		this.campoNombre.select();		
		valido=false;
	}
	else{
		this.campoNombre.attr("title","Introduzca un nombre para el componente");
		this.campoNombre.css("border",this.bordeInicialCampos);
	}

	var izquierda=this.campoPosicionIzquierda.val();
	if(!cadenaVacia(izquierda) && isNaN(izquierda)){
		this.campoPosicionIzquierda.attr("title","Los valores deben ser números enteros");
		this.campoPosicionIzquierda.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoPosicionIzquierda.focus();
		this.campoPosicionIzquierda.select();		
		valido=false;
	}	
	else{
		this.campoPosicionIzquierda.attr("title","Introduza la distancia en pixeles con respecto al margen izquierdo");
		this.campoPosicionIzquierda.css("border",this.bordeInicialCampos);
	}
	var derecha=this.campoPosicionDerecha.val();
	if(!cadenaVacia(derecha) && isNaN(derecha)){
		this.campoPosicionDerecha.attr("title","Los valores deben ser números enteros");
		this.campoPosicionDerecha.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoPosicionDerecha.focus();
		this.campoPosicionDerecha.select();		
		valido=false;
	}
	else{
		this.campoPosicionDerecha.attr("title","Introduza la distancia en pixeles con respecto al margen derecho");
		this.campoPosicionDerecha.css("border",this.bordeInicialCampos);
	}
	var arriba=this.campoPosicionArriba.val();
	if(!cadenaVacia(arriba) && isNaN(arriba)){
		this.campoPosicionArriba.attr("title","Los valores deben ser números enteros");
		this.campoPosicionArriba.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoPosicionArriba.focus();
		this.campoPosicionArriba.select();		
		valido=false;
	}
	else{
		this.campoPosicionArriba.attr("title","Introduza la distancia en pixeles con respecto al margen superior");
		this.campoPosicionArriba.css("border",this.bordeInicialCampos);
	}


	var abajo=this.campoPosicionAbajo.val();
	if(!cadenaVacia(abajo) && isNaN(abajo)){
		this.campoPosicionAbajo.attr("title","Los valores deben ser números enteros");
		this.campoPosicionAbajo.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoPosicionAbajo.focus();
		this.campoPosicionAbajo.select();		
		valido=false;
	}
	else{
		this.campoPosicionAbajo.attr("title","Introduza la distancia en pixeles con respecto al margen inferior");
		this.campoPosicionAbajo.css("border",this.bordeInicialCampos);
	}
	var ancho=this.campoAncho.val();	
	if(cadenaVacia(ancho) || isNaN(ancho)){		
		this.campoAncho.attr("title","Los valores deben ser números enteros");
		this.campoAncho.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoAncho.focus();
		this.campoAncho.select();				
		valido=false;		
	}
	else{
		this.campoAncho.attr("title","Introduza la dimensión a lo ancho del elemento");
		this.campoAncho.css("border",this.bordeInicialCampos);
	}
	var alto=this.campoAlto.val();
	if(cadenaVacia(alto) || isNaN(alto)){
		this.campoAlto.attr("title","Los valores deben ser números enteros");
		this.campoAlto.css("border","solid 1px red");
		this.tabulador.cambiarFicha("tamanoPosicion");
		this.campoAlto.focus();	
		this.campoAlto.select();					
		valido=false;		
	}
	else{
		this.campoAlto.attr("title","Introduza la dimensión a lo alto del elemento");
		this.campoAlto.css("border",this.bordeInicialCampos);
	}

	//Validar el componente.
	if(valido && this.funcionValidarComponente){
		//En realidad ahorita solo valido el nombre. que no se use un nombre que ya se 
		//usó para otro componente.
		valido=this.funcionValidarComponente({"nombre":nombre},this,this.objetoPadre);
		if(!valido){
			this.campoNombre.attr("title",nombre+" ya existe");
			this.campoNombre.css("border","solid 1px red");								
			this.tabulador.cambiarFicha("general");
			this.campoNombre.focus();
			this.campoNombre.select();
		}		
		else{
			this.campoNombre.attr("title","Introduzca un nombre para el componente");
			this.campoNombre.css("border",this.bordeInicialCampos);
		}
	}

	return valido;
}

//Este debe funcionar sin los clicks.
Componente.prototype.marcarSeleccionBotones=function(botones){
	for(var i=0;i<botones.length;i++){
		if(botones[i].attr("marcado")==1) //Se marca
			botones[i].css({"background-color":"#aaaaff","border":"solid 1px black"});
		else
			botones[i].css({"background-color":"#eeeeee","border":"solid 1px #aaaaaa"});
	}
}

Componente.prototype.actualizarVistaDiseno=function(elementoActualizar){
	//Ver la fuente.

	//Var las negritas.
	var negrita=this.botonNegrita.attr("marcado");
	negrita=(negrita=="0")?"normal":"bold";	

	var cursiva=this.botonCursiva.attr("marcado");
	cursiva=(cursiva=="0")?"normal":"italic";

	var subrayado=this.botonSubrayado.attr("marcado");
	subrayado=(subrayado=="0")?"none":"underline";

	elementoActualizar.css({"font-weight":negrita,"font-style":cursiva,"text-decoration":subrayado,
			"text-align":this.alineadoTexto});

}

Componente.prototype.actualizarVistaDiseno2=function(elementoActualizar){
	elementoActualizar.css("font-family",this.atributos.diseno.fuente);
	elementoActualizar.css("font-size",this.atributos.diseno.tamano+"px");
	elementoActualizar.css("color",this.atributos.diseno.color);	
	elementoActualizar.css("background-color",this.atributos.diseno.colorFondo);
}