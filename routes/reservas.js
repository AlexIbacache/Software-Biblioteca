const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    db.query("SELECT * FROM reservas", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/", (req, res) => {

    const { cliente_id, libro_id, fecha_reserva } = req.body;

    // Verificar cantidad actual del libro
    db.query("SELECT cantidad FROM libros WHERE id = ?", [libro_id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.json("El libro seleccionado no existe");
        }

        if (results[0].cantidad <= 0) {
            return res.json("No hay ejemplares disponibles de este libro para reservar");
        }

        // Si hay stock, procedemos a registrar la reserva
        db.query(
            "INSERT INTO reservas(cliente_id,libro_id,fecha_reserva) VALUES (?,?,?)",
            [cliente_id, libro_id, fecha_reserva],
            (err, result) => {
                if (err) throw err;
                
                // Descontar una unidad de la cantidad de libros
                db.query(
                    "UPDATE libros SET cantidad = cantidad - 1 WHERE id = ?",
                    [libro_id],
                    (err, updateResult) => {
                        if (err) throw err;
                        res.json("Reserva registrada correctamente y stock descontado");
                    }
                );
            }
        );
    });
});

router.put("/devolucion/:id", (req, res) => {

    const { fecha_devolucion } = req.body;
    const reserva_id = req.params.id;

    // Obtener la reserva para conocer qué libro se está devolviendo
    db.query("SELECT libro_id, fecha_devolucion FROM reservas WHERE id = ?", [reserva_id], (err, results) => {
        if (err) throw err;
        
        if (results.length === 0) {
            return res.json("La reserva no existe");
        }
        
        // Si ya fue devuelto, podemos evitar sumar doble cantidad (opcional, pero buena práctica)
        if (results[0].fecha_devolucion) {
            return res.json("El libro de esta reserva ya había sido devuelto");
        }

        const libro_id = results[0].libro_id;

        // Registrar la devolución
        db.query(
            "UPDATE reservas SET fecha_devolucion=? WHERE id=?",
            [fecha_devolucion, reserva_id],
            (err, result) => {
                if (err) throw err;
                
                // Reponer cantidad del libro a la biblioteca
                db.query(
                    "UPDATE libros SET cantidad = cantidad + 1 WHERE id = ?",
                    [libro_id],
                    (err, updateResult) => {
                        if (err) throw err;
                        res.json("Libro devuelto y stock actualizado");
                    }
                );
            }
        );
    });
});

module.exports = router;