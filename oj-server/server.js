const express = require('express');
const app = express(); // Application-level middleware
const restRouter = require('./routes/rest'); // Routing-level middleware

app.use('/api/v1', restRouter);
app.listen(3000, () => console.log("server listening on port 3000"));