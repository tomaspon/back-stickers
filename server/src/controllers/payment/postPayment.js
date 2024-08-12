const Payment = require("../../models/paymentModel");
const Cart = require("../../models/cartModel");
const User = require("../../models/userModel");

const postPayment = async (req, res) => {
  try {
    const { userId, cartId, amount, paymentMethod } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!userId || !cartId || !amount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verificar si el carrito y el usuario existen
    const cart = await Cart.findByPk(cartId);
    const user = await User.findByPk(userId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Crear el nuevo pago
    const newPayment = await Payment.create({
      userId,
      cartId,
      amount,
      paymentMethod,
      status: "pending", // Status inicial puede ser 'pending'
    });

    // Responder con el nuevo pago creado
    return res.status(201).json(newPayment);
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = postPayment;
