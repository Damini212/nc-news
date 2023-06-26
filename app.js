const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");
const getApi = require("./controllers/nc-news3.controller");

const app = express();

app.get("/api/", getApi);
app.get("/api/topics", getTopics);

module.exports = app;
