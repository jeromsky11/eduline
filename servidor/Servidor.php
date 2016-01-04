<?php	
	//$serverName="http://localhost/eduline";	
	$serverName="..";
	require_once("FuncionesGlobales.php");
	require_once("Usuarios.php");
	require_once("AreaConocimiento.php");
	require_once("Materias.php");
	require_once("Cursos.php");
	require_once("Plantillas.php");
	extract($_POST);		
	extract($_GET);
	
	$accion=explode(",", $accion);		

	$idUsuario=-1;
	if($accion[0]!="usuarios" || $accion[0]=="usuarios" && $accion[1]!="loguear")
		$idUsuario=revisarSesion();
	
	//Ver la primera clase a la cual ir.
	switch($accion[0]){
		case "funcionesGlobales":			
			$funcionesGlobales=new FuncionesGlobales();				
			$funcionesGlobales->ejecutarAccion($accion,$variables);
		break;
		case "usuarios":				
			$usuarios=new Usuarios();
			$usuarios->ejecutarAccion($accion,$variables);
		break;
		case "areaConocimiento":
			$areaConocimiento=new AreaConocimiento();
			$areaConocimiento->ejecutarAccion($accion,$variables);
		break;
		case "materias":
			$materias=new Materias();
			$materias->ejecutarAccion($accion,$variables);
		break;
		case "cursos":
			$cursos=new Cursos();
			$cursos->ejecutarAccion($accion,$variables);
		break;
		case "plantillas":
			$plantillas=new Plantillas();
			$plantillas->idUsuario=$idUsuario;
			$plantillas->ejecutarAccion($accion,$variables);
		break;
				
	}	
?>