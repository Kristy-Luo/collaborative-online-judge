const express = require('express');
const app = express(); 
const restRouter = require('./routes/rest'); 

// connect to mongodb 
const mongoose = require('mongoose');
mongoose.connect("mongodb://user:user@ds123698.mlab.com:23698/ojdb");

// application-level middleware
app.use('/api/v1', restRouter);
app.listen(3000, () => console.log("server listening on port 3000"));