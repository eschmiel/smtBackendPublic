const config = require('../configs/mainConfig.js');
const userVerification = require(config.modulePaths.userVerification);
var assert = require('chai').assert;

describe('#userVerification', function () {

    describe('verifyUsername()', function () {

        context('Username exists in database', function () {
            it('should return true', async function () {
                let userExists = await userVerification.verifyUsername('test'); 
                assert.isTrue(userExists, 'did not return true for a user named "test."');
            })
        })

        context('Username does not exist in database', function () {
            it('should return false', async function () {
                let userExists = await userVerification.verifyUsername('NotAnAccount');
                assert.isNotTrue(userExists, 'Says that a user named "NotAnAccount" exists when there should not be such a user.');
            })
        })
    })
})
