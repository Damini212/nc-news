const { DatabaseError } = require("pg");

const handlePsqlErrors = (error, request, response, next) => {
  if (error instanceof DatabaseError) {
    response.status(400).send({ message: "Invalid input" });
  } else next(error);
};

const handleCustomErrors = (error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({ message: error.messasge });
  } else next(error);
};

const handleServerErrors = (error, request, response, next) => {
  response.status(500).send({ message: "Internal server error" });
};

module.exports = { handleCustomErrors, handlePsqlErrors, handleServerErrors };
