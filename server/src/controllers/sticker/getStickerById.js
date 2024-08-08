const Sticker = require("../../models/stickerModel");

const getStickerById = async (req, res) => {
  const stickerId = req.params.id;

  try {
    const sticker = await Sticker.findByPk(stickerId);
    if (!sticker) {
      console.log("Sticker not found:", stickerId);
      return res.status(404).json({ error: "Sticker no encontrado" });
    }
    console.log("Sticker found:", sticker);
    res.json(sticker);
  } catch (error) {
    console.error("Error al obtener el sticker:", error);
    res.status(500).json({ error: "Error al obtener el sticker" });
  }
};

module.exports = getStickerById;
