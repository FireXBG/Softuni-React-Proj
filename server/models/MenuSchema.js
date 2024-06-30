const { Schema, model } = require('mongoose');

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
})

module.exports = model('Menu', menuSchema);