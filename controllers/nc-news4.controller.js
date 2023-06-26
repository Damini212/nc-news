const getArticles = (req, res) => {
  console.log("controller is working");
  res.status(200).send("All ok");
};

module.exports = getArticles;
