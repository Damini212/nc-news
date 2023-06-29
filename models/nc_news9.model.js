const db = require("../db/connection.js");

const deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rowCount }) => {
      if (rowCount < 1) {
        return Promise.reject({
          status: 400,
          message: "Bad request",
        });
      }
    });
};

module.exports = deleteCommentById;
