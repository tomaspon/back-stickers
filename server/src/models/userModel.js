const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Asegúrate de tener la instancia de Sequelize configurada

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validación de formato de email
      },
    },
    password: {
      type: DataTypes.STRING(255), // Ajusta la longitud según tus necesidades
      allowNull: true,
      validate: {
        len: [6, 15], // Longitud mínima y máxima de la contraseña
        is: /^[A-Za-z\d@$!%*?&]+$/, // Validación de caracteres de la contraseña
      },
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    profile: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]], // Valores permitidos para el perfil
      },
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

// Importa otros modelos
const Cart = require("./cartModel");
const Payment = require("./paymentModel");

// Relación uno a muchos entre `User` y `Cart`
User.hasMany(Cart, { foreignKey: "userId", as: "carts" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

// Relación uno a muchos entre `User` y `Payment`
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = User;
