const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers.js");

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(403).json({
        error: "A user with this email is Already exists",
      });
    } else {
      const hashedPassword = bcrypt.hash(password, 10);
      const newUserData = { email, password, firstName, lastName, username };
      const newUser = await User.create(newUserData);

      // now generate and send a new unique token to user
      const token = await getToken(email, newUser);
      const userToReturn = { ...newUser.toJSON(), token };
      delete userToReturn.password;

      return res.status(200).json(userToReturn);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ err: "Invalid credentials" });
    }
    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
