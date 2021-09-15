const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const linkAccountDTO = require(config.modulePaths.linkAccountDTO);
const twitterAccountsDAO = require(config.modulePaths.twitterAccountsDAO);
const twitterAccountAccessDAO = require(config.modulePaths.twitterAccountAccessDAO);
const twitterAccountVerification = require(config.modulePaths.twitterAccountVerification);
const twitterMessenger = require(config.modulePaths.twitterMessenger);


function TwitterAccountManager() { }


TwitterAccountManager.prototype.getOauthTokens = async function (user_id, account_id) {
    let dto = new linkAccountDTO(user_id, account_id);

    let linkExists = await twitterAccountVerification.linkExists(dto);

    if (linkExists) {
        let account = await twitterAccountsDAO.get(account_id);

        let oauth = { token: account.access_token, token_secret: account.access_token_secret }

        return oauth;
    }
} 


//account_ids should be an array of twitter account ids
TwitterAccountManager.prototype.getTwitterScreenNames = async function (account_ids) {    
    let messenger = new twitterMessenger();

    let twitter_ids = await Promise.all(account_ids.map( id => twitterAccountsDAO.getTwitter_id(id)));
    
    let screenNameList = await messenger.getTwitterScreenNames(twitter_ids.toString());

    return screenNameList;
}


TwitterAccountManager.prototype.linkAccount = async function (user_id, createTwitterAccountDTO) {
    let twitter_id = createTwitterAccountDTO.twitter_id;

    let accountExists = await twitterAccountVerification.accountExists(twitter_id);

    if (accountExists) {
        let account_id = await twitterAccountsDAO.getAccount_id(twitter_id);

        let dto = new linkAccountDTO(user_id, account_id);

        let linkExists = await twitterAccountVerification.linkExists(dto);

        if (linkExists) { return; }

        await twitterAccountAccessDAO.store(dto);
        
        return;
    }

    let newAccountID = await twitterAccountsDAO.store(createTwitterAccountDTO);

    let dto = new linkAccountDTO(user_id, newAccountID);

    await twitterAccountAccessDAO.store(dto);

    return;
}


TwitterAccountManager.prototype.unlinkAccount = async function (user_id, account_id) {
    let dto = new linkAccountDTO(user_id, account_id);

    await twitterAccountAccessDAO.unlinkAccount(dto);

    return;
}


TwitterAccountManager.prototype.getLinkedAccounts = async function (user_id) {
    let linkedAccountIds = await twitterAccountAccessDAO.findLinkedAccounts(user_id);
    
    return linkedAccountIds;
}


export = new TwitterAccountManager();