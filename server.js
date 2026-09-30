const express = require('express');
require('dotenv').config();

const { initDb } = require('./db/connect');

const app = express();

app.use(express.json());

app.use('/', require('./routes/swagger'));
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