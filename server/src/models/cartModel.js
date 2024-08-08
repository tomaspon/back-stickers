const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Asegúrate de tener la instancia de Sequelize configurada

const Cart = sequelize.define(
  "Cart",
  {
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "waiting",
      validate: {
        isIn: [["waiting", "shopped"]],
      },
    },
    client: {
      type: DataTypes.UUID,
      references: {
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Carts",
  }
);

// Importa el modelo `Sticker`
const Sticker = require("./stickerModel"); // Asegúrate de tener el modelo `Sticker` importado

// Relación de muchos a muchos entre `Cart` y `Sticker`
Cart.belongsToMany(Sticker, { through: "CartStickers", as: "stickers" });
Sticker.belongsToMany(Cart, { through: "CartStickers", as: "carts" });

module.exports = Cart;
