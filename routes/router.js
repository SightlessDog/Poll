"use strict";

const router = require("express").Router(),
    userRoutes = require("./user"),
    eventRoutes = require("./event"),
    eventsRoutes = require("./events"),
    votedEventsRoutes = require("./votedEvents")


router.use("/register", userRoutes);
router.use("/event", eventRoutes);
router.use("/events", eventsRoutes);
router.use("/votedEvents", votedEventsRoutes);
router.use("/", (req, res) => {
    res.render("index")
})

module.exports = router;