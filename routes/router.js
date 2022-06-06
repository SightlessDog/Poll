"use strict";

const router = require("express").Router(),
    userRoutes = require("./user"),
    eventRoutes = require("./event"),
    eventsRoutes = require("./events")


router.use("/register", userRoutes);
router.use("/event", eventRoutes);
router.use("/events", eventsRoutes);
router.use("/", (req, res) => {
    res.render("index")
})

module.exports = router;