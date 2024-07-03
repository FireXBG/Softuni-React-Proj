const tables = require('../models/tablesSchema');

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