const router = require('express').Router();
const controller = require('../controllers/users');
const {
  validateUserIdParam,
  validateUser,
} = require('../middleware/validateUser');

router.get('/', controller.getAll);

router.get(
  '/:id',
  validateUserIdParam,
  controller.getSingle,
);

router.post(
  '/',
  validateUser,
  controller.createUser,
);

router.put(
  '/:id',
  validateUserIdParam,
  validateUser,
  controller.updateUser,
);

router.delete(
  '/:id',
  validateUserIdParam,
  controller.deleteUser,
);

module.exports = router;