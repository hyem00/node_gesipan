const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    unique: true,
  },
  user: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
