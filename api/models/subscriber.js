const mongoose = require('mongoose');
const subscriberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    bloodType: String
});

module.exports = mongoose.model('Subscriber', subscriberSchema)