"use strict";

const router = require("express").Router(),
    usersController = require("../controllers/usersController");

router.get("/", usersController.index);
//router.post("/Register", usersController.createUser2);
router.get("/")
router.post("/create", usersController.validate, usersController.createUser2, usersController.redirectView)

module.exports = router;