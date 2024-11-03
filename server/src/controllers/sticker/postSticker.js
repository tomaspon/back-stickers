const Sticker = require("../../models/stickerModel");
const Category = require("../../models/categoryModel"); // Asegúrate de importar el modelo de Category

const postSticker = async (stickerData) => {
  try {
    const { name, image, description, price, stock, status, categoryName } =
      stickerData;

    console.log("Datos recibidos en postSticker:", stickerData);

    // Validaciones de datos
    if (!name) {
      throw new Error("Debes indicar un nombre.");
    }
    if (!price) {
      throw new Error("Debes indicar un precio.");
    }
    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }

    // Verificar si el sticker ya existe por nombre
    const existingSticker = await Sticker.findOne({ where: { name } });
    console.log("Sticker existente:", existingSticker);

    if (existingSticker) {
      throw new Error("Ya existe un sticker con ese nombre.");
    }

    // Verificar o crear la categoría
    console.log("Buscando categoría:", categoryName);
    let category = await Category.findOne({ where: { name: categoryName } });
    console.log("Categoría encontrada:", category);

    if (!category) {
      console.log("Categoría no encontrada, creando nueva categoría.");
      category = await Category.create({ name: categoryName });
      console.log("Categoría creada:", category);
    }

    // Crear el sticker con el `categoryId`
    const newSticker = await Sticker.create({
      name,
      image,
      description,
      price,
      stock,
      status,
      categoryId: category.id,
    });
    console.log("Sticker creado exitosamente:", newSticker);

    return newSticker;
  } catch (error) {
    console.error("Error al crear el sticker:", error);
    throw new Error(error.message || "Error al crear el sticker");
  }
};

module.exports = postSticker;
