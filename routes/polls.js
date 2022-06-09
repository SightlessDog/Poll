"use strict";

const router = require("express").Router(),
    pollsController = require("../controllers/pollsController");

router.get("/", pollsController.showPolls);
module.exports = router;