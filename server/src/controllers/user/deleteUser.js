const User = require("../../models/userModel");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({
      where: { id },
    });

    if (deletedUser) {
      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente." });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: "Error al eliminar el usuario." });
  }
};

module.exports = deleteUser;
