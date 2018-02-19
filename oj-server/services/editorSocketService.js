/*
// Version 1: without socket.io room feature
module.exports = function(io) {
    // Stores problem IDs and the participants working on each problem
    let collaborations = {};  
    
    // Listen on the connection event for incoming sockets
    io.on('connection', function(socket){
        console.log("a user connected, socket_id: " + socket['id']);
        // Add a new participent to the problem
        let socketID = socket['id']; // identify participant by socketID
        let problemID = socket.handshake.query['problemID'];
        if (!(problemID in collaborations)) {
            collaborations[problemID] = {
                participants: []
            }
        }
        collaborations[problemID]['participants'].push(socketID);
        
        /*
        // Print participants of each problem 
        let problems = Object.keys(collaborations); 
        console.log("All problems: " + problems);
        for (let i in problems) {
            let problem = problems[i]; // problemID
            let clients = collaborations[problem]['participants']; // participants of the problem
            console.log("problemID: " + problem + ", participants: ");
            for (let i in clients) {
                console.log(clients[i]);
            }
        }
        */
/*
        // Register a handler for the change event 
        socket.on('change', (delta) => {
            console.log(delta);
            // Broadcast the change to other participants working on this problem 
            let participants = collaborations[problemID]['participants'];
            for (let i = 0; i < participants.length; i++) {
                // Note: socket.broadcast.emit('change', delta); // everyone gets
                // it but the sender; so if broadcast is used, then this if 
                // statement is no longer needed!
                
                if (participants[i] != socketID) {
                    io.to(participants[i]).emit('change', delta);
                }
            }
        });
        
        // Fired upon disconnection
        socket.on('disconnect', function(){
            console.log("user disconnected, socket_id: " + socket['id']);
        });
    });
}
*/

// Version 2: with socket.io room feature
module.exports = function(io) {
    // Listen on the connection event for incoming sockets
    io.on('connection', function(socket){
        // Join a room identified by the problemID. 
        // A room is created automatically when a socket joins it. 
        let socketID = socket['id']; 
        let problemID = socket.handshake.query['problemID'];
        socket.join('room_' + problemID);
        console.log("a user joined room_," + problemID + ", socket_id: "+ socket['id']);

        
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
            // Send to all clients in the room except the sender 
            socket.to('room_' + problemID).emit('change', delta);
        });

        // Upon disconnection, sockets leave all the channels automatically 
        
        // Fired upon disconnection
        socket.on('disconnect', function(){
            console.log("user disconnected, socket_id: " + socket['id']);
            // Get number of clients in this room 
            io.of('/').in('room_' + problemID).clients((err, clients)=> {
                if (err) {
                    console.log(err);
                }else {
                    console.log(clients.length + " clients in the room_" + problemID + ":");
                }
            });  
        });
    });
}
