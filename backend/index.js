const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User.js");
const authRoutes = require("./routes/auth.js");
const songRoutes = require("./routes/song.js");

const app = express();
const port = 8080;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb");
  });

// setup passport

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisIsScret123";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", authRoutes);
app.use("/song", songRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
