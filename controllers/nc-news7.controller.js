const { postComment, findUserByUsername } = require("../models/nc_news7.model");

const addComment = (req, res, next) => {
  const { article_id } = req.params;

  if (!req.body.username || !req.body.body) {
    res.status(400).send({ message: "username or body not found" });
  }

  findUserByUsername(req.body.username)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 400,
          message: "user not found",
        });
      }
    })
    .then(() => {
      postComment(article_id, req.body)
        .then((comment) => {
          res.status(201).send({ comment });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch(next);
};

module.exports = addComment;
