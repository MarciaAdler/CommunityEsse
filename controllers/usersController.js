const db = require("../models");

module.exports = {
  createUser: function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      aptNumber: req.body.aptNumber,
      password: req.body.password,
      role: req.body.role,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findOne: function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createAnnouncement: function (req, res) {
    db.Announcement.create({
      message: req.body.message,
      UserId: req.body.UserId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getAnnouncements: function (req, res) {
    db.Announcement.findAll({
      where: {
        show: "show",
      },
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createBulletin: function (req, res) {
    db.Bulletin.create({
      message: req.body.message,
      UserId: req.body.UserId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getBulletins: function (req, res) {
    db.Bulletin.findAll({
      where: {
        show: "show",
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteBulletin: function (req, res) {
    db.Bulletin.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteAnnouncement: function (req, res) {
    db.Announcement.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createNotification: function (req, res) {
    db.Notification.create({
      message: req.body.message,
      SenderId: req.body.SenderId,
      ReceiverId: req.body.ReceiverId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getNotifications: function (req, res) {
    db.Notification.findAll({
      where: {
        show: "show",
      },
      include: [
        {
          model: db.User,
          as: "Sender",
        },
        {
          model: db.User,
          as: "Receiver",
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getMyNotifications: function (req, res) {
    db.Notification.findAll({
      where: {
        ReceiverId: req.params.id,
        show: "show",
      },
      include: [
        {
          model: db.User,
          as: "Sender",
        },
        {
          model: db.User,
          as: "Receiver",
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteNotification: function (req, res) {
    db.Notification.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getAllUsers: function (req, res) {
    db.User.findAll({
      where: {
        role: "User",
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
