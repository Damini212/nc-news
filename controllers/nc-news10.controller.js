const getAllUsers = require("../models/nc-news10.model");

const getUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
module.exports = getUsers;
