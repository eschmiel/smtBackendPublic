const twitterAuthorize = require('../../services/message/twitterAccountAuthorization');
const twitterAccountManager = require('../twitterAccountManager');
const createTwitterAccountDTO = require('../../dto/accounts/createTwitterAccountDTO');


function TwitterAccountAuthorizationManager() { }


TwitterAccountAuthorizationManager.prototype.beginTwitterAuthorization = async function (req, res) {
    let authorizationLink = await twitterAuthorize.generateAuthorizeLink(req);

    return authorizationLink;
}


TwitterAccountAuthorizationManager.prototype.finishTwitterAuthorization = async function (req, res) {
    let accessTokenObj = await twitterAuthorize.getAccessToken(req, res);

    let dto = new createTwitterAccountDTO(accessTokenObj.user_id, accessTokenObj.oauth_token, accessTokenObj.oauth_token_secret);

    let user_id = req.session.priorSession.passport.user;
    
    await twitterAccountManager.linkAccount(user_id, dto);     
}


module.exports = new TwitterAccountAuthorizationManager();