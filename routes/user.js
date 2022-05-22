"use strict";

const router = require("express").Router(),
    userController = require("../controllers/userController"),
    secondUserController = require("../controllers/secondUserController");

router.post("/", userController.validate, userController.createUser, userController.redirectView);
router.get("/", secondUserController.index);
router.get("/register", userController.showRegister);
router.get("/profile", userController.showProfile);
router.get("/signIn", userController.showSignInPage);
router.get("/resetPassword", userController.showResetPassword);
router.get("/forgotPassword", userController.showForgotPassword);

module.exports = router;