const db = require("../db/connection.js");

const getAllCommentsById = (article_id) => {
  if (typeof article_id === "undefined" || !article_id.match(/^\d+$/)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    });
  }
  return db
    .query(
      `SELECT comment_id,
  votes,
  created_at,
  author,
  body,
  article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          message: "Id not found",
        });
      }
      return rows;
    });
};

module.exports = getAllCommentsById;
