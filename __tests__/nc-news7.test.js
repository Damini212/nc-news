const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
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
      username: "butter_bridge",
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
  test("should respond with 400 if an invalid username is provided", () => {
    const comment = {
      username: "invalid_user",
      body: "This is not a valid user name",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400);
  });
  test("should respond with 400 if the username is provided and the body is missing", () => {
    const comment = {
      username: "tickle122",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400);
  });
  test("should respond with 400 if the body is provided and the username is missing", () => {
    const comment = {
      body: "this is invalid",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400);
  });
});
