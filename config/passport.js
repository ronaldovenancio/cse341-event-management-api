const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const users = getDb().collection('users');

        const oauthProvider = 'github';
        const oauthId = profile.id;

        let user = await users.findOne({
          oauthProvider,
          oauthId,
        });

        if (!user) {
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null;

          const newUser = {
            displayName: profile.displayName || profile.username,
            email,
            oauthProvider,
            oauthId,
            createdAt: new Date().toISOString(),
          };

          const result = await users.insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser,
          };
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);

module.exports = passport;