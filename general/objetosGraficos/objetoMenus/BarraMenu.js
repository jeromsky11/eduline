//Recibe un json de elementos para el menú.
var BarraMenu=function(elementos,funcionClickMenu,objetoPadre){
	this.elementos=elementos;	
	this.ultimoDivDesplegable=null;
	this.funcionClickMenu=funcionClickMenu;
	this.objetoPadre=objetoPadre;
}
//Retorna un ul con todo el diseño del menú.
BarraMenu.prototype.cargarObjetos=function(){	
	var divMenu=$("<div class='panelMenuPrincipal'>");
	var right=0;
	for(var i=0;i<this.elementos.length;i++){
		var elemento=this.elementos[i];


		var menu=$("<div style='position:absolute; right:"+elemento.posicion+"; width:"+elemento.ancho+"; background-color:rgb(100,100,100);'>");
		divMenu.append(menu);

		var menuTitulo=$("<div class='menuTitulo'>");		
		menuTitulo.html(elemento.texto);		
		menu.append(menuTitulo);

		var divDesplegable=$("<div style='display:none'>");
		menu.append(divDesplegable);
		menuTitulo.on("click",{divDesplegable:divDesplegable},$.proxy(function(event){
			event.stopPropagation();
			if(this.ultimoDivDesplegable!=null)
				this.ultimoDivDesplegable.slideToggle(50,function(){});
			var data=event.data;
			$(data.divDesplegable).slideToggle(50,function(){});
			this.ultimoDivDesplegable=$(data.divDesplegable);
		},this));
	
		for(var j=0;j<elemento.submenus.length;j++){			
			var elemento2=elemento.submenus[j];
			var menuTitulo2=$("<div class='menuTitulo'>");
			menuTitulo2.on("click",{nombre:elemento2.nombre},$.proxy(function(event){
				event.stopPropagation();
				this.funcionClickMenu(event.data.nombre,this.objetoPadre);
				this.ultimoDivDesplegable.slideToggle(50,function(){});
				this.ultimoDivDesplegable=null;
			},this));
			menuTitulo2.html(elemento2.texto);
			divDesplegable.append(menuTitulo2);			
		}
	}
	return divMenu;
}

BarraMenu.prototype.cargarEventos=function(){	
	$("html").on("click",$.proxy(function(){
		if(this.ultimoDivDesplegable)
			this.ultimoDivDesplegable.slideToggle(50,function(){});
		this.ultimoDivDesplegable=null;
	},this));

	//$('[data-toggle="tooltip"]').tooltip();
}

