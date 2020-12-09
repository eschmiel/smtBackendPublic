const db = require('../../database');
const sql = require('../../sql/sql').twitterAccountAccess;


function TwitterAccountAccessDAO() { }


TwitterAccountAccessDAO.prototype.store = async function (linkAccountDTO) {
    await db.none(sql.linkTwitterAccount, linkAccountDTO);

    return;
}


TwitterAccountAccessDAO.prototype.unlinkAccount = async function (linkAccountDTO) {
    db.none(sql.unlinkTwitterAccount, linkAccountDTO);

    return;
}


TwitterAccountAccessDAO.prototype.checkLink = async function (linkAccountDTO) {
    let check = await db.oneOrNone(sql.checkTwitterLink, linkAccountDTO);

    if (check) return true;
    return false;
}


TwitterAccountAccessDAO.prototype.findLinkedUsers = async function (account_id) {
    let linkedUsers = await db.any(sql.findLinkedUsers, { account_id: account_id });

    return linkedUsers;
}


TwitterAccountAccessDAO.prototype.findLinkedAccounts = async function (user_id) {
    let linkedAccounts = await db.any(sql.findLinkedAccounts, { user_id: user_id });

    return linkedAccounts;
}


module.exports = new TwitterAccountAccessDAO();