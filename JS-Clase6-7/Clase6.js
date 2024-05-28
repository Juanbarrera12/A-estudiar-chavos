//let persona3 = new Persona('Carla', 'Ponce');

class Persona{ //clase padre
    constructor(nombre, apellido){
        this._nombre = nombre; 
        this._apellido = apellido;
    }

    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre = nombre
    }

    nombreCompleto(){
        return this._nombre+' '+this._apellido;
    }

    toString(){
        return this.nombreCompleto();
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