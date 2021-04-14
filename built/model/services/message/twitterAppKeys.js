"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var keys = {
    consumer_key: process.env.twitterConsumerKey,
    consumer_secret: process.env.twitterConsumerSecret,
    callback: config.urls.twitterAuthorizationCallback
};
module.exports = keys;
