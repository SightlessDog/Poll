'use strict';

const router = require('express').Router(),
  userRoutes = require('./user'),
  singlePollRoutes = require('./singlePoll'),
  pollsRoutes = require('./polls'),
  profileRoutes = require('./profile'),
  homeController = require("../controllers/homeController");

const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const expressValidator = require('express-validator');

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
  next();
});

router.use('/register', userRoutes);
router.use('/profile', profileRoutes);
router.use('/singlePoll', singlePollRoutes);
router.use('/polls', pollsRoutes);
router.use('/', homeController.showHome);

module.exports = router;
