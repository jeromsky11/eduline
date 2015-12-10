<?php
	require_once("FuncionesGlobales.php");
	class Materias extends FuncionesGlobales{
		function Materias(){
			$this->FuncionesGlobales();
		}
		public function ejecutarAccion($accion,$variables=null){
			if($variables)
				$variables=$this->convertirArrayObject($variables);
			switch($accion[1]){
				case "guardar":
					$this->guardar($variables->idMateria,$variables->nombre,$variables->descripcion,
										$variables->creditos,$variables->matricula,$variables->idArea);
				break;
				case "obtenerMaterias":
					$this->obtenerMaterias($variables->idMateria,$variables->nombre,
							$variables->descripcion,$variables->creditos,$variables->matricula,
							$variables->idArea);
				break;
			}
		}

		//Obtiene materias unidas a las áreas de conocimiento.
		private function obtenerMaterias($idMateria,$nombre,$descripcion,$creditos,$matricula,
							$idArea){
			$this->consulta="select m.id_materia,m.nombre as nombre_materia,m.descripcion,m.creditos,m.matricula,
						m.id_area_conocimiento,ac.nombre  from materias as m join  
						areas_conocimiento as ac on m.id_area_conocimiento=ac.id_area_conocimiento";
			$resto="";
			if($idMateria>0)
				$resto.=" id_materia=$idMateria";
			if($nombre!="")
				$resto.= ($resto=="")?" m.nombre='$nombre' ":" and m.nombre='$nombre'";
			if($descripcion!="")
				$resto.= ($resto=="")?" m.descripcion='$descripcion' ":" and m.descripcion='$descripcion'";
			if($creditos!="")
				$resto.= ($resto=="")?" m.creditos='$creditos' ":" and m.creditos='$creditos'";
			if($matricula!="")
				$resto.= ($resto=="")?" m.matricula='$matricula' ":" and m.matricula='$matricula'";			

			//Desea hacer filtro por area.
			if($idArea>0){
				$resto.= ($resto=="")?" m.id_area_conocimiento='$idArea' ":" and m.id_area_conocimiento='$idArea'";
				$this->consulta.=" where $resto";
				$datos=$this->obtenerConsulta("valoresObject");				
			}
			else{							
				//Si no desea especificar área de conocimiento, se obtienen todas las materias agrupadas
				//por área.	
				$this->consulta="select id_area,nombre from areas_conocimiento ";
				$areas=$this->obtenerConsulta("valoresObject");
				$datos=array();
				foreach($areas as $area){					

					$this->consulta="select id_materia,nombre as nombre_materia,descripcion,creditos,
							matricula from materias where id_area_conocimiento=$area->id_area";
					$datos[]=array("idArea"=>$area->id_area,"nombre"=>$area->nombre,"materias"=>$this->obtenerConsulta("valoresObject"));
				}
			}								
			print(json_encode($datos));
		}
		private function guardar($idMateria,$nombre,$descripcion,$creditos,$matricula,$idArea){
			$this->enlace->autocommit(FALSE);
			//Verificar el nombre en esta área de conocimiento.
			$this->consulta="select id_materia from materias where nombre='$nombre' and 
							id_area_conocimiento='$idArea' and id_materia<>$idMateria";

			$materiaRepetida=$this->obtenerConsulta("valor");
			//Hay una materia repetida en esta área.
			if($materiaRepetida>0){
				$this->abortarTransaccion();
				print(json_encode(array("idMateria"=>-1,
					"error"=>"El nombre de la materia ya existe para esta área de conocimiento")));
				return;
			}
			//Verificar que el área de conocimiento exista.
			$this->consulta="select id_area from areas_conocimiento where 
							id_area=$idArea";
			$areaExiste=$this->obtenerConsulta("valor");
			if($areaExiste==0){
				$this->abortarTransaccion();
				print(json_encode(array("idMateria"=>-2,
					"error"=>"El área de conocimiento no existe $this->consulta")));
				return;	
			}

			if($idMateria==-1)
				$this->consulta="insert into materias set nombre='$nombre', descripcion='$descripcion',
							creditos='$creditos', matricula='$matricula', id_area_conocimiento=$idArea";
			else
				$this->consulta="update materias set nombre='$nombre', descripcion='$descripcion',
							creditos='$creditos', matricula='$matricula', id_area_conocimiento=$idArea 
							where id_materia=$idMateria";							
			if(!$this->hacerConsulta()){
				$this->abortarTransaccion();
				print(json_encode(array("idMateria"=>-2,
					"error"=>"Hubo un error al registrar la materia")));	
				return;
			}
			if($idMateria==-1)
				$idMateria=mysqli_insert_id($this->enlace);
			print(json_encode(array("idMateria"=>$idMateria,"error"=>"Materia guardada satisfactoriamente")));	
			$this->enlace->commit();
		}
	}
?>