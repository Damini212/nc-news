const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");
const getApi = require("./controllers/nc-news3.controller");
const getAllArticles = require("./controllers/nc-news5.controller");
const getArticles = require("./controllers/nc-news4.controller");
const getAllComments = require("./controllers/nc-news6.controller");

const app = express();

app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getAllComments);

module.exports = app;
