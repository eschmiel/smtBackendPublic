const userVerification = require('../verification/userVerification');
const userManager = require('../../managers/userManager');
const localStrategy = require('passport-local').Strategy;


function verify(username, password, done) {
	let user = {};

	userVerification.verifyUsername(username).then((usernameExists) => {	
		if (!usernameExists) return done(null, false);

		userManager.getUser_id(username).then((id) => {
			userVerification.verifyPassword(id, password).then((passwordIsCorrect) => {
				if (!passwordIsCorrect) return done(null, false);

				user.id = id;
				user.username = username;
				
				return done(null, user);
			});
		});
	});	
}


module.exports = new localStrategy(verify);