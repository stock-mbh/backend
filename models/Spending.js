const mongoose = require('mongoose');

const SpendingSchema = mongoose.Schema({
    comment: {
        type: String
    },
    amount: {
        type: Number
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('spendings', SpendingSchema);