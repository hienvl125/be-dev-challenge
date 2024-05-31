const { Router } = require('express');
const weaponController = require('./weapon.controller');
const withErrorCatcher = require('./../../errors/withErrorCatcher');
const authMiddleware = require('./../../middlewares/auth.middleware');
const router = Router();

router.get('/', authMiddleware, withErrorCatcher(weaponController.Index));
router.post('/', authMiddleware, withErrorCatcher(weaponController.Create));
router.put('/:id', authMiddleware, withErrorCatcher(weaponController.Update));
router.delete('/:id', authMiddleware, withErrorCatcher(weaponController.Delete));

module.exports = router;
