require("dotenv").config();
const express = require("express");
const morgan = require("morgan");


const app = express();
app.use(express.json());
app.use(morgan("dev"));

// config DB
const { connection, authenticate } = require("./database/database");
authenticate(connection);

// Configurar Rota
const rotasPedidos = require("./routes/pedidos");
const rotaEntregadores = require("./routes/entregadores");
const rotaFiltragem = require("./routes/filtragem");


// Configurar o grupo de rotas no app
app.use(rotasPedidos);
app.use(rotaEntregadores);
app.use(rotaFiltragem);







app.listen(3000, () => {
    connection.sync({ force: true });
    console.log("Servidor rodando em http://localhost:3000");
});