// routes/events.js
const router = require('express').Router();
const controller = require('../controllers/events');
const {
  validateObjectIdParam,
  validateEvent,
} = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth'); // waiting from the team

router.get(
  '/',
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Get all events'
     #swagger.responses[200] = { description: 'List of events', schema: [{ $ref: '#/definitions/Event' }] }
     #swagger.responses[500] = { description: 'Server error' } */
  controller.getAll,
);

router.get(
  '/:id',
  validateObjectIdParam,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Get a single event by id'
     #swagger.responses[200] = { description: 'The event', schema: { $ref: '#/definitions/Event' } }
     #swagger.responses[400] = { description: 'Invalid id format' }
     #swagger.responses[404] = { description: 'Event not found' } */
  controller.getSingle,
);

router.post(
  '/',
  isAuthenticated,
  validateEvent,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Create an event (authentication required)'
     #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/EventInput' } }
     #swagger.responses[201] = { description: 'Event created', schema: { $ref: '#/definitions/EventCreated' } }
     #swagger.responses[400] = { description: 'Validation failed' }
     #swagger.responses[401] = { description: 'Not authenticated' } */
  controller.createEvent,
);

router.put(
  '/:id',
  isAuthenticated,
  validateObjectIdParam,
  validateEvent,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Update an event (authentication required)'
     #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/EventInput' } }
     #swagger.responses[204] = { description: 'Event updated' }
     #swagger.responses[400] = { description: 'Validation failed or invalid id' }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[404] = { description: 'Event not found' } */
  controller.updateEvent,
);

router.delete(
  '/:id',
  validateObjectIdParam,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Delete an event'
     #swagger.responses[204] = { description: 'Event deleted' }
     #swagger.responses[400] = { description: 'Invalid id format' }
     #swagger.responses[404] = { description: 'Event not found' } */
  controller.deleteEvent,
);

module.exports = router;
