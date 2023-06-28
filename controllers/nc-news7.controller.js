const { postComment } = require("../models/nc_news7.model");

const addComment = (req, res, next) => {
  const { article_id } = req.params;

  if (!req.body.username || !req.body.body) {
    res.status(400).send({ message: "username or body not found" });
  }
  postComment(article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = addComment;
