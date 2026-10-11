// run with: node swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Event Management API',
    description: 'API for managing events, venues, registrations and users.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://cse341-events-utph.onrender.com',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  tags: [
    { name: 'Events', description: 'Event endpoints' },
    { name: 'Venues', description: 'Venue endpoints' },
    { name: 'Users', description: 'User endpoints' },
    { name: 'Registrations', description: 'Registration endpoints' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/events.js', './routes/venues.js', './routes/users.js', './routes/registrations.js', './routes/auth.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);