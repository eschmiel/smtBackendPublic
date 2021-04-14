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
Object.defineProperty(exports, "__esModule", { value: true });
var tweetManager = require("../model/managers/tweetManager");
var userManager = require("../model/managers/userManager");
function tweetController() { }
tweetController.prototype.getUserTweets = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.user);
                    return [4 /*yield*/, tweetManager.getUserTweets(req.user.id)];
                case 1:
                    posts = _a.sent();
                    res.json(posts);
                    return [2 /*return*/];
            }
        });
    });
};
tweetController.prototype.toggleTweet = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var post_id, tweet, toggledTweet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post_id = req.params.post_id;
                    return [4 /*yield*/, tweetManager.getTweet(post_id)];
                case 1:
                    tweet = _a.sent();
                    if (!(tweet.active_status == 'inactive')) return [3 /*break*/, 3];
                    return [4 /*yield*/, tweetManager.activateTweet(post_id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, tweetManager.deactivateTweet(post_id)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, tweetManager.getTweet(post_id)];
                case 6:
                    toggledTweet = _a.sent();
                    //tweet after activating/deactivating
                    res.json(toggledTweet);
                    return [2 /*return*/];
            }
        });
    });
};
tweetController.prototype.createTweet = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet, user_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tweet = req.body;
                    return [4 /*yield*/, userManager.getUser_id(tweet.username)];
                case 1:
                    user_id = _a.sent();
                    return [4 /*yield*/, tweetManager.createTweet(user_id, tweet.account_id, tweet.tweet_title, tweet)];
                case 2:
                    _a.sent();
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
};
tweetController.prototype.editTweet = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var post_id, edits, editedTweet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post_id = req.params.post_id;
                    edits = req.body;
                    return [4 /*yield*/, tweetManager.editTweet(post_id, edits)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tweetManager.getTweet(post_id)];
                case 2:
                    editedTweet = _a.sent();
                    res.json(editedTweet);
                    return [2 /*return*/];
            }
        });
    });
};
tweetController.prototype.deleteTweet = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var post_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post_id = req.params.post_id;
                    return [4 /*yield*/, tweetManager.deleteTweet(post_id)];
                case 1:
                    _a.sent();
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
};
module.exports = new tweetController();
