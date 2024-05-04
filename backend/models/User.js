const mongoose = require("mongoose");

// how to create a model
// s1 : require
// s2: create a mongoose schema
// s3: create a model and export

const User = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String,
    default: "",
  },
  likedPlaylists: {
    type: String,
    default: "",
  },
  subscribedArtists: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
