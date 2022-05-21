"use strict";

const router = require("express").Router(),
    userController = require("../controllers/userController"),
    secondUserController = require("../controllers/secondUserController");

router.get("/", secondUserController.index);
router.post("/", userController.validate, userController.createUser, userController.redirectView)
router.get("/register", userController.showRegister)
router.get("/profile", userController.showProfile);

module.exports = router;