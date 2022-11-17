const {requiresAuth,restrictTo,generateToken} = require("../controllers/firebaseController");
const userController = require("../controllers/userController");
const router = require("express").Router()

router.post("/onboarding",requiresAuth,userController.userOnboarding);
router.post("/login",requiresAuth,userController.login);
router.post("/generate-token/:uid",generateToken)
router.get("/all-users",userController.getAllUsers);
router.patch("/:userId",requiresAuth,userController.updateUser);
router.get("/:userId",userController.getAUser);


module.exports = router;
