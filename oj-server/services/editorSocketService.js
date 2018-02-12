module.exports = function(io) {
    var collaborations = {}; // collaboration sessions
    var socketIdToSessionId = {}; // map from socketId to sessionId

    io.on('connection', (socket) => {
        let sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;
        // collaboration on a new problem 
        if (!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            };
        }

        // add participant 
        collaborations[sessionId]['participants'].push(socket.id);

        // socket event listeners
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("could not tie socket id to any collaboration");
            }
        })
    })
}