const db = require("../db/connection.js");

const updateArticleId = (article_id, updateVote) => {
  return db
    .query(`UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`, [
      updateVote,
      article_id,
    ])
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};

module.exports = updateArticleId;
