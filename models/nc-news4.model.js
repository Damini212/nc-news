const db = require("../db/connection.js");

const getArticlesById = (article_id) => {
  if (typeof article_id === "undefined" || !article_id.match(/^\d+$/)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    });
  }

  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          message: "Id not found",
        });
      }

      return rows[0];
    });
};

module.exports = getArticlesById;
