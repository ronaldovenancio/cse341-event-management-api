const { isAuthenticated } = require('../middleware/auth');
const router = require('express').Router();
const controller = require('../controllers/registrations');
const {
  validateRegistrationIdParam,
  validateRegistration,
} = require('../middleware/validateRegistration');

router.get('/', controller.getAll);

router.get(
  '/:id',
  validateRegistrationIdParam,
  controller.getSingle,
);

router.post(
  '/',
  isAuthenticated,
  validateRegistration,
  controller.createRegistration,
);

router.put(
  '/:id',
  isAuthenticated,
  validateRegistrationIdParam,
  validateRegistration,
  controller.updateRegistration,
);

router.delete(
  '/:id',
  validateRegistrationIdParam,
  controller.deleteRegistration,
);

module.exports = router;