const Cart = require("../../models/cartModel");

const deleteCartItem = async (req, res) => {
  const { cartId } = req.params;
  const { stickerId } = req.body;

  try {
    const cart = await Cart.findOne({ where: { id: cartId } });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Verificar la estructura de cart.items y stickerId
    console.log("Items en el carrito:", cart.items);
    console.log("Sticker ID a eliminar:", stickerId);

    if (!Array.isArray(cart.items)) {
      // Intentar convertir cart.items en un array si no lo es
      try {
        cart.items = JSON.parse(cart.items);
      } catch (parseError) {
        return res
          .status(500)
          .json({ message: "Formato inválido para items en el carrito" });
      }

      if (!Array.isArray(cart.items)) {
        return res
          .status(500)
          .json({ message: "Estructura de items inválida en el carrito" });
      }
    }

    // Filtra los items para eliminar el sticker especificado
    const updatedItems = cart.items.filter(
      (item) => item.stickerId !== stickerId
    );
    // Actualiza el carrito con los items restantes
    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Ítem eliminado exitosamente", cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el ítem del carrito", error });
  }
};

module.exports = deleteCartItem;
