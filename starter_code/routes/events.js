const express = require('express');
const Event = require('../models/Event');
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const mongoose = require('mongoose');
//const passport = require("passport");
const upload = multer({ dest: '../public/uploads/' });
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

//NUEVO

router.get('/new', (req, res, next) => {
  res.render('events/new');
});
router.post('/uploads',upload.single('imageUrl'),function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pictures.push({
    "imgURL": req.file.filename
  });
  res.redirect('/');
});

router.post('/new', (req, res, next) => {
  const name = req.body.name;
  const place = req.body.place;
  const city = req.body.city;
  const date = req.body.date;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const category = req.body.category;


  const newEvent = Event({
     name : name,
     place : place,
     city : city,
     date : date,
     imageUrl: imageUrl,
     description : description,
     category : category,
  });

  newEvent.save((err) => {
    if (err) {
      return next(err);
    }
    // redirect to the list of products if it saves
    return res.redirect('/events');
  });
});
module.exports = router;
