const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//
const Users = require("../models/Users");

// Login Page
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

// Register Page
router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.render("register");
  }
});

//Register Handel
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check all fields are filled
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all details!" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords dont match" });
  }
  //Length of password
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Check if User Exists
    var email_query = {
      email: email,
    };
    Users.findOne(email_query)
      .then((user) => {
        if (user) {
          // If Found, Display error Message
          errors.push({ msg: "User Already Exists!" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          // Create New User
          const newUser = Users({
            name,
            email,
            password,
          });
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              // set password to the hash value of password
              newUser.password = hash;

              // save user details to db
              newUser
                .save()
                .then((user_temp) => {
                  req.flash(
                    "success_msg",
                    `Registration successful, Welcome ${newUser.name}`
                  );
                  res.redirect("/users/login");
                })
                .catch((err_new) => console.log(err_new));
            })
          );
        }
      })
      .catch((err) => console.error(err));
  }
});

//Login Handel
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//logout handel
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
