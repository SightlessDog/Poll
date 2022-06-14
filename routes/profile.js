"use strict";

const { showProfile } = require("../controllers/userController");

const router = require("express").Router()


router.get("/", showProfile);

module.exports = router;