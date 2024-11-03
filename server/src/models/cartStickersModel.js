// models/cartStickersModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Sticker = require("./stickerModel"); // Verifica que esta ruta sea correcta

const CartSticker = sequelize.define(
  "CartSticker",
  {
    CartId: {
      type: DataTypes.UUID,
      references: {
        model: "Carts", // Asegúrate de que el modelo Carts también esté definido
        key: "id",
      },
    },
    StickerId: {
      type: DataTypes.STRING(24),
      references: {
        model: "Stickers",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "CartStickers",
  }
);

// Asegúrate de que el modelo Sticker está definido antes de usarlo aquí
CartSticker.belongsTo(Sticker, { foreignKey: "StickerId", as: "sticker" });

module.exports = CartSticker;
