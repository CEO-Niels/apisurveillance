const express = require('express');
const bodyParser = require('body-parser');
const imagesRoutes = require('./routes/imagesRoutes');
const connectDB = require("./database/db");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

// Ajoutez ces deux lignes pour servir les fichiers statiques du dossier "public"
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.text());
app.use('/api', imagesRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    // Track the face every second
    setInterval(trackFace, 1000);

});

const imageWidth = 296;
const imageHeight = 400;

function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

async function trackFace() {
    try {
        // Get face coordinates from your API
        const response = await fetch('http://172.16.0.67:8001/');
        const data = await response.json();

        // If there is a target name, don't do anything
        if (data.target) {
            console.log('Target:', data.target);
            return;
        }

        // If there is no face data, don't do anything
        if (!data.face_location || !data.face_location.length) {
            return;
        }
        console.log('ici');
        // Assume the first face is the one we want
        const [top, right, bottom, left] = data.face_location;

        // Calculate the center of the face
        let centerX = (right + left) / 2;
        let centerY = (top + bottom) / 2;

        // Convert pixel coordinates to servo angles
        let servoX = map(centerX, 0, imageWidth, 0, 180);
        let servoY = map(centerY, 0, imageHeight, 0, 180);

        // Send the angles to your servomotors
        await fetch('http://172.16.0.50/servo1?position=' + servoX);
        await fetch('http://172.16.0.50/servo2?position=' + servoY);
    } catch (err) {
        console.error(err);
    }
}

// Track the face every second
setInterval(trackFace, 100);