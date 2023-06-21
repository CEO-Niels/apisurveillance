const express = require('express');
const bodyParser = require('body-parser');
const imagesRoutes = require('./routes/imagesRoutes');
const connectDB = require("./database/db");
const app = express();
const port = process.env.PORT || 3000;

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
});