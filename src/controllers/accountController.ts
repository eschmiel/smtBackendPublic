const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const twitterAccountManager = require(config.modulePaths.twitterAccountManager);
const userManager = require(config.modulePaths.userManager);
const twitterAccountAuthorizationManager = require(config.modulePaths.twitterAccountAuthorizationManager);

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


accountController.prototype.getUsername = async function (req, res) {
    let username = req.user.username;

    res.send(username);
}


accountController.prototype.createUserAccount = async function (req, res, next) {
    let newAccount = req.body;

    await userManager.createUser(newAccount.username, newAccount.password);

    res.end();
}


accountController.prototype.deleteUserAccount = function (req, res, next) {
    userManager.deleteUser(req.user.id);

    req.session.destroy((err) => {
        req.logout();
        res.clearCookie('loggedIn');
        res.end();
    });
}


accountController.prototype.generateTwitterAuthorizationLink = async function (req, res, next) {
    let link = await twitterAccountAuthorizationManager.beginTwitterAuthorization(req);

    res.send(link);
}


accountController.prototype.finishTwitterAuthorization = async function (req, res, next) {
    await twitterAccountAuthorizationManager.finishTwitterAuthorization(req, res);

    res.redirect(config.urls.homepage);
}


accountController.prototype.unlinkTwitterAccount = async function (req, res, next) {
    let linkData  = req.body;

    let parsedAccountList = linkData.account_id.map((account_id) => Number.parseInt(account_id));
    
    let unlinkRequests = parsedAccountList.map((account_id) => { twitterAccountManager.unlinkAccount(req.user.id, account_id); });

    await Promise.all(unlinkRequests);

    res.end();
}

export = new accountController();