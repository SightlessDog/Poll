"use strict";

const router = require("express").Router(),
      pollsController = require("../controllers/pollsController"),
      userController = require("../controllers/userController"),
      apiController = require("../controllers/apiController");

router.post("/polls", userController.apiAuthenticate);
router.get("/polls", apiController.filterUserPolls, apiController.respondJSON);
router.get("/allPolls", apiController.showPollsResponseJSON);
router.use(userController.verifyJWT);
router.use(apiController.errorJSON);

module.exports = router;