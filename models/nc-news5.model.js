const db = require("../db/connection.js");

const getArticlesCommentsCount = ({ topic, sort_by, order }) => {
  const validSorts = ["topic", "author", "title", "created_at", "votes"];
  if (sort_by && !validSorts.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    });
  }
  const query = `SELECT articles.article_id,
  articles.author, 
  articles.title,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments) AS comment_count
  FROM articles  JOIN comments ON articles.article_id = comments.article_id 
  ${topic ? "WHERE topic = $1" : ""}
  GROUP BY articles.article_id
  ORDER BY ${sort_by ?? "created_at"} ${order === "asc" ? "ASC" : "DESC"}; `;

  return db.query(query, topic ? [topic] : []).then(({ rows }) => {
    return rows;
  });
};

module.exports = getArticlesCommentsCount;
