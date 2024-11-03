const Sticker = require("../../models/stickerModel");
const cartStickersModel = require("../../models/cartStickersModel");

const deleteSticker = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "No se proporcionaron IDs válidos." });
  }

  try {
    // Eliminar los registros en CartStickers que hacen referencia a los stickers
    await cartStickersModel.destroy({
      where: {
        StickerId: ids,
      },
    });

    // Ahora eliminar los stickers
    const deletedCount = await Sticker.destroy({
      where: {
        id: ids,
      },
    });

    if (deletedCount > 0) {
      return res.status(200).json({
        message: `${deletedCount} sticker(s) eliminado(s) correctamente.`,
      });
    } else {
      return res.status(404).json({
        message: "No se encontraron stickers con los IDs proporcionados.",
      });
    }
  } catch (error) {
    console.error("Error al eliminar los stickers:", error);
    return res.status(500).json({
      message: "Error al eliminar los stickers.",
      error: error.message,
    });
  }
};

module.exports = deleteSticker;
