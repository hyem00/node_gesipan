const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    unique: true,
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: user,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
