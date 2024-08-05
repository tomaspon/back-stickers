const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Asegúrate de tener la instancia de Sequelize configurada

const Sticker = sequelize.define(
  "Sticker",
  {
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
  },
  {
    timestamps: true,
    tableName: "Stickers",
  }
);

module.exports = Sticker;
