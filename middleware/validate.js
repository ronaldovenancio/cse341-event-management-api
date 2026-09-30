const { validateVenue } = require('../helpers/validate');

const validateVenueRequest = (req, res, next) => {
  const errors = validateVenue(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors
    });
  }

  next();
};

module.exports = {
  validateVenueRequest
};