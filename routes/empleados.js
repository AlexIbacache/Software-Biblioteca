const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    db.query("SELECT * FROM empleados", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/", (req, res) => {

    const { nombre, rut, cargo, correo } = req.body;

    db.query(
        "INSERT INTO empleados(nombre,rut,cargo,correo) VALUES (?,?,?,?)",
        [nombre, rut, cargo, correo],
        (err, result) => {
            if (err) throw err;
            res.json("Empleado creado");
        }
    );
});

module.exports = router;