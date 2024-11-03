const Sticker = require("../../models/stickerModel");
const Category = require("../../models/categoryModel");

const getSticker = async (req, res) => {
  try {
    // Consulta solo los stickers que tienen el estado "Activo"
    const stickers = await Sticker.findAll({
      include: {
        model: Category,
        as: "category", // Asegúrate de que este alias coincida con el de la asociación
        attributes: ["id", "name"], // Incluir solo el id y el nombre de la categoría
      },
    });
    res.json(stickers);
  } catch (error) {
    console.error("Error al obtener los stickers:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = getSticker;
