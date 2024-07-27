const router = require('express').Router();
const adminServices = require('../services/adminUserServices');

router.post('/login', async (req, res) => {
    const {password} = req.body;
    try {
        console.log('adin')
        const token = await adminServices.authorizeAdmin({password})
        res.status(200).json({token});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
})

router.post('/deleteTable', async (req, res) => {
    const {tableNumber} = req.body;
    try {
        const result = await adminServices.deleteTable({tableNumber});
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(400).json({message: error.message});
    }
})

router.post('/addTable', async (req, res) => {
    const {tableNumber} = req.body;
    try {
        const result = await adminServices.addTable({tableNumber});
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding table:', error);
        res.status(400).json({message: error.message});
    }
})

router.post('/updateMenu', async (req, res) => {
    const {menu} = req.body;
    try {
        const result = await adminServices.updateMenu({menu});
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(400).json({message: error.message});
    }
});

router.post('/addMenuItem', async (req, res) => {
    const {name, price} = req.body;
    try {
        const newMenuItem = await adminServices.addMenuItem({name, price});
        res.status(200).json(newMenuItem);
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(400).json({message: error.message});
    }
});

router.post('/updateInfo', async (req, res) => {
    const {name, address1, address2, phone} = req.body;
    try {
        const result = await adminServices.updateInfo({name, address1, address2, phone});
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating info:', error);
        res.status(400).json({message: error.message});
    }
});

router.get('/info', async (req, res) => {
    try {
        const info = await adminServices.getInfo();
        res.status(200).json(info);
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(400).json({message: error.message});
    }
});

module.exports = router;