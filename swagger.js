// run with: node swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Event Management API',
    description: 'API for managing events, venues, registrations and users.',
    version: '1.0.0',
  },
  host: 'cse341-events-utph.onrender.com', // change to your Render host when deploying, e.g. 'your-app.onrender.com'
  schemes: ['https'], // use ['https'] on Render
  tags: [{ name: 'Events', description: 'Event endpoints' }],
  definitions: {
    Event: {
      _id: '64f1a2b3c4d5e6f7a8b9c0d1',
      title: 'Community Health Fair',
      description: 'Free screenings and health talks for the community.',
      eventDate: '2026-11-14',
      startTime: '09:00',
      endTime: '15:30',
      venueId: '64f1a2b3c4d5e6f7a8b9c0d2',
      category: 'Health',
      capacity: 250,
      organizerId: '64f1a2b3c4d5e6f7a8b9c0d3',
    },
    EventInput: {
      $title: 'Community Health Fair',
      $description: 'Free screenings and health talks for the community.',
      $eventDate: '2026-11-14',
      $startTime: '09:00',
      $endTime: '15:30',
      $venueId: '64f1a2b3c4d5e6f7a8b9c0d2',
      $category: 'Health',
      $capacity: 250,
      $organizerId: '64f1a2b3c4d5e6f7a8b9c0d3',
    },
    EventCreated: { id: '64f1a2b3c4d5e6f7a8b9c0d1' },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
