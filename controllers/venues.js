const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllVenues = async (req, res) => {
  try {
    const venues = await getDb()
      .collection('venues')
      .find()
      .toArray();

    res.status(200).json(venues);
  } catch (error) {
    console.error('Error getting venues:', error);
    res.status(500).json({
      message: 'An unexpected error occurred.'
    });
  }
};

const getVenueById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid venue ID.'
      });
    }

    const venue = await getDb()
      .collection('venues')
      .findOne({ _id: new ObjectId(id) });

    if (!venue) {
      return res.status(404).json({
        message: 'Venue not found.'
      });
    }

    res.status(200).json(venue);
  } catch (error) {
    console.error('Error getting venue:', error);
    res.status(500).json({
      message: 'An unexpected error occurred.'
    });
  }
};

const createVenue = async (req, res) => {
  try {
    const venue = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      capacity: req.body.capacity
    };

    const result = await getDb()
      .collection('venues')
      .insertOne(venue);

    res.status(201).json({
      message: 'Venue created successfully.',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating venue:', error);
    res.status(500).json({
      message: 'An unexpected error occurred.'
    });
  }
};

const updateVenue = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid venue ID.'
      });
    }

    const venue = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      capacity: req.body.capacity
    };

    const result = await getDb()
      .collection('venues')
      .replaceOne(
        { _id: new ObjectId(id) },
        venue
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Venue not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({
      message: 'An unexpected error occurred.'
    });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid venue ID.'
      });
    }

    const result = await getDb()
      .collection('venues')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Venue not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting venue:', error);
    res.status(500).json({
      message: 'An unexpected error occurred.'
    });
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue
};