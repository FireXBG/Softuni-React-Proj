const { Schema, model } = require('mongoose');

const infoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    }
})

module.exports = model('Info', infoSchema);