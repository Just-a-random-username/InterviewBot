const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const fileRoute = express.Router();
const pdfparse=require('../utils/pdfparse')

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


fileRoute.use(fileUpload());

fileRoute.post('/upload', (req, res) => {

    if (!req.files || !req.files.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
        return res.status(400).send('Only PDF files are allowed.');
    }

    const maxSize = 5 * 1024 * 1024;
    if (uploadedFile.size > maxSize) {
        return res.status(400).send('File size should be less than 5MB.');
    }

    const filename = `${Date.now()}-${uploadedFile.name}`;
    const filePath = path.join(uploadDir, filename);

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).send('Error uploading file.');
        }
        console.log(filePath)
        pdfparse(filePath)
        res.status(200).json({
            message: 'File uploaded successfully',
            filename: filename,
            path: filePath
        });
    });
});

fileRoute.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('File download error:', err);
            res.status(500).send('Error downloading file.');
        }
    });
});



module.exports = fileRoute;
