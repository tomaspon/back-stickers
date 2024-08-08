const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./userModel");

const Payment = sequelize.define(
  "Payment",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["Pending", "Approved", "Cancelled", "Rejected"]],
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Payments",
  }
);

Payment.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });

module.exports = Payment;
