const {requiresAuth,restrictTo,generateToken} = require("../controllers/firebaseController")
const userController = require("../controllers/userController")
const router = require("express").Router()

router.post("/onboarding",requiresAuth,userController.userOnboarding)
router.post("/login",requiresAuth,userController.login)
router.post("/generate-token/:uid",generateToken)
router.patch("/updateUserPassword/:userId",requiresAuth,userController.updateUserPassword)
router.post("/sendOtp",requiresAuth,userController.sendOtp)
router.get("/addViews",userController.addViews)
router.get("/cryptoprice", userController.cryptoprice)


module.exports = router
