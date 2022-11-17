const router = require("express").Router()
const galleryController = require('../controllers/galleryController')

router.get("/all-gallery",galleryController.getAllgallery);

module.exports = router