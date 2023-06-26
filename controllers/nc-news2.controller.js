const getAllTopicsProperties = require("../models/nc-news2.model");

const getTopics = (req, res) => {
  getAllTopicsProperties().then((topics) => {
    res.status(200).send({ topics });
  });
};

module.exports = getTopics;
