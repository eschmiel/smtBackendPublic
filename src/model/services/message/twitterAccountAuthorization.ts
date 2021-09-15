const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const request = require('request');
const querystring = require('querystring');
const twitterAppKeys = require(config.modulePaths.twitterAppKeys);


function TwitterAuthorize() { }


TwitterAuthorize.prototype.generateAuthorizeLink = function(req) {
    return new Promise((resolve, reject) => {
        let requestUrl = 'https://api.twitter.com/oauth/request_token';
        let oauth_data = Object.assign({}, twitterAppKeys);

        oauth_data.callback = oauth_data.callback + '?sessionId=' + req.session.id;

        request.post({ url: requestUrl, oauth: oauth_data }, function (err, response, body) {
            if (response.statusCode != 200) { reject(err); }

            let parsedBody = querystring.parse(body);

            if (!parsedBody.oauth_callback_confirmed) { reject(err); }
            
            req.session.twitterRequestToken = parsedBody.oauth_token;
            
            let authorizationUrl = 'https://api.twitter.com/oauth/authorize' + '?' + querystring.stringify({ oauth_token: parsedBody.oauth_token });

            resolve(authorizationUrl);
        });
        
    });
}


TwitterAuthorize.prototype.getAccessToken = async function (req, res) {
    return new Promise( async (resolve, reject) => {
        if (req.query.oauth_token !== req.session.priorSession.twitterRequestToken) { reject(); }

        let requestUrl = 'https://api.twitter.com/oauth/access_token';

        let queryValues = {
            consumer_key: twitterAppKeys.oauth_consumer_key,
            consumer_key_secret: twitterAppKeys.oauth_consumer_key_secret,
            token: req.query.oauth_token,
            verifier: req.query.oauth_verifier
        };
       
        request.post({ url: requestUrl, oauth: queryValues }, function (err, response, body) {
            let parsedBody = querystring.parse(body);
            
            resolve(parsedBody);
        });
    });
}


export = new TwitterAuthorize();