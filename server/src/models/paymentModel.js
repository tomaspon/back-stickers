const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Cart = require("./cartModel");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "completed", "failed"]],
      },
    },
    paymentMethod: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "mercado_pago",
      validate: {
        isIn: [["mercado_pago"]],
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    payerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Payments",
  }
);

module.exports = Payment;
