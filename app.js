const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");

const app = express();

app.get("/api/topics", getTopics);

module.exports = app;