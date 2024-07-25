const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const table = require('../models/tablesSchema');
const Menu = require('../models/menuSchema');


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