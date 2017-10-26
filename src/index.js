require('dotenv').config();
const ref = require('./fb-connect');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const util = require('util');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.APP_PORT || 8081;
const host = process.env.APP_HOST || '127.0.0.1';

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws, req) {
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    console.log(util.inspect(message, false, 7, true));
    ws.send('You sent: ' + message);
  });

ref.on('child_changed', function(snapshot) {
  const changedPupil = snapshot.val();
    console.log('The updated person is ', changedPupil);
    ws.send(JSON.stringify(snapshot.val()));
});
  ws.send('Hello client!');
});


const router = require('./routes');
app.use('/', router);
app.listen(port, host);

server.listen(3322, function listening() {
  console.log('Listening on %d', server.address().port);
});

console.log(`Server listening at ${host}:${port}`);
