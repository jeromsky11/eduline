<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Login/Sign-In</title>      
    <link rel="stylesheet" href="normalize.css">
    <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
    <link rel="stylesheet" href="index.css">    
  </head>
  <body>
    <div class="logmod">
  		<div class="logmod__wrapper">
    		<span class="logmod__close">Close</span>
    		<div class="logmod__container">
      			<ul class="logmod__tabs">
	        		<li data-tabtar="lgm-2"><a href="#">Iniciar Sesión</a></li>
	        		<li data-tabtar="lgm-1"><a href="#">Registrarse</a></li>
      			</ul>
      		<div class="logmod__tab-wrapper">
      		<div class="logmod__tab lgm-1">
        		<div class="logmod__heading">
          			<span class="logmod__heading-subtitle">Introuce tus datos <strong>para crear tu cuenta.</strong></span>
        		</div>
        		<div class="logmod__form">
		          	<form accept-charset="utf-8" action="#" class="simform">
		            	<div class="sminputs">
		              		<div class="input full">
			                	<label class="string optional" for="user-name">Correo electrónico*</label>
			                	<input class="string optional" maxlength="255" id="user-email" placeholder="Correo electrónico" type="email" size="50" />
		              		</div>
		            	</div>
		            	<div class="sminputs">
		              		<div class="input string optional">
			                	<label class="string optional" for="user-pw">Contraseña *</label>
			                	<input class="string optional" maxlength="255" id="user-pw" placeholder="Contraseña" type="text" size="50" />
		              		</div>
			              	<div class="input string optional">
			                	<label class="string optional" for="user-pw-repeat">Repetir contraseña *</label>
			                	<input class="string optional" maxlength="255" id="user-pw-repeat" placeholder="Repetir contraseña" type="text" size="50" />
			              	</div>
		            	</div>
		            	<div class="simform__actions">
		              		<input class="sumbit" name="commit" type="sumbit" value="Crear cuenta" />
		              		<span class="simform__actions-sidetext">Para crear tu cuenta debes aceptar nuestros <a class="special" href="#" target="_blank" role="link">Terminos y condiciones</a></span>
		            	</div> 
		          	</form>
        		</div> 
        		<div class="logmod__alter">
          			<div class="logmod__alter-container">
            			<a href="#" class="connect facebook">
	              			<div class="connect__icon">
	                			<i class="fa fa-facebook"></i>
	              			</div>
	              			<div class="connect__context">
	                			<span>Crea tu cuenta con <strong>Facebook</strong></span>
	              			</div>
            			</a>              
            			<a href="#" class="connect googleplus">
	              			<div class="connect__icon">
	                			<i class="fa fa-google-plus"></i>
	              			</div>
	              			<div class="connect__context">
	                			<span>Crea tu cuenta con <strong>Google+</strong></span>
	              			</div>
            			</a>
          			</div>
        		</div>
      		</div>
      		<div class="logmod__tab lgm-2">
        		<div class="logmod__heading">
          			<span class="logmod__heading-subtitle">Introduce tu usuario o correo electrónico y tu contraseña <strong>para iniciar sesión</strong></span>
        		</div> 
        		<div class="logmod__form">
	          		<form accept-charset="utf-8" action="#" class="simform">
            			<div class="sminputs">
              				<div class="input full">
                				<label class="string optional" for="user-name">Usuario o correo electrónico*</label>
                				<input class="string optional" maxlength="255" id="campoUsuario" placeholder="Usuario o correo electrónico" type="email" size="50" />
              				</div>
            			</div>
            			<div class="sminputs">
              				<div class="input full">
                				<label class="string optional" for="user-pw">Contraseña *</label>
                				<input class="string optional" maxlength="255" id="campoPassword" placeholder="Contraseña" type="password" size="50" />
                				<span class="hide-password">Mostrar</span>
              				</div>
            			</div>
            			<div class="simform__actions">
              				<input class="sumbit"  id="botonIniciarSesion" type="button" value="Iniciar Sesión" />
              				<span class="simform__actions-sidetext"><a class="special" role="link" href="#">¿Olvidaste tu contraseña?<br>Click Aquí</a></span>
            			</div> 
          			</form>
        		</div> 
        		<div class="logmod__alter">
          			<div class="logmod__alter-container">
            			<a href="#" class="connect facebook">
              				<div class="connect__icon">
                				<i class="fa fa-facebook"></i>
              				</div>
              				<div class="connect__context">
                				<span>Entrar usando <strong>Facebook</strong></span>
              				</div>
            			</a>
            			<a href="#" class="connect googleplus">
              				<div class="connect__icon">
                				<i class="fa fa-google-plus"></i>
              				</div>
              				<div class="connect__context">
                				<span>Entrar usando <strong>Twitter</strong></span>
              				</div>
            			</a>
          			</div>
        		</div>
          	</div>
      	</div>
    </div>
</div>
</div>    
  </body>
</html>


<?php
    require_once("general/CargadorScripts.php");
?> 

<script src="usuarios/Usuarios.js"> </script>
<script src="index.js"> </script>

