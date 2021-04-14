"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var userVerification = require(config.modulePaths.userVerification);
var userManager = require(config.modulePaths.userManager);
var localStrategy = require('passport-local').Strategy;
function verify(username, password, done) {
    userVerification.verifyUsername(username).then(function (usernameExists) {
        if (!usernameExists)
            return done(null, false);
        userManager.getUser_id(username).then(function (id) {
            userVerification.verifyPassword(id, password).then(function (passwordIsCorrect) {
                if (!passwordIsCorrect)
                    return done(null, false);
                var user = {
                    id: id,
                    username: username
                };
                return done(null, user);
            });
        });
    });
}
module.exports = new localStrategy(verify);
