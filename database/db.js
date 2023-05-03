const mongoose = require('mongoose');

// Configuration de la connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://nielsbeaumont:OuPzJASHRO5pxACm@bielsneaumont.m5btu54.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connexion à la base de données réussie : ${connection.connection.host}`);
    } catch (err) {
        console.log(`Erreur de connexion à la base de données : ${err}`);
    }
};

module.exports = connectDB;