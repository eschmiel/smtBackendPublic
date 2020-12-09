const userManager = require('../../managers/userManager');


function Verifier() { };


Verifier.prototype.verifyUsername = async function (username) {
    let nameCheck = await userManager.getUser_id(username);

    if (nameCheck) return true;
    return false;
}


Verifier.prototype.verifyPassword = async function (user_id, password) {
    let correctPassword = await userManager.getPassword(user_id);

    if (correctPassword == password) return true;
    return false; 
}


module.exports = new Verifier();