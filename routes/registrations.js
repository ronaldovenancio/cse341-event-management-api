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
  validateRegistration,
  controller.createRegistration,
);

router.put(
  '/:id',
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