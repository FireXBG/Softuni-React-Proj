const { Schema, model } = require('mongoose');

const adminUserSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
})

module.exports = model('AdminUser', adminUserSchema);