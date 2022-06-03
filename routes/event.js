"use strict";

const router = require("express").Router(),
    singleEventController = require("../controllers/singleEventController");

// TODO we have to find a better route
router.post("/addOption/:id", singleEventController.addAdditionalOption);

router.post("/vote/:id", singleEventController.postVote)

router.post("/", singleEventController.createEvent);

router.post("/closePoll/:id", singleEventController.closePoll);

router.get("/:id", singleEventController.showEventPage);

module.exports = router;