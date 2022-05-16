"use strict";

const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    createEventRoutes = require("./createEventRoutes");

router.use("/Register", userRoutes);
router.use("/Events", createEventRoutes);

module.exports = router;