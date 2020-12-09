const db = require('../../database');
const TweetDTO = require('./tweetDTO');
const sql = require('../../sql/sql').tweets;


function TweetDAO() {};


TweetDAO.prototype.load = async function(post_id) {	
	let tweet = await db.one(sql.loadTweet, { post_id: post_id });
	
	var dto = new TweetDTO(tweet);
	
	return dto;
}


TweetDAO.prototype.getUserTweets = async function (user_id) {
	let tweets = await db.any(sql.getUserTweets, { user_id: user_id });

	let dtos = [];

	tweets.forEach((tweet) => {
		let dto = new TweetDTO(tweet);

		dtos.push(dto);
	});

	return dtos;
}


module.exports = new TweetDAO();