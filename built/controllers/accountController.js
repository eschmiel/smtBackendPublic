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
var twitterAccountManager = require(config.modulePaths.twitterAccountManager);
var userManager = require(config.modulePaths.userManager);
var twitterAccountAuthorizationManager = require(config.modulePaths.twitterAccountAuthorizationManager);
function accountController() { }
accountController.prototype.getLinkedAccounts = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var linkedAccounts, screenNames, accountIdList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, twitterAccountManager.getLinkedAccounts(req.user.id)];
                case 1:
                    linkedAccounts = _a.sent();
                    screenNames = [];
                    accountIdList = [];
                    linkedAccounts.forEach(function (accountObj) { return accountIdList.push(accountObj.account_id); });
                    if (!accountIdList.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, twitterAccountManager.getTwitterScreenNames(accountIdList)];
                case 2:
                    screenNames = _a.sent();
                    _a.label = 3;
                case 3:
                    linkedAccounts.forEach(function (account, index) { return account.screen_name = screenNames[index]; });
                    res.json(linkedAccounts);
                    return [2 /*return*/];
            }
        });
    });
};
accountController.prototype.getUsername = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username;
        return __generator(this, function (_a) {
            username = req.user.username;
            res.send(username);
            return [2 /*return*/];
        });
    });
};
accountController.prototype.createUserAccount = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newAccount = req.body;
                    return [4 /*yield*/, userManager.createUser(newAccount.username, newAccount.password)];
                case 1:
                    _a.sent();
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
};
accountController.prototype.deleteUserAccount = function (req, res, next) {
    userManager.deleteUser(req.user.id);
    req.session.destroy(function (err) {
        req.logout();
        res.clearCookie('loggedIn');
        res.end();
    });
};
accountController.prototype.generateTwitterAuthorizationLink = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, twitterAccountAuthorizationManager.beginTwitterAuthorization(req)];
                case 1:
                    link = _a.sent();
                    res.send(link);
                    return [2 /*return*/];
            }
        });
    });
};
accountController.prototype.finishTwitterAuthorization = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, twitterAccountAuthorizationManager.finishTwitterAuthorization(req, res)];
                case 1:
                    _a.sent();
                    res.redirect(config.urls.homepage);
                    return [2 /*return*/];
            }
        });
    });
};
accountController.prototype.unlinkTwitterAccount = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var linkData, parsedAccountList, unlinkRequests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    linkData = req.body;
                    parsedAccountList = linkData.account_id.map(function (account_id) { return Number.parseInt(account_id); });
                    unlinkRequests = parsedAccountList.map(function (account_id) { twitterAccountManager.unlinkAccount(req.user.id, account_id); });
                    return [4 /*yield*/, Promise.all(unlinkRequests)];
                case 1:
                    _a.sent();
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
};
module.exports = new accountController();
