const Cart = require("../../models/cartModel");
const User = require("../../models/userModel");

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // Verificar que userId esté definido
  if (!userId) {
    return res.status(400).json({ message: "ID de usuario no proporcionado" });
  }

  try {
    // Elimina todos los carritos asociados al usuario
    const deleteCarts = await Cart.destroy({ where: { client: userId } });

    // Luego, elimina el usuario
    const result = await User.destroy({ where: { id: userId } });

    if (result) {
      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

module.exports = deleteUser;
