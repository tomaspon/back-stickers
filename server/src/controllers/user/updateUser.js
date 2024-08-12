const User = require("../../models/userModel");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { newName, newLastname, newEmail, newPassword, newImg } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isDataChanged =
      newName !== user.name ||
      newLastname !== user.lastname ||
      newEmail !== user.email ||
      newPassword !== user.password ||
      newImg !== user.img;

    if (!isDataChanged) {
      return res.status(400).json({ message: "No se realizaron cambios" });
    }

    user.name = newName;
    user.lastname = newLastname;
    user.email = newEmail;
    user.password = newPassword;
    user.img = newImg;

    await user.save();

    return res
      .status(200)
      .json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = updateUser;
