const mongoose = require("mongoose");

// how to create a model
// s1 : require
// s2: create a mongoose schema
// s3: create a model and export

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;
