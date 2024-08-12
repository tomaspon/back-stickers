const Cart = require("../../models/cartModel");

const addCartProduct = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Se requiere un arreglo de items válido." });
  }

  const { stickerId, quantity } = items[0];

  try {
    const cart = await Cart.findOne({ where: { id: cartId } });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const currentItems = Array.isArray(cart.items) ? cart.items : [];

    const existingItemIndex = currentItems.findIndex(
      (item) => item.stickerId === stickerId
    );

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({ stickerId, quantity });
    }

    cart.items = JSON.stringify(currentItems);

    console.log("Estado del carrito antes de guardar:", cart.items);
    await cart.save();
    console.log("Carrito guardado:", cart);

    res.status(200).json({ message: "Item agregado exitosamente", cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al agregar el ítem al carrito", error });
  }
};

module.exports = addCartProduct;
