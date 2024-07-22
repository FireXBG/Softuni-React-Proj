const adminUser = require('../models/adminUserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.authorizeAdmin = async (data) => {
    const pass = data.password;

    try {
        const admin = await adminUser.findOne({});
        const isMatch = await bcrypt.compare(pass, admin.password);

        if (!isMatch) {
            throw new Error('Admin authorization failed');
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;

    } catch (error) {
        throw new Error('Admin authorization failed');
    }
};
