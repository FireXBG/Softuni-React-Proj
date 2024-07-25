const router = require('express').Router();
const authServices = require('../services/userServices');
const { isAuthorized } = require('../middlewares/authMiddlewares');

router.get('/users', async (req, res) => {
    try {
        const users = await authServices.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = req.body.username;
        const pass = req.body.password;

        console.log(`Username: ${user} \nPassword: ${pass}`);

        const token = await authServices.authorize(user, pass);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Incorrect password' })
    }
})

router.post('/verify-token', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const { role, isValid } = await authServices.verifyToken(token);
        if (!isValid) {
            throw new Error('Invalid token');
        }
        res.json({ role });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token verification failed' });
    }
});

module.exports = router;