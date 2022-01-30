const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Author = mongoose.model("Author");
const keys = require("../config/env");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const author = await Author.findById(payload.authorId, {_id: 1})
        if (author) {
          done(null, author);
        } else {
          done(null, false);
        }
      } catch (e) {
          console.log(e);
      }
    })
  );
};