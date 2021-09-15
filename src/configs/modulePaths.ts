import path = require('path');

const loginServicesPath = path.join(process.cwd(), 'built', 'model', 'services', 'login');
const messageServicesPath = path.join(process.cwd(), 'built', 'model', 'services', 'message');
const routerPath = path.join(process.cwd(), 'built', 'routes');
const managersPath = path.join(process.cwd(), 'built', 'model', 'managers');
const DALpath = path.join(process.cwd(), 'built', 'model', 'dto');
const controllersPath = path.join(process.cwd(), 'built', 'controllers');



export const database = path.join(process.cwd(), 'built', 'model', 'database');
export const sql = path.join(process.cwd(), 'built', 'model', 'sql', 'sql');

export const localStrategy = path.join(loginServicesPath, 'localStrategy');
export const serialization = path.join(loginServicesPath, 'serialization');
export const rateLimiter = path.join(loginServicesPath, 'rateLimiter');

export const twitterAccountAuthorization = path.join(messageServicesPath, 'twitterAccountAuthorization');
export const twitterMessenger = path.join(messageServicesPath, 'twitterMessenger');
export const twitterAppKeys = path.join(messageServicesPath, 'twitterAppKeys');

export const twitterAccountVerification = path.join(process.cwd(), 'built', 'model', 'services', 'verification', 'twitterAccountVerification');
export const userVerification = path.join(process.cwd(), 'built', 'model', 'services', 'verification', 'userVerification');

export const cryptography = path.join(process.cwd(), 'built', 'model', 'services', 'cryptography');

export const accountRouter = path.join(routerPath, 'accountRouter');
export const tweetRouter = path.join(routerPath, 'tweetRouter');

export const accountController = path.join(controllersPath, 'accountController');
export const tweetController = path.join(controllersPath, 'tweetController');

export const twitterAccountManager = path.join(managersPath, 'twitterAccountManager');
export const userManager = path.join(managersPath, 'userManager');
export const twitterAccountAuthorizationManager = path.join(managersPath, 'message', 'twitterAccountAuthorizationManager');
export const tweetManager = path.join(managersPath, 'tweetManager');

export const twitterAccountAccessDAO = path.join(DALpath, 'accounts', 'twitterAccountAccessDAO');
export const twitterAccountsDAO = path.join(DALpath, 'accounts', 'twitterAccountsDAO');
export const usersDAO = path.join(DALpath, 'accounts', 'usersDAO');

export const tweetDAO = path.join(DALpath, 'tweets', 'tweetDAO');
export const deleteTweetDAO = path.join(DALpath, 'tweets', 'deleteTweetDAO');
export const activeTweetsDAO = path.join(DALpath, 'tweets', 'activeTweetsDAO');
export const editTweetDAO = path.join(DALpath, 'tweets', 'editTweetDAO');
export const newTweetDAO = path.join(DALpath, 'tweets', 'newTweetDAO');

export const tweetDTO = path.join(DALpath, 'tweets', 'tweetDTO');
export const editTweetDTO = path.join(DALpath, 'tweets', 'editTweetDTO');
export const newTweetDTO = path.join(DALpath, 'tweets', 'newTweetDTO');

export const twitterAccountDTO = path.join(DALpath, 'accounts', 'twitterAccountDTO');
export const createTwitterAccountDTO = path.join(DALpath, 'accounts', 'createTwitterAccountDTO');
export const linkAccountDTO = path.join(DALpath, 'accounts', 'linkAccountDTO');
export const createUserDTO = path.join(DALpath, 'accounts', 'createUserDTO');