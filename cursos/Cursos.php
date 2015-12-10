<?php $urlServidor=".."; ?>
<link rel="stylesheet" href="<?php $urlServidor ?>/general/objetosGraficos/objetoAcordion/Acordion.css">
<link rel="stylesheet" href="<?php $urlServidor ?>/general/objetosGraficos/objetoFechas/SelectorFechas.css">
<link rel="stylesheet" href="<?php $urlServidor ?>/general/objetosGraficos/objetoSubirImagenes/SubirImagen.css">
<link rel="stylesheet" href="<?php $urlServidor ?>/cursos/NuevoCurso.css">
<link rel="stylesheet" href="<?php $urlServidor ?>/cursos/Cursos.css">
<link rel="stylesheet" href="<?php $urlServidor ?>/general/objetosGraficos/objetoCoverflow/Coverflow.css">
<div id="panelCursos">	
	<div id="panelCentroCursos">		
		<div class="tabbable">
			<ul class="nav nav-tabs" id="listaFichasCursos">
			    <li class="active"><a href="#tab1" data-toggle="tab" 
			    				id="fichaMisCursos">Mis cursos</a></li>
			    <li><a href="#tab2" data-toggle="tab">Cursando</a></li>
			    <li><a href="#tab3" data-toggle="tab" >Nuevo</a></li>
			</ul>	
			<div class="tab-content" id="panelFichasCursos">
				<div class="tab-pane active" id="tab1">
					<div id="divMisCursos">						
						<div class="divCoverflow">
			      		</div>
			      		<div id="divNotificacionesMisCursos">
			      		</div>			      		
			      	</div>

		    	</div>
		    	<div class="tab-pane" id="tab2">
		      		<p data-toggle="tooltip" title="viendo">Viendo lo que estoy cursando.</p>
		    	</div>
		    	<!--Este es para agregar cursos !-->
		    	<div class="tab-pane" id="tab3">
		    	</div>	 
			</div>
		</div>
	</div>
	<div id="botonDesplegarPanelCursos">
		cursos
	</div>
</div>
<script type="text/javascript" src="<?php $urlServidor ?>/cursos/NuevoCurso.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/cursos/ModificarCurso.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/areasConocimiento/AreaConocimiento.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/materias/Materias.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/general/objetosGraficos/objetoSubirImagenes/BotonSubirImagen.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/general/objetosGraficos/objetoCoverflow/Coverflow.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/general/objetosGraficos/objetoFechas/SelectorFechas.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/general/objetosGraficos/objetoAcordion/Acordion.js"> </script>
<script type="text/javascript" src="<?php $urlServidor ?>/cursos/Cursos.js"> </script>
