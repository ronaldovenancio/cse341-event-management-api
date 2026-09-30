// controllers/events.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect'); // assumes db/connect.js exports getDb() returning the connected Db

const events = () => getDb().collection('events');

// Converts string ids in a cleaned payload to ObjectIds for storage.
const toDocument = (data) => ({
  ...data,
  venueId: new ObjectId(data.venueId),
  organizerId: new ObjectId(data.organizerId),
});

// Makes sure the referenced venue exists (venues collection is owned by a teammate).
const venueExists = async (venueId) =>
  !!(await getDb()
    .collection('venues')
    .findOne({ _id: new ObjectId(venueId) }, { projection: { _id: 1 } }));

// GET /events
const getAll = async (req, res, next) => {
  try {
    const result = await events().find().toArray();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// GET /events/:id
const getSingle = async (req, res, next) => {
  try {
    const event = await events().findOne({ _id: new ObjectId(req.params.id) });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// POST /events
const createEvent = async (req, res, next) => {
  try {
    if (!(await venueExists(req.eventData.venueId))) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: { venueId: 'No venue exists with this venueId' },
      });
    }
    const result = await events().insertOne(toDocument(req.eventData));
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    next(err);
  }
};

// PUT /events/:id
const updateEvent = async (req, res, next) => {
  try {
    if (!(await venueExists(req.eventData.venueId))) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: { venueId: 'No venue exists with this venueId' },
      });
    }
    const result = await events().replaceOne(
      { _id: new ObjectId(req.params.id) },
      toDocument(req.eventData),
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: 'Event not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE /events/:id
const deleteEvent = async (req, res, next) => {
  try {
    const result = await events().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'Event not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getSingle, createEvent, updateEvent, deleteEvent };
