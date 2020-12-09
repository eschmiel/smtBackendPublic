const db = require('../../database');
const sql = require('../../sql/sql').users; 


function UsersDAO() { };


UsersDAO.prototype.store = function (dto) {
	db.none(sql.createUser, { username: dto.username, password: dto.password });
}


UsersDAO.prototype.getUser_id = async function (username) {
	let user_id = await db.oneOrNone(sql.getUser_id, { username: username }, user => { if (user) { return user.user_id } return user });
	
	return user_id;
}


UsersDAO.prototype.getUsername = async function (user_id) {
	let username = await db.one(sql.getUsername, { user_id: user_id }, user => user.username);

	return username;
}


UsersDAO.prototype.getPassword = async function (user_id) {
	let password = await db.one(sql.getPassword, { user_id: user_id }, user => user.password)

	return password;
}


UsersDAO.prototype.deleteUser = function (user_id) {
	db.none(sql.deleteUser, { user_id: user_id });

	return;
}


module.exports = new UsersDAO();