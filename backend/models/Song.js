const mongoose = require("mongoose");

// how to create a model
// s1 : require
// s2: create a mongoose schema
// s3: create a model and export

const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
