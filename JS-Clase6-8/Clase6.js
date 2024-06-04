//let persona3 = new Persona('Carla', 'Ponce');

class Persona{ //clase padre
    static contadorPersonas = 0;//atributo estatico
    //email = 'Valor default email'; //atributo no estatico

    static get MAX_OBJ(){ //este metodo simula una constante
        return 5
    }
    constructor(nombre, apellido){
        this._nombre = nombre; 
        this._apellido = apellido;
        if(Persona.contadorPersonas < Persona.MAX_OBJ){
            this.idPersona = ++Persona.contadorPersonas;
        }
        else{
            console.log('Se ha superado el maximo de objetos permitidos');
        }

        //console.log('Se incrementa el contador: '+Persona.contadorObjectosPersona);
    }

    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre = nombre
    }
    get apellido(){
        return this._apellido; 
    }

    nombreCompleto(){
        return this.idPersona+' '+this._nombre+' '+this._apellido;
    }
    //sobreescribiendo la clase padre
    toString(){ //Regresa un string
        //Se aplica polimorfismo que significa = multiples formas en tiempo de ejecucion
        //El metodo que se ejecuta depende si es una referencia de tipo padre o hija 
        return this.nombreCompleto();
    }
    
    static saludar(){
        console.log('Saludos desde este metodo static')
    }
    static saludar2(persona){
        console.log(persona.nombre+' '+persona.apellido);
    }
}
 class Empleado extends Persona{
    constructor(nombre, apellido, departamento){
        super(nombre, apellido);
        this._departamento = departamento;
    }

    get departamento(){
        return this._departamento;
    }

    set departamento (departamento){
        this._departamento = departamento;
    }
    //sobreescritura
    nombreCompleto(){
        return super.nombreCompleto()+', '+this._departamento;
    }

    toString(){
        return this.nombreCompleto();
    }
 }
let persona1 = new Persona('Martin', 'Perez');
console.log(persona1.nombre);
persona1.nombre = 'Juan Carlos';
console.log(persona1.nombre);
//console.log(persona1);
let persona2 = new Persona('Carlos', 'Lara');
console.log(persona2.nombre);
persona2.nombre = 'Maria Laura'
console.log(persona2.nombre)
//console.log(persona2);

let empleado1 = new Empleado('Maria', 'Gimenez', 'Sistemas');
console.log(empleado1);
console.log(empleado1.nombreCompleto())

//Object.prototype.toString Es la manera de acceder a atributos y metodos de manera dinamica
console.log(empleado1.toString());
console.log(persona1.toString());

Persona.saludar();
Persona.saludar2(persona1);
Empleado.saludar();
Empleado.saludar2(empleado1);

//console.log(persona1.contadorObjectosPersona);
console.log(Persona.contadorObjectosPersona);
console.log(Empleado.contadorObjectosPersona);

console.log(persona1.email);
console.log(empleado1.email);
//console.log(Persona.mail); no puede acceder desde la clase
console.log(persona1.toString());
console.log(persona2.toString());
console.log(empleado1.toString());
console.log(Persona.contadorPersonas);
let persona3 = new Persona('Carla', 'Pertosi');
console.log(persona3.toString());
console.log(Persona.contadorPersonas);
console.log(Persona.MAX_OBJ);
//Persona.MAX_OBJ = 10; noo se puede modificar ni alterar
console.log(Persona.MAX_OBJ);
let persona4 = new Persona('Franco', 'Diaz');
console.log(persona4.toString());
let persona5 = new Persona('Liliana', 'Paz');
console.log(persona5.toString())