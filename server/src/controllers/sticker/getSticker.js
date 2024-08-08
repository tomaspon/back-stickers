const Sticker = require("../../models/stickerModel");

const getSticker = async (req, res) => {
  try {
    const stickers = await Sticker.findAll();
    res.json(stickers);
  } catch (error) {
    console.error("Error al obtener los stickers:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = getSticker;
