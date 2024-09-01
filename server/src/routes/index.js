const express = require("express");
const router = express.Router();
const postSticker = require("../controllers/sticker/postSticker");
const getSticker = require("../controllers/sticker/getSticker");
const getStickerById = require("../controllers/sticker/getStickerById");
const deleteSticker = require("../controllers/sticker/deleteSticker");
const getStickerByName = require("../controllers/sticker/getStickerByName");
const updateSticker = require("../controllers/sticker/updateSticker");
const postUser = require("../controllers/user/postUser");
const getUsers = require("../controllers/user/getUsers");
const getUserById = require("../controllers/user/getUserById");
const getUserByName = require("../controllers/user/getUserByName");
const deleteUser = require("../controllers/user/deleteUser");
const updateUser = require("../controllers/user/updateUser");
const postPayment = require("../controllers/payment/postPayment");
const getAllPayments = require("../controllers/payment/getAllPayments");
const addCartProduct = require("../controllers/cart/addCartProduct");
const getAllCarts = require("../controllers/cart/getAllCarts");
const getCartItems = require("../controllers/cart/getCartItems");
const deleteCartItem = require("../controllers/cart/deleteCartItem");
const updateCartItem = require("../controllers/cart/updateCartItem");

//stickers
router.get("/stickers", getSticker);
router.get("/stickers/:id", getStickerById);
router.get("/stickers/search/:name", getStickerByName);
router.put("/stickers/:id", updateSticker);
router.delete("/stickers/:id", deleteSticker);
router.post("/stickers", async (req, res) => {
  try {
    const newSticker = await postSticker(req.body);
    res.status(201).json(newSticker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//user
router.delete("/users/:userId", deleteUser);
router.put("/users/:id", updateUser);
router.post("/users", postUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/:name", getUserByName);

router.post("/payment", postPayment);
router.get("/payment", getAllPayments);

//cart
router.post("/carts/:cartId", addCartProduct);
router.delete("/carts/:cartId", deleteCartItem);
router.put("/carts/:cartId/items/:stickerId", updateCartItem);
router.get("/carts/:cartId", getCartItems);
router.get("/carts/", getAllCarts);

module.exports = router;
