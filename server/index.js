const sequelize = require("./src/database");

// Importar modelos
const User = require("./src/models/userModel");
const Cart = require("./src/models/cartModel");
const Payment = require("./src/models/paymentModel");
const Sticker = require("./src/models/stickerModel");

sequelize
  .sync({ force: true })

  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

module.exports = {
  User,
  Cart,
  Sticker,
  Payment,
  sequelize,
};
