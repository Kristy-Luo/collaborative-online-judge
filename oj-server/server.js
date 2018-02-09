const express = require('express');
const app = express(); 
const path = require('path');
const restRouter = require('./routes/rest'); 

// connect to mongodb 
const mongoose = require('mongoose');
mongoose.connect("mongodb://user:user@ds123698.mlab.com:23698/ojdb");

// application-level middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', restRouter);

app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public')});
})

app.listen(3000, () => console.log("server listening on port 3000"));