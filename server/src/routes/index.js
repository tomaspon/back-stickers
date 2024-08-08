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

//stickers
router.get("/stickers", getSticker);
router.get("/stickers/:id", getStickerById);
router.get("/stickers/search/:name", getStickerByName);
router.put("/stickers/update/:id", updateSticker);
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
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post("/users", postUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/search/:name", getUserByName);

module.exports = router;
