	this.posX=0; //Es el left
	this.posY=0; //Es el top.
	this.ancho=0;  //Es el width
	this.alto=0;  //Es el alto.
	this.botonSoloLectura;  //El botón que decide si un componente puede editarse o no.
	this.botonMultilinea;  //El botón decide si un componente es de múltiple líneas.
	this.atributos=null;  //El json con todas las propiedades de este componente.
	this.campoNombre;  //Durante la edición cuando el usuario escribe el nombre del componente.
	this.tipo="";  //Este lo establecen las subclases como el tipo del componente.
	this.tipoTextual="";
	this.botonEditar;  //Para abrir la ventana de edición de las propiedades del componente.
	this.alineadoTexto="left";
	this.bordeInicialCampos="solid 1px rgb(170, 170, 170)";
	this.objetoPadre=null;	
	this.idComponente=-1;
	this.nombre="";
	this.existeDiseno=true; //La ficha de diseno algunos hijos la ocultan.
	this.funcionCambioAtributos=null; //La llama cuando hay un cambio en los atributos.
	this.funcionValidarComponente=null; //Buscar que los componentes no se repitan en nombre.				

 	
	this.divContenedor;
	this.divBotones;
	this.botonClonar;
	this.botonBorrar;
	this.fondoVentanaEdicion;
	this.divTituloEdicion;
	this.divTituloTextoEdicion;
	this.botonCerrarEdicion;
	this.tabulador;
	this.botonAceptarEdicion;
	this.botonCancelarEdicion;
	this.divFichaGeneral;
	this.tituloAnimaciones;
	this.campoDuracionAnimacionEntrada;
	this.campoAnimacionSalida;
	this.campoDuracionAnimacionSalida;
	this.campoPosicionIzquierda;
	this.campoPosicionDerecha;
	this.campoPosicionArriba;
	this.campoPosicionAbajo;
	this.campoAncho;
	this.campoAlto;
	this.divFichaEventos;
	this.campoTipoEvento;
	this.areaCodigo;
	this.divFichaDiseno;
	this.campoEstiloLetra;
	this.campoTamanoLetra;
	this.botonNegrita;
	this.botonCursiva;
	this.botonSubrayado;
	this.botonColorLetra;
	this.botonColorLetraCuadro;
	this.botonVinetas;
	this.botonVinetasNumeros;
	this.botonAlinearIzquierda;
	this.botonAlinearCentro;
	this.botonAlinearDerecha;
	this.botonJustificar;
	this.botonInterlineado;
	this.botonColorFondo;
	this.botonColorFondoCuadro;
	this.botonBorde;
	this.divVistaPrevia;
    this.ventana;