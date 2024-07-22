const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
});

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
        type: [orderSchema],
        required: true,
    },
});

module.exports = model('Tables', tablesSchema);
