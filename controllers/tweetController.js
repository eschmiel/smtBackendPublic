const tweetManager = require('../model/managers/tweetManager');
const userManager = require('../model/managers/userManager');


function tweetController() { }


tweetController.prototype.getUserTweets = async function (req, res, next) {
    console.log(req.user);
    let posts = await tweetManager.getUserTweets(req.user.id);

    res.json(posts);
}


tweetController.prototype.toggleTweet = async function (req, res, next) {
    let post_id = req.params.post_id;
    let tweet = await tweetManager.getTweet(post_id);

    if (tweet.active_status == 'inactive') { await tweetManager.activateTweet(post_id); }
    else { await tweetManager.deactivateTweet(post_id); }

    let toggledTweet = await tweetManager.getTweet(post_id); //we pull the tweet from the database again just to make sure tweet data returned to the client reflects the current state of the 
                                                             //tweet after activating/deactivating
    res.json(toggledTweet);
}


tweetController.prototype.createTweet = async function (req, res, next) {
    let tweet = req.body;
    let user_id = await userManager.getUser_id(tweet.username);

    await tweetManager.createTweet(user_id, tweet.account_id, tweet.tweet_title, tweet);

    res.end();
}


tweetController.prototype.editTweet = async function (req, res, next) {
    let post_id = req.params.post_id;
    let edits = req.body;

    await tweetManager.editTweet(post_id, edits);

    let editedTweet = await tweetManager.getTweet(post_id);

    res.json(editedTweet);
}


tweetController.prototype.deleteTweet = async function (req, res, next) {
    let post_id = req.params.post_id;

    await tweetManager.deleteTweet(post_id);

    res.end();
}


module.exports = new tweetController();