"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var db = require(config.modulePaths.database);
var sql = require(config.modulePaths.sql).tweets;
function NewTweetDAO() { }
NewTweetDAO.prototype.store = function (newTweetDto) {
    db.one(sql.createTweet, newTweetDto)
        .then(function (newTweet) {
        if (newTweetDto.tweet_text) {
            db.none(sql.createText, { post_id: newTweet.post_id, tweet_text: newTweetDto.tweet_text });
        }
    })
        .catch(function (error) { console.error(error); });
};
module.exports = new NewTweetDAO();
