const db = require("../db/connection.js");

const updateArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        Promise.reject({
          status: 400,
          message: "Bad request",
        });
      }
      return rows[0];
    });
};

module.exports = updateArticleId;
