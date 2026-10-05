const { ObjectId } = require('mongodb');

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const isValidDate = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false;

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const validateRegistrationData = (registration) => {
  const errors = {};

  if (!ObjectId.isValid(registration.eventId)) {
    errors.eventId =
      'eventId is required and must be a valid ObjectId';
  }

  if (!ObjectId.isValid(registration.userId)) {
    errors.userId =
      'userId is required and must be a valid ObjectId';
  }

  if (!isValidDate(registration.registrationDate)) {
    errors.registrationDate =
      'registrationDate is required and must be a valid date';
  }

  if (!isNonEmptyString(registration.status)) {
    errors.status =
      'status is required and must be a non-empty string';
  }

  const data = {
    eventId: registration.eventId,
    userId: registration.userId,
    registrationDate: registration.registrationDate,
    status:
      typeof registration.status === 'string'
        ? registration.status.trim()
        : registration.status,
  };

  return {
    errors,
    data,
  };
};

module.exports = {
  validateRegistrationData,
};