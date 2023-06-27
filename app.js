const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");
const getApi = require("./controllers/nc-news3.controller");
const getAllArticles = require("./controllers/nc-news5.controller");

const app = express();

app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);

module.exports = app;
