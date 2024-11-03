const User = require("./src/models/userModel");
const Cart = require("./src/models/cartModel");
const Payment = require("./src/models/paymentModel");
const Sticker = require("./src/models/stickerModel");
const Category = require("./src/models/categoryModel"); // Asegúrate de importar el modelo Category
const CartSticker = require("./src/models/cartStickersModel");

Sticker.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Sticker, { foreignKey: "categoryId" });

module.exports = {
  User,
  Cart,
  Sticker,
  Payment,
  CartSticker,
  Category,
};
