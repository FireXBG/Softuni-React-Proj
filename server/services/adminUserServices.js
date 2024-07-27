const table = require('../models/tablesSchema');
const Menu = require('../models/menuSchema');
const Info = require('../models/infoSchema');


exports.deleteTable = async (data) => {
    const tableNumber = data.tableNumber;

    try {
        await table.deleteOne({tableNumber});
        return 'Table deleted successfully';
    } catch (error) {
        throw new Error(error);
    }
};

exports.addTable = async (data) => {
    const tableNumber = data.tableNumber;

    try {
        const existingTable = await table.find({tableNumber});
        if (existingTable.length > 0) {
            throw new Error('Table already exists');
        }

        const newTable = new table({tableNumber, isTaken: false});
        await newTable.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateMenu = async (data) => {
    const menuItems = data.menu;

    try {
        for (let menuItem of menuItems) {
            const {_id, name, price} = menuItem;
            if (_id) {
                await Menu.findByIdAndUpdate(_id, {name, price}, {new: true, useFindAndModify: false});
            } else {
                const newMenuItem = new Menu({name, price});
                await newMenuItem.save();
            }
        }

        const updatedMenu = await Menu.find({});
        return updatedMenu;
    } catch (error) {
        console.error('Error updating menu:', error.message);
        throw new Error('Error updating menu');
    }
};

exports.addMenuItem = async (data) => {
    const {name, price} = data;

    try {
        const newMenuItem = new Menu({name, price});
        await newMenuItem.save();
        return newMenuItem;
    } catch (error) {
        console.error('Error adding menu item:', error.message);
        throw new Error('Error adding menu item');
    }
};

exports.updateInfo = async (data) => {
    const {name, address1, address2, phone} = data;

    try {
        let info = await Info.findOne({});
        if (!info) {
            info = new Info({
                name: name || '',
                addressLine1: address1 || '',
                addressLine2: address2 || '',
                phoneNo: phone || ''
            });
        } else {
            info.name = name;
            info.addressLine1 = address1;
            info.addressLine2 = address2;
            info.phoneNo = phone;
        }
        await info.save();
        return info;
    } catch (error) {
        console.error('Error updating info:', error.message);
        throw new Error('Error updating info');
    }
};

exports.getInfo = async () => {
    try {
        const info = await Info.findOne({});
        return info;
    } catch (error) {
        console.error('Error getting info:', error.message);
        throw new Error('Error getting info');
    }
};