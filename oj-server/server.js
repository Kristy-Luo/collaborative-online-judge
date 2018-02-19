const express = require('express');
const app = express(); 
const path = require('path');
const restRouter = require('./routes/rest'); 

// Connect to mongodb 
const mongoose = require('mongoose');
mongoose.connect("mongodb://user:user@ds123698.mlab.com:23698/ojdb");

// Initialize a new instance of socket.io that mounts on the Node.js HTTP server
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var editorSocketService = require('./services/editorSocketService')(io);
/*
// Listen on the connection event for incoming sockets
io.on('connection', function(socket){
    console.log('a user connected');
    // Listen on the disconnection event that each socket fires
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
*/
server.listen(3000, () => console.log("server listening on port 3000"));


// Routing 
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', restRouter); 
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public')});
})
