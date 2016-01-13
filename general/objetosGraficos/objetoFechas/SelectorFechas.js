//Recibe un Date y lo convierte a una cadena para la base de datos.
function obtenerFechaCadena(fecha,lenguaje){	
	var mes=fecha.getMonth();		
	if(lenguaje=="español")
		mes++;	
	if(mes<10)
		mes="0"+mes;

	var dia=fecha.getDate();
	if(dia<10)
		dia="0"+dia;
	var horas=fecha.getHours();
	if(horas<10)
		horas="0"+horas;	
	var minutos=fecha.getMinutes();
	if(minutos<10)
		minutos="0"+minutos;
	var segundos=fecha.getSeconds();
	if(segundos<10)
		segundos="0"+segundos;
	if(lenguaje=="español")		
		return dia+"-"+mes+"-"+(fecha.getYear()+1900)+" "+horas+":"+
			minutos+":"+segundos;	
	else		
		return (fecha.getYear()+1900)+"-"+mes+"-"+dia+" "+horas+":"+
				minutos+":"+segundos;	
}





var SelectorFechas=function(){		
	this.primeraApertura=true;
	this.ultimaFechaClick=null;
	this.inicioIntervalo=-1;	

	this.ancho=200;
	this.alto=230;
	this.posZ=1; //Es para tenerlo siempre por delante de otros componentes.
	this.divSelectorFechas; //Es el que contiene todo el calendario.
	this.campoFechaTexto; //Es el campo donde aparecerá el valor actual seleccionado.

}

SelectorFechas.prototype=new Componente;

//Funciones heredadas.
SelectorFechas.prototype.crearEditable=function(){
	Componente.prototype.crearEditable.call(this);
	//Cargar el elemento principal.	
	this.divSelectorFechas=$("<div class='divSelectorFechas'>");	
	this.divContenedor.append(this.divSelectorFechas);
	this.divSelectorFechas.css({"z-index":this.posZ,"width":this.ancho});
	this.divBotones.css({"z-index":this.posZ+1});

	var divCampoFecha=$("<div class='divCampoFecha'>");
	this.divSelectorFechas.append(divCampoFecha);

	this.campoFechaTexto=$("<input type='text'  readonly >");

	divCampoFecha.append(this.campoFechaTexto);


}



//Devuelve el divSelectorFechas.
SelectorFechas.prototype.cargarObjetos=function(posZ,ancho){
	this.posZ=posZ;
	this.divSelectorFechas=$("<div class='divSelectorFechas'>");	
	this.divSelectorFechas.css({"z-index":posZ,"width":ancho});
	this.divCampoFecha=$("<div class='divCampoFecha'>");
	this.divSelectorFechas.append(this.divCampoFecha);
	this.campoFechaTexto=$("<input type='text'  readonly >");
	this.divCampoFecha.append(this.campoFechaTexto);
	this.botonCalendario=$("<img src='"+urlServidor+"/general/objetosGraficos/objetoFechas/iconoCalendario.png' ></img>");
	this.divCampoFecha.append(this.botonCalendario);


	this.divDesplegable=$("<div class='divDesplegable'>");
	this.divSelectorFechas.append(this.divDesplegable);


	this.divTablaFecha=$("<div class='divTablaFecha'>");	
	this.divDesplegable.append(this.divTablaFecha);
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

	return this.divSelectorFechas;
}





SelectorFechas.prototype.limpiar=function(){
	this.campoFechaTexto.val("");
	this.fechaActual=null;
	this.primeraApertura=true;	
	this.ocultarGeneral();
}
SelectorFechas.prototype.establecerFecha=function(valor){	
	this.primeraApertura=false;
	//La fecha llega en inglés.
	var mes=parseInt(""+valor[5]+valor[6]);
	valor=valor.substr(0,5)+(mes+1)+valor.substr(7,valor.length);	
	this.fechaActual=new Date(valor);
	this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	this.cargarDiasCalendario();
}
SelectorFechas.prototype.cargarEventos=function(){
	return;
	this.botonCalendario.on("click",$.proxy(this.mostrar,this));
	this.botonTiempoFecha.on("click",$.proxy(this.cambiarVista,this));	
	this.botonFlechaIzquierda.on("click",{direccion:-1},$.proxy(this.cambiarMes,this));
	this.botonFlechaDerecha.on("click",{direccion:1},$.proxy(this.cambiarMes,this));	
	for(var i=0;i<this.botonesArriba.length;i++){
		this.botonesArriba[i].on("click",{direccion:1},$.proxy(this.seleccionarHora,this));
		this.botonesAbajo[i].on("click",{direccion:-1},$.proxy(this.seleccionarHora,this));
		this.camposHora[i].keyup($.proxy(this.seleccionarHoraEdicion,this));
		this.camposHora[i].focusout(this.seleccionarHoraEdicion2);
	}
	this.divSelectorFechas.on("click",function(event){event.stopPropagation()});
	this.campoMesAnio.on("click",$.proxy(this.cambiarVistaCalendario,this));
	for(var i=0;i<this.matrizMeses.length;i++)
		this.matrizMeses[i].on("click",$.proxy(this.cambiarMes2,this));		
}

SelectorFechas.prototype.cambiarVistaCalendario=function(event){	
	var vistaActual=this.tablaDiasFecha.css("display");	
	if(vistaActual=="table" || vistaActual=="block"){ //Cambiar a ver los meses.
		this.tablaDiasFecha.css("display","none");
		this.tablaMesesAnio.css("display","block");
		this.campoMesAnio.html(1900+this.fechaActual.getYear());
	}
	else{
		vistaActual=this.tablaMesesAnio.css("display");		
		if(vistaActual=="block"){
			this.tablaMesesAnio.css("display","none");
			this.cargarIntervalosAnios();			
			this.tablaIntervaloAnios.css("display","block");			
		}
		else{
			this.cargarDiasCalendario(); //Por si hubo algún cambio en el día.
			this.tablaIntervaloAnios.css("display","none");			
			this.tablaDiasFecha.css("display","block");
		}
	}
}

SelectorFechas.prototype.seleccionarHoraEdicion2=function(event){
	if(cadenaVacia(this.value)){
		this.value="00";		
		this.fechaActual=new Date((1900+this.fechaActual.getYear())	+"-"+(this.fechaActual.getMonth()+1)+"-"+
			this.fechaActual.getDate()+" "+
			this.camposHora[0].val()+":"+this.camposHora[1].val()+":"+
			this.camposHora[2].val());
		this.campoFechaTexto.val(obtenerFechaCadena(this.fechaActual,"español"));
	}	
}
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
SelectorFechas.prototype.cambiarMes2=function(event){
	var target=$(event.target);
	var mes=parseInt(target.attr("mes"));
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

SelectorFechas.prototype.cambiarMes=function(event){		
	this.primeraApertura=false;  //Ya no debe actualizar con el día.	
	var anio=this.fechaActual.getYear();
	var diasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];	
	var mes=this.fechaActual.getMonth();	
	var dia=this.fechaActual.getDate();
	var direccion=event.data.direccion;					

	if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;	
	var vistaActual=this.tablaMesesAnio.css("display");	
	if(vistaActual=="block"){ //Está mirando los meses
		anio+=direccion;
		//El año cambia, checar si es bisiesto bisiesto para febrero.						
		if(anio%4==0 && ( anio%100!=0 || anio%400==0 )) 
			diasMeses[1]=29;		
		if(dia>diasMeses[mes])
			dia=diasMeses[mes];
	}
	//Está mirando los anios.
	else if(this.tablaIntervaloAnios.css("display")=="block"){
		this.inicioIntervalo+=(direccion*10);
		this.cargarIntervalosAnios();
	}
	else{				
		if(direccion==-1){  //Va hacia el pasado.		
			if(mes==0)
				anio--;
			mes=(mes>0)?mes-1:11;						
		}
		else{ //Va hacia el futuro.		
			if(mes==11)
				anio++;
			mes=(mes+1)%12;			
		}
		if(dia>diasMeses[mes])
			dia=diasMeses[mes];
	}
	this.matrizMeses[mes+1].css("color","black"); //regresarlo a negro para el cambio.
	this.fechaActual=new Date((1900+anio)+"-"+(mes+1)+"-"+dia+" "+
					this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());
	this.cargarDiasCalendario();
}

SelectorFechas.prototype.cargarIntervalosAnios=function(){	
	var inicio=this.inicioIntervalo;
	var anio=2015;
	if(this.fechaActual)
		anio=1900+this.fechaActual.getYear();
	if(this.inicioIntervalo==-1){		
		this.inicioIntervalo=parseInt(anio/10)*10;				
		inicio=this.inicioIntervalo;
	}	

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
	for(var i=0;i<this.matrizIntervalos.length;i++){
		this.matrizIntervalos[i].off("click");
		this.matrizIntervalos[i].on("click",$.proxy(this.seleccionarAnio,this));	
	}
}

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
	if(vistaActual=="none")
		this.campoMesAnio.html(meses[mes]+"   "+(1900+this.fechaActual.getYear()));
	else
		this.campoMesAnio.html(1900+this.fechaActual.getYear());
	
	var primerFechaMes=new Date((1900+this.fechaActual.getYear())+"-"+(mes+1)+"-01 "+
					this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds());

	//Llenar la primer fila.
	var mesAnterior=(mes>0)?mes-1:11;	

	var primerDiaSemana=primerFechaMes.getDay();		
	var contadorDiasMes=diasMeses[mesAnterior];

	for(var i=primerDiaSemana-1;i>=0;i--){
		this.matrizDias[0][i]=$("<td style='font-weight:normal; color:gray' mes='"+mesAnterior+"'>"+
					contadorDiasMes+"</td>");		
		contadorDiasMes--;
	}
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
			if(contadorDiasMes==diasMeses[mes]){
				termino=true;
				break;
			}
			contadorDiasMes++;
		}		
		if(termino)
			break;
	}
	j++;
	if(j>=7){
		j=0;
		i++;
	}		
	contadorDiasMes=1;
	var mesSiguiente=(mes+1)%12;
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
	for(var i=0;i<this.matrizDias.length;i++)
		for(var j=0;j<this.matrizDias[i].length;j++){			
			this.matrizDias[i][j].off("click");
			this.matrizDias[i][j].on("click",$.proxy(this.seleccionarFecha,this));
		}

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
SelectorFechas.prototype.mostrar=function(event){			
	if(emergenteActiva!=null && emergenteActiva!=this)
		emergenteActiva.ocultarGeneral();
		
	var actual=this.divDesplegable.css("display");	
	if(actual=="none"){				
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
					this.fechaActual=new Date(data);
					this.cargarDiasCalendario();
					this.divSelectorFechas.css("z-index",this.posZ+1);
					emergenteActiva=this;
					this.divDesplegable.css("display","block");
				},this)
			});
		}
		else{			
			this.divSelectorFechas.css("z-index",this.posZ+1);			
			this.divDesplegable.css("display","block");
			emergenteActiva=this;
		}
		if(event!=null)
			$("html").on("click",$.proxy(this.ocultar,this));		
	}	
	else{		
		this.divSelectorFechas.css("z-index",this.posZ);
		emergenteActiva=null;
		this.divDesplegable.css("display","none");	
	}	

}
SelectorFechas.prototype.ocultar=function(event){		
	var actual=this.divDesplegable.css("display");		
	if(actual=="block")
		this.ocultarGeneral();	
}
SelectorFechas.prototype.ocultarGeneral=function(){
	this.divSelectorFechas.css("z-index",this.posZ);
	this.divDesplegable.css("display","none");		
}
SelectorFechas.prototype.cambiarVista=function(event){		
	var actual=this.tablaHorasFecha.css("display");
	if(actual=="block"){
		this.tablaHorasFecha.css("display","none");
		this.divTablaFecha.css("display","block");
		this.botonTiempoFecha.attr("src",urlServidor+"/general/objetosGraficos/objetoFechas/relojIcono.png");
	}
	else{
		this.tablaHorasFecha.css("display","block");
		this.divTablaFecha.css("display","none");
		this.botonTiempoFecha.attr("src",urlServidor+"/general/objetosGraficos/objetoFechas/iconoCalendario2.png");
	}
}



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
SelectorFechas.prototype.llenarTablaHoras=function(){
	this.tablaHorasFecha=$("<table class='tablaHorasFecha'>");	
	this.botonesArriba=new Array();
	var fila=$("<tr>");	

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
