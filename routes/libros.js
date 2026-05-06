const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    db.query("SELECT * FROM libros", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/", (req, res) => {

    const { titulo, autor, editorial, anio, cantidad } = req.body;

    db.query(
        "INSERT INTO libros(titulo,autor,editorial,anio,cantidad) VALUES (?,?,?,?,?)",
        [titulo, autor, editorial, anio, cantidad],
        (err, result) => {
            if (err) throw err;
            res.json("Libro agregado");
        }
    );
});

module.exports = router;