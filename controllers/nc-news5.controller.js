const getArticlesCommentsCount = require("../models/nc-news5.model");

const getAllArticles = (req, res, next) => {
  getArticlesCommentsCount()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = getAllArticles;
