const express = require("express");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const authRoutes = express.Router();


authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", upload.single('imgUrl'), (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  //const imgUrl = req.body.imgUrl;
  const imgUrl = "uploads/"+req.file.filename;
  console.log(req.file);
  const imgName = req.file.originalname;
  const telescope = req.body.telescope;
  if (username === "" || password === "") {
    res.render("auth/signup", {
      message: "Indicate username and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The username already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      name: name,
      lastName: lastName,
      city: city,
      email: email,
      username: username,
      password: hashPass,
      imgUrl: imgUrl,
      imgName : imgName,
      telescope
    });
console.log(newUser);

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/events",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;
