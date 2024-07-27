const router = require('express').Router();
const tablesServices = require('../services/tablesServices');

router.get('/getTables', async (req, res) => {
    try {
        const tables = await tablesServices.getTables();
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message});
    }
})

router.get('/getTable/:tableNumber', async (req, res) => {
    try {
        const {tableNumber} = req.params;
        const table = await tablesServices.getTable(tableNumber);
        res.status(200).json(table);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
});

router.get('/getMenu', async (req, res) => {
    try {
        const menu = await tablesServices.getMenu();
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message});
    }
})

router.post('/takeTable', async (req, res) => {
    try {
        const tableNumber = req.body.tableNumber;
        const result = await tablesServices.takeTable(tableNumber);

        res.status(200).json({message: result});
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({error: error.message});
    }
})

router.post('/makeOrder', async (req, res) => {
    try {
        const {tableNumber, orders} = req.body;
        const result = await tablesServices.makeOrder(tableNumber, orders);

        res.status(200).json({message: result});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
});

router.post('/closeTable', async (req, res) => {
    const tableNumber = req.body.tableNumber;
    try {
        const result = await tablesServices.closeTable(tableNumber);
        res.status(200).json({message: result});
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error: error.message});
    }
})

module.exports = router;