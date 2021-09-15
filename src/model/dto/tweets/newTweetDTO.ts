import { NewTweetDTOinterface } from '../../../configs/mainConfig';
import { NewTweetOptions } from '../../../configs/mainConfig';

class NewTweetDTO implements NewTweetDTOinterface {
	options?: NewTweetOptions;
	user_id: number;
	account_id: number;
	tweet_title: string;
	tweet_text?: string;

	constructor(user_id: number, account_id: number, tweet_title: string, options?: NewTweetOptions) {
		var options = options || {};
		this.user_id = user_id;
		this.account_id = account_id;
		this.tweet_title = tweet_title;
		this.tweet_text = options.tweet_text;
    }
}

export = NewTweetDTO;