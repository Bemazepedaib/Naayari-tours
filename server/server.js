require('dotenv').config()

//libraries
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const app = express();

//schemas
const users = require('./schemas/users');

//listen
app.get('/', (req, res) => {
    res.json({msg : 'API is Working'})
})

//graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: users,
    graphiql: process.env.NODE_ENV === 'development'
}))

//connect to db
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Listening on port: ", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
