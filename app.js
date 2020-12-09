var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sessionStore = require('connect-pg-simple')(session);
var db = require('./model/database');
var passport = require('passport');
var strategy = require('./model/services/login/localStrategy');
var serialization = require('./model/services/login/serialization');
var cors = require('cors');
var formData = require('express-form-data');
var compression = require('compression');
var helmet = require('helmet');

var corsOptions = {
    origin: 'https://www.studioschmiel.com',
    credentials: true,
   // methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
   // allowedHeaders: "Content-Type, Authorization, X-Requested-With"
};

//var indexRouter = require('./routes/index');
const accountRouter = require('./routes/accountRouter');
const tweetRouter = require('./routes/tweetRouter');

var app = express();
const port = process.env.port || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('trust proxy', 1);
app.options('/', cors(corsOptions));
/*app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.studioschmiel.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
app.use(helmet());
app.use(compression());
app.use(formData.parse());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('smt'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'smt',
    name: 'sessionId',
    resave: true,
    cookie: {
        domain: '.ondigitalocean.app',        
        sameSite: 'none',
        secure: true,
        httpOnly: true
    },
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
//app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/tweet', tweetRouter);
app.post('/login', passport.authenticate('local'),
    function (req, res) {
        let data = req.user.username;
        res.status(200).send({ username: data });       
    }
);
app.use('/logout', (req, res, next) => { req.logout(); });

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
  res.render('error');
});

app.listen(port, () => console.log('yoooooo'));

module.exports = app;
