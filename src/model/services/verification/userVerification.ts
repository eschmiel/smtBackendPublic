const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const userManager = require(config.modulePaths.userManager);
const crypto = require('crypto');


function Verifier() { };


Verifier.prototype.verifyUsername = async function (username) {
    let nameCheck = await userManager.getUser_id(username);

    if (nameCheck) return true;
    return false;
}


Verifier.prototype.verifyPassword = async function (user_id, password) {
    let hmac = crypto.createHmac('sha256', process.env.hmacKey);
    
    let correctPassword = await userManager.getPassword(user_id);
    let hmacPassword = hmac.update(password).digest("hex");

    //if (correctPassword == password) return true; --- uncomment if you ever need to verify against unhashed passwords
    if (correctPassword == hmacPassword) return true;

    return false; 
}

export = new Verifier();