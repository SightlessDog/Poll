"use strict";

const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/register", userController.validate, userController.createUser, userController.redirectView);
router.get("/register", userController.showRegister);
router.get("/profile", userController.showProfile);
router.get("/signIn", userController.showSignInPage);
router.post("/signIn", userController.validatePasswordHash, userController.authenticate);
router.get("/resetPassword", userController.showResetPassword);
router.get("/forgotPassword", userController.showForgotPassword);
module.exports = router;