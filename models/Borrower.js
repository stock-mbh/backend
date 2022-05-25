const mongoose = require('mongoose');

const BorrowerSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    comment: {
        type: String
    },
    credit: {
        type: Number
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('borrowers', BorrowerSchema);