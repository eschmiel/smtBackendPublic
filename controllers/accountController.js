const twitterAccountManager = require('../model/managers/twitterAccountManager');
const userManager = require('../model/managers/userManager');
const twitterAccountAuthorizationManager = require('../model/managers/message/twitterAccountAuthorizationManager.js');


function accountController() { }


accountController.prototype.getLinkedAccounts = async function (req, res, next) {
    let linkedAccounts = await twitterAccountManager.getLinkedAccounts(req.user.id);
    let screenNames = [];
    let accountIdList = [];

    linkedAccounts.forEach(accountObj => accountIdList.push(accountObj.account_id));

    if (accountIdList.length) {
        screenNames = await twitterAccountManager.getTwitterScreenNames(accountIdList);
    }

    linkedAccounts.forEach((account, index) => account.screen_name = screenNames[index]);

    res.json(linkedAccounts);
}


accountController.prototype.createUserAccount = async function (req, res, next) {
    let newAccount = req.body;

    await userManager.createUser(newAccount.username, newAccount.password);

    res.end();
}


accountController.prototype.deleteUserAccount = function (req, res, next) {
    userManager.deleteUser(req.user.id);

    res.end();
}


accountController.prototype.generateTwitterAuthorizationLink = async function (req, res, next) {
    let link = await twitterAccountAuthorizationManager.beginTwitterAuthorization(req);

    res.send(link);
}


accountController.prototype.finishTwitterAuthorization = async function (req, res, next) {
    await twitterAccountAuthorizationManager.finishTwitterAuthorization(req, res);

    res.redirect("https://www.studioschmiel.com/socialMediaToggle.html");
}


accountController.prototype.unlinkTwitterAccount = async function (req, res, next) {
    let linkData  = req.body;

    let parsedAccountList = linkData.account_id.map((account_id) => Number.parseInt(account_id));
    
    let unlinkRequests = parsedAccountList.map((account_id) => { twitterAccountManager.unlinkAccount(req.user.id, account_id); });

    await Promise.all(unlinkRequests);

    res.end();
}


module.exports = new accountController();