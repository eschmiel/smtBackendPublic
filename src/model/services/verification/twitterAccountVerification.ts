const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const twitterAccountAccessDAO = require(config.modulePaths.twitterAccountAccessDAO);
const twitterAccountsDAO = require(config.modulePaths.twitterAccountsDAO);


function TwitterAccountVerification() { }


TwitterAccountVerification.prototype.accountExists = async function (twitter_id) {
    let check = await twitterAccountsDAO.getAccount_id(twitter_id)

    if (check) return true;
    return false;
}

TwitterAccountVerification.prototype.linkExists = async function (linkAccountDTO) {
    let check = await twitterAccountAccessDAO.checkLink(linkAccountDTO);

    return check;
}


export = new TwitterAccountVerification();