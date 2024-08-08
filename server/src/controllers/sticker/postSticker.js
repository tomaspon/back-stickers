const Sticker = require("../../models/stickerModel");

const postSticker = async (stickerData) => {
  try {
    const { id, name, image, description, price, stock } = stickerData;

    if (!name) {
      throw new Error("Debes indicar un nombre.");
    }
    if (!price) {
      throw new Error("Debes indicar un precio.");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }

    const newSticker = await Sticker.create({
      id,
      name,
      image,
      description,
      price,
      stock,
    });

    return newSticker;
  } catch (error) {
    console.error("Error al crear el sticker:", error);
    throw new Error("Error al crear el sticker");
  }
};

module.exports = postSticker;
