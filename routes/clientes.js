const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    db.query("SELECT * FROM clientes", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/", (req, res) => {

    const { nombre, rut, correo, telefono } = req.body;

    db.query(
        "INSERT INTO clientes(nombre,rut,correo,telefono) VALUES (?,?,?,?)",
        [nombre, rut, correo, telefono],
        (err, result) => {
            if (err) throw err;
            res.json("Cliente creado");
        }
    );
});

module.exports = router;