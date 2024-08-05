const sequelize = require("./src/database"); // Tu instancia de Sequelize

// Importar modelos
const User = require("./src/models/userModel");
const Cart = require("./src/models/cartModel");
const Payment = require("./src/models/paymentModel");
const Sticker = require("./src/models/stickerModel");

// Sincronizar modelos con la base de datos
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
