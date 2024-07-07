const { Schema, model } = require('mongoose');

const tablesSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true,
    },
    isTaken: {
        type: Boolean,
        required: true,
    },
    orders: {
        type: Object,
        required: true,
    },
})

module.exports = model('Tables', tablesSchema);