const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')
const sanitizer = require('express-sanitizer');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const auth = require('./services/Authenticator');
const db = require('./services/Database');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 30177);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sanitizer());

app.disable('x-powered-by');

app.use(session({
    secret: 'CFK-53cr3t',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new Strategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        auth.authenticate(email, password, done);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {

    db.users.getUser(id)
        .then((user) => {
            cb(null, user);
        })
        .catch((error) => {
            cb(err);
        });
});

app.use(routes.router);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}.`);
});

