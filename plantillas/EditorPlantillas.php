<?php
	require_once("../servidor/FuncionesGlobales.php");
	revisarSesion();	
?>
<!DOCTYPE html>
<html>
	<head>
		<?php 
			require_once("../general/CargadorEstilos.php");
		?>
		<link rel="stylesheet" href="../general/objetosGraficos/objetoAcordion/Acordion.css">
		<link rel="stylesheet" href="../general/objetosGraficos/Componente.css">
		<link rel="stylesheet" href="../general/objetosGraficos/objetoSubirImagenes/SubirImagen.css">
		<link rel="stylesheet" href="../general/objetosGraficos/objetoMenus/BarraMenu.css">
		<link rel="stylesheet" href="../general/objetosGraficos/objetoTabulador/Tabulador.css">
		<link rel="stylesheet" href="EditorPlantilla.css">
		<link rel="stylesheet" href="../general/objetosGraficos/objetoFechas/SelectorFechas.css">

	</head>
	<body>
		<!--Incluir una ventana general. !-->
		<?php require_once("../general/objetosGraficos/objetoVentanas/Ventana.php"); ?>
		
		<div class="panelPrincipal">

			<div style="position:absolute; top:37px; width:100%; height:92%" 
				id='divContenido'>				
			</div>
		</div>
	</body>	
	<?php
		require_once("../general/CargadorScripts.php");
	 ?>	
	 <script src="EditorPlantillas.js"> </script>	
	 <script src="EditorPlantilla.js"> </script>	
	 <script src="../general/objetosGraficos/Componente.js"> </script>
	 <script src="../general/objetosGraficos/objetoAcordion/Acordion.js"> </script>
	 <script src="../general/objetosGraficos/etiqueta/Etiqueta.js"> </script>	 
	 <script src="../general/objetosGraficos/boton/Boton.js"> </script>	 
	 <script src="../general/objetosGraficos/campoSeleccion/CampoSeleccion.js"> </script>	
	 <script src="../general/objetosGraficos/objetoSubirImagenes/SubirImagen.js"> </script>
	 <script src="../general/objetosGraficos/objetoSubirImagenes/BotonSubirImagen.js"> 	 
	 </script>
	 <script src="../general/objetosGraficos/objetoFechas/SelectorFechas.js"></script>
	 <script src="../general/objetosGraficos/objetoMenus/BarraMenu.js"> </script>	 
	 	 <script src="../general/objetosGraficos/objetoTabulador/Tabulador.js"> </script>	 
</html>
