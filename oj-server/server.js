const express = require('express');
const app = express(); 
const path = require('path');
const restRouter = require('./routes/rest'); 

const http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);

/*
// initialize a new instance of socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/

// connect to mongodb 
const mongoose = require('mongoose');
mongoose.connect("mongodb://user:user@ds123698.mlab.com:23698/ojdb");

// application-level middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', restRouter); 
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public')});
})

/*
// listen on the connection event for incoming sockets
io.on('connection', (socket) => {
    console.log('a user connected');
}); 
*/

//app.listen(3000, () => console.log("server listening on port 3000"));

// connect io with server
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);
// listening call back
function onListening() {
console.log('App listening on port 3000!')
}