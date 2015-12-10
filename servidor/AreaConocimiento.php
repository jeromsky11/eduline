<?php 
	require_once("FuncionesGlobales.php");	
	class AreaConocimiento extends FuncionesGlobales{
		function AreaConocimiento(){
			$this->FuncionesGlobales();
		}
		public function ejecutarAccion($accion,$variables=null){				
			if($variables)
				$variables=$this->convertirArrayObject($variables);
			switch($accion[1]){
				case "guardar":
					$this->guardar($variables->idArea,$variables->nombre,$variables->descripcion);
				break;
				case "obtenerAreasConocimiento":
					$this->obtenerAreasConocimiento($variables->idArea,$variables->nombre,$variables->descripcion);
				break;
			}
		}
		private function obtenerAreasConocimiento($idArea,$nombre,$descripcion){
			$this->consulta="select id_area,nombre,descripcion from areas_conocimiento ";
			//Quiere filtrar por área.
			$resto="";
			if($idArea>0)
				$resto.=" id_area=$idArea";			
			if($nombre!="")
				$resto.= ($resto=="")?" nombre='$nombre' ":" and nombre='$nombre'";
			if($descripcion!="")
				$resto.= ($resto=="")?" descripcion='$descripcion' ":" and descripcion='$descripcion'";			
			if($resto)
				$this->consulta.=" where $resto";
			$datos=$this->obtenerConsulta("valoresObject");
			print(json_encode($datos));
		}
		private function guardar($idArea,$nombre,$descripcion){
			$this->enlace->autocommit(FALSE);
			//Verificar el nombre
			$this->consulta="select id_area from areas_conocimiento where nombre='$nombre' and 
							id_area<>$idArea";
			$areaRepetida=$this->obtenerConsulta("valor");
			//Hay una área repetida.
			if($areaRepetida>0){				
				print(json_encode(array("idArea"=>-1,
					"error"=>"El nombre del área de conocimiento ya existe")));
				return;
			}
			if($idArea==-1)
				$this->consulta="insert into areas_conocimiento set nombre='$nombre', 
							descripcion='$descripcion'";						
			else			
				$this->consulta="update areas_conocimiento set nombre='$nombre', 
							descripcion='$descripcion' where id_area='$idArea'";
			if(!$this->hacerConsulta()){
				print(json_encode(array("idArea"=>-2,
					"error"=>"Hubo un error al registrar el área de conocimiento")));	
				return;
			}
			if($idArea==-1)
				$idArea=mysqli_insert_id($this->enlace);
			print(json_encode(array("idArea"=>$idArea,
					"error"=>"Area de conocimiento guardada satisfactoriamente")));	
			$this->enlace->commit();
		}

	}
?>