const db = require("../db/connection.js");

const getAllTopicsProperties = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

module.exports = getAllTopicsProperties;
