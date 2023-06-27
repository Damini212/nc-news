const db = require("../db/connection.js");

const getArticlesCommentsCount = () => {
  return db
    .query(
      `
  SELECT articles.article_id,
  articles.author, 
  articles.title,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments) AS comment_count
  FROM articles JOIN comments ON articles.article_id = comments.article_id 
  GROUP BY articles.article_id, articles.created_at
  ORDER BY articles.created_at DESC;
  `
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = getArticlesCommentsCount;
