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
var linkAccountDTO = require(config.modulePaths.linkAccountDTO);
var twitterAccountsDAO = require(config.modulePaths.twitterAccountsDAO);
var twitterAccountAccessDAO = require(config.modulePaths.twitterAccountAccessDAO);
var twitterAccountVerification = require(config.modulePaths.twitterAccountVerification);
var twitterMessenger = require(config.modulePaths.twitterMessenger);
function TwitterAccountManager() { }
TwitterAccountManager.prototype.getOauthTokens = function (user_id, account_id) {
    return __awaiter(this, void 0, void 0, function () {
        var dto, linkExists, account, oauth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dto = new linkAccountDTO(user_id, account_id);
                    return [4 /*yield*/, twitterAccountVerification.linkExists(dto)];
                case 1:
                    linkExists = _a.sent();
                    if (!linkExists) return [3 /*break*/, 3];
                    return [4 /*yield*/, twitterAccountsDAO.get(account_id)];
                case 2:
                    account = _a.sent();
                    oauth = { token: account.access_token, token_secret: account.access_token_secret };
                    return [2 /*return*/, oauth];
                case 3: return [2 /*return*/];
            }
        });
    });
};
//account_ids should be an array of twitter account ids
TwitterAccountManager.prototype.getTwitterScreenNames = function (account_ids) {
    return __awaiter(this, void 0, void 0, function () {
        var messenger, twitter_ids, screenNameList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messenger = new twitterMessenger();
                    return [4 /*yield*/, Promise.all(account_ids.map(function (id) { return twitterAccountsDAO.getTwitter_id(id); }))];
                case 1:
                    twitter_ids = _a.sent();
                    return [4 /*yield*/, messenger.getTwitterScreenNames(twitter_ids.toString())];
                case 2:
                    screenNameList = _a.sent();
                    return [2 /*return*/, screenNameList];
            }
        });
    });
};
TwitterAccountManager.prototype.linkAccount = function (user_id, createTwitterAccountDTO) {
    return __awaiter(this, void 0, void 0, function () {
        var twitter_id, accountExists, account_id, dto_1, linkExists, newAccountID, dto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    twitter_id = createTwitterAccountDTO.twitter_id;
                    return [4 /*yield*/, twitterAccountVerification.accountExists(twitter_id)];
                case 1:
                    accountExists = _a.sent();
                    if (!accountExists) return [3 /*break*/, 5];
                    return [4 /*yield*/, twitterAccountsDAO.getAccount_id(twitter_id)];
                case 2:
                    account_id = _a.sent();
                    dto_1 = new linkAccountDTO(user_id, account_id);
                    return [4 /*yield*/, twitterAccountVerification.linkExists(dto_1)];
                case 3:
                    linkExists = _a.sent();
                    if (linkExists) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, twitterAccountAccessDAO.store(dto_1)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, twitterAccountsDAO.store(createTwitterAccountDTO)];
                case 6:
                    newAccountID = _a.sent();
                    dto = new linkAccountDTO(user_id, newAccountID);
                    return [4 /*yield*/, twitterAccountAccessDAO.store(dto)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
TwitterAccountManager.prototype.unlinkAccount = function (user_id, account_id) {
    return __awaiter(this, void 0, void 0, function () {
        var dto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dto = new linkAccountDTO(user_id, account_id);
                    return [4 /*yield*/, twitterAccountAccessDAO.unlinkAccount(dto)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
TwitterAccountManager.prototype.getLinkedAccounts = function (user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var linkedAccountIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, twitterAccountAccessDAO.findLinkedAccounts(user_id)];
                case 1:
                    linkedAccountIds = _a.sent();
                    return [2 /*return*/, linkedAccountIds];
            }
        });
    });
};
module.exports = new TwitterAccountManager();
