const db = require('../../database');
const sql = require('../../sql/sql').twitterAccounts;
const twitterAccountDTO = require('./twitterAccountDTO');

function TwitterAccountsDAO() { }

TwitterAccountsDAO.prototype.store = async function (createTwitterAccountDTO) {

    let account_id = await db.one(sql.createTwitterAccount, createTwitterAccountDTO, (account) => account.account_id);

    return account_id;

}

TwitterAccountsDAO.prototype.get = async function (account_id) {

    let account = await db.one(sql.getTwitterAccount, { account_id: account_id });

    let dto = new twitterAccountDTO(account.account_id, account.twitter_id, account.access_token, account.access_token_secret);

    return dto;
}

TwitterAccountsDAO.prototype.getAccount_id = async function (twitter_id) {

    let account_id = await db.oneOrNone(sql.getAccount_id, { twitter_id: twitter_id }, account => { if (account) { return account.account_id; } return account; });

    return account_id;

}

TwitterAccountsDAO.prototype.getTwitter_id = async function (account_id) {

    let twitter_id = await db.one(sql.getTwitter_id, { account_id: account_id }, account => account.twitter_id);

    return twitter_id;

}

module.exports = new TwitterAccountsDAO();