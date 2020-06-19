require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
var db = require("./models");
// var multer = require("multer");
// const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require("passport");
// const fs = require("fs");
const users = require("./routes/users");
var session = require("express-session");
var compression = require("compression");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public")); //to access the files in public folder
app.use(express.static(path.join(__dirname, "/client/build/")));
// app.use(cors());
// app.use(fileUpload());
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
// get current date
function getFormattedDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getUTCHours();
  var min = today.getUTCMinutes();
  return mm + "-" + dd + "-" + yyyy;
}

// multer instance not using
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "client/build/uploads/");
//   },
//   filename: function (req, file, cb) {
//     console.log("server", getFormattedDate() + "-" + file.name);
//     cb(null, req.body.id + "-" + file.name);
//   },
// });

// file filter
// const fileFilter = (req, file, cd) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// upload instance
// const upload = multer({ storage: storage }).single("file");

// Send every other request to the React app
// Define any API routes before this runs

// post route to upload image
// app.post("/api/upload", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     console.log(req.files.file);
//     return res.status(200).send(req.files.file);
//   });
// });

app.post("/api/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/uploads/${req.body.id}-${myFile.name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send(req.files.file);
    }
  );
});

// delete image file
// app.delete("/api/upload", (req, res) => {
//   console.log(req);
//   fs.unlink(`${__dirname}/client/public/uploads/${req.body.name}`, (err) => {
//     if (err) {
//       console.log("failed to delete local image:" + err);
//     } else {
//       console.log("successfully deleted local image");
//     }
//   });
// });
// file upload api
app.post("/api/pdfupload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  console.log("req.body", req.body);
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/files/${req.body.property}-${myFile.name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send({ name: myFile.name, path: `/${myFile.name}` });
    }
  );
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
