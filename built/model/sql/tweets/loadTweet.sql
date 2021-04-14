SELECT tweets.*, tweet_text, tweet_id, twitter_id, username FROM tweets 
	LEFT OUTER JOIN tweet_text_content USING (post_id) 
	LEFT OUTER JOIN active_tweets USING (post_id) 
	LEFT OUTER JOIN twitter_accounts USING (account_id) 
	LEFT OUTER JOIN users USING (user_id) WHERE post_id = $<post_id>;
