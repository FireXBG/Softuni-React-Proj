const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    password: {
        type: String,
        required: true,
    }
})

module.exports = model('User', userSchema);