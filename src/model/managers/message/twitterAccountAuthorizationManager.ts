const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const twitterAuthorize = require(config.modulePaths.twitterAccountAuthorization);
const twitterAccountManager = require(config.modulePaths.twitterAccountManager);
const createTwitterAccountDTO = require(config.modulePaths.createTwitterAccountDTO);


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


export = new TwitterAccountAuthorizationManager();