DELETE FROM tweet_text_content WHERE post_id = $(post_id); 

DELETE FROM active_tweets WHERE post_id = $(post_id); 

DELETE FROM tweets WHERE post_id = $(post_id);