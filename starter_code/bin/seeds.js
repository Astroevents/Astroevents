const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Astroevent');
const Comment = require('../models/Comment');

Comment.create(Comment, (err, docs) => {
  if (err) {
    throw err;
  }

  const comments = [
  {
    comment: 'Yoga Mat',
  },
];
  mongoose.connection.close();
});
