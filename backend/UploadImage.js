const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

function sanitizeFile(file, cb) {
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
    const isAllowedExt = fileExts.includes(path.extname(file.originalname.toLowerCase()));
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true);
    } else {
        cb("Error: File type not allowed!");
    }
}

const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 50
    }
});

module.exports = { uploadImage, s3 };
