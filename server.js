const venuesRouter = require('./routes/venues');
const express = require('express');
require('dotenv').config();

const { initDb } = require('./db/connect');
const swaggerRouter = require('./routes/swagger');
const cors = require('cors');
const app = express();


app.use(cors()); // <-- ADD THIS
app.use(express.json());
app.use('/venues', venuesRouter);

app.use('/api-docs', swaggerRouter);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Check if the API is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Event Management API is running
 */

app.use('/events', require('./routes/events'));

app.get('/', (req, res) => {
  res.send('Event Management API is running');
});

// central error handler (keeps internals out of responses)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});



const port = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });