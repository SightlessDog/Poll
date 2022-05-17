const User = require('../models/user');
const passport = require("passport"); // will be used later
const { body, validationResult } = require('express-validator');

const getUserInfo = body => {
        return {
            email: body.email,
            password: body.password
        };
    };
module.exports = {
    index: (req, res) => {
        res.render("Profile/index");
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
    showProfile: (req, res) => {
        res.render("Profile/index");
    },
    showRegister: (req, res) => {
        res.render("register/index");
    }

}