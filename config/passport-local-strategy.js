const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, 
function(req, email, password, done) {
    User.findOne({email: email}, function(err, user) {

        if(err) {
            req.flash('error', err);
            return done(err);
        }

        if(!user || user.password != password) {
            req.flash('error', 'Invalid user / password');
            return done(null, false);
        }

        return done(null, user);
    });
}));

//saving the cookie in the browser automatically
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//getting the cookie data into the server
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log('error while authentication through passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthenticated = function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('signin');
    }
    next();
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;