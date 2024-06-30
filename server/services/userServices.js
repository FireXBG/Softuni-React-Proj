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

exports.changePassword = async (data) => {
    try {
        const oldPass = data.oldPassword;
        const newPass = data.newPassword;


        const userInDb = await User.findOne();

        if (!userInDb) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(oldPass, userInDb.password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const salt = await bcrypt.genSalt(12);

        const hashedPass = await bcrypt.hash(newPass, salt);

        userInDb.password = hashedPass;

        await userInDb.save();
    } catch (error) {
        console.error(error);
        throw new Error('Password change failed');
    }
}
