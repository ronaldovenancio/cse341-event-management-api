const {
  validateVenue,
  isValidObjectId,
  validateEventData
} = require('../helpers/validate');

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

// middleware/validate.js  (EVENTS section )


// Rejects malformed ids before they reach MongoDB.
const validateObjectIdParam = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid id format' });
  }
  next();
};

// Validates POST /events and PUT /events/:id bodies.
const validateEvent = (req, res, next) => {
  const { errors, data } = validateEventData(req.body);
  if (!data) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  req.eventData = data; // cleaned, whitelisted payload
  next();
};

module.exports = {
  validateVenueRequest,
  validateObjectIdParam,
  validateEvent
};
