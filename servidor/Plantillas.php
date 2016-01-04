<?php
	require_once("FuncionesGlobales.php");
	class Plantillas extends FuncionesGlobales{
		function Plantillas(){
			$this->FuncionesGlobales();
		}
		public function ejecutarAccion($accion,$variables=null){
			if($variables)
				$variables=$this->convertirArrayObject($variables);
			switch($accion[1]){
				case "guardar":
					$this->guardar($variables->idPlantilla,$variables->nombre,$variables->descripcion);
				break;
			}
		}		
		private function guardar($idPlantilla,$nombre,$descripcion){
			$this->enlace->autocommit(FALSE);			
			//Verificar el nombre para este usuario.			
			$this->consulta="select p.id_plantilla from plantillas as p join 	
					administradores_plantilla as ap on p.id_plantilla=ap.id_plantilla where
					ap.id_usuario=$this->idUsuario and p.nombre='$nombre' and 
					p.id_plantilla<>$idPlantilla";			
			$plantillaRepetida=$this->obtenerConsulta("valor");
			//Hay una plantilla repetida para este usuario.
			if($plantillaRepetida>0){
				$this->abortarTransaccion();
				print(json_encode(array("idPlantilla"=>-1,
					"error"=>"Ya tiene registrada esta plantilla")));
				return;				
			}
			//Registrar la nueva plantilla.
			$this->consulta="insert into plantillas set nombre='$nombre', descripcion='$descripcion'";	
			if($idPlantilla!=-1)
				$this->consulta="update plantillas set nombre='$nombre', descripcion='$descripcion' where 
								id_plantilla=$idPlantilla";

			if(!$this->hacerConsulta()){				
				print(json_encode(array("idPlantilla"=>-2,
					"error"=>"Hubo un error al guardar la plantilla")));
				return;
			}
			if($idPlantilla==-1)
				$idPlantilla=mysqli_insert_id($this->enlace);
			//Guardar a este usuario como el administrador de la plantilla.
			$idUsuario=$_SESSION['idUsuario'];	
			$this->consulta="insert into administradores_plantilla set id_usuario=$idUsuario, 
							id_plantilla=$idPlantilla";
			if(!$this->hacerConsulta()){
				print(json_encode(array("idCurso"=>-3,
					"error"=>"No se pudo registrar el administrador de la plantilla")));
				return;	
			}
			print(json_encode(array("idPlantilla"=>$idPlantilla,
					"error"=>"Plantilla registrada satisfactoriamente")));

			$this->enlace->commit();
		}

	}
?>