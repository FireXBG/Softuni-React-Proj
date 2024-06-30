const router = require('express').Router();
const authServices = require('../services/userServices');

router.post('/login', async (req, res) => {
    try {
        const pass = req.body.password;

        const token = await authServices.authorize(pass);
        res.json({ token });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;