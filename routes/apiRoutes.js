"use strict";

const router = require("express").Router(),
      apiController = require("../controllers/apiController");


router.get("/polls", apiController.filterUserPolls, apiController.respondJSON);
router.get("/allPolls", apiController.showPollsResponseJSON);
router.use(apiController.errorJSON);

module.exports = router;