'use strict';

const router = require('express').Router(),
  userRoutes = require('./user'),
  singlePollRoutes = require('./singlePoll'),
  pollsRoutes = require('./polls'),
  homeController = require("../controllers/homeController"),
  apiRoutes = require("./apiRoutes");
const User = require("../models/user")

const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const expressValidator = require('express-validator');
const e = require('connect-flash');

router.use(cookieParser('wtat2022'));
router.use(
  expressSession({
    secret: 'wtat2022',
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());
router.use(expressValidator());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  if (res.locals.currentUser) {
    User.findById(res.locals.currentUser._id).exec().then(user => {
      if (user.openPolls.length > 0) {
        res.locals.hasNotification = true;
        next();
      } else {
        res.locals.hasNotification = false;
        next();
      }
    })
  } else {
    next();
  }
});
router.use("/api", apiRoutes);
router.use('/register', userRoutes);
router.use('/singlePoll', singlePollRoutes);
router.use('/polls', pollsRoutes);
router.use('/chat', homeController.chat);
router.use('/', homeController.showHome);


module.exports = router;
