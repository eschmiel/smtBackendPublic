import { EditTweetDTOinterface } from '../../../configs/mainConfig';
import { EditTweetOptions } from '../../../configs/mainConfig';

class EditTweetDTO implements EditTweetDTOinterface {
	post_id: number;
	account_id?: number;
	tweet_title?: string;
	tweet_text?: string; 

	constructor(post_id: number, edits: EditTweetOptions) {
		this.post_id = post_id;
		this.account_id = edits.account_id;
		this.tweet_title = edits.tweet_title;
		this.tweet_text = edits.tweet_text;
    }
}

export = EditTweetDTO;