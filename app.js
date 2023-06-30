const express = require("express");
const {
  getTopics,
  getApi,
  getAllArticles,
  getArticles,
  getAllComments,
  addComment,
  patchArticleId,
  deleteComment,
  getUsers,
} = require("./controllers/nc-news.controller");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorHandlingMiddleware");

const app = express();
app.use(express.json());

app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getAllComments);
app.post("/api/articles/:article_id/comments", addComment);
app.post("/api/articles/:article_id", patchArticleId);
app.patch("/api/articles/:article_id", patchArticleId);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getUsers);
app.all("*", (_, res) => {
  res.status(404).send({ status: 404, message: "Not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
