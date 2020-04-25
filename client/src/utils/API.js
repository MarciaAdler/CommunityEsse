const axios = require("axios");
export default {
  createUser: function (req) {
    return axios.post("/api/signup", req);
  },
  getUser: function (req) {
    return axios.post("/api/login", req);
  },
  createAnnouncement: function (req) {
    return axios.post("api/announcement", req);
  },
  getAnnouncements: function () {
    return axios.get("api/announcement");
  },
};
