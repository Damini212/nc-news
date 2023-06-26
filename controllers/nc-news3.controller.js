const getAllApi = require("../models/nc-news3.model");

const getApi = (req, res) => {
  getAllApi()
    .then((description) => {
      res.status(200).send({ description: JSON.parse(description) });
    })
    .catch((error) => next(error));
};

module.exports = getApi;
