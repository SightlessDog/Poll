"use strict";

const router = require("express").Router(),
      pollsController = require("../controllers/pollsController"),    
      userController = require("../controllers/userController");     

router.post("/polls", userController.apiAuthenticate);
router.use(userController.verifyJWT);
router.get("/polls", pollsController.showPollsResponseJSON, pollsController.filterUserCourses, pollsController.respondJSON);
router.use(pollsController.errorJSON);

module.exports = router;