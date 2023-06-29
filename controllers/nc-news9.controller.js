const deleteCommentById = require("../models/nc_news9.model");

const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then((deletedItem) => {
      res.status(204).send({ deletedItem });
    })
    .catch(next);
};
module.exports = deleteComment;
