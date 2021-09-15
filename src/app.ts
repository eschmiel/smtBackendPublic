require('dotenv').config();
const config = require('./configs/mainConfig');
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
const { body } = require('express-validator');

const limiter = new rateLimiter();

var corsOptions = {
    origin: process.env.corsOrigin,
    credentials: true
};

interface cookieOptions {
    domain?: string,
    secure?: boolean,
    sameSite?: string,
    httpOnly: boolean
}

var sessionCookieOptions: cookieOptions = { httpOnly: true };
if (process.env.env == 'Production') {
    sessionCookieOptions.domain = process.env.sessionCookieDomain;
    sessionCookieOptions.secure = true;
    sessionCookieOptions.sameSite = 'none';
}

const accountRouter = require(config.modulePaths.accountRouter);
const tweetRouter = require(config.modulePaths.tweetRouter);

var app = express();
const port = process.env.port || 5000;

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

app.use('/account/finishTwitterAuthorization', async function (req, res, next) {
    let priorSessionId = req.query.sessionId;
    req.sessionStore.get(priorSessionId, (err, session) => { req.session.priorSession = session; next(); } );
});

app.use('/account', accountRouter);
app.use('/tweet', tweetRouter);
app.post('/login',
    body('username').trim().escape(),
    body('password').trim().escape(),
    limiter.process.bind(limiter),
    function (req, res, next) {
        req.session.regenerate((err) => next());
    },
    passport.authenticate('local'),
    function (req, res) {
        res.cookie('loggedIn', 'true', { expires: new Date(Date.now() + 30 * 3600000) });
        res.status(200).send({ loginSuccessful: true });
    }
);

app.use('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        req.logout();
        res.clearCookie('loggedIn');
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 // res.render('error');
});

app.listen(port, () => console.log('yoooooo'));

module.exports = app;
