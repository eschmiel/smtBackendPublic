var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const path = require('path');

const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

var accountController = require(config.modulePaths.accountController);


router.get('/getLinkedAccounts', accountController.getLinkedAccounts);

router.get('/getUsername', accountController.getUsername);

router.post('/createUserAccount',
    body('username').trim().escape(),
    body('password').trim().escape(),
    accountController.createUserAccount
);

router.post('/deleteUserAccount', accountController.deleteUserAccount);

router.get('/linkTwitterAccount', accountController.generateTwitterAuthorizationLink);

router.get('/finishTwitterAuthorization', accountController.finishTwitterAuthorization);

router.post('/unlinkTwitterAccount', accountController.unlinkTwitterAccount);


export = router;