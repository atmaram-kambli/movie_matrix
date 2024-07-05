const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/movie_matrix';

const connectToMongoDB = () => {
    mongoose.connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

module.exports = connectToMongoDB;
