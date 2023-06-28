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
    return request(app).patch("/api/articles/1").send(updateVote).expect(201);
  });
  test("should add votes to an article using article_id", () => {
    const newVote = 10;
    const udpateVote = { inc_votes: newVote };
    return request(app)
      .get("/api/articles/1")
      .then(({ body }) => {
        const { articles } = body;
        return articles.votes;
      })
      .then((currentVotes) => {
        return request(app)
          .patch("/api/articles/1")
          .send(udpateVote)
          .expect(201)
          .then(({ body }) => {
            const { updatedArticle } = body;
            expect(currentVotes + newVote).toEqual(updatedArticle.votes);
          });
      });
  });
  test("should subtract votes from an article using article_id", () => {
    const newVote = -10;
    const updateVote = { inc_votes: newVote };
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        return articles.votes;
      })
      .then((currentVotes) => {
        return request(app)
          .patch("/api/articles/1")
          .send(updateVote)
          .expect(201)
          .then(({ body }) => {
            const { updatedArticle } = body;
            expect(currentVotes + newVote).toEqual(updatedArticle.votes);
          });
      });
  });
  test("should return 400 if the article_id is a string", () => {
    return request(app).get("/api/articles/banana").expect(400);
  });
  test("should return 400 if the article_id is an invalid number", () => {
    return request(app).get("/api/articles/9999").expect(400);
  });
});
