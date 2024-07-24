const adminUser = require('../models/adminUserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const table = require('../models/tablesSchema');

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

exports.deleteTable = async (data) => {
    const tableNumber = data.tableNumber;

    try {
        await table.deleteOne({ tableNumber });
        return 'Table deleted successfully';
    } catch (error) {
        throw new Error(error);
    }
};
