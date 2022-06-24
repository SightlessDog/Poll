"use strict";

const router = require("express").Router(),
      pollsController = require("../controllers/pollsController");

router.get("/", pollsController.showPolls, pollsController.respondJSON);
router.use(pollsController.errorJSON);

module.exports = router;