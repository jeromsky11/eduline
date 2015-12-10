<?php
	$nombreArchivo=$_FILES['botonSubirImagen']['name'];

	$jsonImagen=$_POST['campoJsonImagen'];

	$jsonImagen=json_decode($jsonImagen);
	//Conseguir la extensión.
	$i=strlen($nombreArchivo)-1;
	$extension="";
	while($i>=0 && $nombreArchivo[$i]!='.'){
		$extension=$nombreArchivo[$i].$extension;	
		$i--;
	}

	$nuevoNombre=$jsonImagen->ruta.$jsonImagen->id.".$extension";
	if($nombreArchivo && move_uploaded_file($_FILES['botonSubirImagen']['tmp_name'],$nuevoNombre)){

		//Actualizar la base de datos con la url de la nueva imagen.
		$consulta="update $jsonImagen->tabla set $jsonImagen->campoSrc='$nuevoNombre' where 
						$jsonImagen->campoID=$jsonImagen->id";
		//Abrir una conexión y ejecutar la consulta.
		require_once("Conexion.php");
		$conexion=new Conexion();
		$enlace=$conexion->conectar();		
		mysqli_query($enlace,$consulta);
		if(mysqli_error($enlace))			
			print(json_encode(array("idCurso"=>-1,"error"=>"No se pudo guardar la imagen $consulta")));
		else			
			print(json_encode(array("idCurso"=>$jsonImagen->id,"error"=>"")));
	}
	else
		print(json_encode(array("idCurso"=>$jsonImagen->id,"error"=>"No se pudo guardar la imagen $nombreArchivo")));
?>