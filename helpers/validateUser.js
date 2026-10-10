const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const isValidEmail = (email) =>
  typeof email === 'string' &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidDate = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false;

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const validateUserData = (user) => {
  const errors = {};

  if (!isNonEmptyString(user.displayName)) {
    errors.displayName =
      'displayName is required and must be a non-empty string';
  }

  if (
    user.email !== null &&
    user.email !== undefined &&
    user.email !== '' &&
    !isValidEmail(user.email)
  ) {
    errors.email =
      'email must be a valid email address when provided';
  }

  if (!isNonEmptyString(user.oauthProvider)) {
    errors.oauthProvider =
      'oauthProvider is required and must be a non-empty string';
  }

  if (!isNonEmptyString(user.oauthId)) {
    errors.oauthId =
      'oauthId is required and must be a non-empty string';
  }

  if (!isValidDate(user.createdAt)) {
    errors.createdAt =
      'createdAt is required and must be a valid date';
  }

  const data = {
    displayName:
      typeof user.displayName === 'string'
        ? user.displayName.trim()
        : user.displayName,

    email:
      typeof user.email === 'string'
        ? user.email.trim()
        : user.email,

    oauthProvider:
      typeof user.oauthProvider === 'string'
        ? user.oauthProvider.trim()
        : user.oauthProvider,

    oauthId:
      typeof user.oauthId === 'string'
        ? user.oauthId.trim()
        : user.oauthId,

    createdAt: user.createdAt,
  };

  return {
    errors,
    data,
  };
};

module.exports = {
  validateUserData,
};