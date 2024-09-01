const Cart = require("../../models/cartModel");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();

    if (!carts.length) {
      return res.status(404).json({ message: "No se encontraron carritos" });
    }

    res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los carritos", error });
  }
};

module.exports = getAllCarts;
