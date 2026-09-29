const venuesRouter = require('./routes/venues');
const express = require('express');
require('dotenv').config();

const { initDb } = require('./db/connect');

const app = express();

app.use(express.json());
app.use('/venues', venuesRouter);

app.get('/', (req, res) => {
  res.send('Event Management API is running');
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