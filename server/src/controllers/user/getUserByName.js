const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const User = require("../../models/userModel");

const getUserByName = async (req, res) => {
  const { name } = req.params;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              "unaccent",
              Sequelize.fn("LOWER", Sequelize.col("name"))
            ),
            {
              [Op.like]: `%${name.toLowerCase()}%`,
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              "unaccent",
              Sequelize.fn("LOWER", Sequelize.col("lastname"))
            ),
            {
              [Op.like]: `%${name.toLowerCase()}%`,
            }
          ),
        ],
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = getUserByName;
