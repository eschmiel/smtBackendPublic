const tweetDAO = require('../dto/tweets/tweetDAO');
const deleteTweetDAO = require('../dto//tweets/deleteTweetDAO');
const activeTweetsDAO = require('../dto/tweets/activeTweetsDAO');
const editTweetDTO = require('../dto/tweets/editTweetDTO');
const editTweetDAO = require('../dto/tweets/editTweetDAO');
const newTweetDTO = require('../dto/tweets/newTweetDTO');
const newTweetDAO = require('../dto/tweets/newTweetDAO');
const twitterAccountManager = require('./twitterAccountManager');
const twitterMessenger = require('../services/message/twitterMessenger');


function TweetManager() {}


TweetManager.prototype.createTweet = function(user_id, account_id, tweet_title, options) {	
	let dto = new newTweetDTO(user_id, account_id, tweet_title, options);
	
	newTweetDAO.store(dto);	
}


TweetManager.prototype.editTweet = async function(post_id, options) {	
	let dto = new editTweetDTO(post_id, options);
	
	await editTweetDAO.store(dto);
}


TweetManager.prototype.getTweet =  async function(post_id) {
	let tweet = await tweetDAO.load(post_id);
	
	return tweet;
}


TweetManager.prototype.getUserTweets = async function (user_id) {
	let tweets = await tweetDAO.getUserTweets(user_id);

	return tweets;
}


TweetManager.prototype.deleteTweet = function(post_id) {	
	deleteTweetDAO.remove(post_id);	
}


TweetManager.prototype.activateTweet = async function (post_id) {
	let tweet = await this.getTweet(post_id);

	if (tweet.active_status != 'active') {
		let oauth = await twitterAccountManager.getOauthTokens(tweet.user_id, tweet.account_id);

		let messenger = new twitterMessenger(oauth.token, oauth.token_secret);

		let tweet_id = await messenger.sendTweet({ tweet_text: tweet.tweet_text });

		await activeTweetsDAO.store(post_id, tweet_id);
	}
}


TweetManager.prototype.deactivateTweet = async function (post_id) {
	let tweet = await this.getTweet(post_id);

	if (tweet.active_status == 'active') {
		let oauth = await twitterAccountManager.getOauthTokens(tweet.user_id, tweet.account_id);

		let messenger = new twitterMessenger(oauth.token, oauth.token_secret);

		messenger.deleteTweet(tweet.tweet_id);

		await activeTweetsDAO.remove(post_id);
    }
}


module.exports = new TweetManager();