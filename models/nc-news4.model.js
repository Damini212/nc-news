const db = require("../db/connection.js");

const getArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        throw new Error("ID not found");
      }

      return rows[0];
    })
    .catch(() => {
      return Promise.reject({
        status: 400,
        message: "Bad request",
      });
    });
};

module.exports = getArticlesById;
