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
        isIn: [["waiting", "shopped"]], // Valores permitidos para el estado
      },
    },
    student: {
      type: DataTypes.UUID,
      references: {
        model: "Users", // Nombre de la tabla referenciada en plural
        key: "id", // Columna de referencia
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "carts",
  }
);

// Importa el modelo `Sticker`
const Sticker = require("./sticker"); // Asegúrate de tener el modelo `Sticker` importado

// Relación de muchos a muchos entre `Cart` y `Sticker`
Cart.belongsToMany(Sticker, { through: "CartStickers", as: "stickers" });
Sticker.belongsToMany(Cart, { through: "CartStickers", as: "carts" });

module.exports = Cart;
