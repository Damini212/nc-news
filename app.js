const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");
const getApi = require("./controllers/nc-news3.controller");
const getAllArticles = require("./controllers/nc-news5.controller");
const getArticles = require("./controllers/nc-news4.controller");
const getAllComments = require("./controllers/nc-news6.controller");
const addComment = require("./controllers/nc-news7.controller");
const patchArticleId = require("./controllers/nc-news8.controller");

const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errorHandlingMiddleware");

const app = express();
app.use(express.json());

app.use(express.json());

app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getAllComments);
app.post("/api/articles/:article_id/comments", addComment);
app.post("/api/articles/:article_id", patchArticleId);
app.patch("/api/articles/:article_id", patchArticleId);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
