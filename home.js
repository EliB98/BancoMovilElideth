/*//////////////////////////////////////SECCIÓN HOME*//////////////////////////////////////////////////
var usuario = localStorage.getItem("user");
var pass = localStorage.getItem("pass");
var saldo = localStorage.getItem("saldo");
var nombre = localStorage.getItem("nombre");

let saldoActual = saldo;

const ExpRegSoloNumeros=/^[0-9]+$/;

console.log(usuario);
console.log(pass);
console.log(saldo);
console.log(nombre);

estadoCuenta(saldoActual);
insertarNombreUsuario(nombre);


function inicio(){
    window.location.replace("index.html")
}

/*/////////////////////////////////////AQUÍ INICIA OPERACION RETIRO*/////////////////////////////////////

/////////////////////////////////FUNCION PARA REALIZAR RETIROS A CUENTA

function retirar(){

    let cantidad = document.getElementById("retiro").value;
    
    let campoVacio = evaluarCampoVacio(cantidad);

    if(campoVacio == true){
        errorMesage("Porfavor, digite la cantidad que desea retirar","mensajeRetiro");
    }
    else{
        //mensajeOK("campo no vacio", "mensajeRetiro");
        let esEntero = validarEsEntero(cantidad);

        if(esEntero){
            //mensajeOK("son numeros enteros");
            let mayorQueSaldo = evaluarMayorSaldoDisponible(cantidad);
            if(mayorQueSaldo){
                errorMesage("No tienes suficiente saldo disponible","mensajeRetiro");
                limpiarInputs("retiro");
            }
            else{
                //mensajeOK("la cantidad no es mayor que el saldo disponible");
                let saldoNoMenor = saldoNoMenorDiez(cantidad);

                if(saldoNoMenor){
                    errorMesage("Retiro no procedente, el saldo no puede ser menor a $10.00 pesos","mensajeRetiro");
                    limpiarInputs("retiro");
                }
                else{
                    //mensajeOK("una vez retirado el saldo no sera menor de $10.00 pesos");
                    autorizacionRetiro(cantidad);
                }
            }
        }
        else{
            errorMesage("El dato ingresado no es un numero entero","mensajeRetiro");
            limpiarInputs("retiro");
        }
    }
}

//FUNCION QUE EVALUA SI LA CANTIDAD A RETIRAR ES MAYOR AL SALDO DISPONIBLE
function evaluarMayorSaldoDisponible(cantidad){
    let numero = parseInt(cantidad);
    let resultado = false;

    if((numero>saldoActual)){
        resultado = true;
    }
    return resultado;
}

function saldoNoMenorDiez(cantidad){
    let numero = parseInt(cantidad);
    if((saldoActual-numero)<10){
        return true;
    }
    else{
        return false;
    }
}

//FUNCION DE AUTORIZACIÓN DEL RETIRO SI LA CANTIDAD NO ES MAYOR QUE EL SALDO
function autorizacionRetiro(cantidad){
    saldoActual -= cantidad;
    actualizarSaldo(saldoActual);
    let mensaje = "saldo retirado: $ "+cantidad+".00 mx";
    limpiarInputs("retiro");
    mensajeOK(mensaje, "mensajeRetiro");
}


/*///////////////////////////////SECCIÓN OPERACION DEPOSITO//////////////////////////////////*/

//////////////////////////FUNCION PARA REALIZAR DEPOSITOS A CUENTA
function depositar(){
    let cantidad = document.getElementById("deposito").value;

    let campoVacio = evaluarCampoVacio(cantidad);

    if(campoVacio == true){
        errorMesage("Es necesario llenar el campo","mensajeDeposito");
    }
    else{
      
        let esEntero = validarEsEntero(cantidad);

        if(esEntero){
          
            let seraMayor = evaluarDeposito(cantidad);

            if(seraMayor){
          
                autorizacionDeposito(cantidad);
            }
            else{
                errorMesage("No procedente, tu saldo no puede ser mayor a 990 pesos","mensajeDeposito");
                limpiarInputs("deposito");
            }

        }
        else{
            errorMesage("El dato ingresado no es un numero entero","mensajeDeposito");
            limpiarInputs("deposito");
        }
    }
}


function evaluarDeposito(cantidad){

    let resultadoSuma = suma(saldoActual,cantidad);

    if(resultadoSuma < 5000){
        return true;
    }
    else{
        return false;
    }
}

function autorizacionDeposito(cantidad){
    saldoActual+=parseInt(cantidad);
    actualizarSaldo(saldoActual);
    let mensaje = "cantidad depositado: $ "+cantidad+".00 mx";
    limpiarInputs("deposito");
    mensajeOK(mensaje,"mensajeDeposito");
}

/*//////////////////////////////FUNCIONES ADICIONALES POR OPERACIÓN*/////////////////////////////////////

/////////////////////////////////////FUNCION PARA ACTUALIZAR EL SALDO
function actualizarSaldo(saldoActual){
    document.getElementById("disponible").innerText = saldoActual;
}

///////////////////FUNCION PARA VERIFICAR SI EL FORMATO INGRESADO SOLO SON NUMEROS ENTEROS
function validarEsEntero(cantidad){

    if(ExpRegSoloNumeros.test(cantidad)){
        return true;
    }
    else{
        return false;
    }
}

//////////////////////////////////////FUNCION PARA MOSTRAR MENSAJES DE ERROR
function errorMesage(mensaje, identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}

////////////////FUNCION PARA MOSTRAR EL MENSAJE DE AUTORIZACION DE RETIRO O DEPOSITO
function mensajeOK(mensaje,identificador){
    console.log(mensaje);
    document.getElementById(identificador).innerText = mensaje;
}

//FUNCION QUE EVALUA SI EL USUARIO INGRESO ALGUN DATO EN EL INPUT
function evaluarCampoVacio(cantidad){
    let vacio = false;

    if(cantidad == ""){
        vacio = true;
    }

    return vacio;
}

//FUNCION OPERACION SUMA
function suma(saldoActual,cantidad){
    let numero1 = saldoActual;
    let numero2 = parseInt(cantidad);
    let resultado = numero1+numero2;
    return resultado;
}

//FUNCION OPERACION RESTA
function resta(saldoActual,cantidad){
    let numero1 = saldoActual;
    let numero2 = parseInt(cantidad);
    let resultado = numero1-numero2;
    return resultado;
}

//FUNCION QUE SE ACTIVA AL INICIO PARA PONER EL SALDO ACTUAL, SOLO SE EJECUTA UNA VEZ
function estadoCuenta(saldoActual){
    document.getElementById("disponible").innerText = saldoActual;
}

//FUNCION PARA LIMPIAR LOS INPUTS
function limpiarInputs(identificador){
    document.getElementById(identificador).value = "";
}

//FUNCION PARA AGREGAR EL NOMBRE DEL USUARIO EN LA INTERFAZ DE BIENVENIDA
function insertarNombreUsuario(nombre){
    document.getElementById("nombre-usuario").innerText = nombre;
}

function cerrarSesion(){
    localStorage.getItem("user","");
    localStorage.getItem("pass","");
    localStorage.getItem("saldo","");
    localStorage.getItem("nombre","");
    window.location.replace('index.html');
}

