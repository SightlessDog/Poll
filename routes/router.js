"use strict";

const router = require("express").Router(),
    userRoutes = require("./user"),
    singlePollRoutes = require("./singlePoll"),
    pollsRoutes = require("./polls")


router.use("/register", userRoutes);
router.use("/singlePoll", singlePollRoutes);
router.use("/polls", pollsRoutes);
router.use("/", (req, res) => {
    res.render("index")
})

module.exports = router;