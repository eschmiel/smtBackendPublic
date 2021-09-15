const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

var express = require('express');
var router = express.Router();
var tweetController = require(config.modulePaths.tweetController);
const { body, param } = require('express-validator');


router.get('/getUserTweets',
    param('post_id').isNumeric().trim().escape(),
    tweetController.getUserTweets);

router.post('/createTweet',
    body('username').trim().escape(),
    body('account_id').trim().escape(),
    body('tweet_title').trim().escape(),
    body('tweet_text').trim().escape(),
    tweetController.createTweet);

router.post('/editTweet/:post_id',
    body('account_id').trim().escape(),
    body('tweet_title').trim().escape(),
    body('tweet_text').trim().escape(),
    param('post_id').isNumeric().trim().escape(),
    tweetController.editTweet);

router.post('/toggleTweet/:post_id',
    param('post_id').isNumeric().trim().escape(),
    tweetController.toggleTweet);

router.post('/deleteTweet/:post_id',
    param('post_id').isNumeric().trim().escape(),
    tweetController.deleteTweet);


export = router;