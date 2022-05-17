"use strict";

const router = require("express").Router(),
    userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/", userController.validate, userController.createUser, userController.redirectView)
router.get("/register", userController.showRegister)
router.get("/profile", userController.showProfile);

module.exports = router;