const Sticker = require("../models/stickerModel");

const getStickerById = async (req, res) => {
  const stickerId = req.params.id;

  try {
    const sticker = await Sticker.findByPk(stickerId);
    if (!sticker) {
      console.log("Sticker not found:", stickerId); // Imprimir si el sticker no se encuentra
      return res.status(404).json({ error: "Sticker no encontrado" });
    }
    console.log("Sticker found:", sticker); // Imprimir el sticker encontrado
    res.json(sticker);
  } catch (error) {
    console.error("Error al obtener el sticker:", error); // Imprimir el error
    res.status(500).json({ error: "Error al obtener el sticker" });
  }
};

module.exports = getStickerById;
