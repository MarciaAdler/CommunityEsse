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
    console.log(req.body);
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
        ReceiverId: req.params.userId,
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
  markNotificationAsRead: function (req, res) {
    db.Notification.update({ read: true }, { where: { id: req.params.id } })

      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getAll: function (req, res) {
    db.User.findAll({})
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findIdByApt: function (req, res) {
    db.User.findOne({
      where: {
        aptNumber: req.params.aptNum,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateProfile: function (req, res) {
    db.User.update(
      {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
      },
      { where: { id: req.body.id } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  refreshCurrentUser: function (req, res) {
    console.log("test", req.params.id);
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  markNotificationAsClosed: function (req, res) {
    db.Notification.update({ closed: true }, { where: { id: req.params.id } })

      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createMessage: function (req, res) {
    console.log(req.body);
    db.Message.create({
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
  getSentMessages: function (req, res) {
    db.Message.findAll({
      where: {
        SenderId: req.params.id,
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
  getReceivedMessages: function (req, res) {
    console.log(req.params);
    db.Message.findAll({
      where: {
        ReceiverId: req.params.id,
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
  hideNotification: function (req, res) {
    db.Notification.update({ show: "hide" }, { where: { id: req.params.id } })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteMessage: function (req, res) {
    console.log(req.params);
    db.Message.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
