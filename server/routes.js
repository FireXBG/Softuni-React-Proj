const router = require('express').Router();
const authController = require('./controllers/authController');
const operationsController = require('./controllers/operationsController');
const adminController = require('./controllers/adminController');

router.use('/auth', authController);
router.use('/operations', operationsController);
router.use('/admin', adminController)

module.exports = router;