DELETE FROM tweet_text_content USING tweets 
WHERE tweet_text_content.post_id = tweets.post_id 
AND tweets.user_id = $(user_id)
AND tweets.account_id = $(account_id);

DELETE FROM active_tweets USING tweets 
WHERE active_tweets.post_id = tweets.post_id 
AND tweets.user_id = $(user_id)
AND tweets.account_id = $(account_id);

DELETE FROM tweets WHERE account_id = $(account_id) AND user_id = $(user_id);

DELETE FROM account_access WHERE account_id = $(account_id) AND user_id = $(user_id);