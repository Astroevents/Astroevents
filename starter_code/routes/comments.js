
const express = require("express");
const Comment = require('../models/Comment');
const router = express.Router();

const ensureLogin = require("connect-ensure-login");

router.post('/comments/:id', (req, res, next) => {
 var eventID = req.params.id;
  const CommentInfo = {
      comment: req.body.comment,
      userOwner: req.user.id,
      eventID
  };
  const newComment = new Comment(CommentInfo);

  newComment.save( (err) => {
    if (err) { return next(err); }
    // redirect to the list of products if it saves
    res.redirect(`/events/${eventID}`);
  });

});
module.exports = router;
