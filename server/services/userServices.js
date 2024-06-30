const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authorize = async (pass) => {
    try {
        const userInDb = await User.findOne();

        if (!userInDb) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(pass, userInDb.password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: userInDb._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Authorization failed');
    }
};
