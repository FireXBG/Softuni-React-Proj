const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authorize = async (pass) => {
    const DBpass = await User.find();
    const isMatch = await bcrypt.compare(pass, DBpass[0].password);

    try {
        if(!isMatch) {
            throw new Error('Invalid password');
        }

        return jwt.sign({id: DBpass[0]._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    } catch (error) {
        console.error(error)
    }
};