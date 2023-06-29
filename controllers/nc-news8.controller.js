const updateArticleId = require("../models/nc_news8.model");

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

module.exports = patchArticleId;
