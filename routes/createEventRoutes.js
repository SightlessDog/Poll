"use strict";

const router = require("express").Router(),
    singleEventController = require("../controllers/singleEventController");

router.post("/Events/createEvent", singleEventController.createEvent);

module.exports = router;