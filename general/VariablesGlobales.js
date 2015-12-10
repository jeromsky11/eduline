var usuarios;   //Es la referencia a la clase usuarios.
var inicio;
var cursos;

var urlServidor="http://deveduline.com"

var emergenteActiva=null;
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

