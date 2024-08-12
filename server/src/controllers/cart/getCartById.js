const Cart = require("../../models/cartModel");
const getCartById = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findOne({ where: { id: cartId } });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};

module.exports = getCartById;
