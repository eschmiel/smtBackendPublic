"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require('path');
var configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
var config = require(configPath);
var tweetDAO = require(config.modulePaths.tweetDAO);
var deleteTweetDAO = require(config.modulePaths.deleteTweetDAO);
var activeTweetsDAO = require(config.modulePaths.activeTweetsDAO);
var editTweetDAO = require(config.modulePaths.editTweetDAO);
var newTweetDAO = require(config.modulePaths.newTweetDAO);
var editTweetDTO = require(config.modulePaths.editTweetDTO);
var newTweetDTO = require(config.modulePaths.newTweetDTO);
var twitterAccountManager = require(config.modulePaths.twitterAccountManager);
var twitterMessenger = require(config.modulePaths.twitterMessenger);
function TweetManager() { }
TweetManager.prototype.createTweet = function (user_id, account_id, tweet_title, options) {
    var dto = new newTweetDTO(user_id, account_id, tweet_title, options);
    newTweetDAO.store(dto);
};
TweetManager.prototype.editTweet = function (post_id, options) {
    return __awaiter(this, void 0, void 0, function () {
        var dto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dto = new editTweetDTO(post_id, options);
                    return [4 /*yield*/, editTweetDAO.store(dto)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
TweetManager.prototype.getTweet = function (post_id) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tweetDAO.load(post_id)];
                case 1:
                    tweet = _a.sent();
                    return [2 /*return*/, tweet];
            }
        });
    });
};
TweetManager.prototype.getUserTweets = function (user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var tweets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tweetDAO.getUserTweets(user_id)];
                case 1:
                    tweets = _a.sent();
                    return [2 /*return*/, tweets];
            }
        });
    });
};
TweetManager.prototype.deleteTweet = function (post_id) {
    deleteTweetDAO.remove(post_id);
};
TweetManager.prototype.activateTweet = function (post_id) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet, oauth, messenger, tweet_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.getTweet(post_id)];
                case 1:
                    tweet = _a.sent();
                    if (!(tweet.active_status != 'active')) return [3 /*break*/, 5];
                    return [4 /*yield*/, twitterAccountManager.getOauthTokens(tweet.user_id, tweet.account_id)];
                case 2:
                    oauth = _a.sent();
                    messenger = new twitterMessenger(oauth.token, oauth.token_secret);
                    return [4 /*yield*/, messenger.sendTweet({ tweet_text: tweet.tweet_text })];
                case 3:
                    tweet_id = _a.sent();
                    return [4 /*yield*/, activeTweetsDAO.store(post_id, tweet_id)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
TweetManager.prototype.deactivateTweet = function (post_id) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet, oauth, messenger;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.getTweet(post_id)];
                case 1:
                    tweet = _a.sent();
                    if (!(tweet.active_status == 'active')) return [3 /*break*/, 4];
                    return [4 /*yield*/, twitterAccountManager.getOauthTokens(tweet.user_id, tweet.account_id)];
                case 2:
                    oauth = _a.sent();
                    messenger = new twitterMessenger(oauth.token, oauth.token_secret);
                    messenger.deleteTweet(tweet.tweet_id);
                    return [4 /*yield*/, activeTweetsDAO.remove(post_id)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
module.exports = new TweetManager();
