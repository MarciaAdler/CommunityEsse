var GtfsRealtimeBindings = require("gtfs-realtime-bindings");
var request = require("request");
const router = require("express").Router();
const key = process.env.MTA_APIKEY;
const queryURL = "http://datamine.mta.info/mta_esi.php?key=" + key;
console.log(key);
var requestSettings = {
  method: "GET",
  url: queryURL,
  encoding: null,
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    feed.entity.forEach(function (entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
});
