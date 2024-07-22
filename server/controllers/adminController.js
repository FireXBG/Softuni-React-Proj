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

module.exports = router;