"use strict";

const router = require("express").Router(),
    userController = require("../controllers/userController")

router.post("/register", userController.validate, userController.createUser, userController.redirectView);
router.get("/register", userController.showRegister);
router.get("/user", userController.showProfile);
router.get("/profile", userController.showProfile);
router.get("/signIn", userController.showSignInPage);
router.get("/resetPassword", userController.showResetPassword);
router.get("/forgotPassword", userController.showForgotPassword);
router.post("/signIn", userController.validatePasswordHash, userController.authenticate);
module.exports = router;