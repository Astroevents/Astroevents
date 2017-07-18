const express = require('express');
const Event = require('../models/Event');
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const mongoose = require('mongoose');
//const passport = require("passport");
const upload = multer({ dest: './public/uploads/' });
const pictures = [];


const router = express.Router();

router.get('/events', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) {
      return next(err);
    }

    res.render('events/events', {
      user: req.user,
      events: events
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('events/new');
});

// router.post('/uploads', upload.single('imageUrl'), function(req, res, next) {
//   console.log(req.body);
//   console.log(req.file);
//   pictures.push({
//     "imgURL": req.file.filename
//   });
//   res.redirect('/');
// });

router.post('/new', upload.single('imageUrl'), (req, res, next) => {
  const name = req.body.name;
  const place = req.body.place;
  const city = req.body.city;
  const date = req.body.date;
  const imageUrl = "uploads/"+req.file.filename;
  const description = req.body.description;
  const category = req.body.category;
  const imageName = req.file.originalname;
  const lat = req.body.lat;
  const long = req.body.long;

  const newEvent = Event({
     name : name,
     place : place,
     city : city,
     date : date,
     imageUrl: imageUrl,
     imageName: imageName,
     description : description,
     category : category,
     lat: lat,
     long: long
  });
console.log(lat);
  newEvent.save((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/events');
  });
});

router.get('/events/:id', (req, res, next) => {
  const eventId = req.params.id;

  Event.findById(eventId, (err, event) => {
    if (err) { return next(err); }
    res.render('events/show', { event: event });
  });
});

router.get('/events/:id/edit', (req, res, next) => {
  const eventId = req.params.id;

  Event.findById(eventId, (err, event) => {
    if (err) { return next(err); }
    res.render('events/edit', { event: event });
  });
});

router.post('/events/:id', (req, res, next) => {
  const eventId = req.params.id;

  const updates = {
     place : req.body.place,
     city : req.body.city,
     date : req.body.date,
     imageUrl : req.body.imageUrl,
     name : req.body.name,
     description : req.body.description,
     category : req.body.category,
     lat : req.body.lat,
     long : req.body.long
};
console.log(place.geometry.location.lng());
Event.findByIdAndUpdate(eventId, updates, (err, event) => {
  if (err){ return next(err); }
  return res.redirect('/events');
});
});

//NUEVO

router.post('/events/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id, (err, event) => {
    if (err){ return next(err); }
    return res.redirect('/events');
  });

});



module.exports = router;
