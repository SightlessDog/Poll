"use strict";

const router = require("express").Router(),
      pollsController = require("../controllers/pollsController");

router.get("/polls", pollsController.showPollsResponseJSON, pollsController.filterUserCourses, pollsController.respondJSON);
router.use(pollsController.errorJSON);

module.exports = router;