"use strict";
var crypto = require('crypto');
function Cryptography() {
    this.algorithm = 'aes-256-ctr';
    this.password = process.env.cipherKey;
}
Cryptography.prototype.cipher = function (plainText) {
    var cipher = crypto.createCipher(this.algorithm, this.password);
    try {
        if (typeof plainText === 'number')
            plainText = plainText.toString();
        else if (typeof plainText != 'string')
            throw TypeError;
        var encryptedText = cipher.update(plainText, 'utf8', 'hex');
        encryptedText += cipher.final('hex');
        return encryptedText;
    }
    catch (error) {
        console.log('cipher received neither a number or string');
        console.log('cipher received:' + plainText);
        console.log('Type of: ' + typeof plainText);
        console.log(error);
    }
};
Cryptography.prototype.decipher = function (encryptedText) {
    var decipher = crypto.createDecipher(this.algorithm, this.password);
    try {
        if (typeof encryptedText === 'number')
            encryptedText = encryptedText.toString();
        else if (typeof encryptedText != 'string')
            throw TypeError;
        var plainText = decipher.update(encryptedText, 'hex', 'utf8');
        plainText += decipher.final('utf8');
        return plainText;
    }
    catch (error) {
        console.log('decipher received neither a number or string');
        console.log('cipher received:' + encryptedText);
        console.log('Type of: ' + typeof encryptedText);
        console.log(error);
    }
};
module.exports = new Cryptography();
