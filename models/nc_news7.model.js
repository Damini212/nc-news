const db = require("../db/connection.js");
const format = require("pg-format");

const postComment = (article_id, comment) => {
  return db
    .query(
      format(
        `INSERT INTO comments (author, body, article_id) VALUES %L RETURNING *`,
        [[comment.username, comment.body, article_id]]
      )
    )
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

const findUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { postComment, findUserByUsername };
