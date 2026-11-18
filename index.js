const express = require('express');
const mysql = require("mysql");
const app = express();

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conexion = mysql.createConnection({
    host: "localhost",
    database: "portafolio_db",
    user: "root",
    password: ""
});

conexion.connect(function (error) {
    if (error) {
        console.log("ERROR de conexión a MySQL:", error.message);
    } else {
        console.log("Conectado a MySQL, base portafolio_db");
    }
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Recibe el formulario y guarda en la tabla info
app.post("/validar", function (req, res) {
    const nombres = req.body.nombres || "";
    const celular = req.body.celular || "";
    const correo = req.body.correo || "";
    const comentarios = req.body.comentarios || "";

    const registrar = "INSERT INTO info (nombres, celular, correo, comentarios) VALUES (?, ?, ?, ?)";

    conexion.query(registrar, [nombres, celular, correo, comentarios], function (error) {
        if (error) {
            console.log("ERROR SQL:", error.message);
            return res.status(500).send("Error al guardar los datos.");
        }

        res.send(`
            <script>
              alert("Datos enviados correctamente");
              window.location.href="/";
            </script>
        `);
    });
});

app.listen(3000, () => {
    console.log("Servidor creado en Localhost");
});