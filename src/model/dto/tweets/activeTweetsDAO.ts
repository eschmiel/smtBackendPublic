import { modulePaths } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).tweets;


function ActiveTweetsDAO() { }


ActiveTweetsDAO.prototype.store = function (post_id: number, tweet_id: number) {
	return db.none(sql.activateTweet, { post_id: post_id, tweet_id: tweet_id });
}


ActiveTweetsDAO.prototype.remove = function (post_id: number) {
	return db.none(sql.deactivateTweet, { post_id: post_id });
}


export = new ActiveTweetsDAO();