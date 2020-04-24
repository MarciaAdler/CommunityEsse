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
    }).then(function (user) {
      res.json(user);
    });
  },
};
