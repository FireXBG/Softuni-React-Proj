const adminUser = require('../models/adminUserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const table = require('../models/tablesSchema');
const Menu = require('../models/menuSchema');

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
exports.addTable = async (data) => {
    const tableNumber = data.tableNumber;

    try {
        const existingTable = await table.find({ tableNumber });
        if(existingTable.length > 0) {
            throw new Error('Table already exists');
        }

        const newTable = new table({ tableNumber, isTaken: false });
        await newTable.save();
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.updateMenu = async (data) => {
    const menuItems = data.menu;

    try {
        for (let menuItem of menuItems) {
            const { _id, name, price } = menuItem;
            await Menu.findByIdAndUpdate(_id, { name, price }, { new: true, useFindAndModify: false });
        }

        const updatedMenu = await Menu.find({});
        return updatedMenu;
    } catch (error) {
        console.error('Error updating menu:', error.message);
        throw new Error('Error updating menu');
    }
}