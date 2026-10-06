const venuesRouter = require('./routes/venues');
const usersRouter = require('./routes/users');
const registrationsRouter = require('./routes/registrations');
const express = require('express');
const session = require('express-session');

require('dotenv').config();

const passport = require('./config/passport');
const { initDb } = require('./db/connect');
const swaggerRouter = require('./routes/swagger');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/venues', venuesRouter);
app.use('/users', usersRouter);
app.use('/registrations', registrationsRouter);
app.use('/auth', authRouter);

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