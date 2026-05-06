class Reserva {
    constructor(id, cliente_id, libro_id, fecha_reserva, fecha_devolucion) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.libro_id = libro_id;
        this.fecha_reserva = fecha_reserva;
        this.fecha_devolucion = fecha_devolucion;
    }
}

module.exports = Reserva;