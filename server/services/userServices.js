const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authorize = async (username, password) => {
    try {
        const userInDb = await User.findOne({ username });

        if (!userInDb) {
            throw new Error('User not found! Contact your administrator!');
        }

        const isMatch = await bcrypt.compare(password, userInDb.password);

        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ username, role: userInDb.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Incorrect password');
    }
};

exports.getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

exports.verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
        }
        return { role: decoded.role, isValid: true };
    } catch (error) {
        return { role: null, isValid: false };
    }
}

exports.changePassword = async (userId, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: hashedPassword });
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}