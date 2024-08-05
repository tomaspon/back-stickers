const Sticker = require("../models/stickerModel");

const getStickerByName = async (req, res) => {
  const { name } = req.params;

  console.log("NOMBRE QUE LLEGA", name);

  try {
    const sticker = await Sticker.findOne({
      where: { name },
    });

    if (!sticker) {
      return res.status(404).json({ message: "Sticker no encontrado" });
    }

    return res.status(200).json(sticker);
  } catch (error) {
    console.error("Error al obtener el sticker:", error.message); // Imprimir el mensaje de error
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message }); // Incluir el mensaje de error en la respuesta
  }
};

module.exports = getStickerByName;
