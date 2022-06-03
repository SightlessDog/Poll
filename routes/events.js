"use strict";

const router = require("express").Router(),
    eventsController = require("../controllers/eventsController");

router.get("/", eventsController.showEvents, eventsController.showClosedPolls);
module.exports = router;