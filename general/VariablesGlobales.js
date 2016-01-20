var usuarios;   //Es la referencia a la clase usuarios.
var inicio;
var cursos;

var urlServidor="http://deveduline.com"

var emergenteActiva=null;

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


//Agrega una fila y columnas por cada componente.
function obtenerFila(columnas,centradas){
	var tr=$("<tr>");	
	for(var i=0;i<columnas.length;i++){
		var td=$("<td style='padding:10px; font-weight:bold;'>");
		if(centradas)
			td.css("vertical-align","middle");
		td.append(columnas[i]);
		tr.append(td);
	}
	return tr;
}
function cadenaVacia(cadena){
	for(var i=0;i<cadena.length;i++){
		if(cadena[i]!=' ') return false;
	}
	return true;
}

