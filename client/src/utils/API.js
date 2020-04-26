const axios = require("axios");
export default {
  createUser: function (req) {
    return axios.post("/api/signup", req);
  },
  getUser: function (req) {
    return axios.post("/api/login", req);
  },
  createAnnouncement: function (req) {
    return axios.post("/api/announcement", req);
  },
  getAnnouncements: function () {
    return axios.get("/api/announcement");
  },
  createBulletin: function (req) {
    console.log(req);
    return axios.post("/api/bulletin", req);
  },
  getBulletins: function () {
    return axios.get("/api/bulletin");
  },
  deleteBulletin: function (bulletin) {
    return axios.delete("/api/bulletin/" + bulletin);
  },
  deleteAnnouncement: function (announcement) {
    return axios.delete("/api/announcement/" + announcement);
  },
};
