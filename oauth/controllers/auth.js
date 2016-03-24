var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var user = require('../models/user');
var Client = require('../models/client');

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

passport.use('client-basic', new BasicStrategy(function(username, password, callback) {
    Client.findOne({id: username}, function (err, client) {
        if (err) return callback(err);
        
        if(!client || client.secret !== password) return callback(null, false);
        
        return callback(null, client);
    });
}));

exports.isAuthenticated = passport.authenticate('basic', {session: false});
exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});