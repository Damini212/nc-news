const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");
const getApi = require("./controllers/nc-news3.controller");
const getAllArticles = require("./controllers/nc-news5.controller");
<<<<<<< HEAD
const getArticles = require("./controllers/nc-news4.controller");
const getAllComments = require("./controllers/nc-news6.controller");
=======
const addComment = require("./controllers/nc-news7.controller");
>>>>>>> d966b65 (completed kata 7)

const app = express();

app.use(express.json());

app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
<<<<<<< HEAD
app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getAllComments);
=======
app.post("/api/articles/:article_id/comments", addComment);
>>>>>>> d966b65 (completed kata 7)

module.exports = app;
