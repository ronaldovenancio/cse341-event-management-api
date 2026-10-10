jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const {
  getAllVenues,
  getVenueById,
} = require('../controllers/venues');

describe('Venues GET controllers', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  test('getAllVenues returns all venues with status 200', async () => {
    const mockVenues = [
      {
        _id: new ObjectId(),
        name: 'Venue 1',
      },
      {
        _id: new ObjectId(),
        name: 'Venue 2',
      },
    ];

    const toArray = jest.fn().mockResolvedValue(mockVenues);
    const find = jest.fn().mockReturnValue({
      toArray,
    });

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find,
      }),
    });

    await getAllVenues(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVenues);
  });

  test('getAllVenues returns 500 when database fails', async () => {
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

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await getAllVenues(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'An unexpected error occurred.',
    });

    consoleSpy.mockRestore();
  });

  test('getVenueById returns a venue with status 200', async () => {
    const id = new ObjectId().toString();

    const mockVenue = {
      _id: new ObjectId(id),
      name: 'Venue 1',
    };

    req.params.id = id;

    const findOne = jest.fn().mockResolvedValue(mockVenue);

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
      }),
    });

    await getVenueById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVenue);
  });

  test('getVenueById returns 404 when venue does not exist', async () => {
    const id = new ObjectId().toString();

    req.params.id = id;

    const findOne = jest.fn().mockResolvedValue(null);

    getDb.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
      }),
    });

    await getVenueById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Venue not found.',
    });
  });
});