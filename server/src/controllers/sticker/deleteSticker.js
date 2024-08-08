const Sticker = require("../../models/stickerModel");

const deleteSticker = async (req, res) => {
  const { id } = req.params;
  console.log(`ID del sticker a eliminar: ${id}`);

  try {
    const deletedSticker = await Sticker.destroy({
      where: { id },
    });

    if (deletedSticker) {
      return res
        .status(200)
        .json({ message: "Sticker eliminado correctamente." });
    } else {
      return res.status(404).json({ message: "Sticker no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar el sticker:", error);
    return res.status(500).json({ message: "Error al eliminar el sticker." });
  }
};

module.exports = deleteSticker;
