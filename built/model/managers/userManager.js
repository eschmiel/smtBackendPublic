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
var usersDAO = require(config.modulePaths.usersDAO);
var createUserDTO = require(config.modulePaths.createUserDTO);
var twitterAccountManager = require(config.modulePaths.twitterAccountManager);
var crypto = require('crypto');
function UserManager() {
    //const hmac = crypto.createHmac('sha256', 'shazam');
}
;
UserManager.prototype.createUser = function (username, password) {
    var hmac = crypto.createHmac('sha256', process.env.hmacKey);
    var hmacPassword = hmac.update(password).digest('hex');
    var dto = new createUserDTO(username, hmacPassword);
    usersDAO.store(dto);
};
UserManager.prototype.getUser_id = function (username) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, usersDAO.getUser_id(username)];
                case 1:
                    user_id = _a.sent();
                    return [2 /*return*/, user_id];
            }
        });
    });
};
UserManager.prototype.getUsername = function (user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, usersDAO.getUsername(user_id)];
                case 1:
                    username = _a.sent();
                    return [2 /*return*/, username];
            }
        });
    });
};
UserManager.prototype.getPassword = function (user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, usersDAO.getPassword(user_id)];
                case 1:
                    password = _a.sent();
                    return [2 /*return*/, password];
            }
        });
    });
};
UserManager.prototype.deleteUser = function (user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var linkedAccounts, unlinkRequests_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, twitterAccountManager.getLinkedAccounts(user_id)];
                case 1:
                    linkedAccounts = _a.sent();
                    if (!Object.entries(linkedAccounts).length) return [3 /*break*/, 3];
                    unlinkRequests_1 = [];
                    linkedAccounts.forEach(function (account) { return unlinkRequests_1.push(twitterAccountManager.unlinkAccount(user_id, account.account_id)); });
                    return [4 /*yield*/, Promise.all(unlinkRequests_1)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    usersDAO.deleteUser(user_id);
                    return [2 /*return*/];
            }
        });
    });
};
module.exports = new UserManager();
