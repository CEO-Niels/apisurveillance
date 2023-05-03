const Image = require('../models/imageModel');

const uploadImage = async (req, res) => {
    try {
        const newImage = new Image({
            imageData: req.file.buffer,
            contentType: req.file.mimetype,
        });

        const savedImage = await newImage.save();
        res.status(201).json({ message: 'Image uploaded and saved successfully', imageId: savedImage._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving image' });
    }
};

const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        if (image) {
            res.contentType(image.contentType);
            res.send(image.imageData);
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
};

module.exports = { uploadImage, getImageById };