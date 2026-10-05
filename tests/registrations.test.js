jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const {
  getAll,
  getSingle,
} = require('../controllers/registrations');

describe('Registrations GET controllers', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();

    jest.clearAllMocks();
  });

  test('getAll returns all registrations with status 200', async () => {
    const mockRegistrations = [
      {
        _id: new ObjectId(),
        status: 'confirmed',
      },
      {
        _id: new ObjectId(),
        status: 'cancelled',
      },
    ];

    const toArray = jest.fn().mockResolvedValue(mockRegistrations);
    const find = jest.fn().mockReturnValue({
      toArray,
    });

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find,
      }),
    });

    await getAll(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRegistrations);
    expect(next).not.toHaveBeenCalled();
  });

  test('getAll forwards database errors to next', async () => {
    const error = new Error('Database error');

    const toArray = jest.fn().mockRejectedValue(error);
    const find = jest.fn().mockReturnValue({
      toArray,
    });

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find,
      }),
    });

    await getAll(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('getSingle returns a registration with status 200', async () => {
    const id = new ObjectId().toString();

    const mockRegistration = {
      _id: new ObjectId(id),
      status: 'confirmed',
    };

    req.params.id = id;

    const findOne = jest.fn().mockResolvedValue(mockRegistration);

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
      }),
    });

    await getSingle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRegistration);
    expect(next).not.toHaveBeenCalled();
  });

  test('getSingle returns 404 when registration does not exist', async () => {
    const id = new ObjectId().toString();

    req.params.id = id;

    const findOne = jest.fn().mockResolvedValue(null);

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
      }),
    });

    await getSingle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Registration not found',
    });
    expect(next).not.toHaveBeenCalled();
  });
});