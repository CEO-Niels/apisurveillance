const express = require('express');
const bodyParser = require('body-parser');
const imagesRoutes = require('./routes/imagesRoutes');
const cors = require('./node_modules/cors');
const connectDB = require("./database/db");
const app = express();
const port = process.env.PORT || 3000;

// Ajoutez ces deux lignes pour servir les fichiers statiques du dossier "public"
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.text());
app.use(cors());
app.use('/api', imagesRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});