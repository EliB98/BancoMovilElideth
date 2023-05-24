const formatEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

//variable que almacena el formato de la contraseña
const formatPassword = /^\w+$/;

const formatPassword2 = /[A-Za-z0-9&@_/+%]+/;

let usuario; //variable que almacena el email del usuario
let pass; //variable que almacena la contraseña
let camposVacios; //variable que almacena un valor booleano para los inputs
let existenEspaciosVacios; //variable que almacena un valor booleano si existen espacios en los datos
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
        //console.log("ambos campos tienen datos");

        //validamos si existen espacios vacios en los campos ingresados
        existenEspaciosVacios = espaciosVacios(usuario,pass);
        if(existenEspaciosVacios==true){
            mensajeError("Usuario o Contraseña Incorrectos","mensaje");
        }
        else{
            //console.log("excelente, no existen espacios vacios en los campos ingresados");
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

//FUNCION PARA VERIFICAR SI EXISTE ESPACIOS EN BLANCO EN LOS DATOS
function espaciosVacios(usuario, pass){
    let espaciosUser = false;
    let espaciosPass = false;
    let cont = 0;
}


//FUNCION PARA LOS MENSAJES DE ERROR
function mensajeError(mensaje,identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}