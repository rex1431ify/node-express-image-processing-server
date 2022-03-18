const { request } = require('express');
const {Router} = require('express');
const multer = require('multer');
const { response } = require('../app');

const router = Router();

const filename = (request, file, callback) => {
    callback(null, fle.orginalname);
};

const storage = multer.diskspace({
    destination: 'api/uploads/',
    filename,
});

const fileFilter = (request, file, callback) => {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'wrong file type'
        callback(null, false, new Error('wrong file type'));
    } else {
        callback(null, true);
    }
};

const upload = multer ({
    fileFilter,
    storage,
});

router.post('upload', upload.single('photo'), (request, response) => {
    if (request.fileValidationError) return response.status(400).json({error: request.fileValidationError})
    return response.status(201).json({success: true});
});
module.exports = router;