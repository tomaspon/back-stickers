const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const sequelize = require("./database"); // Importa la instancia de Sequelize

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Servidor alojado correctamente en el puerto ${PORT}`);
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
});
