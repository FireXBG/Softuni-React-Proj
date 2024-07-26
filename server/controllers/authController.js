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

router.get('/getUsers', async (req, res) => {
    try {
        const users = await authServices.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/changePassword', async (req, res) => {
    try {
        const userId = req.body.userId;
        const newPassword = req.body.newPassword;
        await authServices.changePassword(userId, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/createUser', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        await authServices.createUser(username, password, role);
        res.status(200).json({ message: 'User created successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        await authServices.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;