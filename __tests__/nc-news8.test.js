const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("PATCH /api/articles/:article_id", () => {
  test("should return 200 status code if sent an object with correct data", () => {
    const newVote = 1;
    const updateVote = { inc_votes: newVote };

    return request(app).patch("/api/articles/4").send(updateVote);
  });
});
