var express = require('express');
var router = express.Router();
var tweetController = require('../controllers/tweetController.js');


router.get('/getUserTweets', tweetController.getUserTweets);

router.post('/createTweet', tweetController.createTweet);

router.post('/editTweet/:post_id', tweetController.editTweet);

router.post('/toggleTweet/:post_id', tweetController.toggleTweet);

router.post('/deleteTweet/:post_id', tweetController.deleteTweet);


module.exports = router;