const router = require('express').Router();
const tablesServices = require('../services/tablesServices');

router.get('/getTables', async (req, res) => {
    try {
        const tables = await tablesServices.getTables();
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({ error: error.message });
    }
})

router.post('/takeTable', async (req, res) => {
    try {
        const tableNumber = req.body.tableNumber;
        const result = await tablesServices.takeTable(tableNumber);

        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;