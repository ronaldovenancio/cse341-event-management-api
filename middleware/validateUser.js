const { ObjectId } = require('mongodb');
const { validateUserData } = require('../helpers/validateUser');

const validateUserIdParam = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid id format',
    });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { errors, data } = validateUserData(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  req.userData = data;
  next();
};

module.exports = {
  validateUserIdParam,
  validateUser,
};