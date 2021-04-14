"use strict";
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var request = require('request');
var twitterAppKeys = require(config.modulePaths.twitterAppKeys);
function TwitterMessenger(access_token, access_token_secret) {
    this.oauth = {
        consumer_key: twitterAppKeys.consumer_key,
        consumer_secret: twitterAppKeys.consumer_secret,
        token: access_token || '',
        token_secret: access_token_secret || ''
    };
}
TwitterMessenger.prototype.getTwitterScreenNames = function (twitter_id) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var queryData = { user_id: twitter_id }; //The Twitter Id stored in the SMT's database is the Twitter account's user id in Twitter's system. This user id is not the SMT user's id.
        request({ url: 'https://api.twitter.com/1.1/users/lookup.json', oauth: _this.oauth, qs: queryData }, function (err, response, body) {
            var parsedBody = JSON.parse(body);
            var users = Object.values(parsedBody);
            var screenNameList = users.map(function (userObj) { return userObj.screen_name; });
            resolve(screenNameList);
        });
    });
};
TwitterMessenger.prototype.sendTweet = function (content) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var requestUrl = 'https://api.twitter.com/1.1/statuses/update.json';
        var queryData = { status: content.tweet_text };
        request.post({ url: requestUrl, oauth: _this.oauth, qs: queryData }, function (err, response, body) {
            var parsedBody = JSON.parse(body);
            resolve(parsedBody.id_str);
        });
    });
};
TwitterMessenger.prototype.deleteTweet = function (tweet_id) {
    var requestUrl = 'https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json';
    request.post({ url: requestUrl, oauth: this.oauth });
};
module.exports = TwitterMessenger;
