const { ObjectId } = require('mongodb');
const {
  validateRegistrationData,
} = require('../helpers/validateRegistration');

const validateRegistrationIdParam = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid id format',
    });
  }

  next();
};

const validateRegistration = (req, res, next) => {
  const { errors, data } = validateRegistrationData(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  req.registrationData = data;
  next();
};

module.exports = {
  validateRegistrationIdParam,
  validateRegistration,
};