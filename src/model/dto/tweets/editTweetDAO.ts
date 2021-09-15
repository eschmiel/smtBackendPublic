import { modulePaths, EditTweetDTOinterface } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).tweets;

function EditTweetDAO() {}

EditTweetDAO.prototype.store = async function(edits: EditTweetDTOinterface) {	
	if(edits.account_id) { 		
		await db.none(sql.editAccount, edits)
		.catch(error => {console.error(error)}); 			
	}
		
	if(edits.tweet_title) { 		
		await db.none(sql.editTitle, edits)
		.catch(error => {console.error(error)}); 
	}
	
	//Runs update operations if there is a value for the tweet_text property, including an empty string
	if(edits.tweet_text || edits.tweet_text == '') { 		
		if(edits.tweet_text != '') { 		
			await db.none(sql.editText, edits)
			.catch(error => {console.error(error)}); 				
		}
		
		else { 		
			await db.none(sql.removeText, edits)
			.catch(error => {console.error(error)}); 				
		}		
	}

	return;
}	

export = new EditTweetDAO();