var Usuarios=function(){
	this.cargarObjetos();
	this.cargarEventos();
}

Usuarios.prototype.cargarEventos=function(){
	this.botonIniciarSesion.on("click",$.proxy(this.loguear,this));
}
Usuarios.prototype.cargarObjetos=function(){
	this.campoUsuario=$("#campoUsuario");
	this.campoPassword=$("#campoPassword");
	this.botonIniciarSesion=$("#botonIniciarSesion");
}
Usuarios.prototype.loguear=function(event){	
	var password=this.campoPassword.val();
	var usuario=this.campoUsuario.val();

	$.ajax({
		datatype:"json",
		url:urlServidor+"/servidor/Servidor.php",
		data:{
			"accion":"usuarios,loguear",
			"variables":{"usuario":usuario,"password":password}
		},
		success:$.proxy(this.terminoLoguear,this)
	});
}

Usuarios.prototype.terminoLoguear=function(data){		
	data=JSON.parse(data);

	//Ir a la página de inicio.
	if(data.idUsuario>0) //Validar el logueo.		
		window.location.href=urlServidor+"/inicio/Inicio.php";	
	else{ //Procesar la respuesta.
		console.log("Regresa "+data.idUsuario);
	}

}
