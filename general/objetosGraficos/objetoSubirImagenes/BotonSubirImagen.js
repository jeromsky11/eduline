var BotonSubirImagen=function(){
	this.esNuevaImagen=false;
    this.ancho=150;
    this.alto=100;
    this.iconoSubirImagen=null;
    this.debeAjustar=false;
    this.funcionCambioImagen;
    this.objetoPadre;
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

    this.botonSubirImagen=$("<input name='botonSubirImagen' type='file' accept='image/*'"+
                "style='display:none' />");
    this.formularioSubirImagen.append(this.botonSubirImagen);    

    if(this.botonSubirImagen)
        this.botonSubirImagen.off("change");
    this.iconoSubirImagen=$("<img  src='"+urlServidor+"/general/objetosGraficos/objetoSubirImagenes/subirFoto.png' />");
    this.botonSubirImagen.on("change",$.proxy(this.cargarImagen,this)); 


    if(this.iconoSubirImagen)
        this.iconoSubirImagen.off("click");
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
    var iconoSubirImagen=this.iconoSubirImagen;
    var anchoNormal=this.anchoNormal;
    var altoNormal=this.altoNormal;
    var anchoMarco=this.anchoMarco;
    var altoMarco=this.altoMarco;
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
            iconoSubirImagen.attr({"src":src});
            iconoSubirImagen.css({"opacity":"1", "border":"none",
                        "width":objetoPropio.ancho+"px","height":objetoPropio.alto+"px","margin-left":"0px",
                        "margin-top":"0px"});             
            objetoPropio.imagenExiste=true;
            if(objetoPropio.funcionCambioImagen)
                objetoPropio.funcionCambioImagen(img.width,img.height,objetoPropio.objetoPadre); //Hubo un cambio en la imagen.
            return;
        }


        if(img.width>anchoNormal || img.height>altoNormal){
            if(img.height<img.width){   
                var escala=img.width/anchoNormal;
                var nuevoAlto=parseInt(img.height/escala);
                if(nuevoAlto>altoNormal){                    
                    escala=nuevoAlto/altoNormal;
                    nuevoAncho=parseInt(anchoNormal/escala);
                    nuevoAlto=altoNormal;
                }
                else
                    nuevoAncho=anchoNormal;                                
            }                
            else{
                var escala=img.height/altoNormal;
                var nuevoAncho=parseInt(img.width/escala);
                console.log(nuevoAncho+","+anchoNormal);
                if(nuevoAncho>anchoNormal){
                    escala=nuevoAncho/anchoNormal;
                    nuevoAlto=parseInt(altoNormal/escala);
                    nuevoAncho=anchoNormal;
                }
                else
                    nuevoAlto=altoNormal;                
            }            
        }
        else{
            var nuevoAncho=img.width;
            var nuevoAlto=img.height;            
        }         
        var posIzquierda=parseInt(anchoMarco/2-nuevoAncho/2);
        var posArriba=parseInt(altoMarco/2-nuevoAlto/2);        
        //Obtener el centro de la imagen.
        iconoSubirImagen.attr({"src":src});                
        iconoSubirImagen.css({"opacity":"1", "border":"none",
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


