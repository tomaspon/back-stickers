// models/cartModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./userModel");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    tableName: "Carts",
  }
);

module.exports = Cart;
