const User = require("../../models/userModel");
const crypto = require("crypto");

const generateUniqueId = async () => {
  let uniqueId;
  let exists = true;

  while (exists) {
    uniqueId = crypto.randomBytes(12).toString("hex");
    const user = await User.findOne({ where: { id: uniqueId } });
    exists = !!user;
  }
};

const postUser = async (req, res) => {
  try {
    const { name, lastname, email, password, img, profile } = req.body;

    const uniqueId = await generateUniqueId();

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    const newUser = await User.create({
      id: uniqueId,
      name,
      lastname,
      email,
      password,
      img,
      profile,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

module.exports = postUser;
