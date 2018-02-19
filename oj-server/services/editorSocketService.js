var redisClient = require('../module/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

// Version 2: implemented with socket.io room feature
module.exports = function(io) {
    var sessionPath = '/temp_session';
    var collaborations = {}; 

    // Listen on the connection event for incoming sockets
    io.on('connection', function(socket){
        // Join a room named by the problemID. 
        // A room is created automatically when a socket joins it. 
        let socketID = socket['id']; 
        let problemID = socket.handshake.query['problemID'];
        socket.join('room_' + problemID);
        console.log("a user joined room_," + problemID + ", socket_id: "+ socket['id']);
        
        // Load the history changes back from redis if necessary 
        if (!(problemID in collaborations)) {
            redisClient.get(sessionPath + '/' + problemID, function(data) {
                if (data) {
                    // Reload changes from redis into memory 
                    collaborations[problemID] = {
                        'cachedInstructions': JSON.parse(data)
                    }
                }else {
                    // this may be the first time created or expired
                    console.log("creating new session");
                    collaborations[problemID] = {
                        'cachedInstructions': []
                    }
                }         
            });
        }
        
        
        // Register a handler for the restoreBuffer event 
        socket.on('restoreBuffer', () => {
            // Load the content of ace editor from memory (if any)
            if (problemID in collaborations) {
                let instructions = collaborations[problemID]['cachedInstructions'];
                // emit change event for every history changes
                for(let i = 0; i < instructions.length; i++) {
                    // instructions[i][0]: 'change'
                    // instructions[i][1]: delta
                    socket.emit(instructions[i][0], instructions[i][1]);
                }
            }else {
                console.log("could not find any history for this problem");
            }
        });
        
        
        // Get an array of clients (identified by socket['id']) in this room 
        io.of('/').in('room_' + problemID).clients((err, clients)=> {
            if (err) {
                console.log(err);
            }else {
                console.log(clients.length + " clients in the room_" + problemID + ":");
                console.log(clients); 
            }
        });  

        // Register a handler for the change event 
        socket.on('change', (delta) => {
            // Send the change to all clients in the room except the sender 
            socket.to('room_' + problemID).emit('change', delta);
            // Store the changes in memory
            if(problemID in collaborations) {
                collaborations[problemID]['cachedInstructions'].push(['change', delta,
                Date.now()]);
            }
        });
        
        // Fired upon disconnection
        socket.on('disconnect', function(){
            // Upon disconnection, sockets leave all the rooms automatically. 
            console.log("A user left room_" + problemID + "socket_id: " + socket['id']);
            // If this is the last client left the room, save the content of ace editor to redis. 
            io.of('/').in('room_' + problemID).clients((err, clients) => { // get number of clients in this room 
                console.log(clients.length + " clients in the room_" + problemID + ":");
                if (clients.length == 0) {
                    let key = sessionPath + '/' + problemID;
                    let value = JSON.stringify(collaborations[problemID]['cachedInstructions']);
                    redisClient.setex(key, value, TIMEOUT_IN_SECONDS, redisClient.redisPrint);
                    // remove cached instructions from memory 
                    delete collaborations[problemID]; 
                }
            });  
        });
    });
}

