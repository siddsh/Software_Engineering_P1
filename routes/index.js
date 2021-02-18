const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
router.get("/", (req, res) => {
  console.log("CHACKING!!!!", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.render("welcome");
  }
});

router.get("/dashboard", ensureAuthenticated, (req, res, next) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
