const request = require('request');
const twitterAppKeys = require('./twitterAppKeys');


function TwitterMessenger(access_token, access_token_secret) {
    this.oauth = {
        consumer_key: twitterAppKeys.consumer_key,
        consumer_secret: twitterAppKeys.consumer_secret,
        token: access_token || '',
        token_secret: access_token_secret || ''
    };
}


TwitterMessenger.prototype.getTwitterScreenNames = function (twitter_id) {
    return new Promise((resolve, reject) => {
        let queryData = { user_id: twitter_id }; //The Twitter Id stored in the SMT's database is the Twitter account's user id in Twitter's system. This user id is not the SMT user's id.

        request({ url: 'https://api.twitter.com/1.1/users/lookup.json', oauth: this.oauth, qs: queryData }, function (err, response, body) {
            let parsedBody = JSON.parse(body);
            let users = Object.values(parsedBody)
            
            let screenNameList = users.map((userObj) => userObj.screen_name );
            
            resolve(screenNameList);
        });
    });
}


TwitterMessenger.prototype.sendTweet = function (content) {
    return new Promise((resolve, reject) => {
        let requestUrl = 'https://api.twitter.com/1.1/statuses/update.json';
        let queryData = { status: content.tweet_text }

        request.post({ url: requestUrl, oauth: this.oauth, qs: queryData }, function (err, response, body) {
            let parsedBody = JSON.parse(body);
          
            resolve(parsedBody.id_str);
        });
    });
}


TwitterMessenger.prototype.deleteTweet = function (tweet_id) {
    let requestUrl = 'https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json';

    request.post({ url: requestUrl, oauth: this.oauth });
}


module.exports = TwitterMessenger;