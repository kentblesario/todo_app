

var mongoose = require('mongoose')
console.log('todo model')
const Todo = mongoose.model('todo', new mongoose.Schema({

    title: { type: String },
    dateAdded: { type: String },
    status: { type: Number, default: 0 }

    // 0 - incomplete
    // 1 - complete

}, { strict: true, _id: true }
));

module.exports = Todo;

