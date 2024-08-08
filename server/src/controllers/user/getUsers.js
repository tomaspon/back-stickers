const User = require("../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = getUsers;
