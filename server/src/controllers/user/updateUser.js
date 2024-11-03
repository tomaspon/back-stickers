const User = require("../../models/userModel");
const bcrypt = require("bcrypt"); // Asegúrate de tener bcrypt instalado

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { newName, newLastname, newEmail, newPassword, newImg, newStatus } =
    req.body;

  console.log("Datos recibidos en el backend:", {
    newName,
    newLastname,
    newEmail,
    newPassword,
    newImg,
    newStatus,
  }); // Verificar datos

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizamos solo los campos que tienen un valor en el body de la solicitud
    if (newName !== undefined) user.name = newName;
    if (newLastname !== undefined) user.lastname = newLastname;
    if (newEmail !== undefined) user.email = newEmail;

    // Cambiar la contraseña solo si se proporciona una nueva
    if (newPassword !== undefined && newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashear la nueva contraseña
      user.password = hashedPassword; // Actualizar la contraseña
    }

    if (newImg !== undefined) user.image = newImg;
    if (newStatus !== undefined) user.status = newStatus;

    await user.save();

    console.log("Usuario actualizado:", user);
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
