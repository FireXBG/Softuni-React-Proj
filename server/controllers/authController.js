const router = require('express').Router();
const authServices = require('../services/userServices');
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

module.exports = router;