const User = require('../models/userModel')

function handleError(error) {
    
    let err = { username: '', email: '', password: '' }
    
    if (error.message === 'incorrect username') {
        err.username = 'that username does not exist'
    }

    if (error.message === 'incorrect email') {
        err.email = ' that email is not valid'
    }

    if (error.message === 'incorrect password') {
        err.message = 'that password is incorrect'
    }

    if (error.code === 11000) {
        err.message = 'that email is registered already'
    }

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }

    return err

}
const userCtrl = {}

// Create user (POST method)
userCtrl.createUser = async(req, res) => {
    try{
        let newUser = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({message: 'Your account has been created', result})
    } catch (error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

//  Read a user detail (GET method)
userCtrl.getUserDetails = async(req, res) => {
    try{
        let person = await User.findOne({username: req.body.username})
        if(!person){
            res.status(400).send({message: 'user does not exist, check planet Mars'})
        } else {
            res.status(200).send({message: 'Welcome to earth, the user exists', "data": person})
        }
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// Update user details (UPDATE method)
userCtrl.updateUserDetails = async(req, res) => {
    
    try{
        await User.findOneAndUpdate ({_id: req.params.id}, async (user, error) => {
            if (error) {
                res.status(500).send({message: "Internal Server Error"})
            }
            user.username = req.body.username
            user.email = req.body.email
            user.password = req.body.password 
            await user.save()
            res.status(200).send({message: "User Updated", user})
        })
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}   

// Delete a use account (DELETE method)
userCtrl.deleteUser = async(req, res) => {
    try{
        let person = await User.findOneAndDelete({_id: req.params.id})
        res.status(200).send({message: 'user deported to mars'})
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

module.exports = userCtrl

