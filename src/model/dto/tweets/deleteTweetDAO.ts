import { modulePaths } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).tweets;


function DeleteTweetDAO() {}


DeleteTweetDAO.prototype.remove = function(post_id: number) {	
	db.none(sql.deleteTweet, { post_id: post_id } ).catch(error => { console.error(error) });	
}


export = new DeleteTweetDAO();	