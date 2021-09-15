import {
    modulePaths,
    TwitterAccountDTOinterface,
    CreateTwitterAccountDTOinterface
} from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).twitterAccounts;
const twitterAccountDTO = require(modulePaths.twitterAccountDTO);
const crypto = require(modulePaths.cryptography);

function TwitterAccountsDAO() { }

TwitterAccountsDAO.prototype.store = async function (createTwitterAccountDTO: CreateTwitterAccountDTOinterface) {
    createTwitterAccountDTO.access_token = crypto.cipher(createTwitterAccountDTO.access_token);
    createTwitterAccountDTO.access_token_secret = crypto.cipher(createTwitterAccountDTO.access_token_secret);

    let account_id: number = await db.one(sql.createTwitterAccount, createTwitterAccountDTO, (account) => account.account_id);

    return account_id;
}

TwitterAccountsDAO.prototype.get = async function (account_id: number) {

    let account = await db.one(sql.getTwitterAccount, { account_id: account_id });

    let decryptedAccess_token = crypto.decipher(account.access_token);
    let decryptedAccess_token_secret = crypto.decipher(account.access_token_secret);

    let dto: TwitterAccountDTOinterface = new twitterAccountDTO(account.account_id, account.twitter_id, decryptedAccess_token, decryptedAccess_token_secret);

    return dto;
}

TwitterAccountsDAO.prototype.getAccount_id = async function (twitter_id: string) {

    let account_id: number = await db.oneOrNone(sql.getAccount_id, { twitter_id: twitter_id }, account => { if (account) { return account.account_id; } return account; });

    return account_id;

}

TwitterAccountsDAO.prototype.getTwitter_id = async function (account_id: number) {

    let twitter_id: string = await db.one(sql.getTwitter_id, { account_id: account_id }, account => account.twitter_id);

    return twitter_id;

}

export = new TwitterAccountsDAO();