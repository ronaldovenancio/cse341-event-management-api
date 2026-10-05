const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const users = () => getDb().collection('users');

// GET /users
const getAll = async (req, res, next) => {
  try {
    const result = await users().find().toArray();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// GET /users/:id
const getSingle = async (req, res, next) => {
  try {
    const user = await users().findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /users
const createUser = async (req, res, next) => {
  try {
    const result = await users().insertOne(req.userData);

    res.status(201).json({
      id: result.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /users/:id
const updateUser = async (req, res, next) => {
  try {
    const result = await users().replaceOne(
      {
        _id: new ObjectId(req.params.id),
      },
      req.userData,
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE /users/:id
const deleteUser = async (req, res, next) => {
  try {
    const result = await users().deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'User not found',
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
  createUser,
  updateUser,
  deleteUser,
};