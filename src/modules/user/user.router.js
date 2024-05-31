const { Router } = require('express');
const userController = require('./user.controller');
const withErrorCatcher = require('./../../errors/withErrorCatcher');
const router = Router();

router.post('/register', withErrorCatcher(userController.Register));
router.post('/login', withErrorCatcher(userController.Login));

module.exports = router;
