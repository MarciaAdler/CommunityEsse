require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Sequelize = require("sequelize");
var db = require("./models");
const multer = require("multer");
const cors = require("cors");
const passport = require("passport");

const users = require("./routes/users");
var session = require("express-session");
var compression = require("compression");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
// Add routes, both API and view

// Define API routes here
// app.use(transit);

app.use(users);

// multer instance
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "image - " + file.originalname);
  },
});

// upload instance
const upload = multer({ storage: storage }).single("file");
// Send every other request to the React app
// Define any API routes before this runs

// post route to upload image
app.post("/api/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).send(req.file);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ logging: false }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
