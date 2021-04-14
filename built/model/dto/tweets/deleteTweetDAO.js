"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var db = require(config.modulePaths.database);
var sql = require(config.modulePaths.sql).tweets;
function DeleteTweetDAO() { }
DeleteTweetDAO.prototype.remove = function (post_id) {
    db.none(sql.deleteTweet, { post_id: post_id }).catch(function (error) { console.error(error); });
};
module.exports = new DeleteTweetDAO();
