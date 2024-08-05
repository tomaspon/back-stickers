const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Asegúrate de tener la instancia de Sequelize configurada

const Payment = sequelize.define(
  "Payment",
  {
    amount: {
      type: DataTypes.FLOAT, // Utiliza FLOAT para representar cantidades monetarias
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE, // Utiliza DATE para representar fechas
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20), // Ajusta la longitud según los valores de enumeración
      allowNull: false,
      validate: {
        isIn: [["Pending", "Approved", "Cancelled", "Rejected"]], // Validación de enumeración
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users", // Nombre de la tabla referenciada en plural
        key: "id", // Columna de referencia
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "payments", // Nombre de la tabla en la base de datos
  }
);

// Importa el modelo `User`
const User = require("./user");

// Relación de muchos a uno entre `Payment` y `User`
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });

module.exports = Payment;
