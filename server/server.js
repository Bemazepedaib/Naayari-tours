require('dotenv').config()

//libraries
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const cors = require('cors');
const { auth } = require('./middlewares/login');

//schemas
const schema = require('./schemas/schema');

//cors
app.use(cors());

//middleware de auth
app.use(auth);

//graphql endpoint
app.use('/NaayarAPI', graphqlHTTP({
    schema: schema,
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