const db = require('../../database');
const sql = require('../../sql/sql').tweets;


function NewTweetDAO() {}


NewTweetDAO.prototype.store = function(newTweetDto) {	
	db.one(sql.createTweet, newTweetDto)
	.then((newTweet) => { 
		if(newTweetDto.tweet_text) { 
			db.none(sql.createText, { post_id: newTweet.post_id, tweet_text: newTweetDto.tweet_text } ); 
		} 
	})
	.catch((error) => { console.error(error); } );		
}



module.exports = new NewTweetDAO();