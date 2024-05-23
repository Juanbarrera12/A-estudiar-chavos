let x = 10; //Variable de tipo primitiva
console.log(x.lenght);

//Objeto
let persona = {
    nombre: "Carlos",
    apellido: "Barrera",
    email: "cbar@gmail.com",
    edad: 28,
    idioma: "es",
    get lang(){
        return this.idioma.toUpperCase(); //convierte las minisculas a mayusculas
    },
    set lang(lang){
        this.idioma = lang.toUpperCase();
    },
    nombreCompleto: function(){
        return this.nombre+" "+this.apellido;
    },
    get nombreEdad(){ //Este es el metodo get
        return this.nombre+" Edad:"+this.edad
    }
}

console.log(persona.nombre);
console.log(persona.apellido);
console.log(persona.email);
console.log(persona.edad);
console.log(persona);
console.log(persona.nombreCompleto());
console.log("Ejecutando con un objeto");
let persona2 = new Object(); //Debe crear un nuevo objeto en memoria 
persona2.nombre = "Juan";
persona2.direccion = "Arroyo 13";
persona2.telefono = "542618282821";
console.log(persona2.telefono);
console.log("Creamos un nuevo objeto");
console.log(persona["apellido"]); //Accedemos como si fuera un arreglo
console.log("Usamos en ciclo for in");
//for in y accedemos al objeto como si fuera un arreglo
for(propiedad in persona){
    console.log(propiedad);
    console.log(persona[propiedad]);
}
console.log("cambiamos y eliminamos un error");
persona.apellida = "Betancud"; //Cambiamos dinamicamente un valor del objeto
delete persona.apellida; //Eliminamos el error
console.log(persona);

//Distinta forma de imprimir un objeto
//Numero 1: la mas sencilla: concatenar cada valor de cada propiedad
console.log("Distinta forma de imprimir un objeto: forma 1");
console.log(persona.nombre+", "+persona.apellido);

//Numero 2: A través del ciclo for in
console.log("Distinta forma de imprimir un objeto: forma 2");
for(nombrePropiedad in persona){
    console.log(persona[nombrePropiedad]);
}

//Numero 3: La función Object.values()
console.log("Distinta forma de imprimir un objeto: forma 3");
let personaArray = Object.values(persona);
console.log(personaArray);

//Número 4: Utilizaremos el método JSON.stringify
console.log("Distinta forma de imprimir un objeto: forma 4");
let personaString = JSON.stringify(persona);
console.log(personaString);

console.log("Comenzamos a utilizar metodo get");
console.log(persona.nombreEdad);

console.log("Comezamos a utilizar el get para idioma");
persona.lang = "en";
console.log(persona.lang);

function Persona3(nombre, apellido, email){ //constructor
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.nombreCompleto = function(){
        return this.nombre+" "+this.apellido;
    }
}
let padre = new Persona3("Leo","Lopez","lopezl@gmail.com")
padre.nombre = "Luis"; //modificamos el nombre
console.log(padre);

let madre = new Persona3("Laura","Contrera","contreral@gmail.com");
console.log(madre);
console.log(madre.nombreCompleto());



//Diferentes formas de crear objetos

//caso objeto 1
let miObjeto = new Object(); //Esta es una opcion formal
//caso objeto 2
let miObjeto2 = {}; //Esta opcion es breve y recomendada

//caso string 1
let miCadena1 = new String("Hola"); //Sintaxis formal
//caso string 2
let miCadena2 = "Hola"; //Esta es la sintaxis simplificada y recomendada

//caso con numeros 1
let miNumero = new Number(1); //Es formal no recomendable
//caso con números 2
let miNumero2 = 1; //Sintaxis recomendada

//caso boolean 1
let miBoolean1 = new Boolean(false); //Formal
//caso boolean 2
let miBoolean2 = false; //Sintaxis recomendada

//caso Arreglos 1
let miArreglo1 = new Array(); //Formal
//caso Arreglos 2
let miArreglo2 = [ ]; //Recomendado

//caso function 1
let miFuncion1 = new function(){}; //Todo despues de new es considerado objeto
//caso function 2
let miFuncion2 = function(){}; //Notacion simplificada y recomendada

//Uso de prototype
Persona3.prototype.telefono = "2618383832";
console.log(padre);
console.log(madre.telefono);
madre.telefono = "542618383832";
console.log(madre.telefono);

//Uso de call
let persona4 = {
    nombre: "Juan",
    apellido: "Perez",
    nombreCompleto2: function(titulo, telefono){
        return titulo+": "+this.nombre+" "+this.apellido+" "+telefono; 
        //return this.nombre+" "+this.apellido;
    }
}

let persona5 = {
    nombre: "Carlos",
    apellido: "Lara",
}

console.log(persona4.nombreCompleto2("Lic.","542618383834"));
console.log(persona4.nombreCompleto2.call(persona5, "Ing.","542618585856"))

//Metodo apply
let arreglo = ["Ing.", "542618686865" ];
console.log(persona4.nombreCompleto2.apply(persona5, arreglo));