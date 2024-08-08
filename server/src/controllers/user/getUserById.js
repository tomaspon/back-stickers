const User = require("../../models/userModel");

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const users = await User.findByPk(userId);
    if (!users) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    console.log("User found:", users);
    res.json(users);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

module.exports = getUserById;
