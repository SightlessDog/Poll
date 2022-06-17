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
    //get user credentials, store them in "newUser"
    let newUser = new User(getUserInfo(req.body));

    //generate a salt based on the work factor (default: 10)
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    //register the user and save in the database or throw an error if unsuccessful
    User.create({name: newUser.name, email: newUser.email, password: newUser.password}, (error, user) => {
      if (error) {
        res.locals.redirect = '/Register/index';
        req.flash(
          'error',
          `Failed to create user account because: ${error.message}.`
        );
        console.log('Unsuccessful registration!');
        next();
      }
      if (user) {
        req.flash(
          'success',
          `${user.email}'s account created successfully!`
          //`${user.fullName}'s account created successfully!`
        );
        res.locals.redirect = '/';
        console.log('Successfully registered!');
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

    await User.findOneAndUpdate(
        { email: req.body.email  },
        { password: hash })
      .then((user) => {
        if(user){
          //check that passwords are the same 
          if(req.body.password === req.body.passwordRepeat){       
                //replace current password with new one     
                console.log("user with old hash: " + user)       
                console.log('new hash: '+ hash);
              
                res.locals.redirect = `/register/signIn`;
                req.flash(
                  'success',
                  `${user.email}'s password changed successfully!`//`${user.fullName}'s password changed successfully!`
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
        }
        else {
          res.locals.redirect = '/register/resetPassword';
          req.flash(
            'error',
            'Failed to change password: User account not found.'
          );
          next();
        }
      })
      .catch((error) => {
        console.log(`Error user cannot be found: ${error.message}`);
        next(error);
      });  
  },

  validatePasswordHash: async (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          user.passwordComparison(req.body.password).then((passwordsMatch) => {
            if (passwordsMatch) {
              res.locals.redirect = `/`;
              req.flash(
                'success',
                `${user.email}'s logged in successfully!`//`${user.fullName}'s logged in successfully!`
              );
              res.locals.user = user;
            } else {
              console.log("passwordMatch: " + passwordsMatch + " tried with password: " + req.body.password)
              req.flash(
                'error',
                'Failed to log in user account: Incorrect Password.'
              );
              res.locals.redirect = '/register/signIn';
            }
            next();
          });
        } else {
          res.locals.redirect = '/register/signIn';
          req.flash(
            'error',
            'Failed to log in user account: User account not found.'
          );
          next();
        }
      })
      .catch((error) => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
  },

  authenticate: passport.authenticate('local', {
    failureRedirect: '/register/signIn',
    successRedirect: '/Register/profile',
  }),
  
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
