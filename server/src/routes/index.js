const express = require("express");
const router = express.Router();
const postSticker = require("../controllers/postSticker"); // Asegúrate de que postSticker exporte una función
const getSticker = require("../controllers/getSticker");
const getStickerById = require("../controllers/getStickerById");
const deleteSticker = require("../controllers/deleteSticker"); // Asegúrate de que la ruta es correcta
const getStickerByName = require("../controllers/getStickerByName"); // Importar el controlador

// Definir una ruta GET
router.get("/stickers", getSticker);
router.get("/stickers/:id", getStickerById);
router.get("/stickers/search/:name", getStickerByName); // Cambiar a /stickers/search/:name
router.delete("/stickers/:id", deleteSticker);
router.post("/stickers", async (req, res) => {
  try {
    const newSticker = await postSticker(req.body);
    res.status(201).json(newSticker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
