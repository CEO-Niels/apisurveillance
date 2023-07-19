const mongoose = require('mongoose');

// Configuration de la connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://45.147.99.116/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connexion à la base de données réussie : ${connection.connection.host}`);
    } catch (err) {
        console.log(`Erreur de connexion à la base de données : ${err}`);
    }
};

module.exports = connectDB;