const QueryFile = require('pg-promise').QueryFile;
const path = require('path');


function sql(file) {
	const fullPath = path.join(__dirname, file);
	return new QueryFile(fullPath, {minify: true});
}


export = {
	tweets: {
		createTweet: sql('tweets/createTweet.sql'),
		createText: sql('tweets/createText.sql'),
		
		editAccount: sql('tweets/editAccount.sql'),
		editTitle: sql('tweets/editTitle.sql'),
		editText: sql('tweets/editText.sql'),
		removeText: sql('tweets/removeText.sql'),
		
		loadTweet: sql('tweets/loadTweet.sql'),
		deleteTweet: sql('tweets/deleteTweet.sql'),

		activateTweet: sql('tweets/activateTweet.sql'),
		deactivateTweet: sql('tweets/deactivateTweet.sql'),
		getUserTweets: sql('tweets/getUserTweets.sql')
	},

	users: {
		createUser: sql('users/createUser.sql'),
		getUser_id: sql('users/getUser_id.sql'),
		getUsername: sql('users/getUsername.sql'),
		getPassword: sql('users/getPassword.sql'),
		deleteUser: sql('users/deleteUser.sql')
	},

	twitterAccounts: {
		createTwitterAccount: sql('twitterAccounts/createTwitterAccount.sql'),
		getAccount_id: sql('twitterAccounts/getAccount_id.sql'),
		getTwitter_id: sql('twitterAccounts/getTwitter_id.sql'),
		getTwitterAccount: sql('twitterAccounts/getTwitterAccount.sql')
	},

	twitterAccountAccess: {
		unlinkTwitterAccount: sql('twitterAccountAccess/unlinkTwitterAccount.sql'),
		linkTwitterAccount: sql('twitterAccountAccess/linkTwitterAccount.sql'),
		checkTwitterLink: sql('twitterAccountAccess/checkTwitterLink.sql'),
		findLinkedUsers: sql('twitterAccountAccess/findLinkedUsers.sql'),
		findLinkedAccounts: sql('twitterAccountAccess/findLinkedAccounts.sql')
    }
};