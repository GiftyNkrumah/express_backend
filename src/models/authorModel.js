const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {type: String, maxlength: 30},
    bookTitle: {type: String, maxlength: 50},
    pagesNumber: {type: Number},
    bookISBN: {type: String, minlength: 13, maxlength: 13, unique: true},
    bookLikes: {type: Number}
})

const Author = mongoose.model('author', authorSchema)

module.exports = Author