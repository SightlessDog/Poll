"use strict";

const router = require("express").Router(),
    singlePollController = require("../controllers/singlePollController"),
    methodOverride = require("method-override");

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// TODO we have to find a better route
router.post("/addOption/:id", singlePollController.addAdditionalOption);

router.post("/vote/:id", singlePollController.postVote, singlePollController.redirectView);

router.post("/", singlePollController.createPoll);

router.post("/closePoll/:id", singlePollController.closePoll);

router.post("/openPoll/:id", singlePollController.openPoll);

router.post("/:id/update", singlePollController.updatePoll);

router.get("/:id/edit", singlePollController.showEditPage);

router.get("/:id", singlePollController.showPollPage);

router.get("/:id/closed", singlePollController.showClosedPollPage);

router.delete("/:id/delete", singlePollController.deletePoll, singlePollController.redirectView);

module.exports = router;