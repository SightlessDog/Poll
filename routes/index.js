"use strict";

const router = require("express").Router(),
    userRoutes = require("./userRoutes");

router.use("/Register", userRoutes);

module.exports = router;