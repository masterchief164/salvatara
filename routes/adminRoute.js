const {requiresAuth,restrictTo,generateToken} = require("../controllers/firebaseController")
const adminController = require("../controllers/adminController")
const userController = require('../controllers/userController')
const router = require("express").Router()

router.post("/adminLogin",requiresAuth,userController.login)
router.post("/createCollection", requiresAuth, adminController.createCollection)
router.post("/createNFT", requiresAuth, adminController.createNFT)
router.get("/getAllNFT", requiresAuth, adminController.getAllNFT)


module.exports = router