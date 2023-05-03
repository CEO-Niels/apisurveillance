const express = require('express');
const bodyParser = require('body-parser');
const imagesRoutes = require('./routes/imagesRoutes');
const connectDB = require("./database/db");
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', imagesRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});