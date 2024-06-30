const router = require('express').Router();
const authServices = require('../services/userServices');
const adminServices = require('../services/adminUserServices');
const { isAuthorized } = require('../middlewares/authMiddlewares');

router.post('/login', async (req, res) => {
    try {
        const pass = req.body.password;

        const token = await authServices.authorize(pass);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Incorrect password' })
    }
})

router.post('/change-password', isAuthorized, async (req, res) => {
    try {
        const data = req.body;

        await authServices.changePassword(data);

        res.status(200).json({ message: 'Password changed' });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Password change failed' });
    }
})

router.post('/admin', isAuthorized, async (req, res) => {
    const data = req.body;

    try {
        const token = await adminServices.authorizeAdmin(data);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Admin authorization failed' });
    }
})

module.exports = router;