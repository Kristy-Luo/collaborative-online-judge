var redis = require("redis"); 
var client = redis.createClient();

// Set key to hold the string value and set key to timeout after a given number of seconds. 
function setex(key, value, seconds, callback) {
    client.set(key, value, 'EX', seconds, function (err, res) {
        if (err) {
            console.log(err);
            return; 
        }
        callback(res);
    });
}

// Get the value of key
function get(key, callback) {
    client.get(key, function(err, res) {
        if (err) {
            console.log(err);
            return; 
        }
        callback(res);
    });
}

// Ask the server to close the connection
function quit() {
    client.quit(); // always OK 
}

module.exports = {
    setex: setex,
    get: get,
    quit: quit, 
    // A handy callback function for displaying return values when testing
    redisPrint: redis.print 
}
