miFuncion(8, 2);

function miFuncion(a, b){
    //console.log("Sumamos: "+ (a + b));
    return a + b;
}
//Llamando a la funcion
miFuncion(5, 4);

let resultado = miFuncion(6, 7);
console.log(resultado);

//Declaroamos una funcion de tipo expresion
let x = function(a, b){ return a + b};
resultado = x(5, 6);
console.log(resultado);

// Funciones de tipo self y invoking
(function(a, b){
    console.log('Ejecutando la funcion: '+ (a + b));
})(9, 6);

console.log(typeof miFuncion);
function miFuncionDos(a, b){
    console.log(arguments.length);
}

miFuncionDos(5, 7, 3, 6);
//to string
 var miFuncionTexto = miFuncionDos.toString();
 console.log(miFuncionTexto);

 //Funciones flecha
 const sumarFuncionFlecha = (a, b) => a + b;
 resultado = sumarFuncionFlecha(3, 7);
 console.log(resultado);
//Funcion tipo expresion
 let sumar = function(a = 4, b = 8){
    console.log(arguments[0]);
    console.log(arguments[1]);
    return a + b + (arguments[2]);
 }
 resultado = sumar(2, 3, 9)
 console.log(resultado);

 //Sumar todos los argumentos
 let respuesta = sumarTodo(5, 4, 13, 10, 9);
 console.log(respuesta);
 function sumarTodo(){
    let suma = 0;
    for(let i = 0; i < arguments.length; i++){
        suma += arguments[i];
    }
    return suma;
 }

 //Tipos primitivos
 let k = 10;
 function cambiarValor(a){
    a = 20;
 }
 cambiarValor(k);
 console.log(k);

 const persona = {
    nombre: 'Edinson',
    apellido: 'Cavani'
 }
console.log(persona);
 function cambiarValorObjeto(p1){
    p1.nombre = 'Miguel';
    p1.apellido = 'Merentiel';
 }

 cambiarValorObjeto(persona)
 console.log(persona)