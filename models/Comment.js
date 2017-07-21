
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: String,
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  eventID: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  }
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

  const Comment = mongoose.model('Comment', CommentSchema);

  module.exports = Comment;
