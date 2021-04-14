"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var userManager = require(config.modulePaths.userManager);
module.exports = {
    serialize: function (user, done) {
        done(null, user.id);
    },
    deserialize: function (id, done) {
        userManager.getUsername(id).then(function (username) {
            var user = {
                id: id,
                username: username
            };
            done(null, user);
        });
    }
};
