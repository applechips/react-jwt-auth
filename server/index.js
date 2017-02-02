// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// App Setup - get express working
app.use(morgan('combined'));
app.user(bodyParser.json({ type: '*/*' }));

// Server Setup - get express talking to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port );
