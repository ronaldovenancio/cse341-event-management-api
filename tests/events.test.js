jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const {
  getAll,
  getSingle,
} = require('../controllers/events');

describe('Events GET controllers', () => {
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

  test('getAll returns all events with status 200', async () => {
    const mockEvents = [
      {
        _id: new ObjectId(),
        title: 'Event 1',
      },
      {
        _id: new ObjectId(),
        title: 'Event 2',
      },
    ];

    const toArray = jest.fn().mockResolvedValue(mockEvents);
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
    expect(res.json).toHaveBeenCalledWith(mockEvents);
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

  test('getSingle returns an event with status 200', async () => {
    const id = new ObjectId().toString();

    const mockEvent = {
      _id: new ObjectId(id),
      title: 'Event 1',
    };

    req.params.id = id;

    const findOne = jest.fn().mockResolvedValue(mockEvent);

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
      }),
    });

    await getSingle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEvent);
    expect(next).not.toHaveBeenCalled();
  });

  test('getSingle returns 404 when event does not exist', async () => {
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
      message: 'Event not found',
    });
    expect(next).not.toHaveBeenCalled();
  });
});