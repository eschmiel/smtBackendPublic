const db = require('../../database');
const sql = require('../../sql/sql').tweets;


function ActiveTweetsDAO() { }


ActiveTweetsDAO.prototype.store = function (post_id, tweet_id) {
	return db.none(sql.activateTweet, { post_id: post_id, tweet_id: tweet_id });
}


ActiveTweetsDAO.prototype.remove = function (post_id) {
	return db.none(sql.deactivateTweet, { post_id: post_id });
}


module.exports = new ActiveTweetsDAO();