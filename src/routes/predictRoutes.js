const express = require('express');
const multer = require('multer');
const { handlePrediction, getPredictionHistory } = require('../controllers/predictController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG and PNG images are allowed'), false);
    }
    cb(null, true);
  },
});

router.post('/', upload.single('image'), handlePrediction);
router.get('/histories', getPredictionHistory);

module.exports = router;