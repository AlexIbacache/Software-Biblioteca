class Empleado {
    constructor(id, nombre, rut, cargo, correo) {
        this.id = id;
        this.nombre = nombre;
        this.rut = rut;
        this.cargo = cargo;
        this.correo = correo;
    }
}

module.exports = Empleado;