const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const { v4: uuidv4 } = require("uuid");
const postUser = async (req, res) => {
  try {
    const { name, lastname, email, password, img, profile } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    const uniqueId = uuidv4();

    const newUser = await User.create({
      id: uniqueId,
      name,
      lastname,
      email,
      password,
      img,
      profile,
    });

    const newCart = await Cart.create({
      id: uuidv4(),
      client: newUser.id,
      items: [],
    });

    res.status(201).json({ user: newUser, cart: newCart });
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
