<?php
	require_once("FuncionesGlobales.php");
	class Cursos extends FuncionesGlobales{
		function Cursos(){
			$this->FuncionesGlobales();
		}
		public function ejecutarAccion($accion,$variables=null){
			if($variables)
				$variables=$this->convertirArrayObject($variables);
			switch($accion[1]){
				case "guardar":
					$this->guardar($variables->idCurso,$variables->nombre,$variables->descripcion,
						$variables->fechaInicio,$variables->fechaCierre,$variables->idMateria);
				break;
				case "obtenerCursos":
					$this->obtenerCursos($variables->idCurso,$variables->nombre,$variables->propios,
						$variables->cursando,$variables->fechaInicio,$variables->fechaCierre,
						$variables->idMateria,$variables->estado);
				break;
				case "eliminar":
					$this->eliminar($variables->idCurso);
				break;
			}
		}		
		private function obtenerCursos($idCurso,$nombre,$propios,$cursando,$fechaInicio,$fechaCierre,$idMateria,$estado){
			$this->consulta="select c.id_curso,c.nombre,c.descripcion,c.fecha_inicio,c.fecha_cierre,c.id_materia,
								m.nombre as nombre_materia,c.imagen_portada from cursos as c join 
								materias as m on m.id_materia=c.id_materia";
			$idUsuario=$_SESSION['idUsuario'];			
			$resto="";
			if($idCurso>0)		
				$resto.=" id_curso=$idCurso";
			if($nombre!="")
				$resto.= ($resto=="")?" c.nombre='$nombre' ":" and c.nombre='$nombre'";
			if($propios=="true")
				$resto.= ($resto=="")?" c.id_curso in (select id_curso from administradores_curso where 
								id_usuario=$idUsuario) ":" and c.id_curso in (select id_curso from administradores_curso where 
								id_usuario=$idUsuario)";
			if($cursando=="true")
				$resto.= ($resto=="")?" c.id_curso in (select id_curso from alumnos_curso where 
								id_usuario=$idUsuario) ":" and c.id_curso in (select 
								id_curso from alumnos_curso where id_usuario=$idUsuario)";
			if($fechaInicio)
				$resto.= ($resto=="")?" c.fecha_inicio>='$fechaInicio' ":" and c.fecha_inicio>='$fechaInicio'";
			
			if($fechaCierre)	
				$resto.= ($resto=="")?" c.fecha_cierre<='$fechaCierre' ":" and c.fecha_cierre<='$fechaCierre'";

			if($idMateria)
				$resto.= ($resto=="")?" c.id_materia='$idMateria' ":" and c.id_materia='$idMateria'";
			
			if($estado)
				$resto.= ($resto=="")?" c.estado='$estado' ":" and c.estado='$estado'";
			
			$this->consulta.=" where $resto";			
			$datos=$this->obtenerConsulta("valoresObject");

			print(json_encode($datos));			

		}

		//Elimina el curso.
		private function eliminar($idCurso){
			$this->enlace->autocommit(FALSE);
			//Revisar que el curso esté en estado editando.
			$this->consulta="select estado from cursos where id_curso=$idCurso";
			$estadoCurso=$this->obtenerConsulta("valor");
			switch($estadoCurso){
				case "eliminado":
				case "editando":
					$this->consulta="update cursos set estado='eliminado' where id_curso='$idCurso'";
					if(!$this->hacerConsulta()){				
						print(json_encode(array("idCurso"=>-2,
							"error"=>"Hubo un error al eliminar el curso")));	
					}
					else{
						print(json_encode(array("idCurso"=>$idCurso,"error"=>"Curso eliminado satisfactoriamente")));
						$this->enlace->commit();									
					}
				break;
				case "publicado":
					print(json_encode(array("idCurso"=>-1,"error"=>"No pueden eliminar cursos ya publicados")));
					$this->abortarTransaccion();
				break;				
			}			
		}

		private function guardar($idCurso,$nombre,$descripcion,$fechaInicio,$fechaCierre,$idMateria){			
				
			$this->enlace->autocommit(FALSE);
			//Verificar el nombre en este materia.
			$this->consulta="selec id_curso from cursos where nombre='$nombre' and 
						id_materia=$idMateria and id_curso<>$idCurso";
			$cursoRepetido=$this->obtenerConsulta("valor");
			//Hay curso repetido en esta materia.
			if($cursoRepetido>0){
				$this->abortarTransaccion();
				print(json_encode(array("idCurso"=>-1,
					"error"=>"El nombre del curso ya existe para esta materia")));
				return;				
			}
			//Verificar que la materia exista.
			$this->consulta="select id_materia from materias where id_materia=$idMateria";
			$materiaExiste=$this->obtenerConsulta("valor");
			if($materiaExiste==0){
				$this->abortarTransaccion();
				print(json_encode(array("idCurso"=>-2,
					"error"=>"La materia no existe")));
				return;					
			}
			if($idCurso==-1)
				$this->consulta="insert into cursos set nombre='$nombre', descripcion='$descripcion',
						 fecha_inicio='$fechaInicio', fecha_cierre='$fechaCierre', id_materia=$idMateria,
						 		estado='editando'";
			else
				$this->consulta="update  cursos set nombre='$nombre', descripcion='$descripcion',
						 fecha_inicio='$fechaInicio', fecha_cierre='$fechaCierre', id_materia=$idMateria 
						 where id_curso=$idCurso";
			if(!$this->hacerConsulta()){				
				print(json_encode(array("idCurso"=>-3,
					"error"=>"Hubo un error al guardar el curso")));	
				return;
			}
			if($idCurso==-1)
				$idCurso=mysqli_insert_id($this->enlace);

			//Guardar a este usuario como el administrador del curso.			
			$idUsuario=$_SESSION['idUsuario'];			
			$this->consulta="insert into administradores_curso set id_usuario=$idUsuario, 
							id_curso=$idCurso";
			if(!$this->hacerConsulta()){
				print(json_encode(array("idCurso"=>-4,
					"error"=>"Hubo un error al registrar el administrador del curso")));	
				return;	
			}

			print(json_encode(array("idCurso"=>$idCurso,"error"=>"Curso guardado satisfactoriamente")));
			$this->enlace->commit();
		}
	}
?>