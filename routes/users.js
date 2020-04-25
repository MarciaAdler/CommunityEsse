const router = require("express").Router();
const passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const db = require("../models");

router.route("/api/signup").post(usersController.createUser);

router.post(
  "/api/login",
  passport.authenticate("local"),
  usersController.findOne
);

router.route("/api/announcement").post(usersController.createAnnouncement);

router.route("/api/announcement").get(usersController.getAnnouncements);

module.exports = router;
