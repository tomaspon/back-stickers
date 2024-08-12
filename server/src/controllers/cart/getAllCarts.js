const Cart = require("../../models/cartModel");

const getAllCarts = async (req, res) => {
  try {
    // Obtener todos los carritos de la base de datos
    const carts = await Cart.findAll();

    // Si no hay carritos, devolver un mensaje adecuado
    if (!carts.length) {
      return res.status(404).json({ message: "No se encontraron carritos" });
    }

    // Devolver los carritos encontrados
    res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los carritos", error });
  }
};

module.exports = getAllCarts;
