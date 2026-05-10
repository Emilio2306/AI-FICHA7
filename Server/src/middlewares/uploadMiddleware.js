const multer = require('multer');
const path = require('path');

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
exports.fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};
exports.upload = multer({ 
    storage: exports.storage,
    fileFilter: exports.fileFilter
});
