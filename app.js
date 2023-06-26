const express = require("express");
const getTopics = require("./controllers/nc-news2.controller");

const app = express();

app.get("/api/topics", getTopics);

module.exports = app;

// slug   |               description
// ----------+-----------------------------------------
//  coding   | Code is love, code is life
//  football | FOOTIE!
//  cooking  | Hey good looking, what you got cooking?
// (3 rows)
