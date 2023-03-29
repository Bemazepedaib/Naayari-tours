require('dotenv').config({
    path: '../.env'
})

//libraries
const express = require('express');
const mongoose = require('mongoose');
const {
    graphqlHTTP
} = require('express-graphql');
const app = express();
const cors = require('cors')

//schemas
const schema = require('./schemas/schema')
/*const users = require('./schemas/users');
const events = require('./schemas/events');
const preferences = require('./schemas/preferences');
const trips = require('./schemas/trips');*/

//listen
app.get('/', (req, res) => {
    res.json({
        msg: 'API is Working'
    })
})

//cors
app.use(cors());

//graphql endpoints
app.use('/NaayarAPI', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
}))
/*app.use('/graphql/users', graphqlHTTP({
    schema: users,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.use('/graphql/trips', graphqlHTTP({
    schema: trips,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.use('/graphql/events', graphqlHTTP({
    schema: events,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.use('/graphql/preferences', graphqlHTTP({
    schema: preferences,
    graphiql: process.env.NODE_ENV === 'development'
}))*/

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