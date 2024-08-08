const { Op } = require("sequelize");
const Sticker = require("../../models/stickerModel");

const getStickerByName = async (req, res) => {
  const { name } = req.params;

  try {
    const stickers = await Sticker.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (stickers.length === 0) {
      return res.status(404).json({ message: "No se encontraron stickers" });
    }

    return res.status(200).json(stickers);
  } catch (error) {
    console.error("Error al obtener los stickers:", error.message);
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = getStickerByName;
