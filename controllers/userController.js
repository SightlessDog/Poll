const User = require('../models/user');
const passport = require('passport'); // will be used later
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');

const getUserInfo = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};

//Salt for password
const SALT_WORK_FACTOR = 10;

module.exports = {
  index: (req, res) => {
    res.render('register/index');
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;

    if (redirectPath !== undefined) {
      res.redirect(redirectPath);
    } else next();
  },
  validate: (req, res, next) => {
    req
      .sanitizeBody('email')
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req.check('email', 'Email is invalid').isEmail();
    req.check('password', 'Password cannot be empty').notEmpty();
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash('error', messages.join(' and '));
        res.locals.redirect = '/users/new';
        next();
      } else {
        next();
      }
    });
  },
  createUser: async (req, res, next) => {
    if (req.skip) return next();
    
    let newUser = new User(getUserInfo(req.body));

    User.register(newUser, req.body.password, (error, user) => {
      if(user) {
        req.flash(
          'success', `${user.name}'s account created successfully!`
        );
        res.locals.redirect = '/Register/profile';
        next();
      } else {
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/Register/signIn";
        next();
      }
    });
  },
  sendMailForPasswordReset: (req, res) => {
    res.render('register/resetPassword'); //TODO: validate user, send email
  },
  resetPassword: async (req, res, next) => {
    //TODO: validate email adress
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(req.body.password, salt);

    //check that passwords are the same

    await User.findOneAndUpdate(
        { email: req.body.email  },
        { password: hash })
      .then((user) => {
          if(req.body.password === req.body.passwordRepeat){       
                //replace current password with new one     
                res.locals.redirect = `/register/signIn`;
                req.flash(
                  'success',
                  `${user.email}'s password changed successfully!`
                );
                res.locals.user = user;
              next();
          } else {
              res.locals.redirect = '/register/resetPassword';              
              req.flash(
                'error',
                'Enter the same password twice'
              );
              next();
          }
      })
      .catch((error) => {
        console.log(`Error user cannot be found: ${error.message}`);
        next(error);
      });  
  },
  authenticate: passport.authenticate('local', {
    failureRedirect: '/register/signIn',
    failureFlash: "Failed to login.",
    successRedirect: '/Register/profile',
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/index";
    next();
  },
  showProfile: (req, res) => {
    res.render('Register/profile');
  },
  showRegister: (req, res) => {
    res.render('register/index');
  },
  showSignInPage: (req, res) => {
    res.render('register/signIn');
  },
  showResetPassword: (req, res) => {
    res.render('register/resetPassword');
  },
  showForgotPassword: (req, res) => {
    res.render('register/forgotPassword');
  },
};
