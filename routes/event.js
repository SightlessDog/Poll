"use strict";

const router = require("express").Router(),
    singleEventController = require("../controllers/singleEventController");

// TODO we have to find a better route
router.post("/:id", singleEventController.postVote)

router.post("/", singleEventController.createEvent);

router.get("/", singleEventController.showEventPage);

module.exports = router;