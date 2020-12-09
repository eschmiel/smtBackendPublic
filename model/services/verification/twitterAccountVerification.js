const twitterAccountAccessDAO = require('../../dto/accounts/twitterAccountAccessDAO');
const twitterAccountsDAO = require('../../dto/accounts/twitterAccountsDAO');


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


module.exports = new TwitterAccountVerification();