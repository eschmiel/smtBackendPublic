import { modulePaths } from '../../../configs/mainConfig';
import { LinkAccountDTOinterface } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const sql = require(modulePaths.sql).twitterAccountAccess;


function TwitterAccountAccessDAO() { }


TwitterAccountAccessDAO.prototype.store = async function (linkAccountDTO: LinkAccountDTOinterface) {
    await db.none(sql.linkTwitterAccount, linkAccountDTO);

    return;
}


TwitterAccountAccessDAO.prototype.unlinkAccount = async function (linkAccountDTO: LinkAccountDTOinterface) {
    db.none(sql.unlinkTwitterAccount, linkAccountDTO);

    return;
}


TwitterAccountAccessDAO.prototype.checkLink = async function (linkAccountDTO: LinkAccountDTOinterface) {
    let check = await db.oneOrNone(sql.checkTwitterLink, linkAccountDTO);

    if (check) return true;
    return false;
}


TwitterAccountAccessDAO.prototype.findLinkedUsers = async function (account_id: number) {
    let linkedUsers = await db.any(sql.findLinkedUsers, { account_id: account_id });

    return linkedUsers;
}


TwitterAccountAccessDAO.prototype.findLinkedAccounts = async function (user_id: number) {
    let linkedAccounts = await db.any(sql.findLinkedAccounts, { user_id: user_id });

    return linkedAccounts;
}


export = new TwitterAccountAccessDAO();