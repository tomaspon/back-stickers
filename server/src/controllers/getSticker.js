const Sticker = require("../models/stickerModel"); // Asegúrate de importar el modelo correcto

// Controlador para obtener todos los stickers
const getSticker = async (req, res) => {
  try {
    const stickers = await Sticker.findAll(); // Obtiene todos los stickers
    res.json(stickers); // Devuelve los stickers en formato JSON
  } catch (error) {
    console.error("Error al obtener los stickers:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = getSticker;
