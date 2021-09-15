import {
	modulePaths,
	CreateUserDTOinterface
} from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).users; 


function UsersDAO() { };


UsersDAO.prototype.store = function (dto: CreateUserDTOinterface): void {
	db.none(sql.createUser, { username: dto.username, password: dto.password });
}


UsersDAO.prototype.getUser_id = async function (username: string) {
	let user_id = await db.oneOrNone(sql.getUser_id, { username: username }, user => { if (user) { return user.user_id } return user });
	
	return user_id;
}


UsersDAO.prototype.getUsername = async function (user_id: number) {
	let username = await db.one(sql.getUsername, { user_id: user_id }, user => user.username);

	return username;
}


UsersDAO.prototype.getPassword = async function (user_id: number) {
	let password = await db.one(sql.getPassword, { user_id: user_id }, user => user.password)

	return password;
}


UsersDAO.prototype.deleteUser = function (user_id: number): void {
	db.none(sql.deleteUser, { user_id: user_id });

	return;
}

export = new UsersDAO();