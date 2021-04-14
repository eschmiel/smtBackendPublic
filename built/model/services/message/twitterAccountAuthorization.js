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
var request = require('request');
var querystring = require('querystring');
var twitterAppKeys = require(config.modulePaths.twitterAppKeys);
function TwitterAuthorize() { }
TwitterAuthorize.prototype.generateAuthorizeLink = function (req) {
    return new Promise(function (resolve, reject) {
        var requestUrl = 'https://api.twitter.com/oauth/request_token';
        var oauth_data = Object.assign({}, twitterAppKeys);
        oauth_data.callback = oauth_data.callback + '?sessionId=' + req.session.id;
        request.post({ url: requestUrl, oauth: oauth_data }, function (err, response, body) {
            if (response.statusCode != 200) {
                reject(err);
            }
            var parsedBody = querystring.parse(body);
            if (!parsedBody.oauth_callback_confirmed) {
                reject(err);
            }
            req.session.twitterRequestToken = parsedBody.oauth_token;
            var authorizationUrl = 'https://api.twitter.com/oauth/authorize' + '?' + querystring.stringify({ oauth_token: parsedBody.oauth_token });
            resolve(authorizationUrl);
        });
    });
};
TwitterAuthorize.prototype.getAccessToken = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var requestUrl, queryValues;
                    return __generator(this, function (_a) {
                        if (req.query.oauth_token !== req.session.priorSession.twitterRequestToken) {
                            reject();
                        }
                        requestUrl = 'https://api.twitter.com/oauth/access_token';
                        queryValues = {
                            consumer_key: twitterAppKeys.oauth_consumer_key,
                            consumer_key_secret: twitterAppKeys.oauth_consumer_key_secret,
                            token: req.query.oauth_token,
                            verifier: req.query.oauth_verifier
                        };
                        request.post({ url: requestUrl, oauth: queryValues }, function (err, response, body) {
                            var parsedBody = querystring.parse(body);
                            resolve(parsedBody);
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
};
module.exports = new TwitterAuthorize();
