INSERT INTO tweet_text_content VALUES ($<post_id>, $<tweet_text>) 
	ON CONFLICT (post_id) DO UPDATE SET tweet_text = $<tweet_text>;