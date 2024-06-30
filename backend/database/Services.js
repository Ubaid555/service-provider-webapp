const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    category: String,
    price: Number,
    description: String,
    userId: String,
    image: String
});

module.exports = mongoose.model("Service", serviceSchema);
