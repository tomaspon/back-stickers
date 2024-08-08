const Sticker = require("../../models/stickerModel");

const updateSticker = async (req, res) => {
  const { id } = req.params;
  const { newName, newDescription, newPrice, newImage, newStock } = req.body;

  try {
    const sticker = await Sticker.findAll({
      order: [["id", "ASC"]],
    });
    if (!sticker) {
      return res.status(404).json({ message: "Sticker no encontrado" });
    }

    sticker.name = newName || sticker.name;
    sticker.description = newDescription || sticker.description;
    sticker.price = newPrice || sticker.price;
    sticker.image = newImage || sticker.image;
    sticker.stock = newStock || sticker.stock;

    await sticker.save();

    return res
      .status(200)
      .json({ message: "Sticker actualizado con éxito", sticker });
  } catch (error) {
    console.error("Error al actualizar el sticker:", error.message);
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = updateSticker;
