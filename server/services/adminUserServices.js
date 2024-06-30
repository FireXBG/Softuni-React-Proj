const adminUser = require('../models/adminUserSchema');
const bcrypt = require('bcryptjs');

exports.authorizeAdmin = async (data) => {
    const pass = data.password;

    try {
        const admin = await adminUser.findOne({});

        const isMatch = await bcrypt.compare(pass, admin.password);

        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        return 'Admin authorized';
    } catch (error) {
        throw new Error('Admin authorization failed');
    }
};
