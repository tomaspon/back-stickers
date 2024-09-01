const CartSticker = require("../../models/cartStickersModel");
const Cart = require("../../models/cartModel");

const deleteCartItem = async (req, res) => {
  const { cartId } = req.params;
  const { stickerId } = req.body;

  // Validar que stickerId está presente
  if (!stickerId) {
    return res.status(400).json({ message: "Sticker ID es requerido" });
  }

  try {
    // Buscar el carrito
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Buscar el ítem en el carrito
    const cartSticker = await CartSticker.findOne({
      where: {
        CartId: cart.id,
        StickerId: stickerId,
      },
    });

    if (!cartSticker) {
      return res
        .status(404)
        .json({ message: "Ítem no encontrado en el carrito" });
    }

    // Eliminar el ítem del carrito
    await cartSticker.destroy();

    res.status(200).json({ message: "Ítem eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el ítem del carrito:", error);
    res.status(500).json({
      message: "Error al eliminar el ítem del carrito",
      error: error.message,
    });
  }
};

module.exports = deleteCartItem;
