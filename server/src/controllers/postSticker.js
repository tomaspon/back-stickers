const Sticker = require("../models/stickerModel"); // Asegúrate de importar el modelo correcto

// Función para crear un nuevo sticker
const postSticker = async (stickerData) => {
  try {
    const { name, image, description, price, stock } = stickerData;

    // Validaciones básicas
    if (!name || !price) {
      throw new Error("Faltan datos obligatorios: nombre y precio.");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }

    // Crear un nuevo sticker en la base de datos
    const newSticker = await Sticker.create({
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

// Exportar las funciones del controlador
module.exports = postSticker;
