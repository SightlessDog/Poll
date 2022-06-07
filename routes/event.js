"use strict";

const router = require("express").Router(),
    singleEventController = require("../controllers/singleEventController"),
    methodOverride = require("method-override");

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// TODO we have to find a better route
router.post("/addOption/:id", singleEventController.addAdditionalOption);

router.post("/vote/:id", singleEventController.postVote);

router.post("/", singleEventController.createEvent);

router.post("/closePoll/:id", singleEventController.closePoll);

router.post("/openPoll/:id", singleEventController.openPoll);

router.post("/:id/update", singleEventController.updateEvent);

router.get("/:id/edit", singleEventController.showEditPage);

router.get("/:id", singleEventController.showEventPage);

router.get("/:id/closed", singleEventController.showClosedPollPage);

router.delete("/:id/delete", singleEventController.deleteEvent, singleEventController.redirectView);

module.exports = router;