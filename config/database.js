const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "biblioteca"
});

conexion.connect(err => {
    if (err) {
        console.log("Error conexión BD", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

module.exports = conexion;