const CartSticker = require("../../models/cartStickersModel");

const updateCartItem = async (req, res) => {
  const { cartId, stickerId } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity === undefined || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "La cantidad debe ser mayor a 0" });
    }

    const cartSticker = await CartSticker.findOne({
      where: {
        CartId: cartId,
        StickerId: stickerId,
      },
    });

    if (!cartSticker) {
      return res
        .status(404)
        .json({ message: "Ítem no encontrado en el carrito" });
    }

    cartSticker.quantity = quantity;
    await cartSticker.save();

    res.status(200).json({
      message: "Cantidad del ítem actualizada exitosamente",
      cartSticker,
    });
  } catch (error) {
    console.error("Error al actualizar el ítem del carrito:", error);
    res.status(500).json({
      message: "Error al actualizar el ítem del carrito",
      error: error.message,
    });
  }
};

module.exports = updateCartItem;
