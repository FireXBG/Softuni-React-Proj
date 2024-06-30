const router = require('express').Router();
const authController = require('./controllers/authController');
const operationsController = require('./controllers/operationsController');

router.use('/auth', authController);
router.use('/operations', operationsController);

module.exports = router;