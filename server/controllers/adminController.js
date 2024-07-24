const router = require('express').Router();
const adminServices = require('../services/adminUserServices');

router.post('/login', async (req, res) => {
    const { password } = req.body;
    try {
        console.log('adin')
        const token = await adminServices.authorizeAdmin({ password })
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.post('/deleteTable', async (req, res) => {
    const { tableNumber } = req.body;
    try {
        const result = await adminServices.deleteTable({ tableNumber });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(400).json({ message: error.message });
    }
})

router.post('/addTable', async (req, res) => {
    const { tableNumber } = req.body;
    try {
        const result = await adminServices.addTable({ tableNumber });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding table:', error);
        res.status(400).json({ message: error.message });
    }
})

router.post('/updateMenu', async (req, res) => {
    const { menu } = req.body;
    try {
        const result = await adminServices.updateMenu({ menu });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;