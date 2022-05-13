"use strict";

const router = require("express").Router(),
    userController = require("../controllers/userController");

router.get("/", userController.index);
//router.post("/Register", usersController.createUser2);
router.get("/")
router.post("/create", userController.validate, userController.createUser, userController.redirectView)

module.exports = router;