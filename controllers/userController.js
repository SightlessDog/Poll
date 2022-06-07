const User = require('../models/user');
const passport = require("passport"); // will be used later
const bcrypt = require("bcrypt");

const { body, validationResult } = require('express-validator');

const getUserInfo = body => {
        return {
            email: body.email,
            password: body.password
        };
    };

//Salt for password
const SALT_WORK_FACTOR = 10;

module.exports = {
    index: (req, res) => {
        res.render("register/index");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;

        if  (redirectPath !== undefined) {
            res.redirect(redirectPath);
        }
        else next();
    },
    validate: (req, res, next) => {
        body('email').isEmail().normalizeEmail();
        // Finds the validation errors in this request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
    createUser: async (req, res, next) => {
            if (req.skip) return next();
            //get user credentials, store them in "newUser"
            let newUser = new User(getUserInfo(req.body));

            //generate a salt based on the work factor (default: 10)
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

            newUser.password = await bcrypt.hash(newUser.password, salt);

            //register the user and save in the database or throw an error if unsuccessful
            User.register(newUser, req.body.password, (error, user) => {
                if (user) {
                    res.locals.redirect = "/";
                    console.log('Successfully registered!');
                    next();
                } else {
                    res.locals.redirect = "/Register/index";
                    console.log('Unsuccessful registration!');
                    next();
                }
            });
        },

    validatePasswordHash: async (req, res, next) => {
        const isUserWithEmailFound = await User.findOne({email: req.body.email});
        console.log(isUserWithEmailFound);
        console.log('Request body pw is: ', req.body.password);
        console.log('User pw in DB is: ', isUserWithEmailFound.password);

        if (isUserWithEmailFound) {
            // compare actual password with hashed user's password
            const validPassword = await bcrypt.compare(req.body.password, isUserWithEmailFound.password);
            console.log('Input pw matches the hashed pw stored in DB? ', validPassword);
            if (validPassword) {
                next();
            } else {
                res.redirect('/');
            }
        }
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/Register/profile"
    }),

    showProfile: (req, res) => {
        res.render("Profile/profile");
    },
    showRegister: (req, res) => {
        res.render("register/index");
    },
    showSignInPage : (req, res) => {
        res.render("register/signIn");
    },
    showResetPassword : (req, res) => {
        res.render("register/resetPassword");
    },
    showForgotPassword : (req, res) => {
        res.render("register/forgotPassword");
    }
}