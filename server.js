const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const clientes = require("./routes/clientes");
const empleados = require("./routes/empleados");
const libros = require("./routes/libros");
const reservas = require("./routes/reservas");

app.use("/clientes", clientes);
app.use("/empleados", empleados);
app.use("/libros", libros);
app.use("/reservas", reservas);

app.use(express.static("view"));
app.use("/img", express.static("img"));


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});