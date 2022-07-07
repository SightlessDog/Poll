"use strict";

const router = require("express").Router(),
      pollsController = require("../controllers/pollsController"),    
      userController = require("../controllers/userController");     

router.use(userController.verifyToken); //must be set first
//errormessage: {"status":500, "message":"Invalid API token."}.
//to solve that: http://localhost:3000/api/polls?apiToken=pollToken
router.get("/polls", pollsController.showPollsResponseJSON, pollsController.filterUserCourses, pollsController.respondJSON);
router.use(pollsController.errorJSON);

module.exports = router;