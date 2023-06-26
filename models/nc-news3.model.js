const fs = require("fs/promises");

const getAllApi = () => {
  return fs.readFile("./endpoints.json", "utf-8");
};

module.exports = getAllApi;
