const formatEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


const formatPassword = /^\w+$/;

const formatPassword2 = /[A-Za-z0-9&@_/+%]+/;

let usuario;
let pass;
let camposVacios;
let existenEspaciosVacios; 
let sinEspacios=false; 

var cuentas = {usuario: "Mali28@yahoo.com", pass:"mIa715g3" , saldo: 5000, nombre: "Meli"}
    
function ingresar(){
    let usiario = document.getElementById('user').value
    let password = document.getElementById('password').value
    
    camposVacios = validarCampos(usuario,pass);

    if(camposVacios==true){
        mensajeError("Es necesario llenar todos los campos","mensaje");
    }
   
    else{
    
        existenEspaciosVacios = espaciosVacios(usuario,pass);
        if(existenEspaciosVacios==true){
            mensajeError("Usuario o Contraseña Incorrectos","mensaje");
        }
        else{
          
            sinEspacios = true;
        }
    }
   
    if (usiario == 'Mali28@yahoo.com' && password == 'mIa715g3'){
        window.location.replace("home.html")
    }
    else{
        mensajeError("Usuario o contraseña incorrectos","mensaje");
    }

}
function validarCampos(usuario, pass){
    let resultado = false;

    if((usuario == "") && (pass=="")){
        resultado = true;
    }
    else if((usuario!="") && (pass=="")){
        resultado = true;
    }
    else if((usuario=="") && (pass!="")){
        resultado = true;
    }

    return resultado;
}

/////////////////////////////////VERIFICACIÓN SI EXISTE ESPACIOS EN BLANCO EN LOS DATOS
function espaciosVacios(usuario, pass){
    let espaciosUser = false;
    let espaciosPass = false;
    let cont = 0;
}


//////////////////////////////////////////////////PARA LOS MENSAJES DE ERROR
function mensajeError(mensaje,identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}