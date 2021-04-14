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
require('dotenv').config();
var config = require('./configs/mainConfig');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sessionStore = require('connect-pg-simple')(session);
var db = require(config.modulePaths.database);
var passport = require('passport');
var strategy = require(config.modulePaths.localStrategy);
var serialization = require(config.modulePaths.serialization);
var cors = require('cors');
var formData = require('express-form-data');
var compression = require('compression');
var helmet = require('helmet');
var rateLimiter = require(config.modulePaths.rateLimiter);
var body = require('express-validator').body;
var limiter = new rateLimiter();
var corsOptions = {
    origin: process.env.corsOrigin,
    credentials: true
};
var sessionCookieOptions = { httpOnly: true };
if (process.env.env == 'Production') {
    sessionCookieOptions.domain = process.env.sessionCookieDomain;
    sessionCookieOptions.secure = true;
    sessionCookieOptions.sameSite = 'none';
}
var accountRouter = require(config.modulePaths.accountRouter);
var tweetRouter = require(config.modulePaths.tweetRouter);
var app = express();
var port = process.env.port || 5000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(formData.parse());
/*if (process.env.env === 'Production')*/ app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('smt'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.sessionCookieSecret,
    name: 'sessionId',
    resave: true,
    cookie: sessionCookieOptions,
    saveUninitialized: false,
    store: new sessionStore({ pgPromise: db })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);
passport.serializeUser(serialization.serialize);
passport.deserializeUser(serialization.deserialize);
app.use('/account/finishTwitterAuthorization', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var priorSessionId;
        return __generator(this, function (_a) {
            priorSessionId = req.query.sessionId;
            req.sessionStore.get(priorSessionId, function (err, session) { req.session.priorSession = session; next(); });
            return [2 /*return*/];
        });
    });
});
app.use('/account', accountRouter);
app.use('/tweet', tweetRouter);
app.post('/login', body('username').trim().escape(), body('password').trim().escape(), limiter.process.bind(limiter), function (req, res, next) {
    req.session.regenerate(function (err) { return next(); });
}, passport.authenticate('local'), function (req, res) {
    res.cookie('loggedIn', 'true', { expires: new Date(Date.now() + 30 * 3600000) });
    res.status(200).send({ loginSuccessful: true });
});
app.use('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        req.logout();
        res.clearCookie('loggedIn');
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});
app.listen(port, function () { return console.log('yoooooo'); });
module.exports = app;
