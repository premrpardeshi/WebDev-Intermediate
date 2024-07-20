// const request = require('supertest');
// const assert = require('assert');
const express = require("express");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let requests = {};
setInterval(() => {
  requests = {};
}, 1000);

function ratelimiter(req, res, next) {
  const userid = req.headers["user-id"];
  if (requests[userid]) {
    requests[userid]++;
    if (requests[userid] > 5) res.status(404).send("Limit Reached!");
    else next();
  } else {
    requests[userid] = 1;
    next();
  }
}
app.use(ratelimiter);

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
