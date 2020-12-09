var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController');


router.get('/getLinkedAccounts', accountController.getLinkedAccounts);

router.post('/createUserAccount', accountController.createUserAccount);

router.post('/deleteUserAccount', accountController.deleteUserAccount);

router.get('/linkTwitterAccount', accountController.generateTwitterAuthorizationLink);

router.get('/finishTwitterAuthorization', accountController.finishTwitterAuthorization);

router.post('/unlinkTwitterAccount', accountController.unlinkTwitterAccount);


module.exports = router;