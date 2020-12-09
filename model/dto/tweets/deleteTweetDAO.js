const db = require('../../database');
const sql = require('../../sql/sql').tweets;


function DeleteTweetDAO() {}


DeleteTweetDAO.prototype.remove = function(post_id) {	
	db.none(sql.deleteTweet, { post_id: post_id } ).catch(error => { console.error(error) });	
}


module.exports = new DeleteTweetDAO();	