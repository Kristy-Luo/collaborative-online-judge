const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    difficulty: String
});

const ProblemModel = mongoose.model('problemModel', problemSchema);
module.exports = ProblemModel; 