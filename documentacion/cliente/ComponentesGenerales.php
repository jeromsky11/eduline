<html>
	<style>
		li{
			font-size: 18px;
		}
		p{
			line-height: 20px;
			font-size: 20px;
		}
		table{
			border: solid 2px #aaaaaa;
		}
		td{
			padding:10px;
		}
		.tituloTabla td{
			background-color:#aaaaff;
		}	
		tr td{
			border: solid 1px #bbbbbb;
		}			
	</style>
	<meta charset="UTF-8">
	<body>

		<h1><a name="componentes_generales">Los componentes generales</a></h1>
		<p>
			Dentro de la carpeta general podemos encontrar todos los archivos y carpetas que se encargan del manejo de los componentes generales. Los componentes generales, son objetos html que serán usados tanto para el diseño de plantillas como para el diseño de la interfaz gráfica.<br>
			A continuación se muestra un listado de los archivos relacionados a los componentes generales y enseguida un explicación detallada de cada uno.		
		<ul>
			<li><a href="#CargadorEstilos_php">CargadorEstilos.php</a></li>
			<li><a href="#CargadorScripts_php">CargadorScripts.php</a></li>
			<li><a href="#General_css">General.css</a></li>
			<li><a href="#VariablesGlobales_js">VariablesGlobales.js</a></li>
			<li><a href="#Componente_css">Componente.css</a></li>
			<li><a href="#Componente_js">Componente.js</a></li>
			<li><a href="#etiqueta-Etiqueta_js">etiqueta/Etiqueta.js</a></li>
			<li><a href="#boton-Boton_js">boton/Boton.js</a></li>
			<li><a href="#campoSeleccion-CampoSeleccion_js">campoSeleccion/CampoSeleccion.js</a></li>
			<li>
				<a href="#objetoSubirImagenes-BotonSubirImagen_js">
					objetoSubirImagenes/BotonSubirImagen.js
				</a>
			</li>
			<li>
				<a href="#objetoSubirImagenes-SubirImagen_js">objetoSubirImagenes/SubirImagen.js</a>
			</li>
			<li>
				<a href="#objetoSubirImagenes-SubirImagen_css">objetoSubirImagenes/SubirImagen.css</a>
			</li>
			<li>
				<a href="#objetoFechas-SelectorFechas_js">objetoFechas/SelectorFechas.js</a>
			</li>
		</ul>
		A continuación se muestran a detalle los archivos relacionados a los componentes generales:<p>
		<h2><font color='magenta'><a name='CargadorEstilos_php'>CargadorEstilos.php</a></font></h2>
		<p>
			El cargador de estilos contiene el llamado a las librerías css que serán usadas en cualquier archivo php principal, por ejemplo, importar la librería css de bootstrap o los estilos generales del sitio (general/General.css).
		</p>
		<h2><font color='magenta'><a name='CargadorScripts_php'>CargadorScripts.php</a></font></h2>
		<p>
			El cargador de scripts contiene el llamado a las librerías js que serán usadas en cualquier archivo php principal, por ejemplo, importar la librería js de bootstrap, el framework de jquery o las variables globales (general/VariablesGlobales.js).
		</p>			
		<h2><font color='magenta'><a name='General_css'>General.css</a></font></h2>
		<p>
			Contiene todos los estilos generales de la plataforma, es decir, aquellos estilos estándar que serán usados de la misma forma  en cualquier archivo php o js.
		</p>
		<h2><font color='magenta'><a name='VariablesGlobales_js'>VariablesGlobales.js</a></font></h2>
		<p>
			Contiene todas las variables que deberán usarse con la misma instanciación o con el mismo valor dentro de cualquier otro archivo js. Principalmente contiene las variables que instancian una clase una sola vez y para siempre (algo parecido a las variables estáticas de java).
		</p>
		<h3><font color='#0d4036'>Los atributos</font> </h3>
		<table>
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>usuarios</td><td>Usuario</td>
				<td>El objeto que maneja todas las acciones referentes a usuarios, como lo es el diseño de la interfaz gráfica del login, el procesamiento de los eventos de un usuario y las peticiones a los servicios de la clase <a href="http://deveduline.com/documentacion/servidor/Servidor.html#usuarios_php">Usuarios.php</a></td>					
			</tr>
			<tr>
				<td>inicio</td><td>Inicio</td>
				<td>El objeto que maneja todas las acciones referentes a la página principal de la plataforma.  (Queda pendiente)</td>					
			</tr>
			<tr>
				<td>cursos</td><td>Cursos</td>
				<td>El objeto que maneja todas las acciones referentes a cursos, como lo es el diseño de la interfaz gráfica, el procesamiento de los eventos de un usuario y las peticiones a los servicios de la clase  <a href="http://deveduline.com/documentacion/servidor/Servidor.html#cursos_php">Cursos.php</a></td>					
			</tr>
			<tr>
				<td>urlServidor</td><td>String</td>
				<td>Es un string que contiene la url del host donde el servidor está ubicado. Sirve para usarlo como paŕametro en todas las llamadas a servidor usando ajax.</td>
			</tr>
		</table>
		<h3><font color='blue'>Función obtenerFila(columnas,centradas)</font></h3>
		<p>
			La usan los formularios que están acomodando sus componentes en una tabla añaden muchos nodos de tipo tr usando jquery.
		</p>			
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>columnas: </font>Un array con el contenido para cada columna de la fila</li>
				<li><font style='font-weight:bold'>centradas: </font>Un booleano que indica si el contenido de cada columna debe estar centrado</li>
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un tr de html formado con jquery
		</p>		
		<h3><font color='blue'>Función cadenaVacia(cadena)</font></h3>			
		<p>
			La usan todas las clases que requieren validar si un String no tiene absolutamente ningún caracter, esto da más garantía de que una cadena es vacía, en vez de hacer una comparación como ==""
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>cadena: </font>Un String con la cadena a evaluar</li>					
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un booleano, un valor true indica que la cadena está vacía y con un false lo contrario.
		</p>		
		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>
		<h2><font color='magenta'><a name='Componente_css'>Componente.css</a></font></h2>
		<p>
			Contiene todos los estilos generales para los componentes. Aquellos estilos que ya sea un botón, un bloque de texto o una lista podrán usar, los estilos que incluye son:
			<ul>
				<li>.divVentanaEdicion</li>
				<li>.divTituloEdicion</li>
				<li>.divTituloTextoEdicion</li>
				<li>.botonCerrarEdicion</li>
			</ul>
		</p>
		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>
		
		<h2><font color='magenta'><a name='Componente_js'>Componente.js</a></font></h2>
		<p>
			Es la clase padre de todos los objetos gráficos a utilizarse en Eduline. Se encarga de manejar los diseños y eventos que serán estándar en todos los elementos gráficos.
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>posX</td><td>int</td>
				<td>Es la distancia horizontal en pixeles del lado izquierdo  del contenedor.</td>
			</tr>
			<tr>
				<td>posY</td><td>int</td>
				<td>Es la distancia vertical en pixeles del lado derecho del contenedor.</td>
			</tr>
			<tr>
				<td>ancho</td><td>int</td>
				<td>Es el tamaño en pixeles a lo ancho </td>
			</tr>
			<tr>
				<td>alto</td><td>int</td>
				<td>Es el tamaño en pixeles a lo alto.</td>
			</tr>
			<tr>
				<td>botonSoloLectura</td><td>img</td>
				<td>El botón que decide si un componente puede editarse o no.</td>
			</tr>
			<tr>
				<td>botonMultilinea</td><td>img</td>
				<td>El botón decide si un componente es de múltiple líneas.</td>
			</tr>
			<tr>
				<td>atributos</td><td>JSON</td>
				<td>El json que guarda todas las propiedades de este componente</td>
			</tr>
			<tr>
				<td>campoNombre</td><td>input</td>
				<td>Durante la edición cuando el usuario escribe el nombre del componente.</td>
			</tr>
			<tr>
				<td>tipo</td><td>String</td>
				<td>Este lo establecen las subclases para saber el tipo del componente.</td>
			</tr>
			<tr>
				<td>tipoTextual</td><td>String</td>
				<td>Es equivalente al tipo solo que un texto que debe ser mostrado cuando se desea eliminar el componente</td>
			</tr>
			<tr>
				<td>botonEditar</td><td>img</td>
				<td>Para abrir la ventana de edición de las propiedades del componente.</td>
			</tr>
			<tr>
				<td>alineadoTexto</td><td>String</td>
				<td>Guarda la actual selección del alineado del texto.</td>
			</tr>
			<tr>
				<td>bordeInicialCampos</td><td>String</td>
				<td>Se usa para recuperar el borde inicial de un campo cuando este pasó de ser inválido (con borde rojo)a válido.</td>
			</tr>
			<tr>
				<td>objetoPadre</td><td>Object</td>
				<td>Es una referencia a la instancia de la clase que creó este componente y se usa para llamar a funciones de clase padre o enviarlo como parámetro en funciones usadas como un objeto y así las clases padres recuperen las referencias a ellos mismos.</td>
			</tr>
			<tr>
				<td>idComponente</td><td>int</td>
				<td>Los componentes llevan un id que lo identifican como únicos en una lista, con idComponente este componente puede solicitarse a su padre que trabaje sobre ellos mismo buscando en base al id.</td>
			</tr>
			<tr>
				<td>nombre</td><td>String</td>
				<td>
					Es el nombre que un usuario de la a un componente y así referenciarlo durante el diseño
				</td>
			</tr>
			<tr>
				<td>existeDiseno</td><td>Boolean</td>
				<td>
					Las subclases establecen esta variable en false si requieren ocultar la ficha de diseño
				</td>
			</tr>
			<tr>
				<td>funcionCambioAtributos</td><td>Function</td>
				<td>Es llamada cuando algunos atributos en la edición cambian.</td>
			</tr>
			<tr>
				<td>funcionValidarComponente</td><td>Function</td>
				<td>
					Valida que un nombre que se le da a este componente no se repita con algún otro de un grupo.
				</td>
			</tr>
			<tr>
				<td>divContenedor</td><td>div</td>
				<td>Es el div que contiene todo el diseño gráfico de este componente.</td>
			</tr>
			<tr>
				<td>divBotones</td><td>div</td>
				<td>Un div que contiene un grupo de botones con acciones arealidar sobre el componente.</td>
			</tr>
			<tr>
				<td>botonClonar</td><td>img</td>
				<td>Botón que sirve para crear un componente igualito a esto.</td>
			</tr>
			<tr>
				<td>botonBorrar</td><td>img</td>
				<td>Botón que sirve para borrar este componente de un panel.</td>
			</tr>
			<tr>
				<td>fondoVentanaEdicion</td><td>div</td>
				<td>
					Es el div que permite que la ventana de edición aparezca como modal ya que abarca toda 	   la pantalla y tiene un fondo negro transparente.
				</td>
			</tr>						
			<tr>
				<td>botonCerrarEdicion</td><td>div</td>
				<td>El botón para cerrar la ventana de edición.</td>
			</tr>
			<tr>
				<td>tabulador</td><td>Tabulador</td>
				<td>Un componente gráfico que maneja las fichas de la ventana de edición.</td>
			</tr>
			<tr>
				<td>botonAceptarEdicion</td><td>div</td>
				<td>El botón para guardar los cambios de la ventana de edición.</td>
			</tr>
			<tr>
				<td>botonCancelarEdicion</td><td>div</td>
				<td>El botón para cancelar los cambios de la ventana de edición.</td>
			</tr>
			<tr>
				<td>divFichaGeneral</td><td>div</td>
				<td>Es el div que contiene la ficha general del panel de edicion.</td>
			</tr>
			<tr>
				<td>tituloAnimaciones</td><td>p</td>
				<td>
					Es un párrafo que tiene el título "animaciones" debe ser atributo porque despues se le cambia su ubicación en la ficha general.
				</td>
			</tr>
			<tr>
				<td>campoDuracionAnimacionEntrada</td><td>input</td>
				<td>
					Un input donde se establece en milisegundos el tiempo que tardará el componente al entrar.
				</td>
			</tr>
			<tr>
				<td>campoAnimacionSalida</td><td>select</td>
				<td>Un comboBox en donde se establece el tipo de animación de salida.</td>
			</tr>
			<tr>
				<td>campoDuracionAnimacionSalida</td><td>input</td>
				<td>
					Un input donde se establece en milisegundos el tiempo que tardará el componente al salir.
				</td>
			</tr>
			<tr>
				<td>campoPosicionIzquierda</td><td>input</td>
				<td>
					En input donde se establece en pixeles la distancia del componente del margen izquierdo.
				</td>
			</tr>
			<tr>
				<td>campoPosicionDerecha</td><td>input</td>
				<td>
					En input donde se establece en pixeles la distancia del componente del margen derecho.
				</td>
			</tr>
			<tr>
				<td>campoPosicionArriba</td><td>input</td>
				<td>
					En input donde se establece en pixeles la distancia del componente del margen superior.
				</td>
			</tr>
			<tr>
				<td>campoPosicionAbajo</td><td>input</td>
				<td>
					En input donde se establece en pixeles la distancia del componente del margen inferior.
				</td>
			</tr>
			<tr>
				<td>campoAncho</td><td>input</td>
				<td>
					En input donde se establece en pixeles el ancho del componente.
				</td>
			</tr>
			<tr>
				<td>campoAlto</td><td>input</td>
				<td>
					Un input donde se establece en pixeles el alto del componente.
				</td>
			</tr>
			<tr>
				<td>divFichaEventos</td><td>input</td>
				<td>
					Es el div que contiene la ficha de eventos del panel de edicion.
				</td>
			</tr>
			<tr>
				<td>campoTipoEvento</td><td>input</td>
				<td>
					Un input donde se elige el tipo de evento a procesar.
				</td>
			</tr>
			<tr>
				<td>areaCodigo</td><td>TextArea</td>
				<td>
					Un area de texto donde el usuario escribirá el código a escribir cuando se de el evento que esté seleccionado con la variable campoTipoEvento.
				</td>
			</tr>
			<tr>
				<td>divFichaDiseno</td><td>div</td>
				<td>
					Es el div que contiene la ficha de diseño del panel de edición.
				</td>
			</tr>
			<tr>
				<td>campoEstiloLetra</td><td>select</td>
				<td>
					Un select donde se elije el estilo de la letra a usar dentro del componente.
				</td>
			</tr>
			<tr>
				<td>campoTamanoLetra</td><td>select</td>
				<td>
					Un select donde se elije el tamaño de la letra a usar dentro del componente.
				</td>
			</tr>
			<tr>
				<td>botonNegrita</td><td>div</td>
				<td>
					Un div donde se marca si letra a usar dentro del componente debe estar en negritas o no.
				</td>
			</tr>
			<tr>
				<td>botonCursiva</td><td>div</td>
				<td>
					Un div donde se marca si letra a usar dentro del componente debe estar en cursivas o no.
				</td>
			</tr>
			<tr>
				<td>botonSubrayado</td><td>div</td>
				<td>
					Un div donde se marca si letra a usar dentro del componente debe estar subrayada o no.
				</td>
			</tr>
			<tr>
				<td>botonColorLetraCuadro</td><td>input</td>
				<td>
					Un input de tipo color en donde se elije el color del texto componente.
				</td>
			</tr>
			<tr>
				<td>botonVinetas</td><td>input</td>
				<td>
					Un botón para agregar una listado. //Va a haber cambio.
				</td>
			</tr>
			<tr>
				<td>botonVinetasNumeros</td><td>input</td>
				<td>
					Un botón para agregar una listado numero //Va a haber cambio.
				</td>
			</tr>
			<tr>
				<td>botonAlinearIzquierda</td><td>div</td>
				<td>
					Un div donde se marca si el texto del componente debe estar alineado a la izquierda.
				</td>
			</tr>
			<tr>
				<td>botonAlinearCentro</td><td>div</td>
				<td>
					Un div donde se marca si el texto del componente debe estar alineado al centro.
				</td>
			</tr>
			<tr>
				<td>botonAlinearDerecha</td><td>div</td>
				<td>
					Un div donde se marca si el texto del componente debe estar alineado a la derecha.
				</td>
			</tr>
			<tr>
				<td>botonJustificar</td><td>div</td>
				<td>
					Un div donde se marca si el texto del componente debe estar justificado.
				</td>
			</tr>
			<tr>
				<td>botonInterlineado</td><td>div</td>
				<td>
					Está pendiente para cambio.
				</td>
			</tr>
			<tr>
				<td>botonColorFondoCuadro</td><td>div</td>
				<td>
					Un input de tipo color en donde se elije el color de fondo del texto componente.
				</td>
			</tr>
			<tr>
				<td>botonBorde</td><td>img</td>
				<td>
					Un img para elegir el borde del componente (Faltan cambios) 
				</td>
			</tr>
			<tr>
				<td>divVistaPrevia</td><td>div</td>
				<td>
					Un div en donde se previsualiza el diseño del componente antes de ser guardado.
				</td>
			</tr>
			<tr>
				<td>ventana</td><td>Ventana</td>
				<td>
					Un objeto tipo Ventana para confirmar eliminar un componente.
				</td>
			</tr>			
		</table>
		<h3><font color='blue'>Función setX(x)</font></h3>
		<p>
			Es la función que permite establecer el valor del atributo posX a la vez que reacomoda el componente de acuerdo a la nueva posición horizontal deseada.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>x</font>
					Un entero que será el valor asignado al atributo posX.
				</li>				
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		

		<h3><font color='blue'>Función setY(y)</font></h3>
		<p>	
			Es la función que permite establecer el valor del atributo posY a la vez que reacomoda el componente de acuerdo a la nueva posición vertical deseada.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>y</font>
					Un entero que será el valor asignado al atributo posY.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función setAncho(ancho)</font></h3>
		<p>	
			Es la función que permite establecer el valor del atributo ancho y a la vez redimensiona el componente de acuerdo al nuevo width deseado.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>ancho</font>
					Un entero que será el valor asignado al atributo ancho.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>			
		<h3><font color='blue'>Función setAlto(alto)</font></h3>
		<p>	
			Es la función que permite establecer el valor del atributo alto y a la vez redimensiona el componente de acuerdo al nuevo height deseado.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>alto</font>
					Un entero que será el valor asignado al atributo alto.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>				
		<h3><font color='blue'>Función cargarAtributos(nuevosAtributos)</font></h3>
		<p>	
			Se utiliza para inicializar el componente con atributos que ya fueron guardados previamente en la base de datos.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>nuevosAtributos</font>
					Es un JSON que será asignado al campo atributos de la clase y que contiene los atributos  del componente ya guardados en la base de datos.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Crea el diseño el componente cuando es visualizado dentro de un panel de diseño de muchos componentes. La función ejecuta sus tareas en el siguiente orden:
			<ol>
				<li>Crea el atributo divContenedor. (Vea la tabla de atributos de la clase).</li>
				<li>
					Crea y añade a divContenedor un div para los botones para ello usa el atributo 	divBotones.
				</li>
				<li>
					Crea y añade a divBotones los botones botonClonar, botonBorrar, botonEditar y un icono que se usa para arrastrar el componente en el panel de diseño.
				</li>
				<li>
					Crea eventos para divContedor con los cuáles al entrar el mouse en el componente divBotones debe aparecer y al salir el mouse del componente  divBotones debe desaparecer.
				</li>
			</ol>			
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función abrirVentanaEdicion()</font></h3>
		<p>	
			Se usa para crear una ventana en la cuál el usuario podrá editar los atributos de cualquier componente gráfico. La ventana está dividida en cuatro pestañas (en su forma estándar, las clases hijas podrán ocultar las pestañas que no necesitan) general,diseño,tamaño y posición y eventos. La ventana es creada cuando se da click en botonEditar. La función ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Crear un fondo oscuro transparente usando el atributo fondoVentanaEdicion para tapar toda la ventana general y lograr que el usuario únicamente interactúe con la ventana de edición.	
				</li>
				<li>
					Crear un fondo blanco centrado usando el atributo divVentanaEdicion para la ventana de edición y agregarlo como hijo a fondoVentanaEdicion.
				</li>
				<li>
					Crear un div para contener el título y el botón de cerrar de la ventana de edición usando la variable local divTituloEdicion.
				</li>
				<li>
					Crear un div para contener el titulo de la ventana usando la variable divTituloTextoEdicion y agregarlo como hijo a divTituloEdicion.
				</li>
				<li>
					Crear un botón para cerrar la ventana de edición, si el botón ya fue creado antes, su evento de click es apagado. Para guardar el botón se usa el atributo  botonCerrarEdicion y se agrega como hijo a la variable divTituloEdicion, posteriormente se agrega un evento de click sobre botonCerrarEdicion que cerrará la ventana de edición cuando el evento ocurra.
				</li>
				<li>
					Crear un objeto de tipo Tabulador guardandolo en el atributo tabulador, el cual tendrá las pestañas general,diseño,tamaño y posición y eventos. También se crea un div asignado a la variable divTabulador y se le agrega como hijo el atributo tabulador. La variable divTabulador se agrega como hijo a la variable divVentanaEdicion.
				</li>
				<li>
					Se crea la pestaña general, para ello  se puede usar la función estándar de la clase Componente o cualquier clase hija podría crear su propio diseño de la pestaña general.
				</li>
				<li>
					Se crea la pestaña diseño, para ello  se puede usar la función estándar de la clase Componente o cualquier clase hija podría crear su propio diseño de la pestaña diseño.
				</li>
				<li>
					Se crea la pestaña tamaño y posición, para ello  se puede usar la función estándar de la clase Componente o cualquier clase hija podría crear su propio diseño de la pestaña tamaño y posición
				</li>
				<li>
					Se crea la pestaña eventos, para ello  se puede usar la función estándar de la clase Componente o cualquier clase hija podría crear su propio diseño de la eventos
				</li>
				<li>
					Se crea un botón con el  atributo botonAceptarEdicion para cerrar la ventana de edición guardando los cambios
				</li>
				<li>
					Se crea un botón con el  atributo botonCancelarEdicion para cerrar la ventana de edición sin guardar los cambios
				</li>
				<li>
					Llama a la función cargarAtributosEdicion para que obtenga todos los atributos previos ya almacenados y los ponga como valores prederminados de los objetos que conforman la ventana de edición.
				</li>

			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función otenerFichaGeneral() </font></h3>
		<p>	
			Es la función estándar para crear el diseño de la pestaña general. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Crear el div que tendrá todo el diseño de la pestaña general usando el atributo divFichaGeneral.
				</li>
				<li>
					Crear un input para guardar el nombre del componente usando el atributo campoNombre así como un párrafo que dice "animaciones" usando el atributo tituloAnimaciones.
				</li>
				<li>
					Crea un select para elegir el tipo de animación de entrada del componente usando el atributo campoAnimacionEntrada así como un input para establecer la duración en milisegundos de la animación de entrada usando el atributo campoAnimacionEntrada.
				</li>
				<li>
					Crea un select para elegir el tipo de animación de salida del componente usando el atributo campoAnimacionSalida así como un input para establecer la duración en milisegundos de la animación de salida usando el atributo campoAnimacionSalida.
				</li>
				<li>
					Agregar la pestaña general al  tabulador.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no tiene valores de retorno.
		</p>					
		<h3><font color='blue'>Función obtenerFichaGeneral2(camposMostrar)</font></h3>
		<p>	
			Es utilizada por las clases hijas que requieren agregar elementos al diseño de la pestaña general antes de las animaciones. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Evalúa si debe mostrar el botón de selección botonSoloLectura con el cual se establece si el componente podrá ser editable o no. Por ejemplo si se está siendo usado por la clase hija Etiqueta, define si el texto podrá ser editado por el usuario o permanecerá estático.
				</li>
				<li>
					Evalúa si debe mostrar el botón de selección botonMultilinea con el cual se establece si el componente podría ser de múltiples líneas. Por ejemplo si está siendo usado por la clase hija CampoSeleccion, define si la lista será desplegable o se mostrarán varios elementos ya desplegados.
				</li>
			</ol>

		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>camposMostrar</font>
					Es un array de string con el cuál se listan los nombres de los botones que deben ser mostradas, hasta el momento sus valores posibles son: (lectura,multilinea).
				</li>						
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función obtenerFichaTamanoPosicion()</font></h3>
		<p>	
			Crea un diseño estandar de la ficha tamaño y posición. Las clases hijas pueden sobreescribir la función y hacer su propio diseño. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Crea el div que tendrá el diseño de la pestaña, en este caso con el atributo divFichaTamanoPosicion
				</li>
				<li>
					Crea una fila para agregar los campos de posición a la izquierda y posición a la derecha, usando los atributos campoPosicionIzquierda y campoPosicionDerecha respectivamente. Si campoPosicionIzquierda tiene un valor, el valor de campoPosicionDerecha es ignorado para ubicar el componente horizontalmente.
				</li>
				<li>
					Crea una fila para agregar los campos de posición arriba y posición abajo, usando los atributos campoPosicionArriba y campoPosicionAbajo respectivamente. Si campoPosicionArriba tiene un valor, de valor de campoPosicionAbajo es ignorado para ubicar el componente verticalmente.
				</li>
				<li>
					Crea una fila para agregas los campos de campo y ancho, usando los abributos campoAncho y campoAlto respectivamente.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función obtenerFichaEventos</font></h3>
		<p>	
			Esta función está pendiente. Se usa para crear la pestaña donde el usuario escribirá el código a ejecutar por cada evento seleccionado. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Crea el div que tendrá el diseño de la pestaña, en este caso con el atributo divFichaEventos.
				</li>
				<li>
					Crea una fila para agregar un select con los eventos disponibles para elegir usando el atributo campoTipoEvento.
				</li>
				<li>
					Crea el área donde el usuario ejecutará el código cuando se de  el evento seleccionado usando el atributo areaCodigo.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere ningún parámetro.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función obtenerFichaDiseno()</font></h3>
		<p>	
			Se usa para crear la pestaña donde el usuario establecerá valores del diseño, principalmente para el texto del componente. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Crea el div que tendrá el diseño de la pestaña, en este caso con el atributo divFichaDiseno.
				</li>
				<li>
					Crea una fila para agregar dos selects para elegir el tipo y el tamaño de la letra usando los atributos campoEstiloLetra y campoTamanoLetra respectivamente.
				</li>
				<li>
					Crea una fila para agregar cuatro botones para marcar si el texto estará en negrita, cursiva y subrayado así como su color, para ello usa los atributos botonNegrita, botonCursiva, botonSubrayado y botonColorLetra respectivamente.
				</li>
				<li>
					Crea una fila para elegir la alineación del texto (alineado a la izquierda, alineado al centro, alineado a la derecha o justificado), pero ello usa los atributos botonAlinearIzquierda, botonAlinearCentro, botonAlinearDerecha y botonJustificar. (el botón para viñetas tanto normal como en números sufrirá cambios).
				</li>
				<li>
					Crea una fila fila para elegir el interlineado(pendiente), el color de fondo y el borde del componente (pendiente) usando los atributos botonInterlineado, botonColorFondo y botonBorde respectivamente.
				</li>
				<li>
					Crea un div para pre-visualizar el efecto de los cambios en el diseño antes de que estos sean guardados usando para ello el atributo divVistaPrevia.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Es función no devuelve ningún valor.
		</p>				
		<h3><font color='blue'>Función cargarEventos()</font></h3>
		<p>	
			Crea todos los eventos generales para un componente (Vaya a la sección eventos)
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función confirmarEliminar()</font></h3>
		<p>	
			Crea una ventana en donde se le pregunta al usuario si realmente desea eliminar el componente.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función eliminar(objetoPropio)</font></h3>
		<p>	
			Se ejecuta una vez que el usuario da click en la ventana desplegada con la función confirmarEliminar, y borra gŕaficamente y de la memoria la referencia a este componente usando una función de objetoPadre (el que tiene todos los componentes) llamada eliminarComponente enviando como parámetro el atributo idComponente.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>objetoPropio</font>
					Es usa referencia a este mismo componente. Es requerida ya que la función es llamada desde un objeto Ventana y el procesamiento del evento click  en el boton guardar pierde la referencia de este componente.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función clickAceptarEdicion()</font></h3>
		<p>	
			Se utiliza para validar que la ventana de edición tenga todos sus campos bien llenados y si esto ocurre quita la ventana de edición y guarda los cambios realizados.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>			
		<h3><font color='blue'>Función cambioFichaEdicion()</font></h3>
		<p>	
			Pendiente. (Deberá llamarse cuando se selecciona una nueva pestaña en el tabulador.)
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función marcarSeleccionBoton(event)</font></h3>
		<p>	
			Se ejecuta cuando el usuario hace click sobre alguno de los botones marcados para selección (botonSoloLectura, botonMultilinea,botonNegrita,botonCursiva,botonSubrayado). La función cambia el color del fondo y el borde del botón de acuerdo a su nuevo estado y  establece el atributo marcado=1 cuando el botón está seleccionado y 0 cuando no lo está.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>event</font>
					La referencia al botón que recibió el click. Con este parámetro se puede saber que botón recibió y el click y así cambiarle su diseño y atributos.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función marcarSeleccionBotonAlineado(event)</font></h3>
		<p>	
			Se ejecuta cuando se da click en cualquiera de los botones para alinear texto 
			(botonAlinearIzquierda, botonAlinearDerecha, botonAlinearCentro y botonJustificar) y ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Cambia el borde y el color de fondo de todos los botones de alineado para marcarlos como deseleccionados.
				</li>
				<li>
					Obtiene el botón que recibió el click.
				</li>
				<li>
					Cambia el borde y el color de fondo del botón que recibió el click para marcarlo como seleccionado.
				</li>
				<li>
					Establece el atributo alineadoTexto con el valor del atributo "alineado" del botón que recibió el click (left, center, right o justify);
				</li>
				<li>
					Actualiza la vista previa del diseño.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>event</font>
					La referencia al botón que recibió el click. Con este parámetro se puede saber que botón recibió el click y así cambiarle su diseño y obtener el valor del atributo "alineado".
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>				
		<h3><font color='blue'>Función guardarAtributosEditados()</font></h3>
		<p>	
			Guarda los valores de campos de la ventana de edición después de editarlos en campo atributos. Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>
					Guardar el nuevo nombre del componente en el atributo nombre.
				</li>
				<li>
					Si el objetoPadre (El objeto que tiene a todos los componentes) estableció  un valor para el atributo funcionCambioAtributos, llamarla.
				</li>
				<li>
					Guardar todos los valores de los campos de la pestaña diseño en la variable local nuevoDiseno. Si la pestaña de diseño está oculta, el JSON para nuevoDiseno es {}
				</li>
				<li>
					Guardar todos los valores de los campos del resto de las pastañas en el JSON atributos. 
				</li>
				<li>
					Acomodar el componente de acuerdo a los cambios en el tamaño y la posición.
				</li>
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no retorna ningún valor.
		</p>		
		<h3><font color='blue'>Función cargarAtributosEdicion()</font></h3>
		<p>	
			Debe cargar los atributos ya seleccionados previamente en la ventana de edición. Si el campo atributos.diseno tiene ya un valor, signfica que hubo ya una edición previa y se cargan todos los valores del JSON atributos, en caso contrario (el componente nunca ha sido editado) se cargan los valores predeterminados del componente arrastrado al panel (el nombre, el tamaño y la posición).
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función obtenerTituloEdicion()</font></h3>
		<p>	
			Se usa para que las clases hijas devuelvan un String con el texto que deberá aparecer en el título de la ventana de edición.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>			
			Valores de retorno.
		</h3>
		<p>
			Devuelve un String con el título de la ventana de edición.
		</p>		
		<h3><font color='blue'>Función validarCambiosEdicion()</font></h3>		
		<p>	
			Valida que todos los campos de la ventana de edición tengan valores correctos, los criterios para validar son los siguientes.
			<ol>
				<li>
					El atributo campoNombre no debe ser una cadena vacía. (Falta validar que sean un nombre de variable de programación correcto).
				</li>
				<li>
					Los atributos campoPosicionIzquierda,campoPosicionDerecha,campoPosicionArriba,campoPosicionAbajo, campoAncho y campoAlto deben ser valores numéricos.
				</li>
				<li>
					El nombre no debe repetirse con el nombre de otro componente, para ello se usa la función funcionValidarComponente de la clase padre (La que tiene todos los componentes).
				</li>
				<li>
					Cuando un campo es inválido su borde se pone rojo y en el caso contrario recupera el borde original.
				</li>				
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función devuelve true cuando todos los campos son válidos y false cuando uno o más son inválidos.
		</p>		
		<h3><font color='blue'>Función marcarSeleccionBotones(botones)</font></h3>
		<p>
			Este función debe ser llamada sin la necesidad de que ocurra un evento de click, sino cuando en forma predeterminada se están cargando los atributos del componente y se requiere marcar cuales de los siguientes botones (botonNegrita,botonCursiva,botonSubrayado) fué seleccionado la ultima vez.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>botones</font>
					Un array con la lista de botones que debe evaluarse su selección en este caso botonNegrita, botonCursiva, botonSubrayado.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.			
		</p>		
		<h3><font color='blue'>Función actualizarVistaDiseno(elementoActualizar)</font></h3>
		<p>	
			Actualiza el texto de un elemento de vista previa con negrita, cursiva, subrayado y el alineado del texto.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>elementoActualizar</font>
					El elemento al cuál se le cambiarán sus valores css.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función actualizarVistaDiseno2(elementoActualizar)</font></h3>
		<p>	
			Cambia algunas otras propiedades css de un elemento de vista previa como es la fuente, el tamaño del texto, el color del texto y el color de fondo.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>elementoActualizar</font>
					El elemento al cuál se le cambiarán sus valores css.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<table>
			<tr class='tituloTabla'>		
				<td>Nombre</td>
				<td>Elemento</td>
				<td>Función donde declara</td>
				<td>Función llamada</td>
				<td>Descripción</td>				
			</tr>
			<tr>
				<td>hover</td>
				<td>divContenedor</td>
				<td>crearEditable</td>
				<td>Anónima</td>
				<td>Muestra la barra de botones de un componente.</td>
			</tr>
			<tr>
				<td>mouseleave</td>
				<td>divContenedor</td>
				<td>crearEditable</td>
				<td>Anónima</td>
				<td>Oculta la barra de botones de un componente.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonCerrarEdicion</td>
				<td>abrirVentanaEdicion</td>
				<td>Anónima</td>
				<td>Cierra la ventana de edición.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAceptarEdicion</td>
				<td>abrirVentanaEdicion</td>
				<td>clickAceptarEdicion</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonCancelarEdicion</td>
				<td>abrirVentanaEdicion</td>
				<td>Anónima</td>
				<td>Cierra la ventana de edición</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonSoloLectura</td>
				<td>obtenerFichaGeneral2</td>
				<td>marcarSeleccionBoton</td>
				<td>Ver la función llamada</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonMultilinea</td>
				<td>obtenerFichaGeneral2</td>
				<td>marcarSeleccionBoton</td>
				<td>Ver la función llamada</td>
			</tr>
			<tr>
				<td>change</td>
				<td>campoEstiloLetra</td>
				<td>obtenerFichaDiseno</td>
				<td>Anónima</td>
				<td>Actualiza el divVistaPrevia con el nuevo estilo de letra elegido.</td>
			</tr>
			<tr>
				<td>change</td>
				<td>campoTamanoLetra</td>
				<td>obtenerFichaDiseno</td>
				<td>Anónima</td>
				<td>Actualiza el divVistaPrevia con el nuevo tamaño de letra elegido.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonNegrita</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBoton</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonCursiva</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBoton</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonSubrayado</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBoton</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>change</td>
				<td>botonColorLetraCuadro</td>
				<td>obtenerFichaDiseno</td>
				<td>Anónima</td>
				<td>Actualiza el divVistaPrevia con el nuevo color de letra elegido</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAlinearIzquierda</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBotonAlineado</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAlinearIzquierda</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBotonAlineado</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAlinearCentro</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBotonAlineado</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAlinearDerecha</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBotonAlineado</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonJustificar</td>
				<td>obtenerFichaDiseno</td>
				<td>marcarSeleccionBotonAlineado</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>change</td>
				<td>botonColorFondoCuadro</td>
				<td>obtenerFichaDiseno</td>
				<td>Anónima</td>
				<td>Actualiza el divVistaPrevia con el nuevo color de fondo elegido</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonEditar</td>
				<td>cargarEventos</td>
				<td>abrirVentanaEdicion</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonBorrar</td>
				<td>cargarEventos</td>
				<td>confirmarEliminar</td>
				<td>Ver la función llamada.</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonClonar</td>
				<td>cargarEventos</td>
				<td>clonar</td>
				<td>Ver la función llamada(pendiente)</td>
			</tr>
			
		</table>		
		<hr>
		<a href='#componentes_generales'>Componentes generales</a>

		<h2><font color='magenta'><a name='etiqueta-Etiqueta_js'></a>etiqueta/Etiqueta.js</font></h2>
		<p>
			Es una clase heredada de Componente.js. Se usa para poner texto en el diseño de una plantilla, ya sea estático o editable.	
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>texto</td><td>String</td>
				<td>El texto que aparecerá en la plantilla para esta etiqueta y que podrá ser cambiado si esta etiqueta se establece como editable.</td>
			</tr>
			<tr>
				<td>campoContenido</td><td>TextArea</td>
				<td>Un campo donde el usuario editará el contenido de la etiqueta mientras está viendo el diseño de la plantilla.</td>
			</tr>
			<tr>
				<td>campoContenidoEdicion</td><td>TextArea</td>
				<td>Un campo donde el usuario editará el contenido de la etiqueta mientras está viendo la ventana de edición</td>
			</tr>
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estandar de un componente, agrega campoContenido a divContenedor.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.			
		</p>
		
		<h3><font color='blue'>Función obtenerFichaGeneral()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estándar de la pestaña general, agrega el campoContenidoEdicion.
		</p>		
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>		
		<h3><font color='blue'>Función obtenerTituloEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y devuelve el texto que estará como título de la ventana de edición.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un String con el texto estático "Propiedades de bloque de texto".
		</p>
		<h3><font color='blue'>Función guardarAtributosEditados()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de guardar los valores estándar de la ventana de edición, crea un nuevo nodo para atributos llamado hijo en donde guarda el valor del campoContenido y si el la etiqueta es editable.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarAtributosEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de cargar los valores estánda de la ventana de edición, carga los nuevos valores del campoContenido en campoContenidoEdicion. También selecciona el botónSoloLectura solo si ya hubo atributos previos guardados.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<p>
			Esta clase no tiene sus propios eventos.
		</p>

		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>		

		<h2><font color='magenta'><a name='boton-Boton_js'></a>boton/Boton.js</font></h2>
		<p>
			Es una clase heredada de Componente.js. Se usa para crear un botón el cuál desencadenará eventos dentro de la plantilla y dentro de un curso.			
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>texto</td><td>String</td>
				<td>Guarda el texto descriptivo del botón</td>
			</tr>
			<tr>
				<td>campoTexto</td><td>Input</td>
				<td>El diseñador de la plantilla lo usa para editar el texto descriptivo del botón dentro de la ventana de edición.</td>
			</tr>
			<tr>
				<td>divBoton</td><td>div</td>
				<td>Contiene el diseño del botón dentro de la plantilla.</td>
			</tr>
			<tr>
				<td>botonSubirImagenEdicion</td><td>BotonSubirImagen</td>
				<td>Se usará para definir la imagen de fondo el botón (pendiente de terminar)</td>
			</tr>
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estandar de un componente, agrega divBoton a divContenedor.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerFichaGeneral()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estándar de la pestaña general, agrega el campoTexto, botonSubirImagenEdicion (La funcionalidad del segundo está pendiente) y establece que botonSoloLectura debe estar visible (llamando a la función obtenerFichaGeneral2(new Array("lectura"))).
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerTituloEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y devuelve el texto que estará como título de la ventana de edición.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un String con el texto estático "Propiedades del botón".
		</p>
		<h3><font color='blue'>Función guardarAtributosEditados()</font></h3>
		<p>				
			Es sobreescrita de la clase Componente.js y además de guardar los valores estándar de la ventana de edición, crea un nuevo nodo para atributos llamado hijo en donde guarda el valor del campoTexto y si el botón estará activo. 
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarAtributosEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de cargar los valores estándar de la ventana de edición, carga los nuevos del texto valores a campoTexto. También selecciona el botónSoloLectura solo si ya hubo atributos previos guardados y si no los hubo pone un color de fondo predeterminado.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<p>
			Esta clase no tiene sus propios eventos.
		</p>
		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>

		<h2><font color='magenta'><a name='campoSeleccion-CampoSeleccion_js'></a>campoSeleccion/CampoSeleccion.js</font></h2>
		<p>
			Es una clase heredada de Componente.js. Se usa para crear una lista de opciones de donde se podrán seleccionar una o varias.	
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>campoLista</td><td>Select</td>
				<td>Es el comboBox con opciones que aparece en el campoSeleccion que está en la plantilla de diseño.</td>				
			</tr>
			<tr>
				<td>campoListaEdicion</td><td>select</td>
				<td>Es el comboBox con opciones que aparece en el campoSeleccion que está en la ventana de edición</td>				
			</tr>
			<tr>
				<td>campoAgregarElemento</td><td>input</td>
				<td>Es el campo que aparece en la ventana de edición donde se captura el nombre de algún nuevo elemento a agregar en campoListaEdicion</td>				
			</tr>
			<tr>
				<td>botonAgregarElemento</td><td>img</td>
				<td>Es el botón que aparece en la ventana de edición en donde al darle click lo editado en campoAgregarElemento se agrega a campoListaEdicion</td>				
			</tr>
			<tr>
				<td>botonQuitarElementos</td><td>img</td>
				<td>Es el botón que aparece en la ventana de edición en donde al darle click lo seleccionado en campoListaEdicion es eliminado de la lista de opciones</td>				
			</tr>
			<tr>
				<td>campoVisibles</td><td>input</td>
				<td>Es un campo en donde se capturan el número de elementos que deben quedar visibles en el campoSeleccion, es decir si debe pasar de ser una lista desplegable a una lista normal con cierto número de elementos visibles.</td>
			</tr>
			<tr>
				<td>contadorElementosVisibles</td><td>input</td>
				<td>
					Se usa para llevar un conteo de los options agregados a campoListaEdicion y así asignarles un valor único a cada option que servirá para saber que seleccionó el usuario.
				</td>
			</tr>
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función agregarElementosLista()</font></h3>
		<p>	
			Valida que campoAgregarElemento tenga un valor, si lo tiene lo agrega como option a campoListaEdicion e incrementa contadorElementosVisibles. Finalmente vacía lo editado en campoAgregarElemento y lo enfoca para editar nuevamente.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función quitarElementoLista()</font></h3>
		<p>	
			Busca entre los options de campoListaEdicion cual elemento está seleccionado y lo quita de la lista.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js. Además de crear el diseño estandar de un componente, agrega campoLista a divContenedor.
		</p>		
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerFichaGeneral()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estándar de la pestaña general, agrega el campoAgregarElemento, botonAgregarElemento, botonQuitarElemento,campoListaEdicion y campoVisibles además de que hace botonMultilinea visible.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerTituloEdicion</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y devuelve el texto que estará como título de la ventana de edición.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un String con el texto estático "Propiedades campo de selección".
		</p>
		<h3><font color='blue'>Función guardarAtributosEditados()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de guardar los valores estándar de la ventana de edición, crea un nuevo nodo para atributos llamado hijo en donde guardan los elemento de campoListaEdicion, el atributo marcado de botonMultilinea y el número de elementos visibles.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarAtributosEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de cargar los valores estándar de la ventana de edición, decide si debe marcar como seleccionado botonMultilinea y los elementos para campoListaEdicion.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función validarCambiosEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de validar los campos estándar de la ventana de edición, valida que campoVisibles tenga un valor numérico siempre y  cuando botonMultilinea esté seleccionado.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve true cuando todos los campos son válidos y false cuando uno o más son inválidos
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<table>
			<tr class='tituloTabla'>		
				<td>Nombre</td>
				<td>Elemento</td>
				<td>Función donde declara</td>
				<td>Función donde llamada</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonAgregarElemento</td>
				<td>obtenerFichaGeneral</td>
				<td>agregarElementoLista</td>
				<td>Ver la función llamada</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonQuitarElemento</td>
				<td>obtenerFichaGeneral</td>
				<td>quitarElementoLista</td>
				<td>Ver la función llamada</td>
			</tr>
			<tr>
				<td>click</td>
				<td>botonMultilinea</td>
				<td>obtenerFichaGeneral</td>
				<td>Anónima</td>
				<td>Activa o desactiva campoVisibles de acuerdo al valor del atributos marcado de botonMultilinea. campoVisibles limpia su valor y gana el enfoque del cursor.</td>
			</tr>
		</table>		
		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>
		<h2><font color='magenta'><a name='objetoSubirImagenes-BotonSubirImagen_js'>
			objetoSubirImagenes/BotonSubirImagen.js</a></font></h2>
		<p>
			Es un botón útil para seleccionar una imagen desde el explorador de archivos locales, tener una vista previa (e incluso escalada) y poder subirla al servidor.
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>esNuevaImagen</td><td>boolean</td>
				<td>Indica si se cambió la imagen que existía antes.</td>
			</tr>
			<tr>
				<td>ancho</td><td>int</td>
				<td>El ancho de la imagen elegida o valor establecido manualmente por un usuario.</td>
			</tr>
			<tr>
				<td>alto</td><td>int</td>
				<td>El alto de la imagen elegida o valor establecido manualmente por un usuario.</td>
			</tr>
			<tr>
				<td>iconoSubirImagen</td><td>img</td>
				<td>
					Sirve para previsualizar la imagen (tamaño normal o escalado ) que el usuario elige
				</td>
			</tr>
			<tr>
				<td>debeAjustar</td><td>boolean</td>
				<td>
					Indica con false si al cargar una imagen su tamaño debe ajustarse al del 
    				botón y si es true el botón debe expandirse a lo que mida la imagen.
    			</td>
			</tr>
			<tr>
				<td>funcionCambioImagen</td><td>Function</td>
				<td>
					Es una función del objeto que creó el botón que es llamada cuando al botón se le 
    				carga una nueva imagen.
    			</td>
			</tr>
			<tr>
				<td>objetoPadre</td><td>Object</td>
				<td>Es el objeto que creó el botón, a través de el se llama a funcionCambioImagen</td>
			</tr>
			<tr>
				<td>botonSubirImagen</td><td>input(file)</td>
				<td>
					Es un input que se usa se tipo file para podre abrir el explorador de archivos y elegir una imagen.
				</td>
			</tr>
			<tr>
				<td>divBotonSubirImagen</td><td>div</td>
				<td>Es el div que contiene todos los elementos del diseño del botón.</td>
			</tr>
			<tr>
				<td>formularioSubirImagen</td><td>form</td>
				<td>
					Es un formulario que servirá cuando se desee subir la imagen al servidor mediante un formData.
				</td>
			</tr>
			<tr>
				<td>anchoNormal</td><td>int</td>
				<td>
					El anchoNormal es el ancho del botón y sirve  para redimensionar la imagen que 
    				es elegida del navegador tomándolo como ancho límite y como el denominador en el cálculo de la escala de la imagen.
    			</td>
			</tr>
			<tr>
				<td>altoNormal</td><td>int</td>
				<td>
					El altoNormal es el alto del botón y sirve  para redimensionar la imagen que 
				    es elegida del navegador tomandolo como alto límite y como el denominador en el cálculo de la escala de la imagen.
				</td>
			</tr>
			<tr>
				<td>posIzquierda</td><td>int</td>
				<td>
					Cuando una imagen elegida es redimensionada a escala, su posición respecto al margen izquierdo es recalculada de acuerdo al nuevo tamaño y así poder centrarla horizontalmente.
				</td>
			</tr>
			<tr>
				<td>posArriba</td><td>int</td>
				<td>
					Cuando una imagen elegida es redimensionada a escala, su posición respecto al margen superior es recalculada de acuerdo al nuevo tamaño y así poder centrarla verticalmente.
				</td>
			</tr>
			<tr>
				<td>anchoMarco</td><td>int</td>
				<td>
					Para recalcular posIzquierda es necesario el anchoMarco ya que la imagen debe ser centrada horizontalmente, por lo tanto toma el width de divBotonSubirImagen.
				</td>
			</tr>
			<tr>
				<td>altoMarco</td><td>int</td>
				<td>
					Para recalcular posArriba es necesario el altoMarco ya que la imagen debe ser centrada verticalmente, por lo tanto toma el height de divBotonSubirImagen.
    			</td>
			</tr>
			<tr>
				<td>imagenExiste</td><td>boolean</td>
				<td>Cuando el botonSubirImagen está dentro de un formulario donde es obligatorio elegir una imagen, esta variable booleana sirve para informar si la imagen ya está elegida.</td>
			</tr>
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función activar(activo)</font></h3>
		<p>	
			Indica si una imagen se mantendrá estática o podrá ser cambiada por el usuario, para ello desactiva o activa eventos en botonSubirImagen y pone el cursor apropiado para iconoSubirImagen.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>activo</font>
					Un booleano que indica si se debe activar o desactivar el botón.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarObjetos()</font></h3>
		<p>	
			Crea todo el diseño del botón en el siguiente orden:
			<ol>
				<li>Crea el divBotonSubirImagen</li>
				<li>Crea el formularioSubirImagen</li>
				<li>Crea el botonSubirImagen pero no permanece visible</li>
				<li>Crea el iconoSubirImagen</li>
				<li>Establece los valores para anchoNormal, altoNormal, posIzquierda,posArriba, anchoMarco, altoMarco de acuerdo al css de los elementos previamente creados  				(iconoSubirImagen y divBotonSubirImagen)</li>
			</ol>			
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere ningún parámetro.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve divBotonSubirImagen para que sea agregado a algún otro div que contendrá el botón.
		</p>
		<h3><font color='blue'>Función cargarImagen()</font></h3>
		<p>	
			Se ejecuta cuando se da click en iconoSubirImagen a través de botonSubirImagen el cuál abre un explorador de archivos local donde el usuario selecciona su imagen, al ser cargada la imagen, cargarImagen llama a cargarImagenManual para previsualizar (y escalar si debe hacerlo) la imagen dentro de iconoSubirImagen.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>event</font>
					Se usa para obtener el archivo que el usuario seleccionó a través de event.target.files[0]
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarImagenManual(src,ancho,alto)</font></h3>
		<p>	
			Previsualiza una imagen en iconoSubirImagen y la escala (si debeAjustar=false). Ejecuta las tareas en el siguiente orden:
			<ol>
				<li>Crea un evento onload que se ejecutará cuando la imagen se cargue en la variable local img. Para cargar la imagen  se le asigna el parámetro src al atributo src de la variable img.</li>
				<li>
					Crea una copia en una variable local para referenciar a todos los elementos del botón en lugar de this, la variables es llamada objetoPropio. (Esto es importante hacerlo porque la referencia a través de this se pierde cuando se ejecuta el evento onload de la imagen a cargar).
				</li>
				<li>
					Si no debe escalar la imagen (debeAjustar=true), establece los valores para ancho y alto mediante el width y height de la imagen respectivamente, cambia las dimensiones de divBotonSubirImagen y su parent, carga la imagen en iconoSubirImagen y cambia sus dimensiones de acuerdo al ancho y alto ya definido, indica que ya se cargó una imagen a través de imagenExiste y finalmente llama a funcionCambioImagen si se le fue asignado un valor, finalmente termina la ejecución de la función.
				</li>				
				<li>
					Se la imagen rebasó la dimensiones del botón, hace el ajuste a escala en el siguiente orden:
					<ol>
						<li>Decide si debe escalar ya sea a lo ancho a lo alto.</li>
						<li>Calcula la nueva escala (supongamos que escala a lo ancho)  dividiendo el ancho de la imagen entre el anchoNormal</li>
						<li>Calcula el nuevoAlto (o nuevoAncho si escala a lo alto) devidiendo el alto de la imagen entre la escala.</li>
						<li>
							Si el nuevoAlto sigue siendo mayor que  altoNormal calcula una nueva escala ahora diviendo el nuevoAlto entre altoNormal, recalcula  nuevoAncho diviendo el anchoNormal entre la nueva escala  y nuevaAlto se queda con el valor de altoNormal.</li>						
						<li>
							Si el nuevoAlto ya no es mayor que altoNormal, nuevoAncho se ajusta a anchoNormal.
						</li>
					</ol>
				</li>
				<li>
					Si la imagen no rebasó las dimensiones del botón, nuevoAncho y nuevoAlto toman el width y el height de la imagen respectivamente.
				</li>				
				<li>
					Se calcula la posición a la izquierda de la imagen que es la mitad de anchoMarco menos la mitad de nuevoAncho.
				</li>
				<li>
					Se calcula la posición a la derecha de la imagen que la mitad de altoMarco menos la mitad de nuevoAlto.
				</li>				
				<li>
					Carga la imagen en iconoSubirImagen y cambia sus dimensiones de acuerdo al nuevoAncho nuevoAlto calculador a escala, así como la posición arriba y la izquierda. Indica que ya se cargó una imagen a través de imagenExiste y finalmente llama a funcionCambioImagen si se le fue asignado un valor. Es importante enviar img.width e img.height como parámetros a funcionCambioImagen porque lo que importa es el tamaño original de la imagen o los valores dados por el usuario, no precisamente su escala, a la hora de acomodarla en una plantilla.
				</li>				
			</ol>
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>src</font>
					Un String que representa la url en donde está alojada la imagen que se debe cargar en iconoSubirImagen.
				</li>						
				<li><font style='font-weight:bold'>ancho</font>
					Sirve para cuando se requiere asignar un ancho ya definido a una imagen y no usar img.width.
				</li>
				<li><font style='font-weight:bold'>alto</font>					
					Sirve para cuando se requiere asignar un alto ya definido a una imagen y no usar img.height
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función subirImagen(jsonImagen,funcionTerminarSubir,objetoPadre)</font></h3>
		<p>	
			Sirve para enviar la imagen cargada en iconoSubirImagen al servidor ../servidor/SubirImagen.php. Para ello crea un formData en donde agrega formularioSubirImagen y un JSON con datos para la subida, y usando la función $.ajax de jquery hace en envío de la imagen al server.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>jsonImagen</font>
					Es un objeto JSON el cuál sirve para enviar datos adicionales de la imagen, como en que ruta del servidor debe alojarse o que debe guardar en la base de datos.
				</li>		
				<li><font style='font-weight:bold'>funcionTerminarSubir</font>
					Es una función que será llamada cuando el servidor responde con éxito al terminar de subir la imagen.
				</li>		
				<li><font style='font-weight:bold'>objetoPadre</font>
					Es una referencia al objeto que llamó a esta función, es necesario para llamar a funcionTerminarSubir y enviarlo  para que el objeto original recupere su referencia, ya que esta se pierde al usar $.ajax({success:}) de jquery.
				</li>
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función limpiar()</font></h3>
		<p>	
			Quita la imagen que esté cargada (poniendo la predeterminada) en iconoSubirImagen y devuelve imagenExiste a false para indicar que no se ha elegido ninguna imagen.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<table>
			<tr class='tituloTabla'>		
				<td>Nombre</td>
				<td>Elemento</td>
				<td>Función donde declara</td>
				<td>Función donde llamada</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>click</td>
				<td>iconoSubirImagen</td>
				<td>activar</td>
				<td>Anónima</td>
				<td>
					Dispara el evento click en botonSubirImagen (Ver el evento click en este elemento).
				</td>
			</tr>
			<tr>
				<td>change</td>
				<td>botonSubirImagen</td>
				<td>cargarObjetos</td>
				<td>cargarImagen</td>
				<td>Ver la función llamada</td>
			</tr>
			<tr>
				<td>onload</td>
				<td>fr</td>
				<td>cargarImagen</td>
				<td>Anónima</td>
				<td>
					Carga un objeto Image de un archivo seleccionad del explorador de archivos.
				</td>
			</tr>
			<tr>
				<td>onload</td>
				<td>img</td>
				<td>cargarImagenManual</td>
				<td>Anónima</td>
				<td>Carga una imagen en iconoSubirImagen cuando se asigna valor al atributo img.src</td>
			</tr>
		</table>

		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>

		<h2>
			<font color='magenta'><a name='objetoSubirImagenes-SubirImagen_js'></a>
				objetoSubirImagenes/SubirImagen.js
			</font></h2>
		<p>
			Es una clase heredada de Componente.js para subir imagenes al servidor pero teniendo una vista previa.
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>restablecerDimensiones</td><td>boolean</td>
				<td>
					Sirve para saber si debe poner nuevos valores para los campos ancho y alto (si vale true) o respetar valores previos. (si vale false).   Todo esto desde la ventana de edición.
    			</td>    			
			</tr>
			<tr>
				<td>botonSubirImagen</td>
				<td><a href="#objetoSubirImagenes-BotonSubirImagen_js">BotonSubirImagen</a></td>
				<td>Es el que hace el trabajo independiente de los componentes con una imagen, la carga del explorador de archivos, la redimensiona, etc cuando está en la ventana de edición.</td>
			</tr>
			<tr>
				<td>botonSubirImagenEdicion</td>
				<td><a href="#objetoSubirImagenes-BotonSubirImagen_js">BotonSubirImagen</a></td>
				<td>
					Es el que hace el trabajo independiente de los componentes con una imagen, la carga
				 	del explorador de archivos, la redimensiona, etc cuando está en la ventana de edición.
				 </td>
			</tr>			
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función cambioImagenEdicion(ancho,alto,objetoPropio) </font></h3>
		<p>	
			Es llamada cuando se sube una imagen al servidor desde la clase <a href="#objetoSubirImagenes-BotonSubirImagen_js">BotonSubirImagen</a> y se recibe una respuesta satisfactoria. La función decidirá si debe poner nuevos valores para ancho y alto o respetar dimensiones previas (el primer caso se cumple si el atributo restablecerDimensiones=true). Es importante al final poner el valor de restablecerDimensiones=true para evitar que si se sube una nueva imagen del explorador de archivo en la ventana de edición si siga considerando que no se deben actualizar valores de ancho y alto (Esto último si restablecerDimensiones es false).
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>ancho</font>
					El nuevo ancho que debe poner a campoAncho si restablecerDimensiones es true
				</li>		
				<li><font style='font-weight:bold'>alto</font>
					El nuevo alto que debe poner a campoAlto si restablecerDimensiones es true
				</li>		
				<li><font style='font-weight:bold'>objetoPropio</font>
					Referencia a este mismo objeto, ya que cuando se carga una imagen con el evento onload, la referencia a este objeto se pierde y al llamar a esta función ya no podemos usar this.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js. Además de crear el diseño estandar de un componente, agrega botonSubirImagen a divContenedor.	
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerFichaGeneral()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js, además de crear el diseño estándar de la pestaña general, agrega botonSubirImagenEdición y además hace botonSoloLectura visible.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función obtenerTituloEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y devuelve el texto que estará como título de la ventana de edición.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Devuelve un String con el texto estático "Propiedades de la imagen".
		</p>

		<h3><font color='blue'>Función guardarAtributosEditados()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de guardar los valores estándar de la ventana de edición, crea un nuevo nodo para atributos llamado hijo en donde guarda el src de botonSubirImagenEdicion y el atributo marcado de botonSoloLectura en el campo deshabilitado. Finalmente le indica a botonSubirImagen que cargue la nueva imagen que se haya subido a botonSubirImagenEdicion.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función cargarAtributosEdicion()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js y además de cargar los valores estándar de la ventana de edición, decide si debe marcar como seleccionado botonSoloLectura y establece el campo atributos.hijo.urlImagen con el src botonSubirImagen. Además le indica botonSubirImagenEdicion que cargue la nueva imagen que se haya subido a botonSubirImagen.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='#0d4036'>Los eventos</font></h3>
		<p>Esta clase no tiene sus propios eventos.</p>
		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>

		<h2><font color='magenta'><a name='objetoSubirImagenes-SubirImagen_css'></a>
			objetoSubirImagenes/SubirImagen.css
		</font></h2>
		<p>
			Contiene todos los estilos para BotonSubirImage.js , los estilos que incluye son:
			<ul>
				<li>.iconoSubirImagen</li>						
				<li>.divBotonSubirImagen</li>
			</ul>
		</p>		
		<hr>				
		<a href='#componentes_generales'>Componentes generales</a>

		<h2><font color='magenta'><a name='objetoFechas-SelectorFechas_js'></a>objetoFechas/SelectorFechas.js</font></h2>
		<p>
			Sirve para mostrar un pequeño calendario en donde el usuario eligirá una fecha, 
			usando día,mes,año, horas, minutos y segundos.
		</p>
		<h3><font color='#0d4036'>Los atributos </font></h3>		
		<table>	
			<tr class='tituloTabla'>
				<td>Nombre</td><td>Tipo</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td>primeraApertura</td><td>boolean</td>
				<td>
					Se usa para saber si el usuario ya estuvo eligiendo fechas y esa misma mostrar, 
					si no lo ha hecho se debe conseguir la fecha actual del servidor.</td>
			</tr>
			<tr>
				<td>ultimaFechaClick</td><td>td</td>
				<td>
					Se usa para guardar la última fecha seleccionada  (la marcada en azul)y cuando se seleccione otra devolverla
					a su color negro.
				</td>
			</tr>
			<tr>
				<td>inicioIntervalo</td><td>int</td>
				<td>Se usa para saber en que año comenzar cuando el calendario está visualizando un intervalo de años.</td>
			</tr>
			<tr>
				<td>posZ</td><td>int</td>
				<td>Es para tener el componente siempre por delante de los demás.</td>
			</tr>
			<tr>
				<td>divSelectorFechas</td><td>div</td>
				<td>Es el que contiene todos los elementos del calendario</td>
			</tr>
			<tr>
				<td>campoFechaTexto</td><td>input</td>
				<td>Es el campo donde aparecerá la fecha  actual seleccionada</td>
			</tr>
			<tr>
				<td>botonCalendario</td><td>img</td>
				<td>Es el botón donde se hará click para mostrar u ocultar el calendario.</td>
			</tr>
			<tr>
				<td>divDesplegable</td><td>div</td>
				<td>Es el div que será mostrado y ocultado, el que contiene el calendario.</td>
			</tr>
			<tr>
				<td>divTablaFecha</td><td>div</td>
				<td>El div que contendrá las tablas  del calendario (tabla de días, meses o años)</td>
			</tr>
			<tr>
				<td>botonFlechaIzquierda</td><td>img</td>
				<td>Botón para ir al mes, año o intervalo de años anterior.</td>
			</tr>
			<tr>
				<td>campoMesAnio</td><td>div</td>
				<td>Campo para desplegar el mes,el año o el intervalo actual del que se está deplegando un calendario.</td>
			</tr>
			<tr>
				<td>botonFlechaDerecha</td><td>img</td>
				<td>Botón para ir al mes, año o intervalor de años siguiente.</td>
			</tr>
			<tr>
				<td>tablaDiasFecha</td><td>table</td>
				<td>La tabla gráfica que contiene  días de un mes.</td>
			</tr>
			<tr>
				<td>tablaMesesAnio</td><td>table</td>
				<td>La tabla gráfica que contiene los meses de un año.</td>
			</tr>
			<tr>
				<td>tablaIntervaloAnios</td><td>table</td>
				<td>La tabla gráfica que contiene los intervalos de años (12 en 12)</td>
			</tr>
			<tr>
				<td>matrizDias</td><td>Array</td>
				<td>Guarda los td de los días del mes para quitar y agregar eventos de click.</td>
			</tr>
			<tr>
				<td>matrizMeses</td><td>Array</td>
				<td>Guarda los td de los meses del año para quitar y agregar eventos de click.</td>
			</tr>
			<tr>
				<td>matrizIntervalos</td><td>Array</td>
				<td>Guarda los td de los intérvalos de  años para quitar y agregar eventos de click.</td>
			</tr>			
		</table>
		<!--Aquí va la secuencia de funciones !-->
		<h3><font color='blue'>Función establecerPosZ(posZ)</font></h3>
		<p>	
			Sirve para reacomodar frontalmente el selector de fechas, en esta función
			el div de botones siempre se reacomoda adelante del selector.
		</p>
		<h3>Parámetros</h3>
		<p>
			<ul>
				<li><font style='font-weight:bold'>posZ</font>
					La nueva posición frontal del selector de fechas.
				</li>		
			</ul>
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>
		<h3><font color='blue'>Función crearEditable()</font></h3>
		<p>	
			Es sobreescrita de la clase Componente.js. Además de crear el diseño estandar de un 
			componente, agrega el calendario divContenedor.
		</p>
		<h3>Parámetros</h3>
		<p>
			Esta función no requiere parámetros.
		</p>			
		<h3>
			Valores de retorno
		</h3>
		<p>
			Esta función no devuelve ningún valor.
		</p>


		<h3><font color='#0d4036'>Los eventos</font></h3>
		<table>
			<tr class='tituloTabla'>		
				<td>Nombre</td>
				<td>Elemento</td>
				<td>Función donde declara</td>
				<td>Función donde llamada</td>
				<td>Descripción</td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>

		<hr>		
		<a href='#componentes_generales'>Componentes generales</a>
	</body>
</html>	