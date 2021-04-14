INSERT INTO tweets (user_id, account_id, tweet_title) 
	VALUES ($(user_id), $(account_id), $(tweet_title)) 
	RETURNING post_id;