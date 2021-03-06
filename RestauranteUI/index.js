const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const productoApi = require("./Controllers/Producto/Producto.js");
const restauranteApi = require("./Controllers/Restaurante/Restaurante");
const usuarioApi = require("./Controllers/Usuario/Usuario");
const publicController = require("./Controllers/index");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());
// rutas de los files de react compilado
app.use(express.static(path.join(__dirname, "tienda/build")));
app.use(express.static(path.join(__dirname, "tienda-admin/build")));

// Lista de controladores para usar la API
productoApi(app);
restauranteApi(app);
usuarioApi(app);
publicController(app);

// Verificar si esta funcionando
app.get("/Console/up", function (req, res, next) {
  res.send("Hola!");
});

// pagina del player
app.get("/Home*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

// pagina del player
app.get("/Login*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

// pagina para crear nueva tienda
app.get("/Nueva/Tienda", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

// pagina para el admin
app.get("/Admin*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda-admin/build/index.html"));
});

const server = app.listen(3001, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
