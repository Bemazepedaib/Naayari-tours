const { google } = require('googleapis');
const fs = require('fs');

const serviceAccountKey = require('./service-account.json');

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
        // console.log(req.body.tripName)
        // console.log(req.body.user)
        // console.log(req.body.rating)
        // console.log(req.body.review)
        const imageData = Buffer.from(file.data, 'binary')
        fs.writeFileSync('image.jpg', imageData)
        const imageFile = fs.readFileSync('image.jpg')
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimetype,
                parents: ['1RW3JONgSNG2gx_ZXQTCFU6ZnUGT9xnBd'],
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream('image.jpg'),
            },
        });
        console.log(response.data.id)
        fs.unlinkSync('image.jpg')
        res.send('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('An error occurred while uploading the file.');
    }
}

module.exports = { uploadImage }