const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Datos de usuario enviados:", req.body);

  try {
    const user = await User.findOne({ where: { email } });
    console.log("Usuario encontrado:", user);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas" });
    }

    console.log("Usuario encontrado:", user.dataValues);

    // Compara la contraseña proporcionada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Contraseña proporcionada:", password);
    console.log("Contraseña almacenada:", user.password);
    console.log("Contraseña válida:", isPasswordValid);

    if (isPasswordValid) {
      // Excluimos el campo de la contraseña antes de enviarlo al cliente
      const { password: _, ...userData } = user.dataValues; // Usamos destructuración para omitir la contraseña

      console.log("envia USERDATA:", userData);
      return res.status(200).json({ success: true, user: userData });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas." });
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = loginUser;
