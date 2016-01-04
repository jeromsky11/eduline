<?php				
	$urlServidor="..";
	require_once("$urlServidor/servidor/Conexion.php");		

	//Revisar la sesión.
	function revisarSesion(){
		session_start();
		$idUsuario=$_SESSION['idUsuario'];		
		if(!$idUsuario)
			header("Location: ../index.php");		
		return $idUsuario;
	}		

	class FuncionesGlobales{
		var $conexion;
		var $enlace;
		var $consulta;						
		function FuncionesGlobales(){
			$this->conexion=new Conexion();
			$this->enlace=$this->conexion->conectar();
		}

		public function ejecutarAccion($accion,$variables=null){
			if($variables)
				$variables=$this->convertirArrayObject($variables);
			switch($accion[1]){
				case "obtenerFechaActual":
					$this->obtenerFechaActual($variables->zona);
				break;
			}
		}
		public function obtenerFechaActual($zona){			
			//date_default_timezone_set("America/Mexico_City");
			date_default_timezone_set($zona);
			echo date("Y-m-d H:i:s");
		}

		//Esto podría cambiar mas adelante.		

		protected  function abortarTransaccion(){
			$this->enlace->rollback();						
			  
		}

		public function hacerConsulta(){
			mysqli_query($this->enlace,$this->consulta);
			if(mysqli_error($this->enlace)){
				$this->abortarTransaccion();
				return null;
			}
			else
				return "exitosa";
		
		}

		public function obtenerConsulta($tipoRetorno="object"){
			mysqli_set_charset($this->enlace, "utf8");
			$resultados=mysqli_query($this->enlace,$this->consulta);
			if(mysqli_error($this->enlace)){
				$this->abortarTransaccion();			
				return null;
			}

			$fila=null;
			$datos=null;
			switch($tipoRetorno){
				case "object":
					$fila=mysqli_fetch_object($resultados);
				break;
				case "array":
					$fila=mysqli_fetch_array($resultados);						
				break;
				case "valor":					
					if($fila=mysqli_fetch_array($resultados))
						$fila=$fila[0];
					else
						$fila=-1;
				break;
				case "valoresObject":
					$datos=array();
					while($fila=mysqli_fetch_object($resultados))
						$datos[]=$fila;
				break;
				case "valoresArray":
					$datos=array();
					while($fila=mysqli_fetch_array($resultados))
						$datos[]=$fila;
				break;
			}			
			if($datos)
				return $datos;
			else if($fila)
				return $fila;
			else{
				$this->abortarTransaccion();
				return array();
			}
		}

		public function convertirArrayObject($array){
			$objeto=new stdClass();
			foreach($array as $key=>$value){
				$objeto->$key=$value;
			}	
			return $objeto;
		}


	}

?>