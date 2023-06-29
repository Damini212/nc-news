const { DatabaseError } = require("pg");

const handleCustomErrors = (error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({ message: error.message });
  } else next(error);
};

const handlePsqlErrors = (error, request, response, next) => {
  if (error instanceof DatabaseError) {
    response.status(400).send({ message: "Bad request" });
  } else next(error);
};

const handleServerErrors = (error, request, response, next) => {
  response.status(500).send({ message: "Internal server error" });
};

module.exports = { handleCustomErrors, handlePsqlErrors, handleServerErrors };
