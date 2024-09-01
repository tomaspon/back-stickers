const Cart = require("../../models/cartModel");
const Sticker = require("../../models/stickerModel");
const CartSticker = require("../../models/cartStickersModel");

const addToCart = async (req, res) => {
  try {
    const { items } = req.body;

    console.log("RECIBE POR BODY:", items);

    let cart = await Cart.findOne({ where: { status: "waiting" } });

    if (!cart) {
      cart = await Cart.create({ status: "waiting" });
    }

    for (const { stickerId, quantity } of items) {
      const sticker = await Sticker.findByPk(stickerId);
      if (!sticker) {
        return res
          .status(404)
          .json({ message: `Sticker con ID ${stickerId} no encontrado` });
      }

      let cartSticker = await CartSticker.findOne({
        where: {
          CartId: cart.id,
          StickerId: stickerId,
        },
      });

      if (cartSticker) {
        cartSticker.quantity += quantity;
        await cartSticker.save();
      } else {
        await CartSticker.create({
          CartId: cart.id,
          StickerId: stickerId,
          quantity,
        });
      }
    }

    res.status(200).json({
      message: "Items agregados exitosamente",
      cart,
    });
  } catch (error) {
    console.error("Error al agregar items al carrito:", error);
    res.status(500).json({
      message: "Error al agregar items al carrito",
      error: error.message,
    });
  }
};

module.exports = addToCart;
