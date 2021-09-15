const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const userManager = require(config.modulePaths.userManager);

export = {
    serialize: function (user, done) {
        done(null, user.id);
    },


    deserialize: function (id, done) {
        userManager.getUsername(id).then((username) => {
            let user = {
                id: id,
                username: username
            };

            done(null, user);
        });
    }
}