
var BotonSubirImagen=function(){
	this.esNuevaImagen=false; //Indica si se cambió la imagen que existía antes.
    this.ancho=150; //El ancho del botón.
    this.alto=100; //El alto del botón
    //Sirve para previsualizar la imagen (tamaño normal o escalado ) que el usuario elige
    this.iconoSubirImagen=null;  
    //Indica con false si al cargar una imagen su tamaño debe ajustarse al del 
    //botón y si es true el botón debe expandirse a lo que mida la imagen.
    this.debeAjustar=false; 
    //Es una función del objeto que creó el botón que es llamada cuando al botón se le 
    //carga una nueva imagen.
    this.funcionCambioImagen; 
    //Es el objeto que creó el botón, a través de el se llama a funcionCambioImagen
    this.objetoPadre;
    //Es un input que se usa se tipo file para podre abrir el explorador de archivos y elegir una imagen.
    this.botonSubirImagen;

    this.divBotonSubirImagen; //Es el div que contiene todos los elementos del diseño del botón.
    //Es un formulario que servirá cuando se desee subir la imagen al servidor mediante un formData.
    this.formularioSubirImagen;
    //El anchoNormal es el ancho del botón y sirve  para redimensionar la imagen que 
    //es elegida del navegador tomandolo como ancho límite y como el denominador en el cálculo 
    //de la escala de la imagen.
    this.anchoNormal;
    //El altoNormal es el alto del botón y sirve  para redimensionar la imagen que 
    //es elegida del navegador tomandolo como alto límite y como el denominador en el cálculo 
    //de la escala de la imagen.
    this.altoNormal;
    //Cuando una imagen elegida es redimensionada a escala, su posición respecto al margen izquierdo 
    //es recalculada de acuerdo al nuevo tamaño y así poder centrarla horizontalmente.
    this.posIzquierda;  
    //Cuando una imagen elegida es redimensionada a escala, su posición respecto al margen superior 
    //es recalculada de acuerdo al nuevo tamaño y así poder centrarla verticalmente.
    this.posArriba;
    //Para recalcular posIzquierda es necesario el anchoMarco ya que la imagen debe ser centrada
    //horizontalmente, por lo tanto toma el width de divBotonSubirImagen.
    this.anchoMarco;
    //Para recalcular posArriba es necesario el altoMarco ya que la imagen debe ser centrada
    //verticalmente, por lo tanto toma el height de divBotonSubirImagen.
    this.altoMarco;
    //Cuando el botonSubirImagen está dentro de un formulario donde es obligatorio elegir una imagen,
    //esta variable booleana sirve para informar si la imagen ya está elegida.
    this.imagenExiste;
}


BotonSubirImagen.prototype.activar=function(activo){
    this.iconoSubirImagen.off("click");
    if(activo){
        this.iconoSubirImagen.on("click",$.proxy(function(){
            this.botonSubirImagen.click();
        },this));
        this.iconoSubirImagen.css("cursor","pointer");
    }
    else
        this.iconoSubirImagen.css("cursor","not-allowed");    
}
BotonSubirImagen.prototype.cargarObjetos=function(){
	this.divBotonSubirImagen=$("<div>");  
    this.divBotonSubirImagen.css({"width":this.ancho+"px","height":this.alto+"px","border":"solid 2px #aaaaaa",
       "background-color":"#eeeeee" });    


    this.formularioSubirImagen=$("<form enctype='multipart/form-data'  method='post'> ");
    this.divBotonSubirImagen.append(this.formularioSubirImagen);

    if(this.botonSubirImagen)
        this.botonSubirImagen.off("change");
    this.botonSubirImagen=$("<input name='botonSubirImagen' type='file' accept='image/*'"+
                "style='display:none' />");
    this.formularioSubirImagen.append(this.botonSubirImagen);    
        
    this.botonSubirImagen.on("change",$.proxy(this.cargarImagen,this)); 


    if(this.iconoSubirImagen)
        this.iconoSubirImagen.off("click");
    this.iconoSubirImagen=$("<img  src='"+urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png' />");
    this.iconoSubirImagen.css({"width":(this.ancho-10)+"px","height":(this.alto-10)+"px","margin-left":"5px","margin-top":"5px",
                    "cursor":"pointer","opacity":"0.1"});
    this.formularioSubirImagen.append(this.iconoSubirImagen);


    this.iconoSubirImagen.on("click",$.proxy(function(){
        this.botonSubirImagen.click()
    },this));

    this.anchoNormal=parseInt(this.iconoSubirImagen.css("width"));
    this.altoNormal=parseInt(this.iconoSubirImagen.css("height"));
    this.posIzquierda=this.iconoSubirImagen.css("margin-left");
    this.posArriba=this.iconoSubirImagen.css("top");    
    this.anchoMarco=parseInt(this.divBotonSubirImagen.css("width"));
    this.altoMarco=parseInt(this.divBotonSubirImagen.css("height"));

    return this.divBotonSubirImagen;
}

BotonSubirImagen.prototype.cargarImagen=function(event){    
    var fr=new FileReader();      
    var objetoPropio=this;

    fr.onload=function(){     
        objetoPropio.esNuevaImagen=true;  
        objetoPropio.cargarImagenManual(fr.result,false);
    }
    if(event.target.files.length>0)
        fr.readAsDataURL(event.target.files[0]); 
}

BotonSubirImagen.prototype.cargarImagenManual=function(src,ancho,alto){
    var img=new Image();                        
    var objetoPropio=this;  
    img.onload=function(){               
        if(objetoPropio.debeAjustar){ 
            if(ancho)
                objetoPropio.ancho=ancho;
            else
                objetoPropio.ancho=img.width;
            if(alto)
                objetoPropio.alto=alto;
            else
                objetoPropio.alto=img.height;
            objetoPropio.divBotonSubirImagen.css({"width":objetoPropio.ancho+"px","height":objetoPropio.alto+"px",
                                "border":"none"});
            objetoPropio.divBotonSubirImagen.parent().css({"width":objetoPropio.ancho+"px","height":objetoPropio.alto+"px",
                                "border":"none"});
            objetoPropio.iconoSubirImagen.attr({"src":src});
            objetoPropio.iconoSubirImagen.css({"opacity":"1", "border":"none",
                        "width":objetoPropio.ancho+"px","height":objetoPropio.alto+"px","margin-left":"0px",
                        "margin-top":"0px"});             
            objetoPropio.imagenExiste=true;
            if(objetoPropio.funcionCambioImagen)
                objetoPropio.funcionCambioImagen(img.width,img.height,objetoPropio.objetoPadre); //Hubo un cambio en la imagen.
            return;
        }


        if(img.width>objetoPropio.anchoNormal || img.height>objetoPropio.altoNormal){
            if(img.height<img.width){   
                var escala=img.width/objetoPropio.anchoNormal;
                var nuevoAlto=parseInt(img.height/escala);
                if(nuevoAlto>objetoPropio.altoNormal){                    
                    escala=nuevoAlto/objetoPropio.altoNormal;
                    nuevoAncho=parseInt(objetoPropio.anchoNormal/escala);
                    nuevoAlto=objetoPropio.altoNormal;
                }
                else
                    nuevoAncho=objetoPropio.anchoNormal;                                
            }                
            else{
                var escala=img.height/objetoPropio.altoNormal;
                var nuevoAncho=parseInt(img.width/escala);            
                if(nuevoAncho>objetoPropio.anchoNormal){
                    escala=nuevoAncho/objetoPropio.anchoNormal;
                    nuevoAlto=parseInt(objetoPropio.altoNormal/escala);
                    nuevoAncho=objetoPropio.anchoNormal;
                }
                else
                    nuevoAlto=objetoPropio.altoNormal;
            }            
        }
        else{
            var nuevoAncho=img.width;
            var nuevoAlto=img.height;            
        }         
        var posIzquierda=parseInt(objetoPropio.anchoMarco/2-nuevoAncho/2);
        var posArriba=parseInt(objetoPropio.altoMarco/2-nuevoAlto/2);        
        //Obtener el centro de la imagen.
        objetoPropio.iconoSubirImagen.attr({"src":src});                
        objetoPropio.iconoSubirImagen.css({"opacity":"1", "border":"none",
                        "width":nuevoAncho+"px","height":nuevoAlto+"px","margin-left":posIzquierda+"px",
                        "margin-top":posArriba+"px"});  

        objetoPropio.imagenExiste=true;
        if(objetoPropio.funcionCambioImagen) 
            objetoPropio.funcionCambioImagen(img.width,img.height,objetoPropio.objetoPadre); //Hubo un cambio en la imagen.        
    }
    img.src=src;
}


BotonSubirImagen.prototype.subirImagen=function(jsonImagen,funcionTerminarSubir,objetoPadre){
	var formData=new FormData(this.formularioSubirImagen[0]);
	formData.append("campoJsonImagen",JSON.stringify(jsonImagen));		
	$.ajax({
		url:"../servidor/SubirImagen.php",
		type:'POST',
		data:formData,
		cache:false,
		contentType:false,
		processData:false,
		beforeSend:function(){},
		success:function(data){			
			funcionTerminarSubir(data,objetoPadre);
		},
		error:function(){}
	});
}

BotonSubirImagen.prototype.cargarEventos=function(){     
    /*
    this.iconoSubirImagen.on("click",$.proxy(function(){
    		this.botonSubirImagen.click()
    },this));
    this.botonSubirImagen.on("change",$.proxy(this.cargarImagen,this));*/
}
BotonSubirImagen.prototype.limpiar=function(){
    this.imagenExiste=false;
    this.iconoSubirImagen.attr("src","../general/objetoSubirImagenes/subirFoto.png");
    this.iconoSubirImagen.css({"width":this.anchoNormal+"px","height":this.altoNormal+"px",
                    "left":this.posIzquierda,"top":this.posArriba,"opacity":"0.1"});    
}


