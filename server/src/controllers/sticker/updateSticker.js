const Sticker = require("../../models/stickerModel");
const Category = require("../../models/categoryModel");

const updateSticker = async (req, res) => {
  const { id } = req.params;
  const {
    newName,
    newDescription,
    newPrice,
    newImage,
    newStock,
    newCategoryId,
    newStatus,
  } = req.body;

  console.log("Datos recibidos para actualizar el sticker:", req.body);

  try {
    const sticker = await Sticker.findByPk(id);

    if (!sticker) {
      return res.status(404).json({ message: "Sticker no encontrado" });
    }

    // Actualiza todos los campos según lo recibido
    sticker.name = newName || sticker.name;
    sticker.description = newDescription || sticker.description;
    sticker.price = newPrice || sticker.price;
    sticker.image = newImage || sticker.image;
    sticker.stock = newStock || sticker.stock;

    // Verificar si el `newCategoryId` es un nombre de categoría
    if (newCategoryId) {
      let category = await Category.findOne({ where: { name: newCategoryId } });

      if (!category) {
        // Crear la nueva categoría si no existe
        category = await Category.create({ name: newCategoryId });
      }

      // Asignar el ID de la categoría al sticker
      sticker.categoryId = category.id;
    }

    // Actualiza el estado si se proporciona
    if (newStatus !== undefined) {
      sticker.status = newStatus;
    }

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
