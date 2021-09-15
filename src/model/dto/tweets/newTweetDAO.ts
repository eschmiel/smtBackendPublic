import { modulePaths, NewTweetDTOinterface } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).tweets;


function NewTweetDAO() {}


NewTweetDAO.prototype.store = function(newTweetDto: NewTweetDTOinterface) {	
	db.one(sql.createTweet, newTweetDto)
	.then((newTweet) => { 
		if(newTweetDto.tweet_text) { 
			db.none(sql.createText, { post_id: newTweet.post_id, tweet_text: newTweetDto.tweet_text } ); 
		} 
	})
	.catch((error) => { console.error(error); } );		
}

export = new NewTweetDAO();