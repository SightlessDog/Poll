"use strict";

const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/register", userController.validate, userController.createUser, userController.redirectView);
router.get("/register", userController.showRegister);
router.get("/profile", userController.showProfile);
router.get("/signIn", userController.showSignInPage);
router.post("/signIn", userController.authenticate);
router.get("/logout", userController.logout, userController.redirectView);
router.get("/resetPassword", userController.showResetPassword);
router.get("/forgotPassword", userController.showForgotPassword);
router.post("/forgotPassword", userController.sendMailForPasswordReset);
router.post("/resetPassword", userController.resetPassword, userController.redirectView);
module.exports = router;