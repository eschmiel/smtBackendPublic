const userManager = require('../../managers/userManager');


module.exports.serialize = function (user, done) {
    done(null, user.id);
}


module.exports.deserialize = function (id, done) {
    userManager.getUsername(id).then((username) => {
        user = {
            id: id,
            username: username
        };

        done(null, user);
    });
}