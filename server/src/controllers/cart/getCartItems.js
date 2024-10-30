const Cart = require("../../models/cartModel");
const CartSticker = require("../../models/cartStickersModel");
const Sticker = require("../../models/stickerModel");

const getCartItems = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: CartSticker,
          as: "items",
          include: [
            {
              model: Sticker,
              as: "sticker",
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getCartItems;
