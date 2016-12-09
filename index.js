const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')
const sanitizer = require('express-sanitizer');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 30177);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sanitizer());

app.use(routes.router);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}.`);
});

