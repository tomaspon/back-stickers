const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Sticker = require("./stickerModel");

const CartSticker = sequelize.define(
  "CartSticker",
  {
    CartId: {
      type: DataTypes.UUID,
      references: {
        model: "Carts",
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

CartSticker.belongsTo(Sticker, { foreignKey: "StickerId", as: "sticker" });

module.exports = CartSticker;
