const {
  getAllApi,
  getAllTopicsProperties,
  getArticlesById,
  getArticlesCommentsCount,
  getAllCommentsById,
  postComment,
  updateArticleId,
  deleteCommentById,
  getAllUsers,
} = require("../models/nc-news.model");

const getApi = (req, res) => {
  getAllApi()
    .then((description) => {
      res.status(200).send({ description: JSON.parse(description) });
    })
    .catch((error) => next(error));
};

const getTopics = (req, res) => {
  getAllTopicsProperties(req)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

const getArticles = (req, res, next) => {
  const { article_id } = req.params;
  getArticlesById(article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((error) => next(error));
};

const getAllArticles = (req, res, next) => {
  getArticlesCommentsCount()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  getAllCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

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

const patchArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleId(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then((deletedItem) => {
      res.status(204).send({ deletedItem });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

module.exports = {
  getTopics,
  getApi,
  getArticles,
  getAllArticles,
  getAllComments,
  addComment,
  patchArticleId,
  deleteComment,
  getUsers,
};
