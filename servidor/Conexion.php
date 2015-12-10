<?php
	class Conexion{
		var $servidor="deveduline.com";
		var $usuario="root";
		var $password="jero";
		var $bd="eduline";
		var $consulta;

		public function conectar(){
			$link=mysqli_connect($this->servidor,$this->usuario,$this->password) or die('No se pudo conectar: ' . mysql_error());
			mysqli_select_db($link,$this->bd) or die ("No se pude seleccionar la bd");			
			return $link;
		}
		
	}	
?>