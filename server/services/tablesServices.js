const tables = require('../models/tablesSchema');
const menu = require('../models/menuSchema');

exports.getTables = async () => {
    try {
        const tablesList = await tables.find();
        return tablesList;
    } catch (error) {
        throw new Error(error);
    }
}

exports.takeTable = async (tableNumber) => {
    try {
        const table = await tables.findOne({ tableNumber });
        if (table.isTaken) {
            throw new Error('Table is already taken');
        }
        table.isTaken = true;
        await table.save();
        return 'Table is taken';
    } catch (error) {
        throw new Error(error);
    }
}

exports.getMenu = async () => {
    try {
        const menuList = await menu.find();
        console.log(menuList)
        return menuList;
    } catch (error) {
        throw new Error(error);
    }
}

exports.getTableByNumber = async (tableNumber) => {
    try {
        return await tables.findOne({ tableNumber });
    } catch (error) {
        throw new Error(error);
    }
}

exports.makeOrder = async (tableNumber, order) => {
    console.log(tableNumber, order)
}