require('dotenv').config()

//libraries
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const fileUpload = require('express-fileupload');

//middlewares
const { auth } = require('./middlewares/login');
const { uploadImage } = require('./middlewares/googledrive');

//schemas
const schema = require('./schemas/schema');

//enable file uploads
app.use(fileUpload())

//cors
app.use(cors());

//middleware de auth
app.use(auth);

//increase payload size limit
app.use(bodyParser.json({ limit: '10mb' }))

//use urlencoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//googleDrive endpoint
app.post('/uploadImage', uploadImage)

//graphql endpoint
app.all('/NaayarAPI', graphqlHTTP({ 
    schema: schema,
    graphiql: true
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