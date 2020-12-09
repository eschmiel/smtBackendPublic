function TweetDTO(tweet) {
	this.post_id = tweet.post_id;
	this.user_id = tweet.user_id;
	this.account_id = tweet.account_id;
	this.username = tweet.username;
	this.twitter_id = tweet.twitter_id;
	this.tweet_title = tweet.tweet_title;	
	this.tweet_text = tweet.tweet_text || '';
	this.tweet_id = tweet.tweet_id;
	
	if(this.tweet_id) this.active_status = 'active';
	else this.active_status = 'inactive';
}

module.exports = TweetDTO;