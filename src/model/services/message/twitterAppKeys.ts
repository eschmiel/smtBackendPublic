const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const keys = {
	consumer_key: process.env.twitterConsumerKey,
	consumer_secret: process.env.twitterConsumerSecret,
	callback: config.urls.twitterAuthorizationCallback
};


export = keys;