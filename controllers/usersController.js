const db = require("../models");
var fs = require("fs");
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
      instructions: req.body.instructions,
      PropertyId: req.body.property,
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
    console.log("createannouncement", req.body);
    db.Announcement.create({
      message: req.body.message,
      UserId: req.body.UserId,
      PropertyId: req.body.PropertyId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getAnnouncements: function (req, res) {
    console.log(req.params);
    db.Announcement.findAll({
      where: {
        show: "show",
        PropertyId: req.params.id,
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
      subject: req.body.subject,
      UserId: req.body.UserId,
      PropertyId: req.body.PropertyId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getBulletins: function (req, res) {
    console.log(req.params);
    db.Bulletin.findAll({
      where: {
        show: "show",
        PropertyId: req.params.id,
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
      PropertyId: req.body.PropertyId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getNotifications: function (req, res) {
    console.log("notifications", req.params);
    db.Notification.findAll({
      include: [
        {
          model: db.User,
          as: "Property",
          where: { id: req.params.id },
        },
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
    console.log("notice", req.params);
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
    console.log("getallusers", req.params);
    console.log("getallbody", req.body);
    db.User.findAll({
      where: {
        role: "User",
        active: "active",
        PropertyId: req.params.id,
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
    console.log("getall", req.params);
    db.User.findAll({
      where: {
        PropertyId: req.params.id,
        active: "active",
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findIdByApt: function (req, res) {
    console.log("apt", req.params);
    db.User.findOne({
      where: {
        aptNumber: req.params.id,
        active: "active",
        PropertyId: req.params.PropertyId,
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
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        instructions: req.body.instructions,
        file: req.body.file,
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
      subject: req.body.subject,
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
  getReceivedMessages: function (req, res) {
    console.log(req.params);
    db.Message.findAll({
      where: {
        ReceiverId: req.params.id,
        inboxShow: "show",
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
  hideMessage: function (req, res) {
    console.log(req.params);
    db.Message.update(
      {
        show: "hide",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  markMessageAsRead: function (req, res) {
    console.log(req.params);
    db.Message.update(
      {
        read: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  inboxHideMessage: function (req, res) {
    console.log("inboxhide", req.params);
    db.Message.update(
      {
        inboxShow: "hide",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  inactiveUser: function (req, res) {
    db.User.update(
      {
        active: "inactive",
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findIdByUsername: function (req, res) {
    db.User.findOne({
      where: { username: req.params.username },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  resetPassword: function (req, res) {
    db.User.update(
      {
        password: req.body.password,
      },
      {
        individualHooks: true,
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  fileUpload: function (req, res) {
    console.log("fileUpload", req.body);
    db.File.create({
      name: req.body.name,
      PropertyId: req.body.property,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getFiles: function (req, res) {
    db.File.findAll({
      where: { PropertyId: req.params.id, show: "show" },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  // addFileName: function (req, res) {
  //   db.User.update(
  //     {
  //       file: req.body.file,
  //     },
  //     {
  //       where: { id: req.params.id },
  //     }
  //   )
  //     .then((dbModel) => res.json(dbModel))
  //     .catch(function (err) {
  //       res.status(401).json(err);
  //     });
  // },
  // uploadImage: function (req, res) {
  //   db.Image.create({
  //     name: req.files.file.name,
  //     image: req.files.file.data,
  //     type: req.files.file.mimetype,
  //     UserId: req.body.id,
  //   })
  //     .then((dbModel) => res.json(dbModel))

  //     .catch(function (error) {
  //       console.log(error);
  //       return res.send(`Error when trying upload images: ${error}`);
  //     });
  // },
  // getImage: function (req, res) {
  //   db.Image.findAll({
  //     where: { UserId: req.params.id },
  //   })
  //     .then((dbModel) => res.json(dbModel))
  //     .catch(function (err) {
  //       res.status(401).json(err);
  //     });
  // },
  deleteFile: function (req, res) {
    console.log(req.params);
    db.File.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getPropertyName: function (req, res) {
    db.Property.findOne({
      where: { id: req.params.id },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createRequest: function (req, res) {
    db.Maintenance.create({
      request: req.body.request,
      SenderId: req.body.SenderId,
      ReceiverId: req.body.ReceiverId,
      PropertyId: req.body.PropertyId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
