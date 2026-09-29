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

module.exports = {
  validateVenue
};