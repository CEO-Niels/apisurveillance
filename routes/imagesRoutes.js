const express = require('express');
const multer = require('multer');
const imagesController = require('../controllers/imagesController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/images', upload.single('image'), imagesController.uploadImage);
router.get('/images/:imageId', imagesController.getImageById);

module.exports = router;