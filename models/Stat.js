const mongoose = require('mongoose');

const StatSchema = mongoose.Schema({
    productID: {
        type: String
    },
    productName:{
        type:String
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('stats', StatSchema);