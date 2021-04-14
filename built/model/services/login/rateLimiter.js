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
var RateLimiterPostgres = require('rate-limiter-flexible').RateLimiterPostgres;
var db = require(config.modulePaths.database);
var userVerification = require(config.modulePaths.userVerification);
var userManager = require(config.modulePaths.userManager);
function LoginAttemptLimiter() {
    this.maxConsecutiveFailsByUsernameAndIP = 5;
    this.maxWrongAttemptsByIPperDay = 100;
    this.limiterConsecutiveFailsByUsernameAndIP = new RateLimiterPostgres({
        storeClient: db.$pool,
        keyPrefix: 'login_fail_consecutive_username_and_ip',
        points: this.maxConsecutiveFailsByUsernameAndIP,
        duration: 60 * 60 * 3,
        blockDuration: 60 * 15 // Block for 15 minutes
    });
    this.limiterSlowBruteByIP = new RateLimiterPostgres({
        storeClient: db.$pool,
        keyPrefix: 'login_fail_ip_per_day',
        points: this.maxWrongAttemptsByIPperDay,
        duration: 60 * 60 * 24,
        blockDuration: 60 * 60 * 24 //Block for 1 day, if 100 wrong attempts per day
    });
}
LoginAttemptLimiter.prototype.process = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var ipAddr, username, password, usernameAndIP, resUsernameAndIP, resSlowByIP, retrySecs, usernameExists, userId, passwordIsCorrect, resUsernameAndIP_1, rlRejected_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ipAddr = req.ip;
                    username = req.body.username;
                    password = req.body.password;
                    usernameAndIP = username + ipAddr;
                    return [4 /*yield*/, this.limiterConsecutiveFailsByUsernameAndIP.get(usernameAndIP)];
                case 1:
                    resUsernameAndIP = _a.sent();
                    return [4 /*yield*/, this.limiterSlowBruteByIP.get(ipAddr)];
                case 2:
                    resSlowByIP = _a.sent();
                    retrySecs = 0;
                    //Check if IP or Username + IP is already blocked
                    if (resSlowByIP !== null && resSlowByIP.consumedPoints > this.maxWrongAttemptsByIPperDay) {
                        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
                    }
                    else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > this.maxConsecutiveFailsByUsernameAndIP) {
                        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000 || 1);
                    }
                    if (retrySecs) {
                        res.set('Retry-After', String(retrySecs));
                        res.status(429).send('Too Many Requests');
                    }
                    return [4 /*yield*/, userVerification.verifyUsername(username)];
                case 3:
                    usernameExists = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 14, , 15]);
                    if (!!usernameExists) return [3 /*break*/, 6];
                    return [4 /*yield*/, this.limiterSlowBruteByIP.consume(ipAddr)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 6: return [4 /*yield*/, userManager.getUser_id(username)];
                case 7:
                    userId = _a.sent();
                    return [4 /*yield*/, userVerification.verifyPassword(userId, password)];
                case 8:
                    passwordIsCorrect = _a.sent();
                    if (!!passwordIsCorrect) return [3 /*break*/, 11];
                    return [4 /*yield*/, this.limiterConsecutiveFailsByUsernameAndIP.consume(usernameAndIP)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, this.limiterSlowBruteByIP.consume(ipAddr)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 11:
                    resUsernameAndIP_1 = this.limiterConsecutiveFailsByUsernameAndIP.get(usernameAndIP);
                    if (!(resUsernameAndIP_1 !== null && resUsernameAndIP_1.consumedPoints > 0)) return [3 /*break*/, 13];
                    return [4 /*yield*/, this.limiterConsecutiveFailsByUsernameAndIP.delete(usernameAndIP)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    rlRejected_1 = _a.sent();
                    if (rlRejected_1 instanceof Error)
                        throw rlRejected_1;
                    else {
                        res.set('Retry-After', String(Math.round(rlRejected_1.msBeforeNext / 1000)) || 1);
                        res.status(429).send('Too Many Requests');
                    }
                    return [3 /*break*/, 15];
                case 15:
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
module.exports = LoginAttemptLimiter;
