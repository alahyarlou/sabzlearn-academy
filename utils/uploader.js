const multer = require('multer');
const path = require('path');

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'courses', 'covers'))
    },
    filename: (req, file, cb) => {
        const uniqeFileName = Date.now() + String(Math.random() * 9999)
        const ext = path.extname(file.originalname)
        cb(null, uniqeFileName + ext)
    }
})