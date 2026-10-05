const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const registrations = () => getDb().collection('registrations');

// GET /registrations
const getAll = async (req, res, next) => {
  try {
    const result = await registrations().find().toArray();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// GET /registrations/:id
const getSingle = async (req, res, next) => {
  try {
    const registration = await registrations().findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!registration) {
      return res.status(404).json({
        message: 'Registration not found',
      });
    }

    res.status(200).json(registration);
  } catch (err) {
    next(err);
  }
};

// POST /registrations
const createRegistration = async (req, res, next) => {
  try {
    const registrationData = {
      ...req.registrationData,
      eventId: new ObjectId(req.registrationData.eventId),
      userId: new ObjectId(req.registrationData.userId),
    };

    const result = await registrations().insertOne(registrationData);

    res.status(201).json({
      id: result.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /registrations/:id
const updateRegistration = async (req, res, next) => {
  try {
    const registrationData = {
      ...req.registrationData,
      eventId: new ObjectId(req.registrationData.eventId),
      userId: new ObjectId(req.registrationData.userId),
    };

    const result = await registrations().replaceOne(
      {
        _id: new ObjectId(req.params.id),
      },
      registrationData,
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Registration not found',
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE /registrations/:id
const deleteRegistration = async (req, res, next) => {
  try {
    const result = await registrations().deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Registration not found',
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};