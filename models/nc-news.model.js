const db = require("../db/connection.js");
const fs = require("fs/promises");
const format = require("pg-format");

const getAllTopicsProperties = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

const getAllApi = () => {
  return fs.readFile("./endpoints.json", "utf-8");
};

const getArticlesById = (article_id) => {
  return db
    .query(
      `
    SELECT articles.*, COUNT(comments) AS comment_count
    FROM articles
    JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`,
      [article_id]
    )
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

const getArticlesCommentsCount = ({
  topic,
  sort_by = "created_at",
  order = "desc",
}) => {
  const validatedSortBy = [
    "author",
    "title",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validatedOrder = ["asc", "desc"];

  if (!validatedOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    });
  }
  if (!validatedSortBy.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    });
  }

  return getAllTopicsProperties().then((topics) => {
    const validatedTopics = topics.map(({ slug }) => slug);
    if (topic && !validatedTopics.includes(topic)) {
      return Promise.reject({
        status: 404,
        message: "Not found",
      });
    }

    const queryValues = [];
    let queryStr = `SELECT articles.article_id,
    articles.author, 
    articles.title,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments) AS comment_count
    FROM articles JOIN comments ON articles.article_id = comments.article_id`;

    if (topic) {
      queryStr += ` WHERE topic = $1`;
      queryValues.push(topic);
    }

    queryStr += ` GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order === "asc" ? "ASC" : "DESC"}`;

    return db.query(queryStr, queryValues).then(({ rows }) => {
      return rows;
    });
  });
};

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
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          message: "Not found",
        });
      }
      return rows;
    });
};

const postComment = (article_id, comment) => {
  return db
    .query(
      format(
        `INSERT INTO comments (author, body, article_id) VALUES %L RETURNING *`,
        [[comment.username, comment.body, article_id]]
      )
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const updateArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          message: "Not found",
        });
      }
      return rows[0];
    });
};
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
const getAllUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};
module.exports = {
  getAllTopicsProperties,
  getAllApi,
  getArticlesById,
  getArticlesCommentsCount,
  getAllCommentsById,
  postComment,
  updateArticleId,
  deleteCommentById,
  getAllUsers,
};
