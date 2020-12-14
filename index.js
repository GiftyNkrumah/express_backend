// modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// variables
const dbLink = process.env.DBLINK
const port = process.env.DBPORT
const userRoute = require('./src/routes/userRoute')

// database connection
mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
    app.listen(port, () => {
        console.info(`DATABASE CONNECTED, SERVER IS UP! on PORT: ${port}`)
    })    
}, (error) => {
    console.log(dbLink, port)
})

app.get('/', (request, response) => {
    response.status(200).sendFile('./background.jpg', {root: __dirname})
})

// middlewares
app.use(express.json())

// routes
const app = express()
app.use(userRoute)

// app.get('/', (req, res) => {
//     res.status(200).send('<h1>Hei you, you dey town</h1>')
// })