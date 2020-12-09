function NewTweetDTO(user_id, account_id, tweet_title, options) {	
	var options = options || {};	
	this.user_id = user_id;
	this.account_id = account_id;
	this.tweet_title = tweet_title;
	this.tweet_text = options.tweet_text;
}


module.exports = NewTweetDTO;