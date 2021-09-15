const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const usersDAO = require(config.modulePaths.usersDAO);
const createUserDTO = require(config.modulePaths.createUserDTO);
const twitterAccountManager = require(config.modulePaths.twitterAccountManager);
const crypto = require('crypto');


function UserManager() {
	//const hmac = crypto.createHmac('sha256', 'shazam');
};


UserManager.prototype.createUser = function (username, password) {
	let hmac = crypto.createHmac('sha256', process.env.hmacKey);

	let hmacPassword = hmac.update(password).digest('hex');

	let dto = new createUserDTO(username, hmacPassword);

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

export = new UserManager();