<?php	
	//$urlServidor="http://deveduline.com";	
	$urlServidor="..";
	require_once("$urlServidor/servidor/FuncionesGlobales.php");
	revisarSesion();		
?>
<!DOCTYPE html>
<html>
	<head>		
		<?php 				
			require_once("../general/CargadorEstilos.php");						
		?>
		<link rel="stylesheet" href="Inicio.css">
		<link rel="stylesheet" href="<?php $urlServidor?>/general/objetosGraficos/objetoPasos/Pasos.css">		

	</head>
	<body>
		<!--Incluir una ventana general. !-->
		<?php require_once("$urlServidor/general/objetosGraficos/objetoVentanas/Ventana.php"); ?>

		<div class="panelPrincipal">			
			<?php require_once("$urlServidor/cursos/Cursos.php");  //Este archivo hace el diseño de los cursos.?>
			<!--
			<div id="panelCentral">
				<div id="panelTemas">
				</div>
				<div id="panelMenuIzquierdo">
				</div>			
				<div id="panelSocial">
				</div>			
			</div>
			!-->
		</div>
	</body>		
	<?php
		require_once("$urlServidor/general/CargadorScripts.php");
	 ?>	
	<script src="<?php $urlServidor ?>/inicio/Inicio.js"> </script>	
	<script type="text/javascript" src="<?php $urlServidor ?>/general/objetosGraficos/objetoPasos/Pasos.js"> </script>
</html>
