const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const crypto = require("crypto");
const Category = require("./categoryModel"); // Asegúrate de que la ruta sea correcta

const Sticker = sequelize.define(
  "Sticker",
  {
    id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(12).toString("hex"),
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      allowNull: false,
      defaultValue: "Activo",
    },
    categoryId: {
      // Agregar el campo categoryId
      type: DataTypes.STRING(24),
      allowNull: true, // Puedes ajustar esto según tus necesidades
      references: {
        model: Category, // Esto establece la relación
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Stickers",
  }
);

// Asociaciones
Sticker.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

module.exports = Sticker;
