const pollsController = require("../controllers/pollsController");
const router = require("express").Router();

// respond with the polls
router.get("/polls", pollsController.respondJSON);

router.use(pollsController.errorJSON);
module.exports = router;