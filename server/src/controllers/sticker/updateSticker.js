const Sticker = require("../../models/stickerModel");

const updateSticker = async (req, res) => {
  const { id } = req.params;
  const { newName, newDescription, newPrice, newImage, newStock } = req.body;

  try {
    // Busca el sticker por su ID
    const sticker = await Sticker.findByPk(id);

    // Verifica si el sticker existe
    if (!sticker) {
      return res.status(404).json({ message: "Sticker no encontrado" });
    }

    // Actualiza los campos del sticker
    sticker.name = newName || sticker.name;
    sticker.description = newDescription || sticker.description;
    sticker.price = newPrice || sticker.price;
    sticker.image = newImage || sticker.image;
    sticker.stock = newStock || sticker.stock;

    // Guarda los cambios
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
