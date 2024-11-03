const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Sticker = require("./stickerModel"); // Importar el modelo Sticker
const crypto = require("crypto");

const Category = sequelize.define(
  "Category",
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
  },
  {
    timestamps: true,
    tableName: "Categories",
  }
);

// Asociaciones
Category.associate = (models) => {
  Category.hasMany(models.Sticker, { foreignKey: "categoryId" });
  Sticker.belongsTo(Category, { foreignKey: "categoryId" }); // Agrega esta línea si deseas definir la relación inversa
};

module.exports = Category;
