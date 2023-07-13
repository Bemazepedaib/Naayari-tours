const { request } = require('graphql-request');
require('dotenv').config({ path: '../../.env' })
const { google } = require('googleapis');
const fs = require('fs');

const serviceAccountKey = require('./service-account.json');

const endpoint = process.env.ENDPOINT

const addReview = `
    mutation addReview($tripName: String!, $tripReview: InputTripReview!) {
        addReview(tripName: $tripName, tripReview: $tripReview)
    }
`

const authenticate = () => {
    const { client_email, private_key } = serviceAccountKey;

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email,
            private_key,
        },
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    return auth;
};

const auth = authenticate();

const uploadImage = async (req, res) => {
    try {
        const drive = google.drive({ version: 'v3', auth });
        const file = req.files.fileData
        const imageData = Buffer.from(file.data, 'binary')
        fs.writeFileSync('image.jpg', imageData)
        const imageFile = fs.readFileSync('image.jpg')
        const response = await drive.files.create({
            requestBody: {
                name: `${req.body.tripName}/${file.name}/${new Date().toISOString().split("T")[0].split("-").reverse().join("-")}`,
                mimeType: file.mimetype,
                parents: ['1RW3JONgSNG2gx_ZXQTCFU6ZnUGT9xnBd'],
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream('image.jpg'),
            },
        });
        fs.unlinkSync('image.jpg')
        try {
            const variables = {
                tripName: req.body.tripName,
                tripReview: {
                    user: req.body.user,
                    rating: parseInt(req.body.rating),
                    review: req.body.review,
                    date: new Date().toISOString().split("T")[0].split("-").reverse().join("/"),
                    photo: response.data.id
                }
            }
            const queryResponse = await request(endpoint, addReview, variables)
            res.status(200).send(queryResponse.addReview)
        } catch (error) {
            res.status(500).send(error.message)
        }
    } catch (error) {
        res.status(500).send('An error occurred while uploading the file.');
    }
}

module.exports = { uploadImage }