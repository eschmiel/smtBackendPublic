const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const userVerification = require(config.modulePaths.userVerification);
const userManager = require(config.modulePaths.userManager);
const localStrategy = require('passport-local').Strategy;


function verify(username, password, done) {

	userVerification.verifyUsername(username).then((usernameExists) => {	
		if (!usernameExists) return done(null, false);

		userManager.getUser_id(username).then((id) => {
			userVerification.verifyPassword(id, password).then((passwordIsCorrect) => {
				if (!passwordIsCorrect) return done(null, false);

				let user = {
					id: id,
					username: username
				};

				return done(null, user);
			});
		});
	});	
}


export = new localStrategy(verify);