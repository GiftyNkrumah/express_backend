const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        minlength: [5, 'minimum username length is 5'], 
        maxlength: [16, 'maximum username length is 16'], 
        unique: true,
        required: [true, 'please enter a username'],
        lowercase: true
    },
    email: {
        type: String, 
        unique: true,
        required: [true, 'the email field is required'],
        lowercase: true
    },
    password: {
        type: String, 
        minlength: 8,
        required: [true, 'you must enter a password']
    }
})

const User = mongoose.model('user', userSchema)

userSchema.pre('save', function(){
    if (this.password !== null || undefined){
        bcrypt.hash(this.password, 'secret-text', function(err, hash){
            this.password = hash
        })
    }
    next()
})

module.exports = User