"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var db = require(config.modulePaths.database);
var sql = require(config.modulePaths.sql).tweets;
function ActiveTweetsDAO() { }
ActiveTweetsDAO.prototype.store = function (post_id, tweet_id) {
    return db.none(sql.activateTweet, { post_id: post_id, tweet_id: tweet_id });
};
ActiveTweetsDAO.prototype.remove = function (post_id) {
    return db.none(sql.deactivateTweet, { post_id: post_id });
};
module.exports = new ActiveTweetsDAO();
