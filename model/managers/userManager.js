const usersDAO = require('../dto/accounts/usersDAO');
const createUserDTO = require('../dto/accounts/createUserDTO');
const twitterAccountManager = require('./twitterAccountManager.js');


function UserManager() { };


UserManager.prototype.createUser = function (username, password) {
	let dto = new createUserDTO(username, password);

	usersDAO.store(dto);
}


UserManager.prototype.getUser_id = async function (username) {
	let user_id = await usersDAO.getUser_id(username);

	return user_id;
}


UserManager.prototype.getUsername = async function (user_id) {
	let username = await usersDAO.getUsername(user_id);

	return username;
}


UserManager.prototype.getPassword = async function (user_id) {
	let password = await usersDAO.getPassword(user_id);

	return password;
}


UserManager.prototype.deleteUser = async function (user_id) {
	let linkedAccounts = await twitterAccountManager.getLinkedAccounts(user_id);

	if (Object.entries(linkedAccounts).length) {
		let unlinkRequests = []
	
		linkedAccounts.forEach((account) => unlinkRequests.push(twitterAccountManager.unlinkAccount(user_id, account.account_id)));

		await Promise.all(unlinkRequests);
	}

	usersDAO.deleteUser(user_id);
}


module.exports = new UserManager();