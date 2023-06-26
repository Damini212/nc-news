const getArticlesById = require("../models/nc-news4.model");

const getArticles = (req, res) => {
  const { article_id } = req.params;
  getArticlesById(article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((error) => next(error));
};

module.exports = getArticles;
