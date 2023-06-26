const getAllTopicsProperties = require("../models/nc-news2.model");

const getTopics = (req, res) => {
  getAllTopicsProperties(req)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = getTopics;
