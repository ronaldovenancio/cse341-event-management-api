const validateVenue = (venue) => {
  const errors = [];

  if (!venue.name || typeof venue.name !== 'string' || !venue.name.trim()) {
    errors.push('name is required');
  }

  if (!venue.address || typeof venue.address !== 'string' || !venue.address.trim()) {
    errors.push('address is required');
  }

  if (!venue.city || typeof venue.city !== 'string' || !venue.city.trim()) {
    errors.push('city is required');
  }

  if (!venue.state || typeof venue.state !== 'string' || !venue.state.trim()) {
    errors.push('state is required');
  }

  if (!venue.country || typeof venue.country !== 'string' || !venue.country.trim()) {
    errors.push('country is required');
  }

  if (
    !Number.isInteger(venue.capacity) ||
    venue.capacity <= 0
  ) {
    errors.push('capacity must be a positive integer');
  }

  return errors;
};

// helpers/validate.js  (EVENTS section )
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const isValidObjectId = (value) =>
  typeof value === 'string' && OBJECT_ID_REGEX.test(value);

const isValidDate = (value) => {
  if (typeof value !== 'string' || !DATE_REGEX.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
};

const isNonEmptyString = (value, max) =>
  typeof value === 'string' &&
  value.trim().length > 0 &&
  value.trim().length <= max;

/**
 * Validates a full event payload (used for both POST and PUT).
 * Returns { errors, data } – `data` is a cleaned copy containing only allowed fields.
 */
const validateEventData = (body = {}) => {
  const errors = {};

  if (!isNonEmptyString(body.title, 100))
    errors.title = 'title is required and must be a string of 1-100 characters';

  if (!isNonEmptyString(body.description, 1000))
    errors.description =
      'description is required and must be a string of 1-1000 characters';

  if (!isValidDate(body.eventDate))
    errors.eventDate =
      'eventDate is required and must be a valid date in YYYY-MM-DD format';

  if (typeof body.startTime !== 'string' || !TIME_REGEX.test(body.startTime))
    errors.startTime =
      'startTime is required and must be in 24-hour HH:MM format';

  if (typeof body.endTime !== 'string' || !TIME_REGEX.test(body.endTime))
    errors.endTime = 'endTime is required and must be in 24-hour HH:MM format';

  if (!errors.startTime && !errors.endTime && body.endTime <= body.startTime)
    errors.endTime = 'endTime must be later than startTime';

  if (!isValidObjectId(body.venueId))
    errors.venueId = 'venueId is required and must be a valid 24-character id';

  if (!isNonEmptyString(body.category, 50))
    errors.category =
      'category is required and must be a string of 1-50 characters';

  if (!Number.isInteger(body.capacity) || body.capacity < 1)
    errors.capacity =
      'capacity is required and must be a whole number of at least 1';

  if (!isValidObjectId(body.organizerId))
    errors.organizerId =
      'organizerId is required and must be a valid 24-character id';

  const data = Object.keys(errors).length
    ? null
    : {
        title: body.title.trim(),
        description: body.description.trim(),
        eventDate: body.eventDate,
        startTime: body.startTime,
        endTime: body.endTime,
        venueId: body.venueId,
        category: body.category.trim(),
        capacity: body.capacity,
        organizerId: body.organizerId,
      };

  return { errors, data };
};

module.exports = {
  validateVenue,
  isValidObjectId,
  validateEventData
};
