const {requiresAuth,restrictTo,generateToken} = require("../controllers/firebaseController")
const adminController = require("../controllers/adminController")
const userController = require('../controllers/userController')
const router = require("express").Router()

router.post("/adminLogin",requiresAuth,userController.login)
router.post("/createCollection", requiresAuth, adminController.createCollection)
router.post("/createNFT", requiresAuth, adminController.createNFT)
router.get("/getAllNFT", adminController.getAllNFT)
router.get("/getAllCollection", adminController.getAllCollection)
router.get("/dashboard", requiresAuth, adminController.dashboard)
router.get("/topSellingNFT",  adminController.topSellingNFT)
router.get("/mostviewedNFT",  adminController.mostviewedNFT)
router.get("/recentBids", adminController.recentBids)
router.get("/salesData", adminController.salesData)

module.exports = router