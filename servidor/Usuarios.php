<?php 
require_once("FuncionesGlobales.php");	
class Usuarios extends FuncionesGlobales{	
	function Usuarios(){
		$this->FuncionesGlobales();
	}	
	public function ejecutarAccion($accion,$variables=null){				
		if($variables)
			$variables=$this->convertirArrayObject($variables);
		switch($accion[1]){
			case "loguear":
				$this->loguear($variables->usuario,$variables->password);
			break;
		}
	}
	private function loguear($usuario,$password){		
		$this->consulta="select id_usuario from usuarios where 
			(correo='$usuario'  or nombre_usuario='$usuario') and password='$password'";			
		$idUsuario=$this->obtenerConsulta("valor");		

		if($idUsuario==null)
			print(json_encode(array("idUsuario"=>-1,
				"error"=>"Consulta inválida $this->funcionesGlobales->consulta")));
		else if($idUsuario==-1)
			print(json_encode(array("idUsuario"=>-2,
				"error"=>"No existe el usuario")));
		else{  
			//Poner la variable de sesión.
			session_start();
			$_SESSION['idUsuario']=$idUsuario;
			print(json_encode(array("idUsuario"=>$idUsuario)));		
		}

	}
}

?>