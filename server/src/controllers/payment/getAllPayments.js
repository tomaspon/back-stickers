// src/controllers/payment/getPayments.js
const Payment = require("../../models/paymentModel");
const Sticker = require("../../models/stickerModel");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Sticker, as: "stickers" }], // Incluir stickers asociados
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getPayments;
