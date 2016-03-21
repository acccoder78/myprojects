var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var user = require('../models/user');

passport.use(new BasicStrategy(function(username, password, callback) {
    user.findOne({username: username}, function(err, user) {
        if (err) return callback(err);
        
        if (!user) return callback(null, false);
        
        user.verifyUser(password, function(err, isMatch) {
            if (err) return callback(err);
            
            if (!isMatch) return callback(null, false);
            
            return callback(null, user);
        });
    });
}));

exports.isAuthenticated = passport.authenticate('basic', {session: false});