const Image = require('../models/imageModel');

const uploadImage = async (req, res) => {
    try {
        const newImage = new Image({
            imageData: req.file.buffer,
            contentType: req.file.mimetype,
            date: Date.now(),
            isAuthorized: true
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

const getLastImage = async (req, res) => {
    try {
        const images = await Image.find({}).sort({date: "desc"});
        if (images) {
            res.contentType(images[0].contentType);
            res.send(images[0].imageData);
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving last image' });
    }
}

const getHistory = async (req, res) => {
    try {
        const images = await Image.find({}).sort({data: "desc"});
        if (images) {
            res.send(JSON.stringify(images.slice(0, 9)));
        }
        else {
            res.status(404).json({ message: 'No images' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving images'});
    }
}

module.exports = { uploadImage, getImageById, getLastImage, getHistory };