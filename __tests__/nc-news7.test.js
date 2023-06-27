const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("GET /api/articles/:article_id/comments", () => {
  test("should return 404 if an invalid id is provided", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .catch(({ body }) => {
        expect(body.message).toBe("Id Not found");
      });
  });
  test("should respond with the new comment added", () => {
    const comment = {
      username: "tickle122",
      body: "This is the new comment added to the body",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          author: comment.username,
          body: comment.body,
        });
      });
  });
  test("should respond with 400 if the body is not provided", () => {
    const comment = {
      username: "tickle122",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400);
  });
});
