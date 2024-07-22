const tables = require('../models/tablesSchema');
const menu = require('../models/menuSchema');

exports.getTables = async () => {
    try {
        const tablesList = await tables.find();
        return tablesList;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getTable = async (tableNumber) => {
    try {
        const table = await tables.findOne({ tableNumber });
        if (!table) {
            throw new Error('Table not found');
        }
        return table;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getMenu = async () => {
    try {
        const menuList = await menu.find();
        console.log(menuList);
        return menuList;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getTableByNumber = async (tableNumber) => {
    try {
        const table = await tables.findOne({ tableNumber });
        // Replace orders with the actual order objects
        const IDs = table.orders;
        const orders = await menu.find({ _id: { $in: IDs } });
        table.orders = orders;
        console.log(table);
        return table;
    } catch (error) {
        throw new Error(error);
    }
};

exports.makeOrder = async (tableNumber, orders) => {
    try {
        const table = await tables.findOne({ tableNumber });

        orders.forEach((newOrder) => {
            const existingOrder = table.orders.find(order => order.name === newOrder.name);
            if (existingOrder) {
                existingOrder.quantity += newOrder.quantity;
            } else {
                table.orders.push(newOrder);
            }
        });

        await table.save();
        return 'Order successfully added';
    } catch (error) {
        throw new Error(error);
    }
};

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
};

exports.takeTable = async (tableNumber) => {
    try {
        const table = await tables.findOne({ tableNumber });
        table.isTaken = true;
        await table.save();
        return 'Table is now taken';
    } catch (error) {
        throw new Error(error);
    }
};
