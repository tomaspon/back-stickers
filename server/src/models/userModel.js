const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const crypto = require("crypto"); // Asegúrate de importar el módulo crypto

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(12).toString("hex"), // Genera un ID hexadecimal por defecto
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
  },
  {
    timestamps: true,
    tableName: "Users",
  }
);

module.exports = User;
