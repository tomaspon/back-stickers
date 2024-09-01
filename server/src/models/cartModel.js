const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./userModel");
const CartSticker = require("./cartStickersModel");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
        model: User,
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

// Relación con User
Cart.belongsTo(User, { foreignKey: "client", as: "user" });
Cart.hasMany(CartSticker, { foreignKey: "CartId", as: "items" });

module.exports = Cart;
