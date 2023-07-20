const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    discription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
});

const TODOLists = mongoose.model('TODOLists', todoSchema);

module.exports = TODOLists;
