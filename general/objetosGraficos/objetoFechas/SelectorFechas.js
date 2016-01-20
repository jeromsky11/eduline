//Constructor.
var SelectorFechas=function(){
	//Se usa para saber si el usuario ya estuvo eligiendo fechas y esa misma mostrar, 
	//si no lo ha hecho se debe conseguir la fecha actual del servidor.
	this.primeraApertura=true; 
	//Se usa para guardar la última fecha seleccionada  (la marcada en azul)y cuando se seleccione otra devolverla
	//a su color negro.
	this.ultimaFechaClick=null;  
	//Se usa para saber en que año comenzar cuando el calendario está visualizando un intervalo de años.
	this.inicioIntervalo=-1; 	

	this.ancho=250;
	this.alto=30;
	this.posZ=1; //Es para tenerlo siempre por delante de otros componentes.
	this.divSelectorFechas; //Es el que contiene todos los elementos del calendario.
	this.campoFechaTexto; //Es el campo donde aparecerá la fecha  actual seleccionada.
	this.botonCalendario; //Es el botón donde se hará click para desplegar u ocultar el calendario.
	this.divDesplegable; //Es el div que será mostrado y ocultado, el que contiene el calendario.
	this.divTablaFecha; //El div que contendrá las tablas  del calendario (tabla de días, meses o años)

	this.botonFlechaIzquierda; //Botón para ir al mes, año o intervalo de años anterior.
	this.campoMesAnio;  //Campo para desplegar el mes,el año o el intervalo actual del que se está deplegando un calendario.
	this.botonFlechaDerecha;  //Botón para ir al mes, año o intervalos de años siguiente.

	this.tablaDiasFecha; //La tabla gráfica que contiene  días de un mes.
	this.tablaMesesAnio;   //La tabla gráfica que contiene los meses de un año.

	this.tablaIntervaloAnios; //La tabla gráfica que contiene los intervalos de años (12 en 12)

	this.matrizDias; //Guarda los td de los días del mes para quitar y agregar eventos de click.
	this.matrizMeses;  //Guarda los td de los meses del año para quitar y agregar eventos de click.
	this.matrizIntervalos;  //Guarda los td de los intérvalos de  años para quitar y agregar eventos de click.

	this.existeDiseno=false; //Que no aparezca la ficha de diseño.

}

SelectorFechas.prototype=new Componente;


//Métodos SET.
SelectorFechas.prototype.establecerPosZ=function(posZ){
	this.posZ=posZ;
	this.divSelectorFechas.css({"z-index":this.posZ});
	this.divBotones.css({"z-index":this.posZ+1});
}

//Métodos GET.


//*********Funciones sobreescritas.  *****************//

SelectorFechas.prototype.crearEditable=function(){
	Componente.prototype.crearEditable.call(this);

	//Cargar el elemento principal.	
	this.divSelectorFechas=$("<div >");	
	this.divContenedor.append(this.divSelectorFechas);	
	
	this.divSelectorFechas.css({"z-index":this.posZ,"width":this.ancho,"height":this.alto,
				"position":"absolute"});
	this.divBotones.css({"z-index":this.posZ+1,"right":"25px"});

	//Sección para el divCampoFecha.
	var divCampoFecha=$("<div class='divCampoFecha'>");
	this.divSelectorFechas.append(divCampoFecha);
	

	this.campoFechaTexto=$("<input type='text'  readonly >");

	divCampoFecha.append(this.campoFechaTexto);

	this.botonCalendario=$("<img src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoCalendario.png' ></img>");
	divCampoFecha.append(this.botonCalendario);	



	//Sección para el divDesplegable.

	this.divDesplegable=$("<div class='divDesplegable'>");
	this.divSelectorFechas.append(this.divDesplegable);

	this.divTablaFecha=$("<div class='divTablaFecha'>");	
	this.divDesplegable.append(this.divTablaFecha);

	//Cargar el div para elegir meses y años
	var divMesesAnios=$("<div class='divMesesAnios'>");
	this.divTablaFecha.append(divMesesAnios);

	this.botonFlechaIzquierda=$("<img  src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoMenor.png'> ");
	this.botonFlechaIzquierda.css({"position":"absolute","left":"0px","top":"15%",
					"width":"10%","height":"70%","cursor":"pointer"});
	divMesesAnios.append(this.botonFlechaIzquierda);
	this.campoMesAnio=$("<div>");
	this.campoMesAnio.css({"position":"absolute","left":"10%","top":"0px","width":"80%",
			"height":"100%","text-align":"center","font-weight":"bold","padding-top":"3%",
			"font-size":"15px","cursor":"pointer"});
	this.campoMesAnio.html("");

	divMesesAnios.append(this.campoMesAnio);

	this.botonFlechaDerecha=$("<img  src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoMayor.png'> ");
	this.botonFlechaDerecha.css({"position":"absolute","left":"90%","top":"15%",
					"width":"10%","height":"70%","cursor":"pointer"});
	divMesesAnios.append(this.botonFlechaDerecha);

	//Cargar la tabla de meses
	this.tablaDiasFecha=$("<table class='tablaCalendario'>");
	this.divTablaFecha.append(this.tablaDiasFecha);	

	this.tablaMesesAnio=$("<table class='tablaCalendario columnaCalendario'> ");
	this.tablaMesesAnio.css("display","none");
	this.divTablaFecha.append(this.tablaMesesAnio);
	
	var meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
	this.matrizMeses=[];
	var tr=$("<tr>");
	for(var i=0;i<meses.length;i++){		
		if(i>0 && i%4==0){			
			this.tablaMesesAnio.append(tr);
			tr=$("<tr>");
		}
		var td=$("<td mes='"+i+"'>"+meses[i]+"</td>");
		tr.append(td);		
		this.matrizMeses.push(td);
	}
	this.tablaMesesAnio.append(tr);


	//Cargar la tabla de los intervalos.
	this.tablaIntervaloAnios=$("<table class='tablaCalendario columnaCalendario2'>");
	this.tablaIntervaloAnios.css("display","none");
	this.cargarIntervalosAnios();
	this.divTablaFecha.append(this.tablaIntervaloAnios);

	
	var divBotonTiempoFecha=$("<div class='botonTiempoFecha'>");
	this.botonTiempoFecha=$("<img src='"+urlServidor+"/general/objetosGraficos/objetoFechas/relojIcono.png' />");
	divBotonTiempoFecha.append(this.botonTiempoFecha);
	this.divDesplegable.append(divBotonTiempoFecha);

	this.matrizDias=[];
	var diaActual=1;
	for(var i=0;i<6;i++){
		var nueva=[];
		for(var j=0;j<7;j++){
			nueva.push($("<td style='font-weight:normal; color:black'>"+
					"1</td>"));
			diaActual++;
		}
		this.matrizDias.push(nueva);
	}

	this.llenarDiasMes();

	this.llenarTablaHoras();

	this.divDesplegable.append(this.tablaHorasFecha);

}	

SelectorFechas.prototype.obtenerTituloEdicion=function(){
	return "Propiedades del selector de fechas";
}

SelectorFechas.prototype.obtenerFichaGeneral=function(){
	Componente.prototype.obtenerFichaGeneral.call(this);
	this.obtenerFichaGeneral2(new Array("lectura"));
}

SelectorFechas.prototype.guardarAtributosEditados=function(){
	Componente.prototype.guardarAtributosEditados.call(this);
	this.atributos.hijo={			
			deshabilitado:this.botonSoloLectura.attr("marcado")
	};
	this.botonCalendario.prop("readonly",this.atributos.hijo.deshabilitado==1);
	//El evento siempre se apaga para que la lógica sea más simple que andar averiguando
	//si se habilitó o se de deshabilitó y en que estaba previamente.	
	this.botonCalendario.off("click"); 	
	if(this.atributos.hijo.deshabilitado==0){ //Rehabilitar.		
		this.botonCalendario.css("cursor","pointer");
		this.botonCalendario.on("click",$.proxy(this.mostrar,this));		
	}
	else
		this.botonCalendario.css("cursor","none");	
}

//Debe cargar los atributos ya seleccionados previamente.
SelectorFechas.prototype.cargarAtributosEdicion=function(){
	Componente.prototype.cargarAtributosEdicion.call(this);				
	if(this.atributos){//Si ya hubo atributos previos		
		this.botonSoloLectura.attr("marcado",this.atributos.hijo.deshabilitado);
		this.marcarSeleccionBotones([this.botonSoloLectura]);
	}	
	
}

SelectorFechas.prototype.cargarEventos=function(){	
	Componente.prototype.cargarEventos.call(this);

	//Evitar con esto que se cierre la ventana cuando se de click en algún botón del calendario.
	this.divSelectorFechas.on("click",function(event){event.stopPropagation()});

	this.botonCalendario.on("click",$.proxy(this.mostrar,this));	
	this.botonTiempoFecha.on("click",$.proxy(this.cambiarVista,this));		
	this.botonFlechaIzquierda.on("click",{direccion:-1},$.proxy(this.cambiarMes,this));
	this.botonFlechaDerecha.on("click",{direccion:1},$.proxy(this.cambiarMes,this));	
	
	//Agregar eventos para los botones de arriba y abajo en las horas..
	for(var i=0;i<this.botonesArriba.length;i++){
		this.botonesArriba[i].on("click",{direccion:1},$.proxy(this.seleccionarHora,this));
		this.botonesAbajo[i].on("click",{direccion:-1},$.proxy(this.seleccionarHora,this));
		this.camposHora[i].keyup($.proxy(this.seleccionarHoraEdicion,this));
		this.camposHora[i].focusout($.proxy(this.seleccionarHoraEdicion2,this));
	}
	//Agregar eventos para intercambiar la vista del calendario entre días, meses 
	//e intervalos de años.
	this.campoMesAnio.on("click",$.proxy(this.cambiarVistaCalendario,this));
	//Agregar eventos para cada mes.
	for(var i=0;i<this.matrizMeses.length;i++)
		this.matrizMeses[i].on("click",$.proxy(this.cambiarMes2,this));	
}


//*********Funciones públicas.  *****************//
SelectorFechas.prototype.limpiar=function(){
	this.campoFechaTexto.val("");
	this.fechaActual=null;
	this.primeraApertura=true;	
	this.ocultarGeneral();
}

//Establece la fecha actual desde alguna clase en inglés.
SelectorFechas.prototype.establecerFecha=function(valor){	
	this.primeraApertura=false;
	//La fecha llega en inglés.
	var mes=parseInt(""+valor[5]+valor[6]);
	valor=valor.substr(0,5)+(mes+1)+valor.substr(7,valor.length);	
	this.fechaActual=new Date(valor);
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	this.cargarDiasCalendario();
}



//*********Funciones privadas.  *****************//


//Muestra u oculta el calendario.
SelectorFechas.prototype.mostrar=function(event){			
	//emergenteActiva una una variable global localizada en el archivo Variables.
	
	if(emergenteActiva!=null && emergenteActiva!=this)
		emergenteActiva.ocultarGeneral();
	
	//Obtener el estado actual.
	var actual=this.divDesplegable.css("display");	
	if(actual=="none"){		
		//Si es la primera apertura ver que fecha hay en el server.				
		if(this.primeraApertura){
			//Obtener la fecha del servidor.
			$.ajax({
				datatype:"json",
				url:"../servidor/Servidor.php",
				data:{
					"accion":"funcionesGlobales,obtenerFechaActual", 
		            "variables":{"zona":"America/Mexico_City"}
				},
				success:$.proxy(function(data){
					console.log("Llega "+data);
					this.fechaActual=new Date(data); 
					this.cargarDiasCalendario(); //Actualizar los días el calendario.
					//Actualizar la posición en z del selector fechas.					
					this.divSelectorFechas.css("z-index",this.posZ+1);
					//Poner esta ventana como la activa para que no se muestre ninguna otra.
					emergenteActiva=this; 
					//Hacer que el div desplegable aparezca.
					this.divDesplegable.css("display","block");
				},this)
			});
		}
		//Cargar simplemente el calendario.
		else{			
			this.divSelectorFechas.css("z-index",this.posZ+1);			
			this.divDesplegable.css("display","block");
			emergenteActiva=this;
		}
		//Con esto se logra que el click en cualquier parte de la pantalla sea detectado.		
		if(event!=null){
			$("html").off("click");
			$("html").on("click",$.proxy(this.ocultar,this));		
		}
	}
	//El calendario debe ocultarse.	
	else{		
		this.divSelectorFechas.css("z-index",this.posZ);
		//Con esto ya se permite que alguna otra ventana emergente pueda aparecer.
		emergenteActiva=null;
		this.divDesplegable.css("display","none");	
	}	

}


//Se cambia la vista del calendario, entre fechas u horas.
SelectorFechas.prototype.cambiarVista=function(){		
	var actual=this.tablaHorasFecha.css("display");
	//Hacer que aparezca el calendario de fechas.
	if(actual=="block"){		
		this.tablaHorasFecha.css("display","none");
		this.divTablaFecha.css("display","block");
		this.botonTiempoFecha.attr("src",urlServidor+"/general/objetosGraficos/objetoFechas/relojIcono.png");
	}
	//Hacer que aparezca el reloj de horas.
	else{

		this.tablaHorasFecha.css("display","block");
		this.divTablaFecha.css("display","none");
		this.botonTiempoFecha.attr("src",urlServidor+"/general/objetosGraficos/objetoFechas/iconoCalendario2.png");
	}
}


//Se está activa la ventana del calendario ocultarla.
SelectorFechas.prototype.ocultar=function(){		
	var actual=this.divDesplegable.css("display");		
	if(actual=="block")
		this.ocultarGeneral();		
}
//Se hace en otra función para que se llamada desde varios evento.
SelectorFechas.prototype.ocultarGeneral=function(){
	this.divSelectorFechas.css("z-index",this.posZ);
	this.divDesplegable.css("display","none");		
}




//Intercambia la vista entre los días del mes, los meses del año o un intervalo de años.
SelectorFechas.prototype.cambiarVistaCalendario=function(){	
	var vistaActual=this.tablaDiasFecha.css("display");	
	if(vistaActual=="table" || vistaActual=="block"){ //Cambiar a ver los meses.
		this.tablaDiasFecha.css("display","none");
		this.tablaMesesAnio.css("display","block");
		this.campoMesAnio.html(1900+this.fechaActual.getYear());
	}	
	else{
		vistaActual=this.tablaMesesAnio.css("display");		
		//Cambiar a ver los años.
		if(vistaActual=="block"){
			this.tablaMesesAnio.css("display","none");
			this.cargarIntervalosAnios();			
			this.tablaIntervaloAnios.css("display","block");			
		}
		else{ //Cambiar a ver los días.
			//Por si hubo algún cambio en el día.
			this.cargarDiasCalendario(); 
			this.tablaIntervaloAnios.css("display","none");			
			this.tablaDiasFecha.css("display","block");
		}
	}
}

//Restablce las horas cuando se deja de seleccionar el campo para editar horas.
//Con esto se valida que si el usuario dejó vacío el campo se ponga un 00 y 
//se restablezca la fecha actual.
SelectorFechas.prototype.seleccionarHoraEdicion2=function(event){	
	var campo=$(event.target);	
	if(cadenaVacia(campo.val())){
		campo.val("00");		
		this.fechaActual=new Date((1900+this.fechaActual.getYear())	+"-"+(this.fechaActual.getMonth()+1)+"-"+
			this.fechaActual.getDate()+" "+
			this.camposHora[0].val()+":"+this.camposHora[1].val()+":"+
			this.camposHora[2].val());		
		this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	}	
}
//Ocurre cuando se edita la fecha
//Evita que se estén editando datos inválidos dentro de la fechas.
SelectorFechas.prototype.seleccionarHoraEdicion=function(event){
	this.primeraApertura=false;			
	var target=$(event.target);
	target.val((target.val() + '').replace(/[^0-9]/g, ''));
	var limiteSuperior=(target.attr("columna")=="0")?23:59;
	var value=parseInt(target.val());
	if(value<0)
		target.val("00");
	else if(value>limiteSuperior)
		target.val(limiteSuperior);

	this.fechaActual=new Date((1900+this.fechaActual.getYear())	+"-"+(this.fechaActual.getMonth()+1)+"-"+
			this.fechaActual.getDate()+" "+
			this.camposHora[0].val()+":"+this.camposHora[1].val()+":"+
			this.camposHora[2].val());
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
}

//Ocurre cuando se da click en los botones de arriba y abajo de las horas.
SelectorFechas.prototype.seleccionarHora=function(event){
	this.primeraApertura=false;	
	var target=$(event.target);	
	var columna=parseInt(target.attr("columna"));
	var valor=parseInt(this.camposHora[columna].val());	
	if(columna==0){
		if(event.data.direccion==1) //Suman las horas.
			valor=(valor+1)%24;
		else
			valor=(valor>0)?valor-1:23; //Restan las horas.
	}
	else{
		if(event.data.direccion==1) //Suman minutos o segundos.
			valor=(valor+1)%60;	
		else
			valor=(valor>0)?valor-1:59; //Restan minutos o segundo.
	}
	if(valor<10)	
		valor="0"+valor;
	this.camposHora[columna].val(valor);
	this.fechaActual=new Date((1900+this.fechaActual.getYear())	+"-"+(this.fechaActual.getMonth()+1)+"-"+
					this.fechaActual.getDate()+" "+
					this.camposHora[0].val()+":"+this.camposHora[1].val()+":"+
					this.camposHora[2].val());
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
}
//Ocurre cuando se da click en algunos de los días del mes.
SelectorFechas.prototype.seleccionarFecha=function(event){
	this.primeraApertura=false;
	var target=$(event.target);
	var mes=parseInt(target.attr("mes"));
	var dia=target.html();	
	target.css({"color":"blue","font-weight":"bold"});
	this.ultimaFechaClick.css({"color":"black","font-weight":"normal"});

	this.fechaActual=new Date((1900+this.fechaActual.getYear())	+"-"+(mes+1)+"-"+dia+" "+
					this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	this.cargarDiasCalendario();
	
	this.ultimaFechaClick=target;	
}

//Cambia la selección del año del intervalo.
SelectorFechas.prototype.seleccionarAnio=function(event){	
	var target=$(event.target);	
	var anio=parseInt(target.html());	
	for(var i=0;i<this.matrizIntervalos.length;i++){		
		if(this.matrizIntervalos[i].html()==anio)
			this.matrizIntervalos[i].css("color","blue");
		else
			this.matrizIntervalos[i].css("color","black");
	}	var diasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];
	var mes=this.fechaActual.getMonth();
	if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;	
	var dia=this.fechaActual.getDate();
	if(dia>diasMeses[mes])
		dia=diasMeses[mes];
	this.fechaActual=new Date(anio+"-"+(mes+1)+"-"+
					dia+" "+this.fechaActual.getHours()+":"+
					this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));

}

//Cambia la selección del mes del año.
SelectorFechas.prototype.cambiarMes2=function(event){
	var target=$(event.target);
	var mes=parseInt(target.attr("mes"));
	var anio=this.fechaActual.getYear();
	this.matrizMeses[this.fechaActual.getMonth()].css("color","black"); //regresarlo a negro para el cambio.
	this.matrizMeses[mes].css("color","blue");	
	var diasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];		
	if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;	
	var dia=this.fechaActual.getDate();
	if(dia>diasMeses[mes])
		dia=diasMeses[mes];
	this.fechaActual=new Date((1900+this.fechaActual.getYear())+"-"+(mes+1)+"-"+
					dia+" "+this.fechaActual.getHours()+":"+
					this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
}

//Cambia el mes que se está visualizando.
SelectorFechas.prototype.cambiarMes=function(event){		
	//Ya no debe pedir la fecha al servidor.
	this.primeraApertura=false;  	
	var anio=this.fechaActual.getYear();
	var diasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];	
	var mes=this.fechaActual.getMonth();	
	var dia=this.fechaActual.getDate();
	//Con dirección decide si debe ir al mes anterior o al mes siguiente.
	var direccion=event.data.direccion;					

	//En el año bisiesto, febrero tiene 29 días.
	if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;	

	var vistaActual=this.tablaMesesAnio.css("display");	
	if(vistaActual=="block"){ //Se están mostrando los meses del año, avanzar un año.
		anio+=direccion;
		//Si el al año cambia, checar si es bisiesto  para febrero.
		if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;		
		if(dia>diasMeses[mes])
			dia=diasMeses[mes];
	}
	//Se están mostrando los años.
	else if(this.tablaIntervaloAnios.css("display")=="block"){
		this.inicioIntervalo+=(direccion*10);
		//Mostrar los años de 12 en 12.
		this.cargarIntervalosAnios();
	}
	//Todo normal ir a cambiar el mes.
	else{				
		if(direccion==-1){  //Va hacia el pasado.		
			//Pasa al año anterior si estamos en enero.
			if(mes==0)
				anio--;
			//Cuando es enero brinca a diciembre del año anterior, si no solo resta un mes.
			mes=(mes>0)?mes-1:11;						
		}
		else{ //Va hacia el futuro.		
			//Cuando es diciembre, pasa al año que sigue.
			if(mes==11)
				anio++;
			//Cuando es diciembre brinca a enero del anño siguiente, si no solo suma un mes.
			mes=(mes+1)%12;			
		}
		//Si el día que tenía seleccionado del mes anterior es superior al límite de días
		//este nuevo mes, cambia el día seleccionado al último de este mes.
		if(dia>diasMeses[mes]){			
			dia=diasMeses[mes];
		}
	}
	//Regresar todos los días a negro para el siguiente mes.
	this.matrizMeses[mes+1].css("color","black"); 
	this.fechaActual=new Date((1900+anio)+"-"+(mes+1)+"-"+dia+" "+
					this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());
	this.cargarDiasCalendario();
}

//Mostrar años de 12 en 12.
SelectorFechas.prototype.cargarIntervalosAnios=function(){	
	var inicio=this.inicioIntervalo;
	//El año actual es 2016
	var anio=2016;
	//Si ya hay fecha seleccionada, actualizar el anio.
	if(this.fechaActual)
		anio=1900+this.fechaActual.getYear();
	//Si no hay inicio del intérvalo, establecerlo en la decena mas cercana del anio actual.
	if(this.inicioIntervalo==-1){
		this.inicioIntervalo=parseInt(anio/10)*10;
		inicio=this.inicioIntervalo;
	}	
	//Mostrar gráficamente los años. (tabla 4x3)
	this.campoMesAnio.html(inicio+"-"+(inicio+11));	
	this.tablaIntervaloAnios.html("");
	this.matrizIntervalos=[];
	var tr=$("<tr>");
	for(var i=0;i<12;i++){
		if(i>0 && i%4==0){	
			this.tablaIntervaloAnios.append(tr);
			tr=$("<tr>");
		}

		var td=$("<td style='color:black; font-weight:bold'>"+inicio+"</td>");
		if(inicio==anio)
			td=$("<td style='color:blue; font-weight:bold'>"+inicio+"</td>");
		tr.append(td);		
		this.matrizIntervalos.push(td);
		inicio++;
	}
	this.tablaIntervaloAnios.append(tr);		
	//Agrgrar eventos para cada anio.
	for(var i=0;i<this.matrizIntervalos.length;i++){
		this.matrizIntervalos[i].off("click");
		this.matrizIntervalos[i].on("click",$.proxy(this.seleccionarAnio,this));	
	}
}

//Carga gráficamente los días de un mes.
SelectorFechas.prototype.cargarDiasCalendario=function(){	
	var dias=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
	

	var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre",
				"Octubre","Noviembre","Diciembre"];

	var diasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];	

	//Año bisiesto para febrero.
	if(this.fechaActual.getYear()%4==0 && ( this.fechaActual.getYear()%100!=0 ||
				this.fechaActual.getYear()%400==0 ))
		diasMeses[1]=29;

	var mes=this.fechaActual.getMonth();	
	var vistaActual=this.tablaMesesAnio.css("display");
	//Si está visualizando los meses del anio.
	if(vistaActual=="none")		
		this.campoMesAnio.html(meses[mes]+"   "+(1900+this.fechaActual.getYear()));
	else
		this.campoMesAnio.html(1900+this.fechaActual.getYear());
	
	var primerFechaMes=new Date((1900+this.fechaActual.getYear())+"-"+(mes+1)+"-01 "+
					this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());

	
	var mesAnterior=(mes>0)?mes-1:11;	

	var primerDiaSemana=primerFechaMes.getDay();		
	var contadorDiasMes=diasMeses[mesAnterior];

	//Llenar los días restantes del mes anterior con gris para esta primer semana.
	for(var i=primerDiaSemana-1;i>=0;i--){
		this.matrizDias[0][i]=$("<td style='font-weight:normal; color:gray' mes='"+mesAnterior+"'>"+
					contadorDiasMes+"</td>");		
		contadorDiasMes--;
	}

	//Llenar los días restantes de la primer semana para este mes con negro.
	contadorDiasMes=1;
	for(var i=primerDiaSemana;i<7;i++){
		if(contadorDiasMes==this.fechaActual.getDate()){			
			this.matrizDias[0][i]=$("<td style='font-weight:bold; color:blue' mes='"+mes+"'>"+
					contadorDiasMes+"</td>");
			this.ultimaFechaClick=this.matrizDias[0][i];
		}
		else
			this.matrizDias[0][i]=$("<td style='font-weight:normal; color:black' mes='"+mes+"'>"+
					contadorDiasMes+"</td>");
		contadorDiasMes++;		
	}
	//Llenar la matriz de días hasta la ultima semana.
	for(var i=1;i<6;i++){
		var termino=false;
		for(var j=0;j<7;j++){			
			if(contadorDiasMes==this.fechaActual.getDate()){
				this.matrizDias[i][j]=$("<td style='font-weight:bold; color:blue' mes='"+mes+"'>"+
					contadorDiasMes+"</td>");
				this.ultimaFechaClick=this.matrizDias[i][j];
			}
			else
				this.matrizDias[i][j]=$("<td style='font-weight:normal; color:black' mes='"+mes+"'>"+
					contadorDiasMes+"</td>");
			//Terminar si ya se acabaron los días del mes.
			if(contadorDiasMes==diasMeses[mes]){
				termino=true;
				break;
			}
			contadorDiasMes++;
		}		
		if(termino)
			break;
	}
	//Se la última semana llenó las 7 columnas, al sumar i se evita que se llene otra fila.
	j++;
	if(j>=7){
		j=0;
		i++;
	}		
	contadorDiasMes=1;
	var mesSiguiente=(mes+1)%12;
	///Poner el resto de días de la semana en gris que son del siguiente mes.
	while(i<6){
		while(j<7){
			this.matrizDias[i][j]=$("<td style='font-weight:normal; color:gray' mes='"+mesSiguiente+"'>"+
					contadorDiasMes+"</td>");
			contadorDiasMes++;
			j++;
		}
		j=0;
		i++;
	}
	this.llenarDiasMes();	
	//A cada elemento de la matriz se le agrega un evento de click para saber cuando 
	//están seleccionando una fecha.
	for(var i=0;i<this.matrizDias.length;i++)
		for(var j=0;j<this.matrizDias[i].length;j++){			
			this.matrizDias[i][j].off("click");
			this.matrizDias[i][j].on("click",$.proxy(this.seleccionarFecha,this));
		}
	//Poner la fecha en el campo de texto.
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	var valor=this.fechaActual.getHours();
	if(valor<10)
		valor="0"+valor;
	this.camposHora[0].val(valor);
	valor=this.fechaActual.getMinutes();
	if(valor<10)
		valor="0"+valor;
	this.camposHora[1].val(valor);
	valor=this.fechaActual.getSeconds();
	if(valor<10)
		valor="0"+valor;
	this.camposHora[2].val(valor);

	this.matrizMeses[mes].css("color","blue");
}



//Pone gráficamente los días del mes, cada día (como un td) está en la matriz this.matrizDias.
SelectorFechas.prototype.llenarDiasMes=function(){
	var salida="";	
	var diaActual=0;
	this.tablaDiasFecha.html("");
	var tr=$("<tr>");
	var dias=new Array("Do","Lu","Ma","Mi","Ju","Vi","Sa");
	for(var i=0;i<dias.length;i++){
		tr.append($("<td>"+dias[i]+"</td>"));
	}
	this.tablaDiasFecha.append(tr);	
	for(var i=0;i<6;i++){
		tr=$("<tr>");
		for(var j=0;j<7;j++){
			tr.append(this.matrizDias[i][j]);			
			diaActual++;
		}
		this.tablaDiasFecha.append(tr);
	}	
}

//Carga gráficamente la tabla de las hora.
SelectorFechas.prototype.llenarTablaHoras=function(){
	this.tablaHorasFecha=$("<table class='tablaHorasFecha'>");	
	this.botonesArriba=new Array();
	var fila=$("<tr>");	
	//Poner los botones de flecha hacia arriba.
	for(var i=0;i<3;i++){
		var img=$("<img src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoArriba.png' style='width:40px; height:40px;' columna='"+i+"'>");		
		var td=$("<td style='text-align:center; padding:10px;'>");
		fila.append(td);
		td.append(img);
		if(i<2)
			fila.append($("<td style='text-align:center; padding:10px;'>"));
		this.botonesArriba.push(img);
	}	
	this.tablaHorasFecha.append(fila);	

	//Poner los campos para hora mes y año.
	fila2=$("<tr>");
	this.camposHora=new Array();
	for(var i=0;i<3;i++){
		var campo=$("<input type='text' value='10' columna='"+i+"' style='width:30px; height:20px;'>");
		var td=$("<td style='text-align:center; padding:10px;'>");
		fila2.append(td);
		td.append(campo);
		if(i<2)
			fila2.append($("<td style='text-align:center; padding:10px; vertical-align:top;'>:</td>"));
		this.camposHora.push(campo);
	}	
	this.tablaHorasFecha.append(fila2);

	this.botonesAbajo=new Array();
	var fila3=$("<tr>");	
	//Poner los botones de flecha hacia abajo.
	for(var i=0;i<3;i++){
		var img=$("<img src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoAbajo.png' style='width:40px; height:40px;' columna='"+i+"'>");		
		var td=$("<td style='text-align:center; padding:10px;'>");
		fila3.append(td);
		td.append(img);
		if(i<2)
			fila3.append($("<td style='text-align:center; padding:10px;'>"));
		this.botonesAbajo.push(img);
	}	
	this.tablaHorasFecha.append(fila3);	
}
