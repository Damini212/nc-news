const getAllCommentsById = require("../models/nc_news6.model");

const getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  getAllCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = getAllComments;
