"use strict";

const router = require("express").Router(),
    votedEventsController = require("../controllers/votedEventsController");

router.get("/", votedEventsController.showVotedEvents)

module.exports = router;