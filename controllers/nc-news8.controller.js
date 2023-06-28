const updateArticleId = require("../models/nc_news8.model");

const patchArticleId = (req, res, next) => {
  const { article_id } = req.params;

  const { updateVote } = req.body.updateVote;
  updateArticleId(article_id, updateVote)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

module.exports = patchArticleId;
