require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const app = express()

//listen
app.get('/', (req, res) => {
    res.json({msg : 'API is Working'})
})

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Listening on port: ", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

