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

router
  .route("/api/announcement/:id")
  .delete(usersController.deleteAnnouncement);

router.route("/api/bulletin").post(usersController.createBulletin);

router.route("/api/bulletin").get(usersController.getBulletins);

router.route("/api/bulletin/:id").delete(usersController.deleteBulletin);

router.route("/api/notification").post(usersController.createNotification);

router.route("/api/notification").get(usersController.getNotifications);

router
  .route("/api/notification/:userId")
  .get(usersController.getMyNotifications);
router
  .route("/api/notification/:id")
  .delete(usersController.deleteNotification);

router.route("/api/users").get(usersController.getAllUsers);
module.exports = router;
