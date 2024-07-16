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
        const table = await tables.findOne({ tableNumber });
        // Replace orders with the actual order objects

        const IDs = table.orders;
        const orders = await menu.find({ _id: { $in: IDs } });
        table.orders = orders;
        console.log(table)
        return table;
    } catch (error) {
        throw new Error(error);
    }
}

exports.makeOrder = async (tableNumber, order) => {
    try {
        const table = await tables.findOne({ tableNumber });
        order.forEach((item) => {
            table.orders.push(item);
        })
        await table.save();
    } catch (error) {
        throw new Error(error);
    }
}

exports.closeTable = async (tableNumber) => {
    try {
        const table = await tables.findOne({ tableNumber });
        table.isTaken = false;
        table.orders = [];
        await table.save();
        return 'Table is closed';
    } catch (error) {
        throw new Error(error);
    }
}